import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        status: 'CONFIRMED',
      },
      select: {
        checkIn: true,
        checkOut: true,
      },
      orderBy: {
        checkIn: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error('Get booking availability error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to load booking availability.',
      },
      { status: 500 }
    );
  }
}
