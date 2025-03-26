import React, { createContext, useContext, useState, useEffect } from "react";
import { Firm } from "../types/firm";
import FirmContext from "./FirmContext";

const FirmProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedFirm, setSelectedFirm] = useState<Firm | null>(null);

  useEffect(() => {
    const storedFirm = localStorage.getItem("selectedFirm");

    if (storedFirm) {
      setSelectedFirm(JSON.parse(storedFirm));
    }
  }, []);

  const handleSelectedFirm = (firm: Firm) => {
    setSelectedFirm(firm);
    localStorage.setItem("selectedFirm", JSON.stringify(firm));
  };

  return (
    <FirmContext.Provider value={{ selectedFirm, handleSelectedFirm }}>
      {children}
    </FirmContext.Provider>
  );
};

export default FirmProvider;
