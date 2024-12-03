import type { Metadata } from 'next';
// eslint-disable-next-line camelcase
import { JetBrains_Mono } from "next/font/google";
import '@frontend/styles/global.scss';
import "@radix-ui/themes/styles.css";
import { ReactNode } from 'react';
import { Toaster } from "sonner";
import { Theme } from "@radix-ui/themes";

export const jetbrains = JetBrains_Mono({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
     <body>
        <div className="app">
          <Toaster position="bottom-center" />
          <Theme
            appearance="dark"
            scaling="100%"
            accentColor="iris"
            radius="small"
          >
            {children}
          </Theme>
          <Footer />
        </div>
      </body>    </html>
  );
}