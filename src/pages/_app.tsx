import type { AppProps } from 'next/app';
import { CustomPageComponent } from '@/types/global';
import Layout from '../components/Layout';
import Head from '../components/Head';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

function BuonoEmail({ Component, pageProps }: AppProps) {
    const CustomComponent = Component as CustomPageComponent;
    return (
        <div className={`min-h-screen max-h-screen ${inter.className}`}>
            <Head />
            {CustomComponent.noLayout ? (
                <CustomComponent {...pageProps} />
            ) : (
                <Layout>
                    <CustomComponent {...pageProps} />
                </Layout>
            )}
        </div>
    );

}

export default BuonoEmail;