import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Firm, LicenseType } from "../types/firm";

const firms: Firm[] = [
  {
    id: 1,
    name: "Company 1",
    license: {
      type: LicenseType.Basic,
      start: new Date(),
      expiration: new Date(),
    },
  },
  {
    id: 2,
    name: "Company 2",
    license: {
      type: LicenseType.Basic,
      start: new Date(),
      expiration: new Date(),
    },
  },
  {
    id: 3,
    name: "Company 3",
    license: {
      type: LicenseType.Basic,
      start: new Date(),
      expiration: new Date(),
    },
  },
];

const FirmSelection = (firms: Firm[]) => {
  const [selectedFirm, setSelectedFirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Focus the search input when the component is mounted
    if (searchInputRef.current) {
    }
  }, []);
};

export default FirmSelection;
