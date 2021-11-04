export type User = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
};

export type Author = {
  userId: number;
  username: string;
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
