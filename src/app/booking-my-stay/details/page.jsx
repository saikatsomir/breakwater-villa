import { Suspense } from 'react';
import BookingDetailsForm from './BookingDetailsForm';

export const metadata = {
  title: 'Guest Details | Breakwater Villa | Paradise Island, Bahamas',
  description:
    'Provide your contact details and reservation preferences to continue planning your stay at Breakwater Villa in Paradise Island, Bahamas.',
};

export default function BookingDetailsPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white" />}>
      <BookingDetailsForm />
    </Suspense>
  );
}
