import { BaseService } from "./BaseService";

export class ProjectService extends BaseService {

  getAllTaskType = () => {
    return this.get("TaskType/getAll");
  };

  getAllPriority = () => {
    return this.get(`Priority/getAll`);
  };

  deleteProject = (id) => {
    return this.delete(`/Project/deleteProject?projectId=${id}`);
  };

  getProjectDetail = (projectId) => {
    return this.get(`Project/getProjectDetail?id=${projectId}`);
  };

  getAllStatus = () => {
    return this.get(`Status/getAll`);
  };
}

export const projectService = new ProjectService();
