// built-in imports
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// internal imports
import './globals.css';
import { CellChangeContextProvider } from './context/cell.context';
import StyledComponentsRegistry from './registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Collaborative List',
  description: 'It is designed to scale to thousands of rows!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <CellChangeContextProvider>{children}</CellChangeContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
