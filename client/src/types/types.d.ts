type User = {
  _id: string;
  username: string;
  email?: string;
  posts: OgitPost[];
  createdAt?: Date;
  updatedAt?: Date;
};

type OgitPost = {
  _id?: string;
  caption?: string;
  imgUrl: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  poster: User;
  createdAt: Date;
  updatedAt: Date;
};

type AuthLoginResponse = {
  token: string;
  user: IUser;
};

type AuthReducer<S, A> = (state: S, action: A) => S;
type AuthAction = { type: "LOGIN"; payload: IUser } | { type: "LOGOUT" };
type AuthState = {
  isAuthenticated: boolean;
  user: IUser | null;
};
type ServiceSignUp = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => Promise<void>;
type ServiceSignIn = (username: string, password: string) => Promise<void>;
