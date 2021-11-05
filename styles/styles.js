import { css } from '@emotion/react';

// Font sizes
export const normalFontSize = '14px';
export const smallFontSize = '0.8rem';

// Styles
export const pageContainer = css`
  background-color: white;
  padding: 96px 24px;

  @media (max-width: 768px) {
    padding: 96px 24px;
  }
`;

const containerRight = css`
  width: 35%;

  @media (max-width: 450px) {
    padding-top: 48px;
    width: 100%;
  }

  img {
    width: 100%;
  }
`;

// Form Styles
export const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 64px;

  @media (max-width: 450px) {
    flex-direction: column-reverse;
    padding-top: 12px;
  }
`;

export const inputFormStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 35vh;
  padding-bottom: 128px;

  label {
    display: flex;
    flex-direction: column;
    text-align: left;
    font-weight: 300;
    color: grey;

    input {
      margin: 6px 0 20px 0;
      width: 200px;
      padding: 12px 8px;
      transition: 0.3s ease-in-out;
      border-radius: 8px;
      border: 1px solid;

      :focus {
        box-shadow: 0 0 2px black;
        outline: none !important;
      }
    }
  }

  button {
    display: flex;
    font-size: 1rem;
    font-weight: 800;
    justify-content: center;
    align-items: center;
    width: 15vh;
    border-radius: 20px;
    border: none;
    text-transform: uppercase;
  }
`;

export const imageContainer = css`
  width: 50%;

  @media (max-width: 450px) {
    padding-top: 32px;
  }

  img {
    width: 90%;
  }
`;

// Footer & header style
export const footerStyle = css`
  width: 100%;
  height: 62px;
  background: linear-gradient(
    91.4deg,
    #e4e4e4 0%,
    rgba(75, 154, 227, 0.91) 0.01%,
    rgba(33, 15, 237, 0.4) 63.54%,
    rgba(96, 75, 227, 0.36) 99.98%,
    rgba(75, 136, 227, 0.19) 99.99%,
    rgba(96, 75, 227, 0) 100%,
    rgba(96, 75, 227, 0) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 450px) {
    display: none;
  }
`;

export const navItemsContainer = css`
  padding-top: 4px;
  display: flex;

  ul {
    display: inline-grid;
    grid-auto-flow: row;
    list-style: none;
    grid-gap: 100px;
    justify-items: center;
    margin: auto;

    @media (min-width: 600px) {
      grid-auto-flow: column;
    }
  }

  div {
    color: white;
    font-size: 0.9rem;
    font-weight: 300;
    text-decoration: none;
    padding-right: 24px;
  }

  a {
    color: white;
    font-size: 0.9rem;
    font-weight: 300;
    text-decoration: none;

    :hover {
      font-weight: 300;
      color: lightgrey;
    }
  }

  li:last-child {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

  li:hover ~ li p {
    animation: wave-animation 0.3s infinite;
  }
`;

export const headerStyle = css`
  width: 100%;
  height: 85px;
  padding: 12px 90px;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(
    91.4deg,
    #e4e4e4 0%,
    rgba(75, 154, 227, 0.91) 0.01%,
    rgba(33, 15, 237, 0.4) 63.54%,
    rgba(96, 75, 227, 0.36) 99.98%,
    rgba(75, 136, 227, 0.19) 99.99%,
    rgba(96, 75, 227, 0) 100%,
    rgba(96, 75, 227, 0) 100%
  );

  font-weight: 400;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  text-transform: uppercase;
  color: white;

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

export const logoContainer = css`
  display: flex;
  align-items: center;
  letter-spacing: 2px;
  font-size: 1rem;
  font-weight: 200;
  color: white;

  a {
    text-decoration: none;
    color: white;
  }

  img {
    width: 130px;
  }
`;

// Navigation
export const navContainer = (open) => css`
  display: flex;

  @media (max-width: 1125px) {
  }

  ul {
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0;

    @media (max-width: 1125px) {
      flex-flow: column nowrap;
      background: linear-gradient(
        180deg,
        rgba(125, 111, 182, 0.57),
        rgba(100, 78, 123, 0.4446)
      );
      position: fixed;
      top: 0px;
      right: 0;
      height: 24vh;
      width: 190px;
      margin-top: 0.7rem;
      padding-top: 4rem;
      border-radius: 8px;
      transform: ${open ? 'translateX(0)' : 'translateX(100%)'};
      transition: transform 0.7s ease-in-out;
    }
  }

  li {
    padding: 12px 24px;
  }

  .button-default {
    padding: 12px 24px;
    background-color: #89c5cc;
    border-radius: 20px;
    cursor: pointer;
    :hover {
      background-color: #70acb3;
    }

    @media (max-width: 1125px) {
      width: 140px;
      margin: 12px;
      text-align: center;
      padding: 6px 12px;
    }
  }

  a {
    text-decoration: none;
    color: white;

    :hover {
      font-weight: 800;
    }
  }
`;

// Hero styles
export const heroSection = css`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  width: 100%;
  min-height: 100%;
  position: relative;
  padding-top: 100px;

  @media (max-width: 450px) {
    padding-top: 10px;
  }
`;

export const heroSectionHeadingImageContainer = css`
  display: flex;
  flex-direction: row;
  padding: 0px 128px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 450px) {
    padding: 96px 24px;
  }
`;

export const heroSectionHeading = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 0px 32px 64px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0px 0px;
  }

  @media (max-width: 450px) {
    width: 100%;
    padding: 0px 0px;
  }
`;

export const headingStyle = css`
  display: flex;
  flex-direction: column;

  @media (max-width: 1260px) {
    h1 {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 3.5rem;
      text-align: left;
    }

    h3 {
      align-self: center;
      text-align: left;
    }
  }

  @media (max-width: 450px) {
    h1 {
      font-size: 2rem;
      line-height: 48px;
      margin-bottom: 0;
    }

    h3 {
      font-size: 1rem;
      align-self: left;
      text-align: left;
    }
  }

  h1 {
    margin-bottom: 12px;
  }

  h3 {
    text-align: left;

    @media (max-width: 768px) {
      text-align: left;
    }
  }
`;

export const buttonContainer = css`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    justify-content: center;
    padding-bottom: 32px;
  }

  @media (max-width: 450px) {
    justify-content: center;
    padding-bottom: 32px;
  }
`;

export const heroSectionImage = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  padding-left: 64px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0px 0px;
  }

  @media (max-width: 450px) {
    width: 100%;
    padding: 0px 0px;
  }

  img {
    width: 100%;
    height: auto;

    @media (max-width: 768px) {
      width: 400px;
    }

    @media (max-width: 450px) {
      width: 300px;
    }
  }
`;
