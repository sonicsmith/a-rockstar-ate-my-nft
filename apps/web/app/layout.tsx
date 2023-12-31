import "./globals.css";
import "nes.css/css/nes.min.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import { Providers } from "./providers";
import { Header } from "./components/Header";
import { Dialog } from "./components/Dialog";
import { MainView } from "./components/MainView";

const font = Press_Start_2P({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A Rockstar Ate My NFT",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <Dialog />
          <Header />
          <div className="container mx-auto p-8 flex justify-center">
            <MainView>{children}</MainView>
          </div>
        </Providers>
      </body>
    </html>
  );
}
