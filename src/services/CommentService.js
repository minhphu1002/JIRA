import { BaseService } from "./BaseService";

export class CommentService extends BaseService {

  getAllComment = (taskId) => {
    return this.get(`Comment/getAll?taskId=${taskId}`);
  };

  insertComment = (cmtObj) => {
    return this.post("Comment/insertComment", cmtObj);
  };

  deleteComment = (idComment) => {
    return this.delete(`Comment/deleteComment?idComment=${idComment}`);
  };

  editComment = (idComment, contentComment) => {
    return this.put(
      `Comment/updateComment?id=${idComment}&contentComment=${contentComment}`
    );
  };
}

export const commentService = new CommentService();
