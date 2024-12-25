import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { UserOutlined, HomeOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link,
} from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import ProductsPage from "./screens/productsPage.tsx";
import UsersPage from "./screens/usersPage.tsx";
import MainLayout from "./components/Layout/Layout.tsx";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <Link to={"/"}>Home</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/users">Users</Link>,
    key: "users",
    icon: <UserOutlined />,
  },
  {
    label: <Link to="/products">Products</Link>,
    key: "products",
    icon: <SettingOutlined />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      style={{ marginBottom: 30 }}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

const Layout = () => {
  return (
    <MainLayout>
      <Header />
      <Outlet />
    </MainLayout>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
