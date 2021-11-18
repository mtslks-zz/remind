import Head from 'next/head';
import ContactForm from '../components/ContactForm';
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

export default function Dashboard(props: Props) {
  return (
    <Layout username={props.username}>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Mindfulness Tracker by (re)mind" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css={heroSection}>
        <div css={heroSectionHeadingImageContainer}>
          <div css={heroSectionHeading}>
            <div css={headingStyle}>
              <h1 className="header1-text">Contact us</h1>
              <h3>We will be happy to assist</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
