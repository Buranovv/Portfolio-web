import { PHOTO_URL } from "../constants";

export const getPhoto = (photo) => {
  let photoId = photo?._id;
  let photoType = photo?.name?.split(".")[1];
  let realPhoto = `${photoId}.${photoType}`;

  return `${PHOTO_URL}${realPhoto}`;
};

export const getUserPhoto = (photo) => {
  return `${PHOTO_URL}${photo}`;
};
