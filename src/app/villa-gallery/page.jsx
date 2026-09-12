import GalleryHero from './GalleryHero';
import ResidenceIntro from './ResidenceIntro';
import GalleryMarquee from './GalleryMarquee';
import FinalBookingCTA from '../components/home/FinalBookingCTA';

export const metadata = {
  title: 'The Villa & Gallery | Breakwater Villa | Paradise Island, Bahamas',
  description:
    'Explore Breakwater Villa, a private 6-bedroom luxury villa in Ocean Club Estates on Paradise Island, Bahamas. Discover the villa interiors, outdoor spaces, amenities, and photo gallery.',
  keywords: [
    'Breakwater Villa',
    'Breakwater Villa Paradise Island',
    'Paradise Island luxury villa',
    'Bahamas luxury villa rental',
    'Ocean Club Estates villa',
    'Paradise Island vacation rental',
    '6 bedroom villa Bahamas',
    'luxury villa Paradise Island',
  ],
  alternates: {
    canonical: '/villa-gallery',
  },
  openGraph: {
    title: 'The Villa & Gallery | Breakwater Villa | Paradise Island, Bahamas',
    description:
      'Step inside Breakwater Villa, a private 6-bedroom luxury residence in Ocean Club Estates, Paradise Island. Explore the interiors, outdoor spaces, and villa gallery.',
    url: '/villa-gallery',
    siteName: 'Breakwater Villa',
    type: 'website',
    images: [
      {
        url: '/images/home/villa-intro.jpg',
        width: 1200,
        height: 800,
        alt: 'Breakwater Villa in Paradise Island, Bahamas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Villa & Gallery | Breakwater Villa',
    description:
      'Explore the spaces and details of Breakwater Villa in Paradise Island, Bahamas.',
    images: ['/images/home/villa-intro.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VillaGalleryPage() {
  return (
    <main>
      <GalleryHero />
      <ResidenceIntro />
      <GalleryMarquee />
      <FinalBookingCTA />
    </main>
  );
}
