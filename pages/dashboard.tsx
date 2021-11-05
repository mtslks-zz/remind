import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import {
  headingStyle,
  heroSection,
  heroSectionHeading,
  heroSectionHeadingImageContainer,
  heroSectionImage,
} from '../styles/styles';

type Props = {
  username?: string;
};

export default function Dashboard(props: Props) {
  return (
    <>
      <Head>
        <title>Welcome to (re)mind</title>
        <meta name="description" content="Mindfulness Tracker by (re)mind" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header username={props.username} />
      <section css={heroSection}>
        <div css={heroSectionHeadingImageContainer}></div>
        <div css={heroSectionImage}>
          <img src="./screenshots/dashboard_mockup.png" alt="Dashboard" />
        </div>
      </section>
    </>
  );
}
