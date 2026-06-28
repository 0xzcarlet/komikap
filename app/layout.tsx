import './globals.css';
import type { Metadata } from 'next';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';

export const metadata: Metadata = {
  title: 'KomikKu - Baca Manga Gratis',
  description: 'Baca ribuan manga gratis dengan tampilan modern dan responsif. Update chapter terbaru setiap hari!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        <footer className="relative bg-purple-950 text-white py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-1">KomikKu</h3>
                <p className="text-white/80 text-sm">Baca manga gratis setiap hari</p>
              </div>
              <div className="text-center text-sm text-white/70">
                © {new Date().getFullYear()} KomikKu. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
        <ScrollToTop />
      </body>
    </html>
  );
}
