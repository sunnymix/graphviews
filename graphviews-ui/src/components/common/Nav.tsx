import { Menu, Dropdown, Space, Button } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { history, useLocation, Link } from "umi";
import { PlusOutlined, CaretDownOutlined } from "@ant-design/icons";
import "./NavStyle.css";
import moment from "moment";

interface NavItemProps {
  label: ReactNode,
  path?: string,
  key?: string,
};

const createMenu = (
  <Menu>
    <Menu.Item key="create-graph">New graph</Menu.Item>
  </Menu>
);

const items: NavItemProps[] = [
  {
    label: "Home",
    path: "/",
    key: "",
  },
  {
    label: "Graph",
    path: "/graph",
    key: "graph",
  },
];

export default (props: any) => {

  // --- active item

  const [activeKey, setActiveKey] = useState<string>("");

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    var key = "";
    if (pathname.startsWith("/graph")) {
      key = "graph";
    }
    setActiveKey(key);
  }, [pathname]);

  const handleTabClick = (path: any) => {
    if (path) {
      history.push(path);
    }
  };

  // --- ui

  return (
  <div className='nav'>
    {items.map((item: NavItemProps, index: number) => (
      <div className={`nav_item ${(item.key == activeKey) && 'active'}`} key={index} onClick={() => handleTabClick(item.path)}>
        {item.label}
      </div>
    ))}
    <Dropdown overlay={createMenu} placement="bottomLeft">
      <div className='nav_new_button'>
        <PlusOutlined />
      </div>
    </Dropdown>
  </div>
  )
};
