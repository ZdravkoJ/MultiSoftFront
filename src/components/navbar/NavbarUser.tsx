import React from "react";
import { Dropdown } from "react-bootstrap";
import { PieChart, Settings, User } from "lucide-react";

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";
import { useFirm } from "../../hooks/useFirm";
import Logo from "../../assets/img/logo64x64.svg";

const NavbarUser = () => {
  const { t } = useTranslation();

  const { user, signOut } = useAuth();
  const { handleSelectedFirm } = useFirm();

  const handleLogoutSubmit = async () => {
    await signOut();
    handleSelectedFirm(null);
  };

  return (
    <>
      {user && (
        <Dropdown className="nav-item" align="end">
          <span className="d-inline-block d-sm-none">
            <Dropdown.Toggle as="a" className="nav-link">
              <Settings size={18} className="align-middle" />
            </Dropdown.Toggle>
          </span>
          <span className="d-none d-sm-inline-block">
            <Dropdown.Toggle as="a" className="nav-link">
              <img
                src={Logo}
                className="avatar img-fluid rounded-circle me-1 mt-n2 mb-n2"
                alt="Chris Wood"
                width="40"
                height="40"
              />
              <span>{user?.username}</span>
            </Dropdown.Toggle>
          </span>
          <Dropdown.Menu>
            <Dropdown.Item>
              <User size={18} className="align-middle me-2" />
              {t("Profile")}
            </Dropdown.Item>
            <Dropdown.Item>
              <PieChart size={18} className="align-middle me-2" />
              Analytics
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Settings & Privacy</Dropdown.Item>
            <Dropdown.Item>{t("Help")}</Dropdown.Item>
            <Dropdown.Item onClick={handleLogoutSubmit}>
              {t("SignOut")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
};

export default NavbarUser;
