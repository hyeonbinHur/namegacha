import { axiosInstance } from "./axiosInstance";
const buildResponse = (status, userObject, message) => {
  return {
    status: status,
    userObject: userObject,
    message: message,
  };
};
const signUpUser = async (userId, userPassword) => {
  try {
    const newUser = {
      userId,
      userPassword,
    };
    const response = await axiosInstance.post("auth/sign-up", newUser);
    return buildResponse(response.status);
  } catch (err) {
    throw new Error(err.message);
  }
};
const signInUser = async (userId, userPassword) => {
  //post
  try {
    const user = {
      userId,
      userPassword,
    };
    const response = await axiosInstance.post("auth/sign-in", user, {
      withCredentials: true,
    });
    const userObject = {
      uuid: response.uuid,
      userId: response.userId,
    };
    return buildResponse(response.status, userObject);
  } catch (err) {
    throw new Error(err.message);
  }
};

const signOutUser = async () => {
  //post
  try {
    const response = await axiosInstance.post(
      "auth/sign-out",
      {},
      { withCredentials: true }
    );
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};
const accessToken = async () => {
  //post
  try {
    console.log("here");
    const response = await axiosInstance.post(
      "auth/access-token",
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};
const refreshToken = async () => {
  //post
  try {
    const response = await axiosInstance.post(
      "auth/access-token",
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};
const checkTokens = async () => {
  //access, refresh 번갈아서 알아서
  try {
    //
    const accessTokenResponse = await accessToken();
    // const refreshTokenResponse = await refreshToken();
    return accessTokenResponse;
  } catch (err) {
    throw new Error(err.message);
  }
};
const getUser = async (uuid) => {
  //get
  try {
    const response = await axiosInstance.get(`auth/${uuid}`);
    return response.data[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

export {
  signUpUser,
  signInUser,
  signOutUser,
  accessToken,
  refreshToken,
  checkTokens,
  getUser,
};
