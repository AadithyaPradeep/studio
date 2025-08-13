import type { Metadata } from 'next';
import { Figtree, Onest } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';

const fontSans = Figtree({ 
  subsets: ['latin'], 
  variable: '--font-sans',
});

const fontHeadline = Onest({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700', '900'],
});


export const metadata: Metadata = {
  title: 'DayFlow',
  description: 'A responsive daily planner app to organize your life.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", fontSans.variable, fontHeadline.variable)} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
