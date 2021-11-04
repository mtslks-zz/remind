import Link from 'next/link';
import { useState } from 'react';
import { headerStyle, logoContainer } from '../styles/styles';
import HeaderMenu from './HeaderMenu';
import HeaderNav from './HeaderNavigation';

export default function Header(props) {
  const [open, setOpen] = useState(false);

  return (
    <header css={headerStyle}>
      <div css={logoContainer}>
        <Link href="/">
          <a>
            <img src="/images/logo.png" alt="remind logo" />
          </a>
        </Link>
        <HeaderNav username={props.username} open={open} />
        <HeaderMenu open={open} setOpen={setOpen} />
      </div>
    </header>
  );
}
