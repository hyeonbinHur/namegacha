import { axiosInstance } from "./axiosInstance";

const createFunction = async (pageId, functionName, functionExp) => {
  try {
    const newFunction = {
      pageId,
      functionName,
      functionExp,
    };
    const response = await axiosInstance.post("function", newFunction);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
const updateFunction = async (functiondId, functionName, functionExp) => {
  try {
    const updateFunction = {
      functionName,
      functionExp,
    };
    const response = await axiosInstance.put(
      `function/${functiondId}`,
      updateFunction
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
const deleteFunction = async (functionId) => {
  try {
    const response = await axiosInstance.delete(`function/${functionId}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteFunctionsInPage = () => {};
export {
  createFunction,
  updateFunction,
  deleteFunction,
  deleteFunctionsInPage,
};
