import './global.css';

export const metadata = {
  title: 'Tabletop One Shot Generator',
  description: 'An AI-Powered tool that helps generate a tabletop one-shot game content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
