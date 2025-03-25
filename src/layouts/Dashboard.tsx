import React, { Suspense, ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Wrapper from "../components/Wrapper";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/Main";
import Navbar from "../components/navbar/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Settings from "../components/Settings";
import Loader from "../components/Loader";
import MainModal from "../pages/ui/MainModal";
import FirmSelection from "../components/FirmSelection";

import useDashboardItems from "../../src/components/sidebar/useDashboardItems";
import useAuth from "../hooks/useAuth";
import { Alert } from "react-bootstrap";

interface DashboardProps {
  children?: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const items = useDashboardItems();
  const { signIn, user, isInitialized } = useAuth();
  console.log("user", user);
  if (!user) {
    return <Alert variant="danger">User not found</Alert>;
  }

  return (
    <React.Fragment>
      {/* // <FirmSelection><FirmSelection/> */}
      <Wrapper>
        <Sidebar items={items} />
        <Main>
          <Navbar />
          <Content>
            <Suspense fallback={<Loader />}>
              {children}
              <Outlet />
            </Suspense>
          </Content>
          <Footer />
        </Main>
      </Wrapper>
      <Settings />
    </React.Fragment>
  );
};

export default Dashboard;
