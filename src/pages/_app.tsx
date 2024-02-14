// pages/_app.tsx
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
