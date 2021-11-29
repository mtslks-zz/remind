import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
// import { BrowserRouter as Router, useHistory } from 'react-router-dom';
// import Header from '../components/Header';
import Layout from '../components/Layout';
import {
  buttonContainer,
  buttonStylesStandard,
  headingStyle,
  heroSection,
  heroSectionHeading,
  heroSectionHeadingImageContainer,
  heroSectionImage,
  pageContainer,
} from '../styles/styles';
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
        <title>(re)mind | Logged out successfully</title>
      </Head>

      <section css={pageContainer}>
        <div css={heroSectionHeadingImageContainer}>
          <div css={heroSectionHeading}>
            <div css={headingStyle}>
              <h1 className="header1-text">You have been logged out.</h1>
              <p className="paragraph-text">Thank you for using (re)mind.</p>
              <div css={buttonContainer}>
                <div css={buttonContainer}>
                  <div>
                    <Link href="/">
                      <a css={buttonStylesStandard}>Back to Main</a>
                    </Link>
                  </div>
                  <div>
                    <Link href="/login">
                      <a css={buttonStylesStandard}>Login Again</a>
                    </Link>
                  </div>
                </div>
              </div>{' '}
            </div>
          </div>
          <div css={heroSectionImage}>
            <img
              src="/images/A-Human/logout_sitting.svg"
              alt="Person sitting"
              width="300px"
              height="500px"
            />
          </div>
        </div>
      </section>
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
