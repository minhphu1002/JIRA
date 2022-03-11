import React, { useState, useEffect, useRef } from "react";
import { Table, Popconfirm, AutoComplete } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  FormOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  DELETE_USER_SAGA,
  EDIT_USER,
  GET_LIST_USER_SAGA,
} from "../../../redux/constants/Cyberbugs/Cyberbugs";
import { GET_USER_API, OPEN_FORM } from "../../../redux/constants/DrawerCons";
import FormEditUser from "../../../components/Cyberbugs/Forms/FormEditUser";

export default function UserManagement() {
  const searchRef = useRef(null);

  const [value, setValue] = useState("");
  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_LIST_USER_SAGA,
      keyWord: "",
    });
  }, [dispatch]);

  const arrUser = useSelector(
    (state) => state.UserLoginCyberBugsReducer.arrUser
  );

  const columns = [
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      sorter: (next, pre) => next.userId - pre.userId,
    },

    {
      title: "User Name",
      dataIndex: "name",
      key: "name",

      sorter: (item2, item1) => {
        let name1 = item1.name?.trim().toLowerCase();
        let name2 = item2.name?.trim().toLowerCase();
        if (name2 < name1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (item2, item1) => {
        let email1 = item1.email?.trim().toLowerCase();
        let email2 = item2.email?.trim().toLowerCase();
        if (email2 < email1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (item2, item1) => {
        let phoneNumber1 = item1.phoneNumber?.trim().toLowerCase();
        let phoneNumber2 = item2.phoneNumber?.trim().toLowerCase();
        if (phoneNumber2 < phoneNumber1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => {
        return (
          <div key={index}>
            <button
              className="btn mr-2 btn-primary"
              onClick={() => {
                const action = {
                  type: OPEN_FORM,
                  title: "EDIT USER",
                  ComponentContentDrawer: <FormEditUser />,
                };
                dispatch(action);

                const actionEditUser = {
                  type: EDIT_USER,
                  userEdit: record,
                };
                dispatch(actionEditUser);
              }}
            >
              <FormOutlined style={{ fontSize: 16 }} />
            </button>

            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                dispatch({ type: DELETE_USER_SAGA, userId: record.userId });
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
      <h3 className="mb-4 text-primary">User Management</h3>
      <AutoComplete
        className="mb-4 w-25"
        placeholder="Search User Name here"
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
            type: GET_LIST_USER_SAGA,
            keyWord: valueSelect,
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
          }, 800);
        }}
        style={{ width: "100%", height: 40 }}
      />
      <button
        onClick={() => {
          dispatch({
            type: GET_LIST_USER_SAGA,
            keyWord: "",
          });
        }}
        className="btn ml-2 btn-sm btn-outline-info"
      >
        <ReloadOutlined />
      </button>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={arrUser}
      />
    </div>
  );
}
