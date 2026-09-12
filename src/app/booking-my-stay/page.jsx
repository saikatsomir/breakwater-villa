import BookingHero from './BookingHero';
import BookingDates from './BookingDates';

export const metadata = {
  title: 'Book Your Stay | Breakwater Villa | Paradise Island, Bahamas',

  description:
    'Begin your reservation at Breakwater Villa, a private 6-bedroom luxury villa in Ocean Club Estates, Paradise Island, The Bahamas. Select your preferred stay dates to continue your booking.',

  keywords: [
    'Breakwater Villa booking',
    'Paradise Island villa booking',
    'Bahamas luxury villa rental',
    'Ocean Club Estates villa',
    'Paradise Island vacation rental',
  ],

  openGraph: {
    title: 'Book Your Stay | Breakwater Villa | Paradise Island, Bahamas',

    description:
      'Select your preferred dates and begin planning your stay at Breakwater Villa in Ocean Club Estates, Paradise Island, The Bahamas.',

    images: [
      {
        url: '/images/home/villa-intro.jpg',
        width: 1200,
        height: 800,
        alt: 'Breakwater Villa in Paradise Island, Bahamas',
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
