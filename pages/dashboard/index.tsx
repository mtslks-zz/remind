import { css } from '@emotion/react';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import QuoteCard from '../../components/QuoteGenerator';
import {
  buttonContainer,
  buttonStylesStandard,
  datepickerStyle,
  heroSectionHeadingImageContainer,
  singleTileContainer,
  tileGrid,
} from '../../styles/styles';
import { Tile } from '../../util/types';

type Props = {
  username?: string;
  userId: number;
  tiles: Tile[];
};

// Dashboard styling
export const dashboardContainer = css`
  background-color: white;
  padding: 24px 24px;

  @media (max-width: 768px) {
    padding: 96px 24px;
  }
`;

export const dashboardFrame = css`
  display: flex;
  background-color: #0094e946;
  box-shadow: 0 7px 17px rgb(0 0 0 / 30%);
  flex-direction: column;
  border-radius: 16px;
  width: 100vh;
  justify-items: center;
  padding: 12px 24px 12px 24px;

  @media (max-width: 1260px) {
    h1 {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 3.5rem;
      text-align: left;
    }

    h3 {
      align-self: center;
      text-align: left;
    }
  }

  @media (max-width: 450px) {
    h1 {
      font-size: 2rem;
      line-height: 48px;
      margin-bottom: 0;
    }

    h3 {
      font-size: 1rem;
      align-self: left;
      text-align: left;
    }
  }

  h1 {
    margin-bottom: 12px;
  }

  h3 {
    text-align: left;

    @media (max-width: 768px) {
      text-align: left;
    }
  }
  textarea {
    width: 300vh;
    height: 200px;
    border: 1px solid #888;
    resize: none;
    font-size: 1.2rem;
    letter-spacing: 1px;
    padding: 10px;
    max-width: 100%;
    line-height: 1.5;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px #999;
  }
`;

export const dashboardHeading = css`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  width: 65%;
  height: 100%;
  margin: 0px 64px 12px 64px;
  padding: 32px 0px 64px 0px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0px 0px;
  }

  @media (max-width: 450px) {
    width: 100%;
    padding: 0px 0px;
  }
`;

export const tileGridContainer = css`
  display: flex;
  padding: 0px 24px 12px 24px;
  margin: 30px;
  border-radius: 16px;
  background-color: #0094e946;
  box-shadow: 0 7px 17px rgb(0 0 0 / 30%);

  height: 100%;
`;

export default function Tiles(props: Props) {
  const [errors, setErrors] = useState<any[]>();
  const [day, setDay] = useState('');
  const router = useRouter();
  // console.log(props);
  return (
    <Layout username={props.username}>
      <Head>
        <title>(re)mind | Dashboard</title>
        <meta name="description" content="Dashboard (re)mind Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section css={dashboardContainer}>
        <div css={heroSectionHeadingImageContainer}>
          <div css={dashboardHeading}>
            <h2 className="header1-text">
              Your (re)mind Dashboard <OfflineBoltOutlinedIcon />
            </h2>
            <div css={buttonContainer}>
              <div css={buttonContainer}>
                <div>
                  <a href="#tiles" css={buttonStylesStandard}>
                    My Entries
                  </a>
                </div>
                <div>
                  <Link href={`/users/${props.username}`}>
                    <a css={buttonStylesStandard}>My Profile</a>
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <form
                css={dashboardFrame}
                onSubmit={async (event) => {
                  event.preventDefault();
                  // console.log(props.userId);
                  const response = await fetch(`/api/dashboard/create`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    // send request body to API route
                    body: JSON.stringify({
                      day: day,
                      userId: props.userId,
                      achievements: event.currentTarget.achievements.value,
                      gratitude: event.currentTarget.gratitude.value,
                      affirmations: event.currentTarget.affirmations.value,
                      quote: event.currentTarget.quote.value,
                    }),
                  });

                  const tileResponseJson = await response.json();
                  // Check if there is an errorMessage inside the json and update state
                  if ('errors' in tileResponseJson) {
                    setErrors(tileResponseJson.errors);
                    return;
                  }
                  router.reload();
                }}
              >
                <div>
                  <label htmlFor="date-picker">
                    <h2 className="header2-text">New Journal Entry | {day}</h2>
                  </label>
                </div>
                <div id="new-entry">
                  <h3 className="header3-text">Select Date of Entry</h3>
                </div>
                <input
                  css={datepickerStyle}
                  type="date"
                  placeholder="30/11/2021"
                  value={day}
                  min="2021-11-01"
                  max="2022-12-31"
                  required
                  onChange={(event) => {
                    setDay(event.currentTarget.value);
                  }}
                />
                <div>
                  <label htmlFor="achievements">
                    <h3 className="header3-text">
                      1. What would make today great?
                    </h3>
                  </label>
                </div>

                <div>
                  <textarea
                    name="achievements"
                    placeholder="What would make today great? State your goals and targets you want to achieve today."
                    max-length="10000"
                  />
                </div>
                <div>
                  <label htmlFor="gratitude">
                    <h3 className="header3-text">2. I am grateful for...</h3>
                  </label>
                </div>
                <div>
                  <textarea
                    name="gratitude"
                    placeholder="State 3 things you are grateful for today."
                    max-length="10000"
                  />
                </div>

                <div>
                  <label htmlFor="affirmations">
                    <h3 className="header3-text">3. My daily affirmation</h3>
                  </label>
                </div>
                <div>
                  <textarea
                    name="affirmations"
                    placeholder="Affirm in a few words, what you want to have manifested in your life."
                    max-length="10000"
                  />
                </div>
                <div>
                  <h3 className="header3-text">
                    Lastly, pick & copy your random quote of the day:
                  </h3>
                </div>
                <div>
                  <QuoteCard />
                </div>
                <p />
                <div>
                  <textarea
                    name="quote"
                    placeholder="Copy your quote from the clipboard here, then click 'Create Tile'."
                    max-length="10000"
                  />
                </div>
                <div css={buttonContainer}>
                  <div css={buttonContainer}>
                    <div>
                      <button css={buttonStylesStandard}>
                        Create Tile <LibraryAddIcon />
                      </button>
                    </div>
                    <div>
                      <button css={buttonStylesStandard} type="reset">
                        Clear Fields <RotateLeftIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div css={tileGridContainer}>
          <div>
            <a id="tiles">
              <h2 className="header2-text">My Entries</h2>
            </a>
            <p />
          </div>

          <div css={tileGrid}>
            {props.tiles.map((tile) => {
              return (
                <div
                  className="card"
                  key={`tile-li-${tile.id}`}
                  css={singleTileContainer}
                >
                  <div>
                    <img src="/images/logo.png" alt="(re)mind logo on tile" />
                  </div>
                  <div className="content">
                    <Link passHref href={`/dashboard/${tile.id}`}>
                      <h2>
                        <a>{tile.day}</a>
                      </h2>
                    </Link>
                    <div>
                      <strong>Today's goals:</strong> {tile.achievements}
                    </div>
                    <div>
                      <strong>Grateful for:</strong> {tile.gratitude}
                    </div>
                    <div>
                      <strong>Affirmation:</strong> {tile.affirmations}
                    </div>
                    <div>
                      <strong>Quote of the day:</strong> {tile.quote}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getValidSessionByToken } = await import('../../util/database');

  // Authorization: Allow only logged-in users
  const isValidSession = await getValidSessionByToken(
    context.req.cookies.sessionToken,
  );
  const sessionToken = context.req.cookies.sessionToken;

  if (!isValidSession) {
    return {
      redirect: {
        permanent: false,
        destination: '/login?returnTo=/dashboard',
      },
    };
  }
  const baseUrl = process.env.BASE_URL;
  const tileResponse = await fetch(`${baseUrl}/api/dashboard/`, {
    method: 'GET',
    headers: {
      cookie: `sessionToken=${sessionToken}`,
    },
    credentials: 'include',
  });
  const tiles = await tileResponse.json();

  return {
    props: { userId: isValidSession.userId, tiles },
  };
}
