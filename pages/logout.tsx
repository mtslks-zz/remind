import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
// import { BrowserRouter as Router, useHistory } from 'react-router-dom';
// import Header from '../components/Header';
import Layout from '../components/Layout';
import { pageContainer } from '../styles/styles';
import { deleteSessionByToken } from '../util/database';

type LogoutProps = {
  refreshUsername: () => void;
  username?: string;
};

export default function Logout(props: LogoutProps) {
  useEffect(() => props.refreshUsername(), [props]);
  // const history = useHistory();

  // setTimeout(() => {
  //   history.push('/');
  // }, 3000);

  return (
    <Layout username={props.username}>
      <Head>
        <title>Logged out successfully</title>
      </Head>

      <div>
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
