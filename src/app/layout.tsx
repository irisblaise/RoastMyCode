import type { Metadata } from "next";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./globals.css";


export const metadata: Metadata = {
  title: "RoastMyCode",
  description: "Get your code roasted by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen bg-gray-50 flex flex-col`}>
        <Navigation />
        <main className="py-12 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
