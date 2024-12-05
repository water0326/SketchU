import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./_components/navigation";
import { IBMPlexSans } from "./utils/font";

export const metadata: Metadata = {
  title: "Sketch U",
  description: "Sketch your roadmap",
  icons: {
    icon: "/cat.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={IBMPlexSans.className}>
          <div className="wrapper">
            <Navigation></Navigation>
            <div className="page">
              <div className="innerContainer">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
