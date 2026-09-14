import Hero from './components/home/Hero';
import VillaIntro from './components/home/VillaIntro';
import Highlights from './components/home/Highlights';
import BreakwaterExperience from './components/home/BreakwaterExperience';
import VillaGalleryShowcase from './components/home/VillaGalleryShowcase';
import Rates from './components/home/Rates';
import FAQ from './components/home/FAQ';
import FinalBookingCTA from './components/home/FinalBookingCTA';

export default function Home() {
  return (
    <main>
      <Hero />

      <VillaIntro />

      <Highlights />

      <VillaGalleryShowcase />
      {/* <section id="villa-experience"> */}
      <BreakwaterExperience />
      {/* </section> */}

      {/* <section id="pricing"> */}
      <Rates />
      {/* </section> */}

      <section id="faq">
        <FAQ />
      </section>

      <FinalBookingCTA />
    </main>
  );
}
