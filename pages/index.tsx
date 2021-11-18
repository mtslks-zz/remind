import Head from 'next/head';
import Link from 'next/link';
// import Header from '../components/Header';
import Layout from '../components/Layout';
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
    <Layout username={props.username}>
      <>
        <Head>
          <title>Welcome to (re)mind</title>
          <meta name="description" content="Mindfulness Tracker by (re)mind" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section css={heroSection}>
          <div css={heroSectionHeadingImageContainer}>
            <div css={heroSectionHeading}>
              <div css={headingStyle}>
                <h1 className="header1-text">Mindfulness Made Easy.</h1>
                <p className="paragraph-text">
                  (re)mind is the only journaling app that will track your daily
                  mood in 3 easy steps.
                </p>
                <p className="paragraph-text">
                  Simply login on a daily basis to reflect on your mood, daily
                  goals, and gratefulness. Track your progress over time and
                  (re)mind yourself of good days.
                </p>
                <p className="paragraph-text">
                  <strong>Register now, it's 100% free!</strong>
                </p>
                <div css={buttonContainer}>
                  {props.username ? (
                    <Link href="/dashboard">
                      <a className="button-general">Go To My Dashboard</a>
                    </Link>
                  ) : (
                    <Link href="/register">
                      <a className="button-general">Sign Up</a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div css={heroSectionImage}>
              <img
                src="./images/A-Human/hero_sitting.svg"
                alt="Person sitting"
              />
            </div>
          </div>
          <div
            style={{
              borderTop: '1px solid lightgrey ',
              marginLeft: 20,
              marginRight: 20,
            }}
          />
          <div css={heroSectionHeading}>
            <a>
              “This app is wonderful. I can keep track of my mood over a series
              of days and (re)mind myself (pun intended!) on bad days that life
              isn’t so bad after all. All I have to do is look up my green mood
              cards on my dashboard! Simple, yet effective!” -- Robin, UK
            </a>
          </div>
        </section>
      </>
    </Layout>
  );
}
