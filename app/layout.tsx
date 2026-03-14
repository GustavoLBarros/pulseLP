import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}