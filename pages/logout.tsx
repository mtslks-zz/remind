import { css } from '@emotion/react';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { pageContainer } from '../styles/styles';
import { deleteSessionByToken } from '../util/database';

type Props = {
  refreshUsername: () => void;
  username?: string;
};

const imageContainer = css`
  height: 50%;
  width: 50%;

  img {
    width: 100%;
  }
`;

export default function Logout(props: Props) {
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
  const sessionToken = context.req.cookies.sessionToken;

  if (sessionToken) {
    await deleteSessionByToken(sessionToken);
  }

  // delete cookie from browser again after logout
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
