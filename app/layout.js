import {Inter} from 'next/font/google'
import "./globals.css";
export const metadata = {
  title: "Schedulr",
  description: "Meeting Scheduling App",
};
const inter = Inter({subsets:["latin"]})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
