import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import CopyrightIcon from '@material-ui/icons/Copyright';
// import { IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Link from 'next/link';
import {
  footerStyle,
  navItemsContainer,
  socialContainer,
} from '../styles/styles';

export default function Footer() {
  return (
    <div css={footerStyle}>
      <div css={navItemsContainer}>
        <ul>
          <Link href="https://www.youtube.com/watch?v=7-1Y6IbAxdM">
            <a target="_blank">
              <li>What is mindfulness?</li>
            </a>
          </Link>
          <Link href="https://www.youtube.com/watch?v=JMd1CcGZYwU">
            <a target="_blank">
              <li>What is gratitude?</li>
            </a>
          </Link>
          <a>
            <li>© Mathias Lukas</li>
          </a>
        </ul>
      </div>
      <div css={socialContainer}>
        <ul>
          <Link passHref href="mailto:mathias.lukas@me.com">
            <a>
              <li>
                <AlternateEmailIcon />
              </li>
            </a>
          </Link>
          <Link passHref href="https://github.com/mtslks">
            <a target="_blank">
              <li>
                <GitHubIcon />
              </li>
            </a>
          </Link>
          <Link passHref href="https://www.linkedin.com/in/mathiaslukas/">
            <a target="_blank">
              <li>
                <LinkedInIcon />
              </li>
            </a>
          </Link>
        </ul>
      </div>
    </div>
  );
}
