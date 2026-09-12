import ContactHero from './ContactHero';
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact Breakwater Villa | Paradise Island, Bahamas',
  description:
    'Contact Breakwater Villa in Ocean Club Estates, Paradise Island, Bahamas. Get in touch with our team about the villa, amenities, location, or your stay.',
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
    </main>
  );
}
