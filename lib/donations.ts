// Single source for the association's donation details (used on /doneaza).
export const bankDetails = {
  bank: "Banca Transilvania",
  swift: "BTRLRO22",
  holder: "ASOCIATIA 5 SOLA",
  accounts: [
    { currency: "RON", iban: "RO75BTRLRONCRT0CO9567401" },
    { currency: "EUR", iban: "RO22BTRLEURCRT0CO9567401" },
    { currency: "USD", iban: "RO34BTRLUSDCRT0CO9567401" },
  ],
};

export const stripeDonationLinks = [
  { currency: "RON", url: "https://donate.stripe.com/5kAbJ80h2cjM9oY289" },
  { currency: "USD", url: "https://donate.stripe.com/3cIdR9aZBgqU9Y03SReAg0a" },
];
