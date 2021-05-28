import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const useRefreshControl = (callback) => {
  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    callback(setRefresh);
  }, []);

  return { refresh, onRefresh };
};

useRefreshControl.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default useRefreshControl;
