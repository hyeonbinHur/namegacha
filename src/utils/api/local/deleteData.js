import axios from 'axios';
async function deleteProject(projectId) {
    try {
        const endPoint = `http://localhost:8000/namegacha/api/projects/${projectId}`;
        return await axios.delete(endPoint);
    } catch (error) {
        console.error('error occured from update project API : ', error);
    }
}
async function deletePage(pageId) {
    try {
        const endPoint = `http://localhost:8000/namegacha/api/pages/${pageId}`;

        return await axios.delete(endPoint);
    } catch (error) {
        console.error('error occured from update project API : ', error);
    }
}
async function deleteVariable(varId) {
    try {
        const endPoint = `http://localhost:8080/namegacha/api/variables/${varId}`;
        return await axios.delete(endPoint);
    } catch (error) {
        console.error('error occured from update project API : ', error);
    }
}
async function deleteFunction(functionId) {
    try {
        const endPoint = `http://localhost:8080/namegacha/api/functions/${functionId}`;

        return await axios.delete(endPoint);
    } catch (error) {
        console.error('error occured from update project API : ', error);
    }
}

export { deleteProject, deletePage, deleteVariable, deleteFunction };
