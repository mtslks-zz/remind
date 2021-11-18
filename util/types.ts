export type User = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Session = {
  id: number;
  token: string;
  expiry: Date;
  userId: number;
};

export type Errors = {
  field: string;
  message: string;
};

export type Tile = {
  title: string;
  userId: number;
  moodId: number;
  achievements: string;
  gratitude: string;
  day: number;
  quote: string;
  slug: string;
};

export type Mood = {
  id: number;
  title: string;
};
