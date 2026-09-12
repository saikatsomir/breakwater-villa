// src/lib/content/rates.js
export async function getRates() {
  // later: return fetch(`${process.env.CMS_API_URL}/rates`).then(r => r.json())
  return {
    seasons: [
      { label: 'Peak', range: 'Dec 15 – Jan 8', nightly: 17100 },
      { label: 'High', range: 'Jan 9 – Apr 14', nightly: 12300 },
      { label: 'Standard', range: 'Apr 15 – Dec 15', nightly: 10900 },
    ],
    vatPercent: 10,
    securityDeposit: 10000,
  };
}
