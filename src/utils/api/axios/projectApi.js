import { axiosInstance } from "./axiosInstance";

const getProjectByUUID = async (uuid) => {
  try {
    const response = await axiosInstance.get(`project/${uuid}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
const createProject = async (projectName, uuid) => {
  try {
    const newProject = {
      projectName,
      uuid,
    };
    console.log(newProject);
    const response = await axiosInstance.post("project", newProject);
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};
const updateProject = async (projectId, projectName) => {
  try {
    const updateProject = {
      projectName,
    };
    const response = await axiosInstance.put(
      `project/${projectId}`,
      updateProject
    );
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};
const deleteProject = async (projectId) => {
  try {
    const response = await axiosInstance.delete(`project/${projectId}`);
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

export { getProjectByUUID, createProject, updateProject, deleteProject };
