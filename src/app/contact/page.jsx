import ContactHero from './ContactHero';
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact 32 ocean | Paradise Island, Bahamas',
  description:
    'Contact 32 ocean in Paradise Island, Bahamas. Get in touch with our team about the villa, amenities, location, or your stay.',
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
    </main>
  );
}
