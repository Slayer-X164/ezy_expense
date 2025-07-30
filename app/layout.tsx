import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/redux/providers";
import { Toaster } from "react-hot-toast";
<<<<<<< HEAD

=======
import { SessionProvider } from "next-auth/react";
>>>>>>> auth
const robotoCondensed = Roboto_Condensed({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-robotoCondensed",
});
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "700"],
});
export const metadata: Metadata = {
  title: "EzyExpense – Modern Effortless Expense Tracker & Budget Manager",
  description:
    "EzyExpense helps you seamlessly track daily expenses, categorize spending, and manage budgets with a user-friendly interface. Visualize your finances, set saving goals, and gain actionable insights to take control of your money—anytime, anywhere.",
  keywords: [
    "expense tracker",
    "budget manager",
    "personal finance",
    "money management",
    "expense app",
    "budgeting",
    "finance tracker",
    "daily spending",
    "savings goals",
    "manage expenses",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.className} antialiased bg-neutral-950 text-neutral-50 box-border`}
      >
<<<<<<< HEAD
        
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Toaster/>
=======
        <SessionProvider>
          <Toaster />
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </SessionProvider>
>>>>>>> auth
      </body>

    </html>
  );
}
