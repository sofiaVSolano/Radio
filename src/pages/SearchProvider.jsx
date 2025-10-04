import React, 
{ useState } from "react";
import { SearchContext } from "../hooks/searchContext"

export const SearchProvider = ({ children }) => {
    const [selectedStation, setSelectedStation] = useState(null);

    return (
    <SearchContext.Provider value={{ selectedStation, setSelectedStation }}>
      {children}
    </SearchContext.Provider>
    );
};