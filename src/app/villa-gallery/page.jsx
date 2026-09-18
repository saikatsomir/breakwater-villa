import GalleryHero from './GalleryHero';
import ResidenceIntro from './ResidenceIntro';
import GalleryMarquee from './GalleryMarquee';
import FinalBookingCTA from '../components/home/FinalBookingCTA';

export const metadata = {
  title: 'The Villa & Gallery | 32 ocean | Paradise Island, Bahamas',
  description:
    'Explore 32 ocean, a private 6-bedroom luxury villa  on Paradise Island, Bahamas. Discover the villa interiors, outdoor spaces, amenities, and photo gallery.',
  keywords: [
    '32 ocean',
    '32 ocean Paradise Island',
    'Paradise Island luxury villa',
    'Bahamas luxury villa rental',
    'Paradise Island vacation rental',
    '6 bedroom villa Bahamas',
    'luxury villa Paradise Island',
  ],
  alternates: {
    canonical: '/villa-gallery',
  },
  openGraph: {
    title: 'The Villa & Gallery | 32 ocean | Paradise Island, Bahamas',
    description:
      'Step inside 32 ocean, a private 6-bedroom luxury residence in  Paradise Island. Explore the interiors, outdoor spaces, and villa gallery.',
    url: '/villa-gallery',
    siteName: '32 ocean',
    type: 'website',
    images: [
      {
        url: '/images/home/villa-intro.jpg',
        width: 1200,
        height: 800,
        alt: '32 ocean in Paradise Island, Bahamas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Villa & Gallery | 32 ocean',
    description:
      'Explore the spaces and details of 32 ocean in Paradise Island, Bahamas.',
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
      <section id="scroll-indicator-gallery">
        <ResidenceIntro />
      </section>
      <GalleryMarquee />
      <FinalBookingCTA />
    </main>
  );
}
