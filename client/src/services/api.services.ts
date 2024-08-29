import _axios from "../utils/axios.utils";

export const handleSignUp: ServiceSignUp = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) =>
  _axios.post("/auth/signup", {
    username,
    email,
    password,
    confirmPassword,
  });

export const handleSignin: (
  username: string,
  password: string
) => Promise<AuthLoginResponse | void> = async (
  username: string,
  password: string
) =>
  _axios.post("/auth/signin", {
    username,
    password,
  });

export const handleGetMyPins = (
  lng: number,
  lat: number,
  rad: number,
  userId: string
) => _axios.get("/ogit", { params: { lng, lat, rad, userId } });

export const handleUploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);

  return _axios.post("/files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const handleCreateNewPin = (
  imgUrl: string,
  lng: number,
  lat: number,
  caption?: string
) => _axios.post("/ogit", { caption, imgUrl, lat, lng });
