import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { CustomPageComponent } from '@/types/global';
import { NotificationProvider } from '@/context/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '../components/Layout';
import Head from '../components/Head';
import { Inter } from 'next/font/google';
import TagManager from 'react-gtm-module';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

const tagManagerArgs = {
    gtmId: 'GTM-TRDF3LTP',
};

const queryClient = new QueryClient();

function BuonoEmail({ Component, pageProps }: AppProps) {
    const CustomComponent = Component as CustomPageComponent;
    useEffect(()=>{
        TagManager.initialize(tagManagerArgs);
    },[])
    return (
        <div className={`min-h-screen max-h-screen ${inter.className}`}>
            <Head />
            <NotificationProvider>
                <QueryClientProvider client={queryClient}>
                    {CustomComponent.noLayout ? (
                        <CustomComponent {...pageProps} />
                    ) : (
                        <Layout>
                            <CustomComponent {...pageProps} />
                        </Layout>
                    )}
                </QueryClientProvider>
            </NotificationProvider>
        </div>
    );

}

export default BuonoEmail;