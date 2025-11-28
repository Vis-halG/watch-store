import './globals.css';
import Header from '@/components/Header';
import { CartProvider } from '@/components/CartContext';

export const metadata = {
  title: 'Watch Store',
  description: 'Mobile watch store with Supabase',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="container">
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
