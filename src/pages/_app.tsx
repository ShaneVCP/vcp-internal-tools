// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/navbar';

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
