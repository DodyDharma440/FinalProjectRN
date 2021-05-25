const generateColor = (colorType, themeColor) => {
  switch (colorType) {
    case "primary":
      return themeColor.primary;

    case "secondary":
      return themeColor.secondary;

    default:
      return "#fff";
  }
};

export default generateColor;
