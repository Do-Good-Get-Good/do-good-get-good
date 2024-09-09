jest.mock("@react-navigation/native");

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-outside-press", () => {
  return ({ children }) => children;
});
