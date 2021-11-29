import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import {
  buttonStylesStandard,
  heroSectionHeading,
  heroSectionHeadingImageContainer,
  heroSectionImage,
  inputFormStyle,
  newAccountStyle,
  pageContainer,
} from '../styles/styles';
import { generateCsrfSecretByToken } from '../util/auth';
import { RegisterResponse } from './api/register';

type Props = {
  refreshUsername: () => void;
  username?: string;
  csrfToken: string;
};

export default function Registration(props: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <Layout username={props.username}>
      <Head>
        <title>(re)mind | Registration</title>
      </Head>
      <section css={pageContainer}>
        <div css={heroSectionHeadingImageContainer}>
          <div css={heroSectionHeading}>
            <div css={inputFormStyle}>
              <h2>New (re)mind Account</h2>
              <p>
                <strong>Please register below:</strong>
              </p>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  const response = await fetch(`/api/register`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      firstName: firstName,
                      lastName: lastName,
                      username: username,
                      password: password,
                      email: email,
                      csrfToken: props.csrfToken,
                    }),
                  });
                  const registerJson =
                    (await response.json()) as RegisterResponse;

                  if ('errors' in registerJson) {
                    setError(registerJson.errors[0].message);
                    return;
                  }

                  props.refreshUsername();

                  // Navigate to success page after registration
                  router.push(`/register-success`);
                }}
              >
                <div>
                  <label>
                    Username
                    <input
                      value={username}
                      placeholder=""
                      onChange={(event) => {
                        setUsername(event.currentTarget.value);
                      }}
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Password
                    <input
                      value={password}
                      placeholder="min. 8 characters"
                      type="password"
                      minLength={8}
                      required
                      onChange={(event) => {
                        setPassword(event.currentTarget.value);
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Email
                    <input
                      value={email}
                      type="email"
                      required
                      placeholder=""
                      onChange={(event) => {
                        setEmail(event.currentTarget.value);
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    First Name (optional)
                    <input
                      value={firstName}
                      placeholder=""
                      onChange={(event) => {
                        setFirstName(event.currentTarget.value);
                      }}
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Last Name (optional)
                    <input
                      value={lastName}
                      placeholder=""
                      onChange={(event) => {
                        setLastName(event.currentTarget.value);
                      }}
                    />
                  </label>
                </div>

                <div
                  style={{
                    color: 'red',
                    fontStyle: 'italic',
                    paddingBottom: '12px',
                  }}
                >
                  {error}
                </div>
                <button css={buttonStylesStandard}>Sign Up</button>
                <p />
                <div css={newAccountStyle}>
                  {' '}
                  <Link href="/login">
                    <a>
                      <span>...or login here</span>
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div css={heroSectionImage}>
            <img
              src="./images/A-Human/register_flower.svg"
              alt="Plant in a vase"
            />
          </div>
        </div>
      </section>
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
        destination: `https://${context.req.headers.host}/register`,
        permanent: true,
      },
    };
  }

  const crypto = await import('node:crypto');

  const { createSerializedRegisterSessionTokenCookie } = await import(
    '../util/cookies'
  );

  const {
    insertFiveMinuteSessionWithoutUserId,
    deleteExpiredSessions,
    getValidSessionByToken,
  } = await import('../util/database');

  // Import and initialize the csrf library
  const tokensImport = await (await import('csrf')).default;
  const tokens = new tokensImport();

  // Get session information if user is already logged in
  const sessionToken = context.req.cookies.sessionToken;
  const session = await getValidSessionByToken(sessionToken);

  if (session) {
    // Redirect the user when they have a session
    // token by returning an object with the `redirect` prop
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  await deleteExpiredSessions();

  // 5-min registration session, user needs to complete within 5min
  const shortLivedSession = await insertFiveMinuteSessionWithoutUserId(
    crypto.randomBytes(64).toString('base64'),
  );

  // Set new cookie for short-lived session
  const cookie = createSerializedRegisterSessionTokenCookie(
    shortLivedSession.token,
  );
  context.res.setHeader('Set-Cookie', cookie);

  // Use token from short-lived session to generate secret for the CSRF token
  const csrfSecret = generateCsrfSecretByToken(shortLivedSession.token);

  // Create CSRF token to the props
  const csrfToken = tokens.create(csrfSecret);

  return {
    props: {
      // Pass CSRF Token via props
      csrfToken,
    },
  };
}
