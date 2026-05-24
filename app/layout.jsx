import './globals.css';

export const metadata = {
  title: 'Vosges 2026 — Familie Planner',
  description: 'Vakantieplanner voor Domaine des Messires, 25 juli — 7 augustus 2026',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
