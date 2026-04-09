import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Pulse',
  description: 'Posicionamento estratégico para marcas premium',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3B7KRMX8D6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3B7KRMX8D6');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}