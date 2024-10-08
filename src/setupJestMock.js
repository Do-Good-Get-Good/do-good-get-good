jest.mock("@react-navigation/native");

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("./components/Menu", () => () => {
  return <></>;
});

jest.mock("react-native-outside-press", () => {
  return ({ children }) => children;
});

jest.mock("@react-native-firebase/firestore", () => {
  return jest.fn();
});

jest.mock("@react-native-firebase/auth", () => {
  return jest.fn();
});

jest.mock("@react-native-firebase/functions", () => {
  return jest.fn();
});

jest.mock("@react-native-firebase/crashlytics", () => () => ({
  crashlytics: jest.fn(),
}));

jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => {
  const actualAsyncStorage = jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock"
  );
  return {
    ...actualAsyncStorage,
    getItem: () => null,
  };
});

jest.mock("./context/ActivityImagesContext/ActivityImagesContext", () => ({
  useActivityImages: jest.fn(() => ({
    getImageForActivity: jest.fn(() => ({
      photo: "symbol_blood",
    })),
    images: [
      {
        photo: "blodgivning",
        imageUrl: "image-url",
      },
    ],
  })),
}));
