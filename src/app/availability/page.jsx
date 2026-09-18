import AvailabilityBanner from './AvailabilityBanner';
import AvailabilityCalendar from './AvailabilityCalendar';

export const metadata = {
  title: 'Availability | 32 ocean',
  description: 'Check availability and seasonal rates for 32 ocean.',
};

export default function AvailabilityPage() {
  return (
    <main>
      <AvailabilityBanner />
      <AvailabilityCalendar />
    </main>
  );
}
