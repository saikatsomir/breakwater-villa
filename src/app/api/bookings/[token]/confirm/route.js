import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { resend } from '../../../../../lib/email';

export async function POST(request, { params }) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Booking action token is missing.',
        },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: {
        actionToken: token,
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: 'This booking link is invalid or no longer available.',
        },
        { status: 404 }
      );
    }

    if (booking.status === 'CANCELLED') {
      return NextResponse.json(
        {
          success: false,
          message: 'This booking has already been cancelled.',
        },
        { status: 409 }
      );
    }

    if (booking.status === 'CONFIRMED') {
      return NextResponse.json({
        success: true,
        message: 'This booking is already confirmed.',
        booking: {
          id: booking.id,
          status: booking.status,
        },
      });
    }

    // Check whether another confirmed booking
    // already occupies these dates.
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        status: 'CONFIRMED',
        id: {
          not: booking.id,
        },
        checkIn: {
          lt: booking.checkOut,
        },
        checkOut: {
          gt: booking.checkIn,
        },
      },
    });

    if (overlappingBooking) {
      return NextResponse.json(
        {
          success: false,
          message:
            'These dates have already been confirmed for another booking.',
        },
        { status: 409 }
      );
    }

    // Confirm the booking.
    const confirmedBooking = await prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        status: 'CONFIRMED',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        checkIn: true,
        checkOut: true,
        status: true,
      },
    });

    const formattedCheckIn = confirmedBooking.checkIn.toLocaleDateString(
      'en-US',
      {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }
    );

    const formattedCheckOut = confirmedBooking.checkOut.toLocaleDateString(
      'en-US',
      {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }
    );

    // Notify the guest that their reservation is confirmed.
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: '32 ocean <onboarding@resend.dev>',
      to: [confirmedBooking.email],
      subject: 'Your 32 ocean Reservation is Confirmed',
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #222;">

            <div style="padding: 32px 0;">
              <h1 style="margin: 0 0 8px; font-size: 28px;">
                32 ocean
              </h1>

              <p style="margin: 0; color: #666; font-size: 15px;">
                Reservation confirmation
              </p>
            </div>

            <div style="border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px;">

              <h2 style="margin-top: 0; font-size: 22px;">
                Your Reservation is Confirmed
              </h2>

              <p style="line-height: 1.7;">
                Dear ${confirmedBooking.firstName},
              </p>

              <p style="line-height: 1.7; color: #555;">
                We're pleased to confirm your reservation at 32 ocean.
                We look forward to welcoming you to Paradise Island.
              </p>

              <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 24px 0;" />

              <h2 style="font-size: 20px;">
                Stay Details
              </h2>

              <p>
                <strong>Check-in:</strong>
                ${formattedCheckIn}
              </p>

              <p>
                <strong>Check-out:</strong>
                ${formattedCheckOut}
              </p>

              <p>
                <strong>Status:</strong>
                CONFIRMED
              </p>

              <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 24px 0;" />

              <p style="line-height: 1.7; color: #555;">
                Your selected dates are now reserved exclusively for your stay.
              </p>

            </div>

            <p style="margin-top: 24px; color: #777; font-size: 13px;">
              Booking ID: ${confirmedBooking.id}
            </p>

          </div>
        `,
    });

    if (emailError) {
      console.error('Guest confirmation email error:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: emailError
        ? 'Booking confirmed successfully, but the guest confirmation email could not be sent.'
        : 'Booking confirmed successfully and the guest has been notified.',
      booking: {
        id: confirmedBooking.id,
        status: confirmedBooking.status,
      },
      emailSent: !emailError,
      emailId: emailData?.id,
    });
  } catch (error) {
    console.error('Confirm booking error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong while confirming the booking.',
      },
      { status: 500 }
    );
  }
}
