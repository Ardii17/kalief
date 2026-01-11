import "./globals.css";
import { Alice } from "next/font/google";
import { ReactLenis } from "lenis/react";

// --- SETUP FONT ALICE ---
const alice = Alice({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Kalief",
  description: "Undangan Khitanan Kalief",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${alice.className} antialiased`}>
        <ReactLenis
          root
          options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}
        >
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
