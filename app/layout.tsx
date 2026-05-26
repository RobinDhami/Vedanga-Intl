import './globals.css';
import type { Metadata } from 'next';
import { MainNav } from "@/components/main-nav";
import { School } from 'lucide-react';
import Link from 'next/link';
import NoticeOverlay from './components/NoticeOverlay';
import { Toaster } from 'sonner';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Vedanga International School',
  description: 'Excellence in Education since 2022',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <NoticeOverlay />
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center">
            <MainNav />
          </div>
        </nav>
        {children}
        <Toaster
          toastOptions={{
            style: {  }
          }}
          richColors />
        <Footer />
        <BackToTopButton/>
      </body>
    </html>
  );
}
