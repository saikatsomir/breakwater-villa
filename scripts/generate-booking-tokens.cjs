import crypto from 'crypto';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const bookings = await prisma.booking.findMany({
    where: {
      actionToken: null,
    },
    select: {
      id: true,
    },
  });

  console.log(`Found ${bookings.length} booking(s) without a token.`);

  for (const booking of bookings) {
    const actionToken = crypto.randomBytes(32).toString('hex');

    await prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        actionToken,
      },
    });

    console.log(`Token generated for booking: ${booking.id}`);
  }

  console.log('All missing booking tokens have been generated.');
}

main()
  .catch((error) => {
    console.error('Failed to generate booking tokens:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
