interface IUser {
  _id?: string;
  username: string;
  email: string;
  passwordHash?: string;
  posts?: [];
  // tokenRotation?: string[];
  // role: number;
  createdAd?: Date;
  updatedAt?: Date;
}

interface IOgitPost {
  _id?: string;
  imgUrl: string;
  lat: number;
  lng: number;
}

type UserValidationError = {
  error: {
    [key: string]: string;
  };
};
