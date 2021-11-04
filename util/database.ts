import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
// import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';
import { Errors, Session, User, UserWithPasswordHash } from './types';

// setPostgresDefaultsOnHeroku();

dotenvSafe.config();

declare module globalThis {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let __postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

const sql = connectOneTimeToDatabase();

// Perform first query
export async function getUsers() {
  const users = await sql<User[]>`
    SELECT
      id,
      first_name,
      last_name,
      username
    FROM
      users
  `;
  return users.map((user) => camelcaseKeys(user));
}

export async function getUsersIfValidSessionToken(token?: string) {
  if (!token) {
    const errors: Errors[] = [
      { field: 'userAccess', message: 'Access denied' },
    ];
    return errors;
  }

  const session = await getValidSessionByToken(token);

  if (!session) {
    const errors: Errors[] = [
      { field: 'tokenNotMatching', message: 'Access denied' },
    ];
    return errors;
  }

  const users = await sql<User[]>`
    SELECT
      users.id,
      users.first_name,
      users.last_name,
      users.username
    FROM
      sessions,
      users
    WHERE
      sessions.user_id = users.id
  `;
  return users.map((user) => camelcaseKeys(user));
}

export async function createUser(
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  passwordHash: string,
) {
  const users = await sql<[User]>`
    INSERT INTO users
      (first_name, last_name, username, email, password_hash)
    VALUES
      (${firstName}, ${lastName}, ${username}, ${email}, ${passwordHash})
    RETURNING
      id,
      first_name,
      last_name,
      username,
      email
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function deleteUserByUserUsername(username: string) {
  if (!username) return undefined;

  const users = await sql`
    DELETE FROM
      users
    WHERE
      username = ${username}
    RETURNING
      username
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

// check
export async function deleteUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING
      username
  `;
  return user && camelcaseKeys(user);
}

export async function getUserById(id?: number) {
  if (!id) return undefined;

  const users = await sql<[User]>`
    SELECT
      id,
      first_name,
      last_name,
      username,
      email
    FROM
      users
    WHERE
      id = ${id}
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function getUserByUsername(username: string | string[]) {
  if (!username) return undefined;

  const users = await sql<[User]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username}
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function getUserByValidSessionToken(token: string) {
  if (!token) return undefined;

  const session = await getValidSessionByToken(token);

  if (!session) return undefined;
  return await getUserById(session.userId);
}

// No access to profile, if user is not logged in
export async function getUserByUsernameAndToken(
  username?: string,
  token?: string,
) {
  if (!token) {
    const errors: Errors[] = [
      { field: 'userNotLoggedIn', message: 'Access denied' },
    ];
    return errors;
  }

  if (!username) return undefined;

  const userFromSession = await getUserByValidSessionToken(token);

  if (!userFromSession) return undefined;

  // Retrieve all matching users from database
  // users could be an array with the matching user OR an empty array
  const users = await sql<[User | undefined]>`
    SELECT
      id,
      first_name,
      last_name,
      username,
      email
    FROM
      users
    WHERE
      username = ${username}
  `;

  const user = users[0];
  if (!user) return undefined;

  if (user.id !== userFromSession.id) {
    const errors: Errors[] = [
      { field: 'idNotMatching', message: 'Access denied' },
    ];

    return errors;
  }

  return camelcaseKeys(user);
}

export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user && camelcaseKeys(user);
}

// update below:
// export async function updateUserById(
//   id: number,
//   {
//     name,
//     favoriteColor,
//   }: {
//     name: string;
//     favoriteColor: string;
//   },
// ) {
//   const [user] = await sql<[User | undefined]>`
//     UPDATE
//       users
//     SET
//       name = ${name},
//       favorite_color = ${favoriteColor}
//     WHERE
//       id = ${id}
//     RETURNING
//       id,
//       name,
//       favorite_color;
//   `;
//   return user && camelcaseKeys(user);
// }

export async function getValidSessionByToken(token: string) {
  if (!token) return undefined;

  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry > NOW()
  `;

  return session && camelcaseKeys(session);
}

// export async function getUserBySessionToken(sessionToken: string | undefined) {
//   if (!sessionToken) return undefined;

//   const [user] = await sql<[User | undefined]>`
//     SELECT
//       users.id,
//       users.first_name,
//       users.last_name,
//       users.email,
//       users.username
//     FROM
//       sessions,
//       users
//     WHERE
//       sessions.token = ${sessionToken} AND
//       sessions.user_id = users.id
//   `;
//   return user && camelcaseKeys(user);
// }

// Sessions
export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      *
  `;

  return camelcaseKeys(session);
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry < NOW()
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session));
}

export async function deleteSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}

export async function insertFiveMinuteSessionWithoutUserId(token: string) {
  const sessions = await sql<Session[]>`
    INSERT INTO sessions
      (token, expiry)
    VALUES
      (${token}, NOW() + INTERVAL '5 minutes')
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}
