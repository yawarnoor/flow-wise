import { Nunito, Nunito_Sans } from 'next/font/google'
import clsx from "clsx";
import "./globals.css";
import { createClient } from "../../flow-wise/src/prismicio";
import type { Metadata, ResolvingMetadata } from 'next'

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito-sans',
})

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("settings");

  return {
    title: page.data.site_title,
    description: page.data.meta_description,
    openGraph: {
      images: [page.data.og_image.url || "" ],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(nunito.variable, nunitoSans.variable)}>
      <body>
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
