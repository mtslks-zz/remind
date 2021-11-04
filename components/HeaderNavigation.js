import Link from 'next/link';
import { navContainer } from '../styles/styles';

export default function HeaderNavigation(props) {
  return (
    <div css={navContainer(props.open)}>
      <ul>
        <Link href="/dashboard">
          <a data-cy="header-dashboard-link">
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
        <Link href={`/users/${props.username}`}>
          <a>
            <li>My profile</li>
          </a>
        </Link>
        {props.username ? (
          <Link href="/logout">
            <a>
              <li>Logout</li>
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a data-cy="header-login-link">
              <li className="button-default">Login</li>
            </a>
          </Link>
        )}{' '}
        {props.username && `${props.username}`}
      </ul>
    </div>
  );
}
