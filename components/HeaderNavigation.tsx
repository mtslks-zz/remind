import { css } from '@emotion/react';
// import Image from 'next/image';
import Link from 'next/link';
import { navContainer, profileImage } from '../styles/styles';

export type HeaderProps = {
  open: any;
  username: string;
  setOpen: any;
};

export default function HeaderNav(props: HeaderProps) {
  return (
    <div css={navContainer(props.open)}>
      <ul>
        <Link href="/dashboard">
          <a>
            <li>Dashboard</li>
          </a>
        </Link>
        <Link href="/tutorial">
          <a>
            <li>Tutorial</li>
          </a>
        </Link>
        <li>
          {props.username && (
            <Link href={`/users/${props.username}`} passHref>
              <img
                css={profileImage}
                src="/images/svg/user_icon.svg"
                alt="User profile icon"
                width={32}
                height={32}
              />
            </Link>
          )}{' '}
          <Link href={`/users/${props.username}`}>
            <a>
              <strong>{props.username && `${props.username}`}</strong>
            </a>
          </Link>{' '}
        </li>
        <li>
          {props.username ? (
            <Link href="/logout">
              <a>
                <li className="button-special">Logout</li>
              </a>
            </Link>
          ) : (
            <Link href="/login">
              <a>
                <li className="button-general">Login</li>
              </a>
            </Link>
          )}{' '}
        </li>
      </ul>
    </div>
  );
}
