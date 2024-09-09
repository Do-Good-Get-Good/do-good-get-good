jest.mock("@react-navigation/native");

jest.mock("react-native-outside-press", () => {
  return ({ children }) => children;
});
