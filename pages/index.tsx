import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import {
  buttonContainer,
  headingStyle,
  heroSection,
  heroSectionHeading,
  heroSectionHeadingImageContainer,
  heroSectionImage,
} from '../styles/styles';

type Props = {
  username?: string;
};

export default function Home(props: Props) {
  return (
    <>
      <Head>
        <title>Welcome to (re)mind</title>
        <meta name="description" content="Mindfulness Tracker by (re)mind" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header username={props.username} />
      <section css={heroSection}>
        <div css={heroSectionHeadingImageContainer}>
          <div css={heroSectionHeading}>
            <div css={headingStyle}>
              <h1>Mindfulness Made Easy.</h1>
              <h3>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam.
              </h3>
              <div css={buttonContainer}>
                {props.username ? (
                  <Link href="/dashboard">
                    <a className="button-default">Go To My Dashboard</a>
                  </Link>
                ) : (
                  <Link href="/register">
                    <a className="button-default">Sign Up</a>
                  </Link>
                  // <Link href="/register">
                  //   <a className="button-default">Sign Up</a>
                  // </Link>
                )}
              </div>
            </div>
          </div>
          <div css={heroSectionImage}>
            <img src="./images/A-Human/hero_sitting.svg" alt="Person sitting" />
          </div>
        </div>
      </section>
    </>
  );
}
