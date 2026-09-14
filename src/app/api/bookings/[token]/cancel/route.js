import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

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
      return NextResponse.json({
        success: true,
        message: 'This booking is already cancelled.',
        booking: {
          id: booking.id,
          status: booking.status,
        },
      });
    }

    if (booking.status === 'CONFIRMED') {
      return NextResponse.json(
        {
          success: false,
          message:
            'This booking has already been confirmed and cannot be cancelled from this link.',
        },
        { status: 409 }
      );
    }

    // Cancel the booking.
    const cancelledBooking = await prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        status: 'CANCELLED',
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

    const formattedCheckIn = cancelledBooking.checkIn.toLocaleDateString(
      'en-US',
      {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }
    );

    const formattedCheckOut = cancelledBooking.checkOut.toLocaleDateString(
      'en-US',
      {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }
    );

    // Notify the guest that their reservation inquiry was cancelled.
    const { data: emailData, error: emailError } = await import(
      '../../../../../lib/email'
    ).then(({ resend }) =>
      resend.emails.send({
        from: 'Breakwater Villa <onboarding@resend.dev>',
        to: [cancelledBooking.email],
        subject: 'Update Regarding Your Breakwater Villa Inquiry',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #222;">

              <div style="padding: 32px 0;">
                <h1 style="margin: 0 0 8px; font-size: 28px;">
                  Breakwater Villa
                </h1>

                <p style="margin: 0; color: #666; font-size: 15px;">
                  Reservation update
                </p>
              </div>

              <div style="border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px;">

                <h2 style="margin-top: 0; font-size: 22px;">
                  Reservation Inquiry Cancelled
                </h2>

                <p style="line-height: 1.7;">
                  Dear ${cancelledBooking.firstName},
                </p>

                <p style="line-height: 1.7; color: #555;">
                  We wanted to let you know that your reservation inquiry
                  for Breakwater Villa has been cancelled and the requested
                  dates are currently available again.
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
                  CANCELLED
                </p>

                <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 24px 0;" />

                <p style="line-height: 1.7; color: #555;">
                  If you have any questions, please contact us directly.
                </p>

              </div>

              <p style="margin-top: 24px; color: #777; font-size: 13px;">
                Booking ID: ${cancelledBooking.id}
              </p>

            </div>
          `,
      })
    );

    if (emailError) {
      console.error('Guest cancellation email error:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: emailError
        ? 'Booking cancelled successfully, but the guest cancellation email could not be sent.'
        : 'Booking cancelled successfully and the guest has been notified.',
      booking: {
        id: cancelledBooking.id,
        status: cancelledBooking.status,
      },
      emailSent: !emailError,
      emailId: emailData?.id,
    });
  } catch (error) {
    console.error('Cancel booking error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong while cancelling the booking.',
      },
      { status: 500 }
    );
  }
}
