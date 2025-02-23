import type { AppProps } from 'next/app';
import { CustomPageComponent } from '@/types/global';
import Layout from '../components/Layout';
import '../styles/globals.css';

function BuonoEmail({ Component, pageProps }: AppProps) {
    const CustomComponent = Component as CustomPageComponent;

    if (CustomComponent.noLayout) {
        return <CustomComponent {...pageProps} />;
    }
    return (
        <Layout>
        <CustomComponent {...pageProps} />
        </Layout>
    );

}

export default BuonoEmail;