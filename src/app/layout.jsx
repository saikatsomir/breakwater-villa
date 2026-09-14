import { Newsreader, Instrument_Sans, Geist } from 'next/font/google';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { cn } from '../lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-sans',
});

export const metadata = {
  title: 'Breakwater Villa | Paradise Island, Bahamas',
  description: 'Luxury 6-bedroom villa rental in Ocean Club Estates.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn(
        newsreader.variable,
        instrumentSans.variable,
        'font-sans',
        geist.variable
      )}
    >
      <body>
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
