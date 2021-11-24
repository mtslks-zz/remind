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
              <li>My Dashboard</li>
            </a>
          </Link>
          <div>Contact</div>
          {/* <div class="wrapper">
            <div class="icon facebook">
              <div class="tooltip">Facebook</div>
              <span>
                <i class="fab fa-facebook-f"></i>
              </span>
            </div>
            <div class="icon twitter">
              <div class="tooltip">Twitter</div>
              <span>
                <i class="fab fa-twitter"></i>
              </span>
            </div>
            <div class="icon instagram">
              <div class="tooltip">Instagram</div>
              <span>
                <i class="fab fa-instagram"></i>
              </span>
            </div>
            <div class="icon github">
              <div class="tooltip">Github</div>
              <span>
                <i class="fab fa-github"></i>
              </span>
            </div>
            <div class="icon youtube">
              <div class="tooltip">Youtube</div>
              <span>
                <i class="fab fa-youtube"></i>
              </span>
            </div>
          </div> */}
        </ul>
      </div>
    </div>
  );
}
