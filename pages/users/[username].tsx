import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { pageContainer } from '../../styles/styles';
import { Errors, User } from '../../util/types';
import { SingleUserResponseType } from '../api/users/[username]';

type Props = {
  user: User;
  username?: string;
  errors?: Errors[];
};

const contentContainer = css`
  display: flex;
  flex-direction: row;
  height: 100vh;

  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

const containerLeft = css`
  width: 65%;
  margin-right: 24px;

  @media (max-width: 450px) {
    width: 100%;
  }

  h3 {
    margin-bottom: 64px;
  }

  .button-default {
    font-size: 1.3rem;
    margin-right: 24px;
    border: 1px solid;

    @media (max-width: 768px) {
      margin-right: 12px;
    }

    @media (max-width: 450px) {
      margin-right: 0px;
      margin-top: 32px;
      width: 220px;
    }
  }

  .userInformation {
    margin-bottom: 64px;

    p {
      margin: 6px 0;
    }
  }
`;

const containerRight = css`
  width: 35%;
  padding-top: 48px;

  @media (max-width: 450px) {
    width: 100%;
  }

  img {
    width: 100%;
  }
`;

export default function SingleUserProfile(props: Props) {
  const router = useRouter();

  // Show message if user not allowed
  const errors = props.errors;

  if (errors) {
    return (
      <Layout username={props.username}>
        <Head>
          <title>Access denied</title>
        </Head>
        <div css={pageContainer}>
          <h2>{errors[0].message}</h2>
        </div>
      </Layout>
    );
  }

  // Show message if user does not exist
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!props.user) {
    return (
      <Layout username={props.username}>
        <Head>
          <title>Unknown user</title>
        </Head>
        <div css={pageContainer}>
          <h2>User could not be found</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout username={props.username}>
      <Head>
        <title>
          User profile {props.user.firstName} {props.user.lastName}
        </title>
      </Head>
      <div css={pageContainer}>
        <div css={contentContainer}>
          <div css={containerLeft}>
            <h2>Welcome back, {props.user.firstName}!</h2>

            <div className="userInformation">
              <p>User Name: {props.user.username}</p>
              <p>First Name: {props.user.firstName}</p>
              <p>Last Name: {props.user.lastName}</p>
            </div>
            <button
              className="button-default"
              onClick={async (event) => {
                event.preventDefault();
                if (
                  !window.confirm(
                    `Delete account? This action cannot be reversed.`,
                  )
                ) {
                  return;
                }

                const response = await fetch(
                  `/api/users/${props.user.username}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      username: props.user.username,
                    }),
                  },
                );

                await response.json();

                // Navigate to deleted page after deleting account
                router.push(`/deleted-user`);
              }}
            >
              Edit profile
            </button>
            <button
              className="button-default"
              onClick={async (event) => {
                event.preventDefault();
                if (
                  !window.confirm(
                    `Are you sure you want to delete your account? This action cannot be reversed!`,
                  )
                ) {
                  return;
                }

                const response = await fetch(
                  `/api/users/${props.user.username}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      username: props.user.username,
                    }),
                  },
                );

                await response.json();

                // Navigate to deleted page after deleting account
                router.push(`/deleted-user`);
              }}
            >
              Delete account
            </button>
          </div>
          <div css={containerRight}>
            <img
              src="../../images/A-Human/profile_standing.svg"
              alt="Man with beard walking"
              className="registrationImageStyle"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response =
    // Since we're fetching on the server side,
    // the browser is not a part of this fetch
    // and it is therefore not sending the cookies along
    //
    // This is using the node-fetch library internally
    //
    await fetch(`${process.env.API_BASE_URL}/users/${context.query.username}`, {
      method: 'GET',
      headers: {
        // This forwards the cookie to the API route
        cookie: context.req.headers.cookie || '',
      },
    });
  const json = (await response.json()) as SingleUserResponseType;

  console.log('API decoded JSON from response', json);

  // checking for a property called errors inside object json
  if ('errors' in json) {
    context.res.statusCode = 403;
  } else if (!json.user) {
    // Return a proper status code for a response
    // with a null user (which indicates it has
    // not been found in the database)
    context.res.statusCode = 404;
  }

  return {
    props: {
      // json is an object with a user property OR an error property
      // if it has an error property, it's still rendering
      ...json,
    },
  };
}
