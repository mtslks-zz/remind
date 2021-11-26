import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { useState } from 'react';
import Layout from '../../components/Layout';
import {
  buttonContainer,
  buttonStylesStandard,
  headingStyle,
  heroSection,
  heroSectionHeading,
  heroSectionHeadingImageContainer,
  heroSectionImage,
} from '../../styles/styles';
import { Errors, User } from '../../util/types';
import { SingleUserResponseType } from '../api/users/[username]';

type Props = {
  user: User;
  username?: string;
  errors?: Errors[];
};

export default function UserProfile(props: Props) {
  const router = useRouter();

  // Show message if user not allowed
  const errors = props.errors;

  if (errors) {
    return (
      <Layout username={props.username}>
        <Head>
          <title>Access denied</title>
        </Head>
        <div>
          <h2>{errors[0].message}</h2>
        </div>
      </Layout>
    );
  }

  if (!props.username) {
    return (
      <Layout username={props.username}>
        <Head>
          <title>Unknown user</title>
        </Head>
        <div>
          <h2>User could not be found</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout username={props.username}>
      <Head>
        <title>
          (re)mind | User {props.user.firstName} {props.user.lastName}
        </title>
      </Head>
      <div css={heroSection}>
        <div css={heroSectionHeadingImageContainer}>
          <div css={heroSectionHeading}>
            <div css={headingStyle}>
              <h2 className="header2-text">
                User Profile of{' '}
                <strong>
                  <em>{props.user.username}</em>
                </strong>
              </h2>

              <div className="lead-text">
                <p>
                  <strong>User Name:</strong> {props.user.username}
                </p>
                <p>
                  <strong>Email:</strong> {props.user.email}
                </p>
                <p>
                  <strong>First Name:</strong> {props.user.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {props.user.lastName}
                </p>
              </div>
              <div css={buttonContainer}>
                <div css={buttonContainer}>
                  <button
                    css={buttonStylesStandard}
                    onClick={async (event) => {
                      event.preventDefault();
                      if (
                        !window.confirm(
                          `Are you sure you want to delete your account? This cannot be reversed!`,
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
                  <button css={buttonStylesStandard}>
                    <Link href="/logout">
                      <a>Logout</a>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div css={heroSectionImage}>
            <Image
              src="/images/A-Human/profile_standing.svg"
              alt="Man with beard walking"
              width={300}
              height={500}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/users/${context.query.username}`,
    {
      method: 'GET',
      headers: {
        // Forward cookie to the API route
        cookie: context.req.headers.cookie || '',
      },
    },
  );
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
      ...json,
    },
  };
}
