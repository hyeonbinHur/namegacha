import axios from 'axios';

export async function getOneProject(projectId) {
    try {
        const resposne = await axios.get(
            `http://localhost:8080/namegacha/api/projects/${projectId}`
        );
        return resposne.data;
    } catch (error) {
        console.error('Error from getAllProjects: ', error);
    }
}

export async function getAllProjects() {
    try {
        const resposne = await axios.get(
            'http://localhost:8080/namegacha/api/projects'
        );
        return resposne.data;
    } catch (error) {
        console.error('Error from getAllProjects: ', error);
    }
}

export async function getPagesInProject(projectId) {
    try {
        const resposne = await axios.get(
            `http://localhost:8080/namegacha/api/pages/project/${projectId}`
        );
        return resposne.data;
    } catch (error) {
        console.error('Error from getAllProjects: ', error);
    }
}

export async function getAllPages() {
    try {
        const resposne = await axios.get(
            'http://localhost:8080/namegacha/api/pages'
        );
        return resposne.data;
    } catch (error) {
        console.error('Error from getAllProjects: ', error);
    }
}

export async function getVariablesInPage(pageId) {
    try {
        const resposne = await axios.get(
            `http://localhost:8080/namegacha/api/variables/pages/${pageId}`
        );
        return resposne.data;
    } catch (error) {
        console.error('Error from getAllProjects: ', error);
    }
}

export async function getAllVariables() {
    try {
        const resposne = await axios.get(
            'http://localhost:8080/namegacha/api/variables'
        );
        return resposne.data;
    } catch (error) {
        console.error('Error from getAllProjects: ', error);
    }
}

export async function getFunctionsInPage(pageId) {
    try {
        const resposne = await axios.get(
            `http://localhost:8080/namegacha/api/functions/pages/${pageId}`
        );
        return resposne.data;
    } catch (error) {
        console.error('Error from getAllProjects: ', error);
    }
}

export async function getAllFunctions() {
    try {
        const resposne = await axios.get(
            'http://localhost:8080/namegacha/api/functions'
        );
        return resposne.data;
    } catch (error) {
        console.error('Error from getAllProjects: ', error);
    }
}

export async function getProjectInfomation(projectId) {
    try {
        const resposne = await axios.get(
            `http://localhost:8080/namegacha/api/all/projects/${projectId}`
        );
        return resposne.data;
    } catch (error) {
        console.error('Error from getAllProjects: ', error);
    }
}

export async function getALLInfomation() {
    try {
        const resposne = await axios.get(
            'http://localhost:8080/namegacha/api/all/projects'
        );
        return resposne.data;
    } catch (error) {
        console.error('Error from getAllProjects: ', error);
    }
}
