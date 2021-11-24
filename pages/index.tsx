import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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

type Props = {
  username?: string;
};

export default function Home(props: Props) {
  return (
    <Layout username={props.username}>
      <>
        <Head>
          <title>Welcome to (re)mind</title>
          <meta name="description" content="Mindfulness Tracker by (re)mind" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section css={pageContainer}>
          <div css={heroSectionHeadingImageContainer}>
            <div css={heroSectionHeading}>
              <div css={headingStyle}>
                <h1 className="header1-text">Mindfulness Made Easy.</h1>
                <p className="paragraph-text">
                  <strong>(re)mind</strong> is the easy way to experience more
                  Zen in your life.
                </p>
                <p className="paragraph-text">
                  Simply login on a daily basis to reflect on your mood, daily
                  goals, and gratefulness. Track your progress over time and
                  (re)mind yourself of good days.
                </p>
                <div css={buttonContainer}>
                  {props.username ? (
                    <Link href="/dashboard">
                      <a css={buttonStylesStandard}>My Dashboard</a>
                    </Link>
                  ) : (
                    <Link href="/register">
                      <a css={buttonStylesStandard}>Sign Up</a>
                    </Link>
                  )}
                </div>{' '}
              </div>
            </div>
            <div css={heroSectionImage}>
              <Image
                src="/images/A-Human/hero_sitting.svg"
                alt="Person sitting"
                width="300px"
                height="500px"
              />
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
}
