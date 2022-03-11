import { BaseService } from "./BaseService";

export class TaskService extends BaseService {

  createTask = (taskObject) => {
    return this.post("Project/createTask", taskObject);
  };

  getTaskDetail = (taskId) => {
    return this.get(`Project/getTaskDetail?taskId=${taskId}`);
  };

  updateTask = (taskUpdate) => {
    return this.post(`Project/updateTask`, taskUpdate);
  };
}

export const taskService = new TaskService();
