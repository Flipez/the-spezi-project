import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>The Spezi Project</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
