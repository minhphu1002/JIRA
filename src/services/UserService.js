import { BaseService } from "./BaseService";

export class UserService extends BaseService {
  getUser = (keyWord) => {
    return this.get(`Users/getUser?keyword=${keyWord}`);
  };

  assignUserProject = (userProject) => {
    return this.post(`Project/assignUserProject`, userProject);
  };

  deleteUserFromProject = (userProject) => {
    return this.post(`Project/removeUserFromProject`, userProject);
  };

  getUserByProjectId = (idProject) => {
    return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
  };

  getListUser = (keyWord) => {
    return this.get(`Users/getUser?keyword=${keyWord}`);
  };

  deleteUser = (userId) => {
    return this.delete(`Users/deleteUser?id=${userId}`);
  };

  editUser = (userEdit) => {
    return this.put("Users/editUser", userEdit);
  };

  // editUser = (keyWord) => {
  //   return this.get(`Users/getUser?keyword=${keyWord}`);
  // };
}

export const userService = new UserService();
