import React from "react";

import PerfectScrollbar from "react-perfect-scrollbar";

import useSidebar from "../../hooks/useSidebar";
import SidebarFooter from "./SidebarFooter";
import SidebarNav from "./SidebarNav";
import Logo from "../../assets/img/logo64x64.svg?react";

import { SidebarItemsType } from "../../types/sidebar";
import useAuth from "../../hooks/useAuth";

interface SidebarProps {
  items: {
    title: string;
    pages: SidebarItemsType[];
  }[];
  open?: boolean;
  showFooter?: boolean;
}

const Sidebar = ({ items, showFooter = true }: SidebarProps) => {
  const { isOpen } = useSidebar();
  const { user } = useAuth();

  return (
    //render only if user is logged in
    user && (
      <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
        <div className="sidebar-content">
          <PerfectScrollbar>
            <a className="sidebar-brand" href="/">
              <Logo /> <span className="align-middle me-3">XYSoft</span>
            </a>

            <SidebarNav items={items} />
            {!!showFooter && <SidebarFooter />}
          </PerfectScrollbar>
        </div>
      </nav>
    )
  );
};

export default Sidebar;
