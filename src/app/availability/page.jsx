import AvailabilityBanner from './AvailabilityBanner';
import AvailabilityCalendar from './AvailabilityCalendar';

export const metadata = {
  title: 'Availability | Breakwater Villa',
  description: 'Check availability and seasonal rates for Breakwater Villa.',
};

export default function AvailabilityPage() {
  return (
    <main>
      <AvailabilityBanner />
      <AvailabilityCalendar />
    </main>
  );
}
