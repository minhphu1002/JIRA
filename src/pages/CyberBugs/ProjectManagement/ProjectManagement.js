import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Tag,
  Button,
  Avatar,
  Popconfirm,
  Popover,
  AutoComplete,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  DELETE_PROJECT,
  EDIT_PROJECT,
  GET_LIST_TASK_SAGA,
} from "../../../redux/constants/Cyberbugs/Cyberbugs";
import FormEditProject from "../../../components/Cyberbugs/Forms/FormEditProject";
import {
  ADD_USER_PROJECT_API,
  GET_USER_API,
  OPEN_FORM,
  REMOVE_USER_PROJECT_API,
} from "../../../redux/constants/DrawerCons";
import { NavLink } from "react-router-dom";

export default function ProjectManagement() {
  const searchRef = useRef(null);

  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_LIST_TASK_SAGA,
    });
  }, [dispatch]);

  const arrTaskList = useSelector(
    (state) => state.ProjectManagementReducer.arrTaskList
  );

  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (next, pre) => next.id - pre.id,
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record, index) => {
        return <NavLink to={`projectdetail/${record.id}`}>{text}</NavLink>;
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: "category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: "creator",
      // dataIndex: 'creator',
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: "members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="bottom"
                  title={"Members"}
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    alt=""
                                    src={item.avatar}
                                    width="40"
                                    height="40"
                                    style={{ borderRadius: "50%" }}
                                  />
                                </td>
                                <td
                                  style={{
                                    fontSize: 24,
                                    textAlign: "center",
                                  }}
                                >
                                  {item.name}
                                </td>
                                <td>
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: REMOVE_USER_PROJECT_API,
                                        userProject: {
                                          userId: item.userId,
                                          projectId: record.id,
                                        },
                                      });
                                    }}
                                    className="btn btn-danger"
                                    style={{
                                      borderRadius: "50%",
                                    }}
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
            })}

            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}

            <Popover
              placement="bottom"
              title={"Add new user"}
              content={() => {
                return (
                  <AutoComplete
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    options={userSearch?.map((user) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    onSelect={(valueSelect, option) => {
                      setValue(option.label);
                      dispatch({
                        type: ADD_USER_PROJECT_API,
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: GET_USER_API,
                          keyword: value,
                        });
                      }, 400);
                    }}
                    style={{ width: "100%" }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%" }}>+</Button>
            </Popover>
          </div>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => {
        return (
          <div>
            <button
              className="btn mr-2 btn-primary"
              onClick={() => {
                const action = {
                  type: OPEN_FORM,
                  title: "EDIT PROJECT",
                  ComponentContentDrawer: <FormEditProject />,
                };
                dispatch(action);

                const actionEditProject = {
                  type: EDIT_PROJECT,
                  projectEdit: record,
                };
                dispatch(actionEditProject);
              }}
            >
              <FormOutlined style={{ fontSize: 16 }} />
            </button>

            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                dispatch({ type: DELETE_PROJECT, idProject: record.id });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined style={{ fontSize: 17 }} />
              </button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-primary">Project management</h3>

      <Table columns={columns} rowKey={"id"} dataSource={arrTaskList} />
    </div>
  );
}
