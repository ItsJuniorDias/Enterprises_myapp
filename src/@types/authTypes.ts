export type CreateUserProps = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserGoogleSignInProps = {
  id: string;
  name: string | null;
  email: string | null;
  thumbnail: string | null;
};

export type LoginProps = {
  email: string;
  password: string;
};
