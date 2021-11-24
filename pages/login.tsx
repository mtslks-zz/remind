import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
// import Header from '../components/Header';
import Layout from '../components/Layout';
import { inputFormStyle, wrapper } from '../styles/styles';
import { getValidSessionByToken } from '../util/database';
import { LoginResponse } from './api/login';

type Props = {
  refreshUsername: () => void;
  username?: string;
};

const loginButton = css`
  .button {
    padding: 6px 24px;
    background: linear-gradient(
      135deg,
      rgba($left-color, 0.9),
      rgba($right-color, 0.9)
    );
    border-radius: 20px;
    cursor: pointer;
    width: fill;
    :hover {
      background-color: #9ac0cd;
    }

  @media (max-width: 1125px) {
    width: 140px;
    margin: 12px;
    text-align: center;
    padding: 6px 12px;
  }
`;

/* const formContainer = css`
  display: flex;
  box-shadow: 0 7px 17px rgb(0 0 0 / 13%);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 25vw;
  border-radius: 12px;
  border: none;
  padding: 30px;
  height: 100%;

  @media (max-width: 1125px) {
    width: 140px;
    margin: 12px;
    text-align: center;
    padding: 6px 12px;
  }
`; */

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
      <>
        <Head>
          <title>(re)mind Login</title>
        </Head>
        <div>
          <div css={wrapper}>
            <div css={inputFormStyle}>
              <h2>Login to (re)mind</h2>

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
                  router.push(`/dashboard`);
                }}
              >
                <div>
                  <label>
                    Username:{' '}
                    <input
                      value={username}
                      placeholder=""
                      onChange={(event) => {
                        setUsername(event.currentTarget.value);
                      }}
                    />
                  </label>
                </div>
                <div> </div>
                <div>
                  <label>
                    Password:{' '}
                    <input
                      value={password}
                      type="password"
                      required
                      placeholder=""
                      onChange={(event) => {
                        setPassword(event.currentTarget.value);
                      }}
                    />
                  </label>
                  <div css={errorMessage}>{error}</div>
                </div>{' '}
                <button css={loginButton}>Login</button>
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
      </>
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
        destination: `/dashboard`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
