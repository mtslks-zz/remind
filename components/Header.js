import Link from 'next/link';
import { useState } from 'react';
import { headerStyle, logoContainer, logoStyle } from '../styles/styles';
import HeaderMenu from './HeaderMenu';
import HeaderNav from './HeaderNavigation';

export default function Header(props) {
  const [open, setOpen] = useState(false);

  return (
    <div username={props.username}>
      <div css={logoContainer} />
      <header css={headerStyle}>
        <div css={logoStyle}>
          <Link href="/">
            <a>
              <img src="/images/logo.png" alt="remind logo" />
            </a>
          </Link>
        </div>

        <HeaderNav username={props.username} open={open} />
        <HeaderMenu open={open} setOpen={setOpen} />
      </header>
    </div>
  );
}
