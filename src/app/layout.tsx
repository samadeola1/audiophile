import type { Metadata } from "next";
import { Manrope } from "next/font/google"; // Import the Manrope font
import "./globals.css";
import "animate.css"; // Import Animate.css
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";

// Configure the Manrope font
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Load the weights you need
  variable: "--font-manrope", // Set up a CSS variable
});

export const metadata: Metadata = {
  title: "Audiophile E-commerce",
  description: "Pixel-perfect e-commerce build from Frontend Mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply the font variable to the body.
        This makes Manrope the default font for the entire app.
      */}
      <body className={`${manrope.variable} font-sans bg-white`}>
        {/* Header is now included on all pages */}
        <Header />
        
        {/* Set main to overflow-x-hidden to prevent horizontal scroll
          that can be caused by some animations or full-bleed elements
        */}
        <main className="overflow-x-hidden">{children}</main>
        
        {/* Footer is now included on all pages */}
        <Footer />
      </body>
    </html>
  );
}

