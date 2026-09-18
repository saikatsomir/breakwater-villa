import BookingHero from './BookingHero';
import BookingDates from './BookingDates';

export const metadata = {
  title: 'Book Your Stay | 32 ocean | Paradise Island, Bahamas',

  description:
    'Begin your reservation at 32 ocean, a private 6-bedroom luxury villa in Ocean View Villa on Paradise Island, The Bahamas. Select your preferred stay dates to continue your booking.',

  keywords: [
    '32 ocean booking',
    'Paradise Island villa booking',
    'Bahamas luxury villa rental',
    'Ocean View Villa on Paradise Island',
    'Paradise Island vacation rental',
  ],

  openGraph: {
    title: 'Book Your Stay | 32 ocean | Paradise Island, Bahamas',

    description:
      'Select your preferred dates and begin planning your stay at 32 ocean in Ocean View Villa on Paradise Island',

    images: [
      {
        url: '/images/home/villa-intro.jpg',
        width: 1200,
        height: 800,
        alt: '32 ocean in Paradise Island, Bahamas',
      },
    ],
  },
};

export default function BookingMyStayPage() {
  return (
    <main>
      <BookingHero />
      <BookingDates />
    </main>
  );
}
