import Link from 'next/link';
import { navContainer } from '../styles/styles';

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
        <Link href="/tiles/start">
          <a>
            <li>New Entry</li>
          </a>
        </Link>
        <Link href="/moodcloud">
          <a>
            <li>Mood Cloud</li>
          </a>
        </Link>
        <Link href="/register">
          <a>
            <li>Register</li>
          </a>
        </Link>
        {props.username ? (
          <Link href={`/users/${props.username}`}>
            <a>
              <li>My Profile</li>
            </a>
          </Link>
        ) : (
          ''
        )}
        {props.username ? (
          <Link href="/logout">
            <a>
              <li>Log out</li>
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a>
              <li className="button-general">Login</li>
            </a>
          </Link>
        )}{' '}
        <li>{props.username && `${props.username}`}</li>
      </ul>
    </div>
  );
}
