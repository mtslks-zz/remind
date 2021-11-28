import { css } from '@emotion/react';

// Styles
export const pageContainer = css`
  background-color: white;
  padding: 96px 24px;

  @media (max-width: 768px) {
    padding: 96px 24px;
  }
`;

// Form Styles
export const wrapper = css`
  display: flex;
  justify-content: center;
  justify-items: flex;
  padding-top: 128px;
  padding-bottom: 128px;

  @media (max-width: 450px) {
    flex-direction: column-reverse;
    padding-top: 12px;
  }
`;

export const tileFormStyle = css`
  display: flex;
  flex-direction: column;
  box-shadow: 0 7px 17px rgb(0 0 0 / 13%);
  width: 100vh;
  margin: 50px;

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

      border: 1px solid;
      border-radius: 8px;

      :focus {
        box-shadow: 0 0 2px black;
        outline: none !important;
      }
    }
  }
`;

export const buttonStylesStandard = css`
  display: inline-block;
  background: white;
  font-size: 16px;
  font-weight: 400;
  border: 0.1rem solid grey;
  border-radius: 16px;
  padding: 12px 24px;
  margin-right: 24px;
  letter-spacing: 1px;
  text-transform: uppercase;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 5px 0px;

  :hover {
    cursor: pointer;
    background: lightgrey;
    border: 0.1rem solid lightgrey;
    color: white;
  }
`;

export const inputFormStyle = css`
  display: flex;
  box-shadow: 0 7px 17px rgb(0 0 0 / 13%);
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 50vh;
  padding: 10px 48px 35px 20px;

  label {
    display: flex;
    flex-direction: column;
    text-align: left;
    font-weight: 300;
    color: grey;

    input {
      margin: 6px 0 20px 0;
      width: 225px;
      padding: 12px 8px;
      transition: 0.3s ease-in-out;

      border: 1px solid;
      border-radius: 8px;

      :focus {
        box-shadow: 0 0 2px black;
        outline: none !important;
      }
    }
  }
`;

export const imageContainer = css`
  width: 50%;
  padding-top: 12px;

  @media (max-width: 450px) {
    padding-top: 32px;
  }

  img {
    width: 400px;
  }
`;

// Footer & header style
export const footerStyle = css`
  width: 100%;
  height: 50px;
  background-color: #0093e9;
  background-image: linear-gradient(90deg, #0093e9 0%, #80d0c7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;

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
    font-size: 1rem;
    font-weight: 250;
    text-decoration: none;
    padding-right: 24px;

    :hover {
      font-weight: 280;
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

export const socialContainer = css`
  padding-top: 2px;
  display: flex;

  ul {
    display: inline-grid;
    grid-auto-flow: row;
    list-style: none;
    grid-gap: 20px;
    justify-items: right;
    margin-left: 50px;

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
  @media (max-width: 300px) {
    display: none;
  }
`;

export const headerStyle = css`
  width: 100%;
  height: 75px;
  padding: 12px 0px 12px 32px;
  display: flex;
  font-size: 1.1rem;
  letter-spacing: 2px;
  justify-content: space-between;
  background-color: #0093e9;
  background-image: linear-gradient(90deg, #0093e9 0%, #80d0c7 100%);
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
  a {
    cursor: pointer;
    color: white;
    font-size: 1rem;
    font-weight: 300;
    text-decoration: none;

    :hover {
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

export const logoContainer = css`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-weight: 500;
  color: white;
  font-size: 1.2rem;

  a {
    text-decoration: none;
    color: white;
  }

  img {
    width: 130px;
  }
`;

export const logoStyle = css`
  display: flex;
  align-items: center;
  color: white;
  justify-content: center;
  text-transform: uppercase;
  img {
    width: 200px;
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
    line-height: 2.5rem;

    @media (max-width: 1125px) {
      flex-flow: column nowrap;
      background-color: #0093e9;
      background-image: linear-gradient(0deg, #0093e9 0%, #80d0c7 49%);
      position: fixed;
      border-radius: 16px;
      top: 0px;
      right: 0;
      height: 60vh;
      width: 190px;
      margin-top: 0.7rem;
      padding-top: 4rem;
      border-radius: 5ypx;
      transform: ${open ? 'translateX(0)' : 'translateX(100%)'};
      transition: transform 0.7s ease-in-out;
    }
  }

  li {
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
  }

  .button-general {
    padding: 1px 24px;
    border-radius: 16px;
    cursor: pointer;
    width: fill;
    :hover {
      background-color: white;
      color: grey;
    }

    @media (max-width: 1125px) {
      width: 140px;
      margin: 12px;
      text-align: center;
      padding: 6px 12px;
    }
  }

  .button-special {
    padding: 1px 24px;
    border-radius: 16px;
    cursor: pointer;
    width: fill;
    :hover {
      background-color: white;
      color: grey;
    }

    @media (max-width: 1125px) {
      width: 140px;
      margin: 12px;
      text-align: center;
      padding: 6px 12px;
    }
  }

  img {
    align-items: center;
    justify-content: center;
  }

  a {
    text-decoration: none;
    color: white;
    justify-content: center;
    align-items: center;

    :hover {
      font-weight: 400;
    }
  }
`;

// Hero styles
export const heroSection = css`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
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
  padding: 0px 64px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 450px) {
    padding: 12px 24px;
  }
`;

export const heroSectionHeading = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65%;
  height: 100%;
  padding: 0px 0px 64px;

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
  width: 90%;

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
  textarea {
    width: 500px;
    height: 200px;
    border: 1px solid #888;
    resize: none;
    font-size: 1.2rem;
    letter-spacing: 1px;
    padding: 10px;
    font-family: 'EB Garamond', serif;
    max-width: 100%;
    line-height: 1.5;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px #999;
  }
`;

export const buttonContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  padding-top: 12px;
  padding-bottom: 24px;

  button {
    display: flex;
    align-items: left;
    flex-direction: row;
    justify-content: center;
    margin: 10px;
    padding: 12px 24px;
  }

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

// Tile Styles
export const tilesContainer = css`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid grey;
  box-shadow: 0 7px 17px rgb(0 0 0 / 13%);
  width: 100%;
  height: 50vh;
  margin: 16px 32px 64px 32px;
  padding: 24px;

  @media (max-width: 768px) {
    margin: 0 18px 64px 18px;
    width: 300px;
    height: 500px;
  }

  @media (max-width: 450px) {
    margin: 0 18px 64px 18px;
    width: 300px;
    height: 480px;
  }

  h3 {
    margin-bottom: 0px;
    padding: 6px;
    text-align: center;
  }
`;

export const tileGrid = css`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 24px;
  a {
    display: block;
    text-align: center;
    text-decoration: none;
    padding: 3px;
    margin: 0;
  }
  * {
    margin: 0;
    padding: 0px;
    box-sizing: border-box;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .card {
    width: 250px;
    height: 230px;
    background-image: linear-gradient(180deg, #6eb9e4 0%, #abd3cf 100%);
    position: relative;
    border-radius: 15px;
    cursor: pointer;
    box-shadow: 0 7px 17px rgb(0 0 0 / 30%);

    //box-shadow: 0 0 20px rgba(0, 0, 0, 0.123);
  }
  .card img {
    position: absolute;
    padding: 50px 50px 0px 50px;
    width: 100%;
  }
  .content {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 50px;
    padding: 0.6em 2em;
    font-size: 16px;
    background: rgba(255, 255, 255, 0);
    backdrop-filter: blur(20px);
    border-radius: 10px;
    transform: scale(0.9);
    color: white;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.144);
    overflow: hidden;
    transition: all 0.4s;
  }
  .content div {
    font-size: 0.8em;
    line-height: 25px;
    padding: 3px;
  }
  .card:hover .content {
    height: 220px;
  }
`;

export const singleTileContainer = css`
  background-image: linear-gradient(180deg, #6eb9e4 0%, #abd3cf 100%);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
`;

export const profileImage = css`
  display: flex;
  margin: 10px;
  flex-direction: column;
  justify-content: center;
`;

export const datepickerStyle = css`
  ::-webkit-datetime-edit {
    font-size: 1.3em;
    padding: 0.4em;
  }
  ::-webkit-datetime-edit-text {
    padding: 0 0.1em;
  }
`;
