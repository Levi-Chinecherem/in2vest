import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata = {
  title: 'My Dapp',
  description: 'A beautiful, modern Web3 DApp',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
