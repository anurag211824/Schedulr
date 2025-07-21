import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata = {
  title: "Schedulr",
  description: "Meeting Scheduling App",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* Header */}
          <Header />
          <main className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white">
            {children}
          </main>
          {/* Footer */}
          <footer className="bg-blue-100 py-12">
            <p className="conatiner mx-auto px-4 text-center text-gray-600">
              Made by Anurag
            </p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
