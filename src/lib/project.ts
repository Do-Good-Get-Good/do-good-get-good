import Config from "react-native-config";

export const getProject = () =>
  Config.NODE_ENV === "prod"
    ? "do-good-get-good-2f6cc"
    : "dev-do-good-get-good";
