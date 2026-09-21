import type { Metadata } from 'next';
import { Barlow, Instrument_Serif, Manrope } from 'next/font/google';
import './site.css';

export const dynamic = 'force-static';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: '400',
});

const barlow = Barlow({
  variable: '--font-barlow',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Lauren Luo — Marketing & AI Designer',
  description:
    'Selected marketing, growth, brand and AI-assisted creative work by Lauren Luo.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${instrument.variable} ${barlow.variable}`}>
        {children}
      </body>
    </html>
  );
}
