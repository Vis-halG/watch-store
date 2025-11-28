"use client";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />

          <div style={{ overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ x: 80, opacity: 0 }}        // PAGE ENTERS from right
                animate={{ x: 0, opacity: 1 }}         // PAGE stays centered
                exit={{ x: -80, opacity: 0 }}          // PAGE EXITS to left
                transition={{
                  duration: 0.28,
                  ease: [0.22, 1, 0.36, 1],            // iOS–style spring ease
                }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
