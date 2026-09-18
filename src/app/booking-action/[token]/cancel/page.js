'use client';

import { useEffect, useState } from 'react';

export default function CancelBookingPage({ params }) {
  const [token, setToken] = useState(null);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadBooking() {
      try {
        const resolvedParams = await params;
        const currentToken = resolvedParams.token;

        setToken(currentToken);

        const response = await fetch(`/api/bookings/${currentToken}/details`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load booking details.');
        }

        setBooking(data.booking);
      } catch (error) {
        console.error('Load booking error:', error);

        setError(error.message || 'Unable to load booking details.');
      } finally {
        setLoading(false);
      }
    }

    loadBooking();
  }, [params]);

  async function handleCancel() {
    if (!token) return;

    setCancelling(true);
    setError('');

    try {
      const response = await fetch(`/api/bookings/${token}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to cancel booking.');
      }

      setBooking(data.booking);
      setSuccess(true);
    } catch (error) {
      console.error('Cancel booking error:', error);

      setError(error.message || 'Unable to cancel booking.');
    } finally {
      setCancelling(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f5f0] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm tracking-[0.18em] uppercase text-neutral-500">
            32 ocean
          </p>

          <p className="mt-4 text-lg text-neutral-800">
            Loading booking details...
          </p>
        </div>
      </main>
    );
  }

  if (error && !booking) {
    return (
      <main className="min-h-screen bg-[#f7f5f0] flex items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm md:p-12">
          <p className="text-sm tracking-[0.18em] uppercase text-neutral-500">
            32 ocean
          </p>

          <h1 className="mt-6 text-3xl font-light text-neutral-900">
            Unable to Process Booking
          </h1>

          <p className="mt-4 leading-7 text-neutral-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] mt-20 sm:mt-40  px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
          <div className="text-center">
            <p className="text-sm tracking-[0.18em] uppercase text-neutral-500">
              32 ocean
            </p>

            {success ? (
              <>
                <h1 className="mt-6 text-3xl font-light text-neutral-900 md:text-4xl">
                  Booking Cancelled
                </h1>

                <p className="mx-auto mt-4 max-w-lg leading-7 text-neutral-600">
                  This reservation has been successfully cancelled. The selected
                  dates remain available for future reservations.
                </p>
              </>
            ) : (
              <>
                <h1 className="mt-6 text-3xl font-light text-neutral-900 md:text-4xl">
                  Cancel Booking
                </h1>

                <p className="mx-auto mt-4 max-w-lg leading-7 text-neutral-600">
                  Please review the reservation details below before cancelling
                  this booking.
                </p>
              </>
            )}
          </div>

          {booking && (
            <div className="mt-10 border-y border-neutral-200 py-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs tracking-[0.16em] uppercase text-neutral-400">
                    Guest
                  </p>

                  <p className="mt-2 text-base text-neutral-900">
                    {booking.firstName} {booking.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-xs tracking-[0.16em] uppercase text-neutral-400">
                    Status
                  </p>

                  <p className="mt-2 text-base text-neutral-900">
                    {booking.status}
                  </p>
                </div>

                <div>
                  <p className="text-xs tracking-[0.16em] uppercase text-neutral-400">
                    Check-in
                  </p>

                  <p className="mt-2 text-base text-neutral-900">
                    {new Date(booking.checkIn).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-xs tracking-[0.16em] uppercase text-neutral-400">
                    Check-out
                  </p>

                  <p className="mt-2 text-base text-neutral-900">
                    {new Date(booking.checkOut).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && booking && !success && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700">
              {error}
            </div>
          )}

          {!success && booking?.status === 'PENDING' && (
            <div className="mt-8">
              <p className="text-center text-sm leading-6 text-neutral-500">
                Are you sure you want to cancel this reservation?
              </p>

              <button
                type="button"
                onClick={handleCancel}
                disabled={cancelling}
                className="mt-5 w-full rounded-full bg-neutral-900 px-6 py-4 text-sm tracking-[0.12em] uppercase text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelling ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            </div>
          )}

          {success && (
            <div className="mt-8 text-center">
              <p className="text-sm leading-6 text-neutral-500">
                You can close this page. No further action is required.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
