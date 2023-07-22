
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Header from "./components/Header";
// import "node_modules/react-modal-video/css/modal-video.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sismo Connect Offchain Starter",
  description: "A starter Next.js repository for Sismo Connect offchain apps",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />

      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          {/* <Footer /> */}
          {/* <ScrollToTop /> */}
        </Providers>
      </body>
    </html >
  );
}
