# (re)mind - Mindfulness Tracker

## Deployed version

You can visit the deployed website here: [(re)mind](https://remind-tracker.herokuapp.com/)

This web application was created as the final project for the Upleveled bootcamp in Vienna.

## Vision & Functionalities

(re)mind is a digital version of a mindfulness tracker and daily journaling practice. The vision of (re)mind is to create an easy way to track your daily mood by simply answering a set of (the same) questions every day. The answers are compiled within the user account in so-called tiles on a dashboard. Through this daily practice, a history of daily moods, gratitude, and achievements is collected. This history can be accessed over and over again, strengthening the practice. This can give the user a sense of accomplishment, boost the good feeling about oneself, and the opportunity to back to review better days when feelings are on a low point.

![Landing Page](./public/)
![Login](./public/)
![Dashboard](./public/)
![Tile](./public/)

## Functionalities

- User authentication (registration + login)
- User authorization (only the owner of the items is allowed to create tiles and answer questions)
- Users can create tiles and filter them in the grid overview
- A user can edit and delete their entries
- Users can filter by mood setting (first question)
- The website is fully responsive, so access on the mobile phone is possible

## Technologies

- Next.js
- React.js
- PostgreSQL
- Emotion
- TypeScript
- Jest tests
- Cypress tests

## Project Management

- Database schema created with DrawSQL: [See schema](https://drawsql.app/final-project/diagrams/final-project#)

![Database Structure](./public/screenshot_database.png)

- Task management with Github Projects & Notion
- Wireframing and design with Figma

![Design with Figma](./public/screenshots/figma_wireframing.png)

## SetUp instructions

To work on this project by yourself, please follow the upcoming steps:

- Clone the repo to your local machine with `git clone <repo>`
- Setup the database by downloading and installing PostgreSQL
- Create a user and a database
- Create a new file .env
- Copy the environment variables from .env-example into .env
- Replace the placeholders xxxxx with your username, password and name of database
- Install dotenv-cli with `yarn global add dotenv-cli`
- Run `yarn install` in your command line
- Run the migrations with `yarn migrate up`
- Start the server by running `yarn dev`

## Deploy your own website to Heroku

The easiest way to deploy your Next.js app is to use Heroku.

- Sign up for Heroku: [signup.heroku.com](signup.heroku.com)
- Create a new App
- Choose a name and select the "Europe" Region
- Click on the button in the middle called "Connect to GitHub"
- Search for your repository in the search box at the bottom of the page and click on the "Connect" button Click on the button for "Enable Automatic Deploys"
- Go back to the Overview tab and click on "Configure Add-On"
- Search for "Postgres" and select "Heroku Postgres" from the results
- Trigger a deploy by pushing your repo to GitHub

## Dependencies & Libraries

### General setup of the app

- Create next.js app `ok`
- Sharp `ok`
- ESLint `ok`

### Styling etc.

- Emotion `ok`
- camelcaseKeys (camelcase-keys) `ok`

### Database & migrations

- dotenv-safe
- dotenv-cli `ok`
- postgres `ok`
- ley `ok`

### Cookies & tokenization

- cookie `ok`
- csrf `ok`
- bcrypt `ok`
- crypto `ok`

### Hosting & deploying

- heroku-postbuild
