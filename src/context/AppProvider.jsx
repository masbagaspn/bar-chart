import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [dataset, setDataset] = useState([]);

  const getDataset = async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    );
    const data = await response.json();
    setDataset(data);
  };

  useEffect(() => {
    getDataset();
  }, []);

  return (
    <AppContext.Provider value={{ dataset, setDataset }}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppProvider;
