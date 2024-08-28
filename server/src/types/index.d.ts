interface IUser {
  _id?: string;
  email: string;
  passwordHash?: string;
  // tokenRotation?: string[];
  role: number;
  createdAd?: Date;
  updatedAt?: Date;
}

interface IOgitPost {
  _id?: string;
  imgUrl: string;
  lat: number;
  lng: number;
}
