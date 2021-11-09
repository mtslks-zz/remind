import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import {
  buttonContainer,
  imageContainer,
  inputFormStyle,
  pageContainer,
  wrapper,
} from '../styles/styles';
import { getValidSessionByToken } from '../util/database';
import { LoginResponse } from './api/login';

type Props = {
  refreshUsername: () => void;
  username?: string;
};

const newAccountStyle = css`
  text-align: center;
  .span {
    font-size: 8px;
  }
`;

const errorMessage = css`
  color: #ed0404;
  padding-bottom: 15px;
`;

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <Layout username={props.username}>
      <Head>
        <title>(re)mind Login</title>
      </Head>
      <div css={pageContainer}>
        <div css={wrapper}>
          <div css={inputFormStyle}>
            <h2>Welcome back!</h2>
            <h3>Login to start tracking</h3>

            <form
              onSubmit={async (event) => {
                event.preventDefault();

                // Send the username and password to the API for verification
                const response = await fetch(`/api/login`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: username,
                    password: password,
                  }),
                });

                const json = (await response.json()) as LoginResponse;

                if ('errors' in json) {
                  setError(json.errors[0].message);
                  return;
                }

                props.refreshUsername();

                // Navigate to the user's page when account has been successfully created
                router.push(`/users/${json.user.username}`);
              }}
            >
              <div>
                <label>
                  Username:
                  <input
                    value={username}
                    placeholder="Enter your (re)mind username"
                    onChange={(event) => {
                      setUsername(event.currentTarget.value);
                    }}
                  />
                </label>
              </div>

              <div>
                <label>
                  Password:
                  <input
                    value={password}
                    type="password"
                    required
                    placeholder="Enter your password"
                    onChange={(event) => {
                      setPassword(event.currentTarget.value);
                    }}
                  />
                </label>
                <div css={errorMessage}>{error}</div>
              </div>
              <button className="button-general">Login</button>
            </form>
            <br />
            <div css={newAccountStyle}>
              {' '}
              <Link href="/register">
                <a>
                  <span>...or create a new account</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }

  // get the session token from cookie
  const sessionToken = context.req.cookies.sessionToken;

  const session = await getValidSessionByToken(sessionToken);
  // if the session is undefined, we allow the person to log in because they don't have a valid session
  // but if they DO have a valid session, we redirect them
  if (session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: `/tiles/start`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
