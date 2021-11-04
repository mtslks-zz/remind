import Head from 'next/head';
import Layout from '../components/Layout';
import { pageContainer } from '../styles/styles';

export default function Error(props) {
  return (
    <Layout username={props.username}>
      <Head>
        <title>Page not found</title>
      </Head>
      <div css={pageContainer}>
        <h2>Error 404 - not found</h2>
      </div>
    </Layout>
  );
}
