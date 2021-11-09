import '../styles/globals.css';
import { css, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState<string>();

  const refreshUsername = useCallback(async () => {
    const response = await fetch('/api/profile');
    const json = await response.json();

    if ('errors' in json) {
      return;
    }

    setUsername(json.user?.username);
  }, []);

  // Retrieve username information ONCE the first time
  // that a user loads the page
  useEffect(() => {
    refreshUsername();
  }, [refreshUsername]);

  return (
    <>
      <Global
        styles={css`
          *,
          *::after,
          *::before {
            box-sizing: border-box;
          }
          body {
            margin: 0;

            font-size: 15;
            color: #0000009e;
            width: 100%;
            height: 100vh;
            background-color: #ffffff;
          }

          h1,
          h2,
          h3 {
          }

          h1 {
            font-size: 4rem;
            line-height: 64px;

            font-weight: 600;
          }

          h2 {
            font-size: 1.7rem;
            font-weight: 500;
          }

          h3 {
            font-size: 1.3rem;
            line-height: 40px;
            font-weight: 300;
          }

          .button-general {
            padding: 12px 24px;
            background-color: #89c5cc;
            border-radius: 20px;
            border: none;
            cursor: pointer;
            color: white;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

            :hover {
              background-color: #70acb3;
            }
          }

          a {
            font-weight: 500;
          }

          .a-no-highlight-color {
            color: #89c5cc;
          }
        `}
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component
        refreshUsername={refreshUsername}
        username={username}
        {...pageProps}
      />
    </>
  );
}
