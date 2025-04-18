import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Inter } from 'next/font/google';
import '../styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tarayıcı Beni Nasıl Tanıyor? | Browser Footprint Viewer',
  description: 'Tarayıcınızın sizin hakkınızda ne kadar bilgi topladığını keşfedin. Dijital parmak izinizi öğrenin ve gizliliğinizi koruyun.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
