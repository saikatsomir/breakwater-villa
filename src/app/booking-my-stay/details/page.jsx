import { Suspense } from 'react';
import BookingDetailsForm from './BookingDetailsForm';

export const metadata = {
  title: 'Guest Details | 32 ocean | Paradise Island, Bahamas',
  description:
    'Provide your contact details and reservation preferences to continue planning your stay at 32 ocean in Paradise Island, Bahamas.',
};

export default function BookingDetailsPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white" />}>
      <BookingDetailsForm />
    </Suspense>
  );
}
