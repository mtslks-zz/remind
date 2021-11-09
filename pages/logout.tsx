import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { pageContainer } from '../styles/styles';
import { deleteSessionByToken } from '../util/database';

type LogoutProps = {
  refreshUsername: () => void;
  username?: string;
};

export default function Logout(props: LogoutProps) {
  useEffect(() => props.refreshUsername(), [props]);
  return (
    <Layout username={props.username}>
      <Head>
        <title>Logout page</title>
      </Head>
      <div css={pageContainer}>
        <h2>You have successfully logged out.</h2>
        <h3>We hope to see you soon again!</h3>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { serialize } = await import('cookie');

  const sessionToken = context.req.cookies.sessionToken;

  if (sessionToken) {
    await deleteSessionByToken(sessionToken);
  }

  // delete cookie from browser again after logout
  context.res.setHeader(
    'Set-Cookie',
    serialize('sessionToken', '', {
      maxAge: -1,
      path: '/',
    }),
  );

  return {
    props: {},
  };
}
