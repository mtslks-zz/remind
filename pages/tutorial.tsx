import Head from 'next/head';
// import Link from 'next/link';
// import Header from '../components/Header';
import Layout from '../components/Layout';
import {
  headingStyle,
  heroSection,
  heroSectionHeading,
  heroSectionHeadingImageContainer,
} from '../styles/styles';

type Props = {
  username?: string;
};

export default function Tutorial(props: Props) {
  return (
    <Layout username={props.username}>
      <Head>
        <title>About (re)mind</title>
        <meta name="description" content="Mindfulness Tracker by (re)mind" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css={heroSection}>
        <div css={heroSectionHeadingImageContainer}>
          <div css={heroSectionHeading}>
            <div css={headingStyle}>
              <h1 className="header1-text">How does (re)mind work?</h1>
              <h2>
                Let's be honest. Before developing (re)mind, we were journaling
                just like you. In a book!
              </h2>
              <p>
                Wouldn't it be great, if we had an easy way to track how we
                feel, what we are grateful for, and which daily achievements we
                strive for?
              </p>
              <p>
                That is why we developed (re)mind. A pocket-friendly way of
                doing so.
              </p>
              <h3>Step 1</h3>
              <p>Register for a free account.</p>
              <p>
                <em>Screenshot</em>
              </p>

              <h3>Step 2</h3>
              <p>Start your first entry.</p>
              <p>
                <em>Screenshot</em>
              </p>
              <h3>Step 3</h3>
              <p>Review your dashboard.</p>
              <p>
                <em>Screenshot</em>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
