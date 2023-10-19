import "@/styles/tailwind.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/nextAuth/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinCash | Landing Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
