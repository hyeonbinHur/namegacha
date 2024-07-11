import axios from 'axios';

async function updateProject(projectId, projectName) {
    try {
        const endPoint = `http://localhost:8000/namegacha/api/projects/${projectId}`;
        const body = {
            projectName: projectName,
        };
        return await axios.put(endPoint, body);
    } catch (error) {
        console.error('error occured from update project API : ', error);
    }
}
async function updatePage(pageId, pageName) {
    try {
        const endPoint = `http://localhost:8000/namegacha/api/pages/${pageId}`;
        const body = {
            pageName: pageName,
        };
        return await axios.put(endPoint, body);
    } catch (error) {
        console.error('error occured from update project API : ', error);
    }
}
async function updateVariable(varId, varName, varExp) {
    try {
        const endPoint = `http://localhost:8080/namegacha/api/variables/${varId}`;
        const body = {
            variableName: varName,
            variableExp: varExp,
        };
        return await axios.put(endPoint, body);
    } catch (error) {
        console.error('error occured from update project API : ', error);
    }
}
async function updateFunction(functionId, functionName, functionExp) {
    try {
        const endPoint = `http://localhost:8080/namegacha/api/functions/${functionId}`;
        const body = {
            functionName: functionName,
            functionExp: functionExp,
        };
        return await axios.put(endPoint, body);
    } catch (error) {
        console.error('error occured from update project API : ', error);
    }
}

export { updateProject, updatePage, updateFunction, updateVariable };
