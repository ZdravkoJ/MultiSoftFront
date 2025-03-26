import { useContext } from "react";
import FirmContext from "../contexts/FirmContext";

export const useFirm = () => {
  const context = useContext(FirmContext);

  if (!context)
    throw new Error("FirmContext must be placed within FirmProvider");

  return context;
};
