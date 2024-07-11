import axios from 'axios';

async function createProject(projectName) {
    try {
        const endPoint = 'http://localhost:8080/namegacha/api/projects';
        const data = {
            projectName: projectName,
        };
        return await axios.post(endPoint, data);
    } catch (error) {
        console.error('error occured from update project API : ', error);
    }
}
async function createPage(projectId, pageName) {
    try {
        const endPoint = `http://localhost:8000/namegacha/api/pages`;
        const data = {
            pageName: pageName,
            projectId: projectId,
        };
        return await axios.post(endPoint, data);
    } catch (error) {
        console.error('error occured from update project API : ', error);
    }
}
async function createVariable(pageId_fk, varName, varExp) {
    try {
        const endPoint = 'http://localhost:8080/namegacha/api/variables';
        const data = {
            variableName: varName,
            variableExp: varExp,
            pageId_fk: pageId_fk,
        };
        return await axios.post(endPoint, data);
    } catch (error) {
        console.error('error occured from update project API : ', error);
    }
}
async function createFunction(pageId_fk, functionName, functionExp) {
    try {
        const endPoint = 'http://localhost:8080/namegacha/api/functions';
        const data = {
            functionName: functionName,
            functionExp: functionExp,
            pageId_fk: pageId_fk,
        };
        return await axios.post(endPoint, data);
    } catch (error) {
        console.error('error occured from update project API : ', error);
    }
}

export { createProject, createPage, createFunction, createVariable };
