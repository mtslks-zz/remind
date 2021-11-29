import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import {
  buttonContainer,
  buttonStylesStandard,
  headingStyle,
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

        <div css={pageContainer}>
          <div css={heroSectionHeadingImageContainer}>
            <div css={heroSectionHeading}>
              <div css={headingStyle}>
                <h1 className="header1-text">Mindfulness Made Easy.</h1>
                <div>
                  <a className="paragraph-text">
                    The <strong>(re)mind</strong> tracker is the easiest way to
                    achieve a more mindful state. <br />
                    Your daily progress, tracked in just 3 easy steps.
                  </a>
                </div>
                <p />
                <div>
                  <a className="paragraph-text">
                    Reflecting on mood, goals and gratitude has never been
                    easier. Start now!
                  </a>
                </div>
                <div css={buttonContainer}>
                  {props.username ? (
                    <div css={buttonContainer}>
                      <div>
                        <Link href="/dashboard">
                          <a css={buttonStylesStandard}>Dashboard</a>
                        </Link>
                      </div>
                      <div>
                        <Link href="/dashboard#tiles">
                          <a css={buttonStylesStandard}>My Entries</a>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div css={buttonContainer}>
                      <div>
                        <Link href="/register">
                          <a css={buttonStylesStandard}>Sign Up</a>
                        </Link>
                      </div>
                      <div>
                        <Link href="/login">
                          <a css={buttonStylesStandard}>Login</a>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
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
        </div>
      </>
    </Layout>
  );
}
