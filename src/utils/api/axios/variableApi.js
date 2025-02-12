import { axiosInstance } from "./axiosInstance";

const createVariable = async (variableName, variableExp, pageId) => {
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
    const response = await axiosInstance.delete(`varaibl/${variableId}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export { createVariable, updateVariable, deleteVariable };
