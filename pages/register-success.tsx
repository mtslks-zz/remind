import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { pageContainer } from '../styles/styles';

type Props = {
  username?: string;
};

const contentContainer = css`
  display: flex;
  flex-direction: row;
  padding-bottom: 92px;

  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

const containerLeft = css`
  width: 65%;
  margin-right: 24px;

  @media (max-width: 450px) {
    width: 100%;
  }

  h3 {
    margin-bottom: 64px;
  }

  .button-default {
    font-size: 1.3rem;
    margin-right: 24px;
    display: inline-block;

    @media (max-width: 768px) {
      margin-right: 12px;
    }

    @media (max-width: 450px) {
      margin-right: 12px;
      margin-bottom: 12px;
      width: 200px;
    }
  }
`;

export default function RegistrationSuccessful(props: Props) {
  return (
    <Layout username={props.username}>
      <Head>
        <title>(re)mind Registration Successful</title>
      </Head>
      <div css={pageContainer}>
        <h2>Welcome! </h2>
        <div css={contentContainer}>
          <div css={containerLeft}>
            <h3>You’ve successfully created your account, {props.username}!</h3>

            <Link href="/dashboard">
              <a data-cy="go-to-dashboard" className="button-default">
                {' '}
                Go to dashboard
              </a>
            </Link>
            <Link href="/tiles/start">
              <a
                data-cy="registration-successful-create-entry"
                className="button-default"
              >
                Create first entry
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
