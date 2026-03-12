import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';

export function Layout() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full relative">
      <Header />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}