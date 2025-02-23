import type { AppProps } from 'next/app';
import { CustomPageComponent } from '@/types/global';
import Layout from '../components/Layout';
import Head from '../components/Head';
import '../styles/globals.css';

function BuonoEmail({ Component, pageProps }: AppProps) {
    const CustomComponent = Component as CustomPageComponent;

    if (CustomComponent.noLayout) {
        return (
            <>
                <Head />
                <CustomComponent {...pageProps} />
            </>
        );
    }
    return (
        <>
            <Head />
            <Layout>
            <CustomComponent {...pageProps} />
            </Layout>
        </>
    );

}

export default BuonoEmail;