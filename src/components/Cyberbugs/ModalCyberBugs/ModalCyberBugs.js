import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";

import {
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_STATUS_SAGA,
  CHANGE_TASK_MODAL,
  REMOVE_USER_ASSIGN,
  CHANGE_ASSIGNESS,
  GET_ALL_TASK_TYPE_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  ADD_COMMENT_SAGA,
  DELETE_COMMENT_SAGA,
  EDIT_COMMENT_SAGA,
} from "../../../redux/constants/CreateProjectCons";

import { Editor } from "@tinymce/tinymce-react";
import { Select, Popconfirm } from "antd";

export default function ModalCyberBugs() {
  const { taskDetailModal } = useSelector((state) => state.TaskDetailReducer);
  const { arrPriority } = useSelector((state) => state.CreateTaskReducer);
  const { arrStatus } = useSelector((state) => state.CreateTaskReducer);
  const { arrTaskType } = useSelector((state) => state.CreateTaskReducer);
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const { userLogin } = useSelector((state) => state.UserLoginCyberBugsReducer);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [visibleEditorAddComment, setvisibleEditorAddComment] = useState(true);

  const [visibleEditorEditComment, setvisibleEditorEditComment] =
    useState(true);

  const [historyContent, setHistoryContent] = useState(
    taskDetailModal.description
  );
  const [content, setContent] = useState(taskDetailModal.description);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
  }, [dispatch]);

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              name="description"
              initialValue={taskDetailModal.description}
              init={{
                selector: "textarea#myTextArea",

                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor |alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: CHANGE_TASK_MODAL,
                  name: "description",
                  value: content,
                });
                setVisibleEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: CHANGE_TASK_MODAL,
                  name: "description",
                  value: historyContent,
                });
                setVisibleEditor(false);
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              setHistoryContent(taskDetailModal.description);
              setVisibleEditor(!visibleEditor);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const renderComment = () => {
    let contentComment;

    return (
      <div>
        <div className="block-comment mt-4 mb-4" style={{ display: "flex" }}>
          <div className="avatar">
            <img src={userLogin.avatar} alt="avatar" />
          </div>
          <div className="input-comment">
            {visibleEditorAddComment ? (
              <input
                style={{ borderRadius: 12 }}
                onClick={() => {
                  setvisibleEditorAddComment(!visibleEditorAddComment);
                }}
                type="text"
                placeholder="Add a comment ..."
              />
            ) : (
              <div>
                <Editor
                  onEditorChange={(content) => {
                    contentComment = content;
                  }}
                  name="comment"
                  init={{
                    selector: "textarea#myTextArea",

                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor |alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help",
                  }}
                />
                <button
                  className="btn btn-primary m-2"
                  onClick={() => {
                    setvisibleEditorAddComment(true);
                    dispatch({
                      type: ADD_COMMENT_SAGA,
                      cmtObj: {
                        taskId: taskDetailModal.taskId,
                        contentComment: contentComment,
                      },
                    });
                  }}
                >
                  Add Comment
                </button>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => {
                    setvisibleEditorAddComment(true);
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="lastest-comment">
          {taskDetailModal.lstComment?.map((cmt, index) => {
            return (
              <div key={index} className="comment-item mb-4">
                <div className="display-comment" style={{ display: "flex" }}>
                  <div className="avatar">
                    <img src={cmt.avatar} alt="xyz" />
                  </div>
                  {visibleEditorEditComment ? (
                    <div>
                      <p style={{ marginBottom: 5 }}>
                        {cmt.name}
                        <span style={{ color: "#929398" }}> - a day ago</span>
                      </p>
                      <p style={{ marginBottom: 5 }}>
                        {ReactHtmlParser(cmt.commentContent)}
                      </p>
                      <div>
                        <span
                          onClick={() => {
                            setvisibleEditorEditComment(
                              !visibleEditorEditComment
                            );
                          }}
                          style={{
                            color: "#929398",
                            marginRight: 12,
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </span>
                        <Popconfirm
                          title="Are you sure to delete this comment?"
                          onConfirm={() => {
                            dispatch({
                              type: DELETE_COMMENT_SAGA,
                              idComment: cmt.id,
                              taskId: taskDetailModal.taskId,
                            });
                          }}
                          okText="Sure"
                          cancelText="No"
                        >
                          Delete
                        </Popconfirm>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Editor
                        onEditorChange={(content) => {
                          contentComment = content;
                        }}
                        initialValue={cmt.commentContent}
                        init={{
                          selector: "textarea#myTextArea",

                          height: 500,
                          menubar: false,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | bold italic backcolor |alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help",
                        }}
                      />
                      <button
                        className="btn btn-primary m-2"
                        onClick={() => {
                          setvisibleEditorEditComment(true);
                          dispatch({
                            type: EDIT_COMMENT_SAGA,
                            idComment: cmt.id,
                            contentCommentEdit: contentComment,
                            taskId: taskDetailModal.taskId,
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-primary m-2"
                        onClick={() => {
                          setvisibleEditorEditComment(true);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: CHANGE_TASK_MODAL,
      name,
      value,
    });
  };
  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="logged">{Number(timeTrackingRemaining)}logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <select
                name="typeId"
                value={taskDetailModal.typeId}
                onChange={handleChange}
              >
                {arrTaskType.map((tp, index) => {
                  return (
                    <option key={index} value={tp.id}>
                      {tp.taskType}
                    </option>
                  );
                })}
              </select>

              <span>{taskDetailModal.taskName}</span>
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i
                className="fa fa-trash-alt='xyz'"
                style={{ cursor: "pointer" }}
              />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">
                    This is an issue of type:{" "}
                    {taskDetailModal.taskTypeDetail.taskType}
                  </p>
                  <div className="description">
                    <h6>Description</h6>
                    {renderDescription()}
                  </div>
                  <div className="comment">
                    <h6 className="mt-4">Comment</h6>

                    {renderComment()}
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      name="statusId"
                      className="custom-select"
                      value={taskDetailModal.statusId}
                      onChange={(e) => {
                        dispatch({
                          type: HANDLE_CHANGE_POST_API_SAGA,
                          actionType: CHANGE_TASK_MODAL,
                          value: e.target.value,
                          name: "statusId",
                        });
                      }}
                    >
                      {arrStatus.map((status, index) => {
                        return (
                          <option value={status.statusId} key={index}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div className="row">
                      {taskDetailModal.assigness?.map((user, index) => {
                        return (
                          <div key={index} className="col-6  mt-2 ">
                            <div style={{ display: "flex" }} className="item">
                              <div className="avatar">
                                <img src={user.avatar} alt={user.avatar} />
                              </div>
                              <p className="name mt-1 ml-1">{user.name}</p>
                              <i
                                className="fa fa-times"
                                style={{
                                  marginLeft: 20,
                                  cursor: "pointer",
                                  paddingTop: "10px",
                                }}
                                onClick={() => {
                                  dispatch({
                                    type: HANDLE_CHANGE_POST_API_SAGA,
                                    actionType: REMOVE_USER_ASSIGN,
                                    userId: user.id,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}

                      <div className="col-6  mt-2 mb-4">
                        <Select
                          options={projectDetail.members
                            ?.filter((mem) => {
                              let index = taskDetailModal.assigness?.findIndex(
                                (us) => us.id === mem.userId
                              );
                              if (index !== -1) {
                                return false;
                              }
                              return true;
                            })
                            .map((mem) => {
                              return { value: mem.userId, label: mem.name };
                            })}
                          optionFilterProp="label"
                          style={{ width: "100%" }}
                          name="lstUser"
                          value="+ Add more"
                          className="form-control"
                          onSelect={(value) => {
                            if (value === "0") {
                              return;
                            }
                            let userSelected = projectDetail.members.find(
                              (mem) => mem.userId === value
                            );
                            userSelected = {
                              ...userSelected,
                              id: userSelected.userId,
                            };

                            dispatch({
                              type: HANDLE_CHANGE_POST_API_SAGA,
                              actionType: CHANGE_ASSIGNESS,
                              userSelected,
                            });
                          }}
                        ></Select>
                      </div>
                    </div>
                  </div>

                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      name="priorityId"
                      className="form-control"
                      value={taskDetailModal.priorityId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {arrPriority.map((item, index) => {
                        return (
                          <option key={index} value={item.priorityId}>
                            {item.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      name="originalEstimate"
                      type="text"
                      className="estimate-hours"
                      value={taskDetailModal.originalEstimate}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
