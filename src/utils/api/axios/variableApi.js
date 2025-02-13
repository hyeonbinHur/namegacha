import { axiosInstance } from "./axiosInstance";

const createVariable = async (pageId, variableName, variableExp) => {
  try {
    const newVariable = {
      variableName,
      variableExp,
      pageId,
    };
    const response = await axiosInstance.post("variable", newVariable);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateVariable = async (variableId, variableName, variableExp) => {
  try {
    const updateVariable = {
      variableName,
      variableExp,
    };
    const response = await axiosInstance.put(
      `variable/${variableId}`,
      updateVariable
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteVariable = async (variableId) => {
  try {
    const response = await axiosInstance.delete(`variable/${variableId}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteVariablesInPage = () => {};
export {
  createVariable,
  updateVariable,
  deleteVariable,
  deleteVariablesInPage,
};
