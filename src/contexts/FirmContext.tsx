import { createContext } from "react";

import { FirmContextType } from "../types/firm";

const FirmContext = createContext<FirmContextType | null>(null);

export default FirmContext;
