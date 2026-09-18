import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '../../../lib/prisma';
import { resend } from '../../../lib/email';

const OWNER_EMAIL = 'saikatsomir@gmail.com';

// Change this to your production website URL before deployment.
// For local development, localhost is used automatically.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      checkIn,
      checkOut,
      firstName,
      lastName,
      email,
      phone,
      contactMethod,
      inquiryType,
      notes,
    } = body;

    // Validate required fields
    if (
      !checkIn ||
      !checkOut ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !contactMethod ||
      !inquiryType
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please complete all required fields.',
        },
        { status: 400 }
      );
    }

    // Convert dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (
      Number.isNaN(checkInDate.getTime()) ||
      Number.isNaN(checkOutDate.getTime())
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid booking dates.',
        },
        { status: 400 }
      );
    }

    // Make sure checkout is after check-in
    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        {
          success: false,
          message: 'Check-out date must be after check-in date.',
        },
        { status: 400 }
      );
    }

    // Check whether the requested dates overlap
    // with an existing CONFIRMED booking.
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        status: 'CONFIRMED',
        checkIn: {
          lt: checkOutDate,
        },
        checkOut: {
          gt: checkInDate,
        },
      },
    });

    if (overlappingBooking) {
      return NextResponse.json(
        {
          success: false,
          message: 'These dates are no longer available.',
        },
        { status: 409 }
      );
    }

    // Generate a secure random token.
    // This token is used by the owner email
    // to access the confirmation/cancellation pages.
    const actionToken = crypto.randomBytes(32).toString('hex');

    // Create the booking inquiry
    const booking = await prisma.booking.create({
      data: {
        checkIn: checkInDate,
        checkOut: checkOutDate,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        contactMethod,
        inquiryType,
        notes: notes?.trim() || null,
        actionToken,
        status: 'PENDING',
      },
    });

    // Format dates for the owner email
    const formattedCheckIn = checkInDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const formattedCheckOut = checkOutDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    // Create secure action page URLs.
    const confirmUrl = `${SITE_URL}/booking-action/${actionToken}/confirm`;

    const cancelUrl = `${SITE_URL}/booking-action/${actionToken}/cancel`;

    // Send booking notification to the owner
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: '32 ocean <onboarding@resend.dev>',
      to: [OWNER_EMAIL],
      replyTo: email.trim().toLowerCase(),
      subject: `New Booking Inquiry — ${firstName.trim()} ${lastName.trim()}`,
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #222;">

            <div style="padding: 32px 0;">
              <h1 style="margin: 0 0 8px; font-size: 28px;">
                32 ocean
              </h1>

              <p style="margin: 0; color: #666; font-size: 15px;">
                New booking inquiry received
              </p>
            </div>

            <div style="border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px;">

              <h2 style="margin-top: 0; font-size: 20px;">
                Guest Information
              </h2>

              <p>
                <strong>Name:</strong>
                ${firstName.trim()} ${lastName.trim()}
              </p>

              <p>
                <strong>Email:</strong>
                ${email.trim().toLowerCase()}
              </p>

              <p>
                <strong>Phone:</strong>
                ${phone.trim()}
              </p>

              <p>
                <strong>Preferred Contact:</strong>
                ${contactMethod}
              </p>

              <p>
                <strong>Inquiry Type:</strong>
                ${inquiryType}
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
                PENDING
              </p>

              ${
                notes?.trim()
                  ? `
                    <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 24px 0;" />

                    <h2 style="font-size: 20px;">
                      Guest Notes
                    </h2>

                    <p style="white-space: pre-line;">
                      ${notes.trim()}
                    </p>
                  `
                  : ''
              }

              <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 32px 0;" />

              <h2 style="font-size: 20px;">
                Booking Actions
              </h2>

              <p style="color: #666; line-height: 1.6;">
                Please review the reservation details above before
                confirming or cancelling this booking.
              </p>

              <div style="margin-top: 24px;">

                <a
                  href="${confirmUrl}"
                  style="
                    display: inline-block;
                    background: #222;
                    color: #fff;
                    text-decoration: none;
                    padding: 14px 24px;
                    border-radius: 999px;
                    font-size: 14px;
                    font-weight: 600;
                    margin-right: 10px;
                  "
                >
                  Confirm Booking
                </a>

                <a
                  href="${cancelUrl}"
                  style="
                    display: inline-block;
                    background: #fff;
                    color: #222;
                    text-decoration: none;
                    padding: 13px 24px;
                    border-radius: 999px;
                    border: 1px solid #222;
                    font-size: 14px;
                    font-weight: 600;
                  "
                >
                  Cancel Booking
                </a>

              </div>

            </div>

            <p style="margin-top: 24px; color: #777; font-size: 13px;">
              Booking ID: ${booking.id}
            </p>

          </div>
        `,
    });

    // Important:
    // The booking was successfully saved even if the email fails.
    if (emailError) {
      console.error('Booking email error:', emailError);

      return NextResponse.json(
        {
          success: true,
          message:
            'Booking inquiry was submitted successfully, but the notification email could not be sent.',
          booking: {
            id: booking.id,
            status: booking.status,
          },
          emailSent: false,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Booking inquiry submitted successfully.',
        booking: {
          id: booking.id,
          status: booking.status,
        },
        emailSent: true,
        emailId: emailData?.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create booking error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong while creating the booking.',
      },
      { status: 500 }
    );
  }
}
