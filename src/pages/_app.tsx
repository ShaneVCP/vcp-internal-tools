// pages/_app.tsx
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/navbar';
import '../styles/globals.css';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  useEffect(() => {
    hotjar.initialize(3902622, 6);
  }, [])

  return (
    <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
