import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'GhostPilot AI — Autonomous Browser Co-Pilot',
  description: 'A futuristic AI-native browser co-pilot showcase MVP for smart web workflow automation.',
  keywords: ['AI agent', 'browser automation', 'co-pilot', 'workflow automation', 'Xiaomi MiMo Orbit'],
  openGraph: {
    title: 'GhostPilot AI',
    description: 'Turn any website into an AI-operated workspace.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable}`}>
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
