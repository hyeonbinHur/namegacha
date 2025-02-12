import { axiosInstance } from "./axiosInstance";

const createThread = async () => {
  try {
    const response = await axiosInstance.get("ai/thread");
    console.log(response.data.id);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getMessage = async (threadId) => {
  try {
    const response = await axiosInstance.get(`ai/message/${threadId.id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getStatus = async (threadId, runId) => {
  try {
    const response = await axiosInstance.get(
      `ai/status/${threadId.id}/runId?runId=${runId}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

const getReply = async (threadId) => {
  try {
    const data = {
      threadId,
    };
    const response = await axiosInstance.get(`ai/message/${threadId.id}`, data);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const sendMessage = async (threadId, message) => {
  try {
    const newMessage = { threadId: threadId.id, message };
    const response = await axiosInstance.post("ai", newMessage);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export { createThread, getMessage, getStatus, getReply, sendMessage };
