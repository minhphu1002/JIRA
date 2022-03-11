import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  MenuOutlined,
  PauseOutlined,
} from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { OPEN_FORM } from "../../redux/constants/DrawerCons";
import FormCreateTask from "./Forms/FormCreateTask";

const { Sider } = Layout;
export default function SidebarCyberbugs() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    collapsed: true,
  });
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{ height: "100%" }}
      >
        {state.collapsed ? (
          <div className="text-center my-3" onClick={toggle}>
            <MenuOutlined
              style={{
                cursor: "pointer",
                color: "#fff",
                fontSize: 25,
              }}
            />
          </div>
        ) : (
          <div className="text-center my-3" onClick={toggle}>
            <PauseOutlined
              style={{
                cursor: "pointer",
                color: "#fff",
                fontSize: 25,
              }}
            />
          </div>
        )}

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            onClick={() => {
              dispatch({
                type: OPEN_FORM,
                title: "CREATE PROJECT",
                ComponentContentDrawer: <FormCreateTask />,
              });
            }}
            key="1"
            icon={<PlusOutlined style={{ fontSize: 20 }} />}
          >
            <span className="mb-2">Create Task</span>
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: 20 }} />}>
            Search
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
