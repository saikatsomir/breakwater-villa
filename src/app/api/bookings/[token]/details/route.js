import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function GET(request, { params }) {
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
      select: {
        firstName: true,
        lastName: true,
        checkIn: true,
        checkOut: true,
        status: true,
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

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('Get booking details error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong while loading the booking.',
      },
      { status: 500 }
    );
  }
}
