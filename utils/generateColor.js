import theme from "theme";

const generateColor = (colorType) => {
  const { colors } = theme;

  switch (colorType) {
    case "primary":
      return colors.primary;

    case "secondary":
      return colors.secondary;

    case "bg-success":
      return colors.bgSuccess;

    case "bg-warning":
      return colors.bgWarning;

    case "bg-danger":
      return colors.bgSuccess;

    case "text-success":
      return colors.textSuccess;

    case "text-warning":
      return colors.textWarning;

    case "text-danger":
      return colors.textDanger;

    default:
      return "#fff";
  }
};

export default generateColor;
