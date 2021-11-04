import Link from 'next/link';
import { footerStyle, navItemsContainer } from '../styles/styles';

export default function Footer() {
  return (
    <div css={footerStyle}>
      {' '}
      <div css={navItemsContainer}>
        <ul>
          <Link href="/">
            <a>
              <li>Home</li>
            </a>
          </Link>
          <Link href="/dashboard">
            <a>
              <li>Dashboard</li>
            </a>
          </Link>
          <Link href="/tiles/start">
            <a>
              <li>Start Journaling</li>
            </a>
          </Link>
          <div>© (re)mind</div>
        </ul>
      </div>
    </div>
  );
}
