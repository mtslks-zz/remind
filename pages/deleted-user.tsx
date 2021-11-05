import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { pageContainer } from '../styles/styles';
import { deleteSessionByToken } from '../util/database';

type Props = {
  refreshUsername: () => void;
  username?: string;
};

export default function UserDeleted(props: Props) {
  useEffect(() => props.refreshUsername(), [props]);
  return (
    <Layout username={props.username}>
      <Head>
        <title>User deleted</title>
      </Head>
      <div css={pageContainer}>
        <h2>Your account has been deleted successfully.</h2>
        <h3>We hope to see you soon again!</h3>
        <Link href="/register">
          <a className="button-default">Sign Up Again</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const sessionToken = context.req.cookies.sessionToken;

  if (sessionToken) {
    await deleteSessionByToken(sessionToken);
  }

  // deleting cookie from the browser
  context.res.setHeader(
    'Set-Cookie',
    cookie.serialize('sessionToken', '', {
      maxAge: -1,
      path: '/',
    }),
  );

  return {
    props: {},
  };
}
