import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const useMergeStyle = (style, defaultStyle) => {
  const [mergedStyle, setMergedStyle] = useState([]);

  useEffect(() => {
    if (Object.prototype.toString.call(style) === "[object Array]") {
      setMergedStyle([...style, defaultStyle]);
    } else {
      setMergedStyle([style, defaultStyle]);
    }

    return () => {
      setMergedStyle([]);
    };
  }, [style]);

  return mergedStyle;
};

useMergeStyle.propTypes = {
  style: PropTypes.object.isRequired,
  fontFamily: PropTypes.object.isRequired,
};

export default useMergeStyle;
