import { css } from '@emotion/react';
// import axios from 'axios';
// import { Image } from 'cloudinary-react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import {
  headingStyle,
  heroSection,
  heroSectionHeading,
  heroSectionHeadingImageContainer,
  pageContainer,
} from '../../styles/styles';
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

  .button-general {
    font-size: 1.3rem;
    margin-right: 24px;
    border: none;

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

export default function UserProfile(props: Props) {
  const router = useRouter();
  // const [image, setImage] = useState('');
  // const [imageSelected, setImageSelected] = useState('');

  // Profile picture upload functionality

  // const uploadImage = async (event) => {
  //   const files = event.currentTarget.files;
  //   const formData = new FormData();
  //   formData.append('file', imageSelected);
  //   formData.append('upload_preset', 'remind_upload');
  //   setLoading(true);
  //   const res = await fetch(
  //     'https://api.cloudinary.com/v1_1/dng1aerxw/image/upload',
  //     {
  //       method: 'POST',
  //       body: formData,
  //     },
  //   );
  //   const file = await res.json();

  //   setImage(file.secure_url);
  //   setLoading(false);
  // };

  // const uploadImage = (files) => {
  //   const formData = new FormData();
  //   formData.append('file', imageSelected);
  //   formData.append('upload_preset', 'remind_upload');

  //   axios
  //     .post('https://api.cloudinary.com/v1_1/dng1aerxw/image/upload', formData)
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

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

      <div css={heroSection}>
        <div css={heroSectionHeadingImageContainer}>
          <div css={heroSectionHeading}>
            <div css={headingStyle}>
              <h2>
                Logged in as{' '}
                <strong>
                  <em>{props.user.username}</em>
                </strong>
              </h2>

              <div className="userInformation">
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
              {/* <Image
              style={{ width: 200 }}
              cloudName="dng1aerxw"
              publicId={setImage}
            /> */}
              {/* <div>
              <input
                type="file"
                onChange={(event) => {
                  setImageSelected(event.target.files[0]);
                }}
              />
            </div> */}
              {/* <div>
              <button className="button-general" onClick={uploadImage}>
                Update avatar
              </button>
            </div> */}
              <button
                className="button-general"
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
              <button className="button-general">
                <Link href="/logout">
                  <a>Logout</a>
                </Link>
              </button>
            </div>
          </div>
          <div css={containerRight}>
            <Image
              src="/images/A-Human/profile_standing.svg"
              alt="Man with beard walking"
              className="registrationImageStyle"
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
    `${process.env.API_BASE_URL}/users/${context.query.username}`,
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
