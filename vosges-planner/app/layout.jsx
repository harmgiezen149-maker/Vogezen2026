import './globals.css';

export const metadata = {
  title: 'Vosges Planner',
  description: 'Plan your Vosges trip',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
