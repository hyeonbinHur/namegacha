import axios from 'axios';

const createThread = async () => {
    try {
        const response = await axios.get(
            'https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/ai?content=thread'
        );
        const responseThreadId = response.data;
        // setThread(resposeThreadId);
        // console.log(resposeThreadId);
        return responseThreadId;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const readMessages = async (threadId) => {
    try {
        const response = await axios.get(
            `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/ai?content=messages&threadId=${threadId}`
        );
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const sendMessage = async (threadId, message) => {
    try {
        const body = {
            threadId: threadId,
            message: message,
        };
        const endPoint =
            'https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/ai';
        const response = await axios.post(endPoint, body);
        const responseRunId = response.data;
        return responseRunId;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
const checkStatus = async (threadId, runId) => {
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/ai?content=status&threadId=${threadId}&runId=${runId}`;
        const response = await axios.get(endPoint);
        const status = response.data;
        return status;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};
const readReply = async (threadId) => {
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/ai?content=reply&threadId=${threadId}`;
        const response = await axios.get(endPoint);
        const reply = response.data;
        const answer = reply[0].text.value;
        return answer;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
};

export { createThread, readMessages, readReply, checkStatus, sendMessage };
