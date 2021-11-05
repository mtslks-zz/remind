import { css } from '@emotion/react';

const burgerMenuStyle = (open) => css`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 30px;
  right: 24px;
  display: flex;
  justify-content: space-around;
  z-index: 1300;
  display: none;

  @media (max-width: 1125px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

  div {
    width: 2.2rem;
    height: 2px;
    background-color: ${open ? '#FFFFFF' : '#FFFFFF'};
    transform-origin: 2px;
    transition: all 0.2s linear;

    &:nth-of-type(1) {
      transform: ${open ? 'rotate(45deg)' : 'rotate(0deg)'};
    }

    &:nth-of-type(2) {
      transform: ${open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${open ? 0 : 1};
    }

    &:nth-of-type(3) {
      transform: ${open ? 'rotate(-45deg)' : 'rotate(0deg)'};
    }
  }
`;

export default function HeaderMenu(props) {
  return (
    <div
      css={burgerMenuStyle(props.open)}
      onClick={() => props.setOpen(!props.open)}
      onKeyDown={() => props.setOpen(!props.open)}
      role="button"
      tabIndex={0}
    >
      <div />
      <div />
      <div />
    </div>
  );
}
