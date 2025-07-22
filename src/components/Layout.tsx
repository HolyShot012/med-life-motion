import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ChatWidget } from './ChatWidget';
import { ThemeProvider } from './ThemeProvider';

export const Layout = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </ThemeProvider>
  );
};