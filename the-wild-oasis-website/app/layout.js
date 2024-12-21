import { Josefin_Sans } from "next/font/google"; // download the font from Google on the web server

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
}); // configure how the font should be implemented

import "@/app/_styles/globals.css";
import Header from "./_components/Header";

export const metadata = {
  title: {
    template: "The Wild Oasis - %s",
    default: "The Wild Oasis - Welcome",
  },
  description:
    "Luxurious cabin boutique located at the heart of the Italian Dolomites, surrounded by the beautiful mountains and the dark forests",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`relative grid grid-rows-[auto_1fr] bg-primary-950 text-primary-100 ${josefin.className} min-h-screen`}
      >
        <Header />
        <div className=" px-8 py-12 overflow-y-auto">
          <main className="max-w-7x  mx-auto h-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
