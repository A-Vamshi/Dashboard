import { DashboardOutlined, ProjectOutlined, ShopOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
     {
          name: "Dashboard",
          list: '/',
          meta: {
               label: "Dashboard",
               icon: <DashboardOutlined />
          }
     },
     {
          name: "Companies",
          list: '/companies',
          show: "/companies/:id",
          create: "/companies/new",
          edit: "/companies/edit/:id",
          meta: {
               label: "Companies",
               icon: <ShopOutlined />
          }
     },
     {
          name: "Tasks",
          list: '/tasks',
          create: "/tasks/new",
          edit: "/tasks/edit/:id",
          meta: {
               label: "Tasks",
               icon: <ProjectOutlined />
          }
     },
]
