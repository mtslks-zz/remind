import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

dotenvSafe.config();

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
  const users = await sql`
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

export async function getValidSessionByToken(token) {
  if (!token) return undefined;

  const [session] = await sql`
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

export async function getUsersIfValidSessionToken(token) {
  if (!token) {
    const errors = [{ field: 'userAccess', message: 'Access denied' }];
    return errors;
  }

  const session = await getValidSessionByToken(token);

  if (!session) {
    const errors = [{ field: 'tokenNotMatching', message: 'Access denied' }];
    return errors;
  }

  const users = await sql`
    SELECT
      id,
      first_name,
      last_name,
      username
    FROM
      sessions,
      users
    WHERE
      sessions.user_id = users.id
  `;
  return users.map((user) => camelcaseKeys(user));
}

export async function createUser(
  firstName,
  lastName,
  username,
  email,
  passwordHash,
) {
  const users = await sql`
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

export async function deleteUserByUserUsername(username) {
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

export async function deleteUserById(id) {
  const [user] = await sql`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING
      username
  `;
  return user && camelcaseKeys(user);
}

export async function getUserById(id) {
  // Return undefined if userId is not parsable
  // to an integer
  if (!id) return undefined;

  const users = await sql`
    SELECT
      id,
      username,
      email,
      first_name,
      last_name
    FROM
      users
    WHERE
      id = ${id}
  `;
  return users.map((user) => camelcaseKeys(user))[0];
}

export async function getUserByUsername(username) {
  if (!username) return undefined;

  const users = await sql`
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

export async function getUserBySessionToken(token) {
  if (!token) return undefined;

  const session = await getValidSessionByToken(token);

  if (!session) return undefined;
  return await getUserById(session.userId);
}

// No access to profile, if user is not logged in
export async function getUserByUsernameAndToken(username, token) {
  if (!token) {
    const errors = [{ field: 'userNotLoggedIn', message: 'Access denied' }];
    return errors;
  }

  if (!username) return undefined;

  const userFromSession = await getUserBySessionToken(token);

  if (!userFromSession) return undefined;

  // Retrieve all matching users from database
  // users could be an array with the matching user OR an empty array
  const users = await sql`
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
    const errors = [{ field: 'idNotMatching', message: 'Access denied' }];

    return errors;
  }

  return camelcaseKeys(user);
}

export async function getUserWithPasswordHashByUsername(username) {
  const [user] = await sql`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user && camelcaseKeys(user);
}

// Sessions
export async function createSession(token, userId) {
  const sessions = await sql`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      *
  `;

  return sessions.map((session) => camelcaseKeys(session))[0];
}

export async function deleteExpiredSessions() {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      expiry < NOW()
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session));
}

export async function deleteSessionByToken(token) {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}

export async function insertFiveMinuteSessionWithoutUserId(token) {
  const sessions = await sql`
    INSERT INTO sessions
      (token, expiry)
    VALUES
      (${token}, NOW() + INTERVAL '5 minutes')
    RETURNING *
  `;
  return sessions.map((session) => camelcaseKeys(session))[0];
}

// Inserting details into a tile
export async function insertTile({
  userId,
  day,
  moodId,
  achievements,
  gratitude,
  affirmations,
}) {
  const tile = await sql`
    INSERT INTO tiles
    (user_id, day, mood_id, achievements, gratitude, affirmations)
    VALUES
    (${userId}, ${day}, ${moodId}, ${achievements}, ${gratitude}, ${affirmations})
    RETURNING
    user_id, day, mood_id, achievements, gratitude, affirmations
    `;
  return tile && camelcaseKeys(tile)[0];
}

// prepare for filter function by mood of the day (= mod)
export async function getMood() {
  const moods = await sql`
  SELECT
      id,
      title
    FROM
      moods
  `;
  return moods.map((mood) => camelcaseKeys(mood));
}

export async function getMoodById(moodId) {
  if (!moodId) return undefined;

  const moods = await sql`
  SELECT
    id
  FROM
    moods
  WHERE
    id = ${moodId}
  `;
  return moods.map((mood) => camelcaseKeys(mood))[0];
}

export async function getAllTiles(userId) {
  const allTiles = await sql`
    SELECT
     *
    FROM
     tiles
    WHERE
    user_id = ${userId}
    `;
  return allTiles.map((s) => camelcaseKeys(s));
}

export async function getSingleTile(id) {
  const singleTile = await sql`
    SELECT
      tiles.id,
      tiles.user_id,
      tiles.day,
      tiles.achievements,
      tiles.gratitude,
      tiles.affirmations,
      tiles.mood_id
     FROM
      tiles,
      sessions
     WHERE
      tiles.id = ${id} AND
      sessions.user_id = tiles.user_id
  `;
  return camelcaseKeys(singleTile[0]);
}

export async function getTilesByValidSessionUser(validSessionUserId) {
  if (!validSessionUserId) return undefined;

  const allTilesByValidSessionUser = await sql`
  SELECT
    *
    FROM
      tiles
    WHERE
      tiles.user_id = ${validSessionUserId}
    ORDER by
      tiles.day DESC
    `;
  return allTilesByValidSessionUser.map((s) => camelcaseKeys(s));
}

export async function deleteTileByTileId(tileId) {
  if (!tileId) return undefined;

  const tile = await sql`
    DELETE FROM
      tiles
    WHERE
      id = ${tileId}
    RETURNING
      id
  `;
  return tile && camelcaseKeys(tile)[0];
}

export async function getTileByTileId(tileId) {
  if (!tileId) return undefined;

  const tiles = await sql`
    SELECT
      tiles.id,
      mood_id,
      achievements,
      gratitude,
      affirmations
    FROM
      tiles
    WHERE
      tiles.id = ${tileId}
  `;
  return tiles.map((tile) => camelcaseKeys(tile))[0];
}

export async function getTilesByUserId(userId) {
  // // Return undefined if the id is not correct
  if (!userId) return undefined;

  const tiles = await sql`
    SELECT
     *
    FROM
     tiles
    WHERE
     user_id = ${userId};
  `;
  return tiles.map((tile) => camelcaseKeys(tile));
}
