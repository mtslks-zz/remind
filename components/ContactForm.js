import { css } from '@emotion/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const contactFormStyle = css`
  .h1 {
    margin-top: 80px;
    color: white;
    font-size: 25px;
    padding-bottom: 0px;
  }

  .form {
    max-width: 800px;
    margin: 0 auto;
  }

  .p {
    color: #bf1650;
    text-align: center;
  }

  select,
  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    border: 1px solid;
    padding: 10px 15px;
    margin-bottom: 15px;
    font-size: 14px;
  }

  .label,
  section > label {
    line-height: 2;
    text-align: left;
    display: block;
    margin-bottom: 13px;
    margin-top: 20px;
    color: white;
    font-size: 14px;
    font-weight: 200;
  }

  input[type='submit'],
  .button {
    font-family: 'Poppins', serif;
    position: relative;
    color: white;
    text-transform: uppercase;
    margin-top: 20px;
    padding: 20px;
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 3px;
    appearance: none;
    width: 50%;
    transition: 0.3s all;
    background: #89c5cc;
    border-radius: 20px;
    cursor: pointer;
    :hover {
      background-color: #70acb3;
  }

  .buttonBlack {
    background: black;
    border: 1px solid white;
  }

  .App {
    max-width: 600px;
    margin: 0 auto;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  .counter {
    font-weight: 400;
    background: white;
    color: black;
    padding: 10px 15px;
    border-radius: 4px;
    position: fixed;
    top: 20px;
    right: 30px;
    z-index: 9999999;
  }



  button[type='button'] {
    padding: 6px 24px;
    background-color: #89c5cc;
    border-radius: 20px;
    cursor: pointer;
    :hover {
      background-color: #70acb3;
  }

  input[type='submit']:hover,
  button[type='button']:hover {
    background: #bf1650;
    color: white;
  }

  input[type='submit']:active {
    transition: 0.3s all;
    top: 2px;
  }

  .preact {
    opacity: 0;
    color: white;
  }

  .preact:hover {
    opacity: 1;
  }
`;

export default function ContactForm() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState('');
  const onSubmit = (data) => setResult(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={contactFormStyle}>
      <input {...register('firstName')} placeholder="First name" />
      <input {...register('lastName')} placeholder="Last name" />
      <input {...register('email')} placeholder="E-Mail" />
      <select {...register('category')}>
        <option value="">Select...</option>
        <option value="More info">
          Please contact me for more information
        </option>
        <option value="Newsletter">Subscribe to newsletter</option>
      </select>

      <p>{result}</p>
      <input type="submit" />
    </form>
  );
}
