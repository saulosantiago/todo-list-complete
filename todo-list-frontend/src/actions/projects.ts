import Cookies from 'js-cookie';
import apiCall from "../apiCall";

export const createProject = async (project: any) => {
  try {
    const res = await apiCall('/projects', 'post', project, Cookies.get('accessToken'));
    return res;
  } catch (err) {
    console.log(err)
  }
};

export const listProjects = async () => {
  try {
    const res = await apiCall('/projects', 'get', null, Cookies.get('accessToken'));
    return res;
  } catch (err) {
    console.log(err)
  }
};

export const editProject = async (projectId: string, project: any) => {
  try {
    const res = await apiCall(`/projects/${projectId}`, 'put', project, Cookies.get('accessToken'));
    return res;
  } catch (err) {
    console.log(err)
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    const res = await apiCall(`/projects/${projectId}`, 'delete', null, Cookies.get('accessToken'));
    return res;
  } catch (err) {
    console.log(err)
  }
};

export const createTask = async (projectId: string, task: any) => {
  try {
    const res = await apiCall(`/projects/${projectId}/tasks`, 'post', task, Cookies.get('accessToken'));
    return res;
  } catch (err) {
    console.log(err)
  }
}

export const markTaskAsDone = async (projectId: string, taskId: string) => {
  try {
    const payload = {
      completed_at: Date.now()
    }
    const res = await apiCall(`/projects/${projectId}/tasks/${taskId}`, 'put', payload, Cookies.get('accessToken'));
    return res;
  } catch (err) {
    console.log(err)
  }
}

export const markTaskAsNotDone = async (projectId: string, taskId: string) => {
  try {
    const payload = {
      completed_at: null
    }
    const res = await apiCall(`/projects/${projectId}/tasks/${taskId}`, 'put', payload, Cookies.get('accessToken'));
    return res;
  } catch (err) {
    console.log(err)
  }
}

export const editTask = async (projectId: string, taskId: string, task: any) => {
  try {
    const res = await apiCall(`/projects/${projectId}/tasks/${taskId}`, 'put', task, Cookies.get('accessToken'));
    return res;
  } catch (err) {
    console.log(err)
  }
}

export const deleteTask = async (projectId: string, taskId: string) => {
  try {
    const res = await apiCall(`/projects/${projectId}/tasks/${taskId}`, 'delete', null, Cookies.get('accessToken'));
    return res;
  } catch (err) {
    console.log(err)
  }
}

