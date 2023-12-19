export type User = {
  id?: number;
  name: string
  email: string
  password: string
  birthAt?: Date
  username: string
  about: string
  photo: string
  cover_photo: string
};

export type UserState = {
  id: string | null;
  name: string | null;
  email: string | null;
  username: string | null;
  birthAt: string | null;
  about: string;
  photo: string | null;
  cover_photo: string | null;
  comments: Boolean;
}