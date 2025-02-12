import { axiosInstance } from "./axiosInstance";

const getPage = async (pageId) => {
  try {
    const response = await axiosInstance.get(`page/${pageId}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createPage = async (projectId, pageName, pageExp) => {
  try {
    const newPage = {
      projectId,
      pageName,
      pageExp,
    };
    const response = await axiosInstance.post("page", newPage);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updatePage = async (pageId, pageName, pageExp) => {
  try {
    const updatePage = {
      pageName,
      pageExp,
    };
    const response = await axiosInstance.put(`page/${pageId}`, updatePage);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deletePage = async (pageId) => {
  try {
    const response = await axiosInstance.delete(`page/${pageId}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export { getPage, createPage, updatePage, deletePage };
