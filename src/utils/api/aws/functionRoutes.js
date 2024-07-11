import axios from 'axios';

async function getFunction(functionId) {
    //get
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/function?functionId=${functionId}`;
        const response = await axios.get(endPoint);
        return response.data;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

async function getFunctions() {
    //get
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/function/functions`;
        const response = await axios.get(endPoint);
        return response.data;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

async function createFunction(pageId, functionName, functionExp) {
    //post
    try {
        console.log('Start create function');
        console.log('page id : ' + pageId);
        console.log('function name : ' + functionName);
        console.log('finction exp : ' + functionExp);
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/function`;
        const body = {
            functionName: functionName,
            pageId: pageId,
            functionExp: functionExp,
        };
        const response = await axios.post(endPoint, body);
        return response.data;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

async function updateFunction(functionId, functionName, functionExp) {
    //put
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/function?functionId=${functionId}`;
        const body = {
            functionName: functionName,
            functionExp: functionExp,
        };
        const response = await axios.put(endPoint, body);
        return response.data;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

async function deleteFunction(functionId) {
    //delete
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/function?content=certain&functionId=${functionId}`;
        const response = await axios.delete(endPoint);
        return response.data;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

async function deleteFunctionsInPage(pageId) {
    try {
        const endPoint = `https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/function?content=inpage&pageId=${pageId}`;
        const response = await axios.delete(endPoint);
        return response;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

export {
    getFunction,
    getFunctions,
    createFunction,
    updateFunction,
    deleteFunction,
    deleteFunctionsInPage,
};
