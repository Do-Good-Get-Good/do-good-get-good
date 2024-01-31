import React, { useState, useContext, useEffect } from "react";

import { getMaxConfirmedHours } from "../firebase-functions/get";

const TimeStatisticsContext = React.createContext();

export const useTimeStatisticSettings = () => {
  return useContext(TimeStatisticsContext);
};

export const TimeStatisticsProvider = ({ children }) => {
  const [maxConfirmedHours, setMaxConfirmedHours] = useState(null);

  const fetchTimeStatisticsSetting = async () => {
    const maxAmount = await getMaxConfirmedHours();
    setMaxConfirmedHours(maxAmount);
  };

  useEffect(() => {
    fetchTimeStatisticsSetting();
  }, []);

  return (
    <TimeStatisticsContext.Provider
      value={{ maxConfirmedHours: maxConfirmedHours }}
    >
      {children}
    </TimeStatisticsContext.Provider>
  );
};
