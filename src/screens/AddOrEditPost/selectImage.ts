import { Alert, Linking, Platform } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import ImageResizer from "@bam.tech/react-native-image-resizer";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import { AlertInfo } from "../../components/Alerts/AlertInfo";

const permission =
  Platform.OS === "ios"
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

const showPermissionDeniedAlert = () =>
  Alert.alert(
    "Åtkomst nekad",
    "Vi behöver denna behörighet för att använda foto. Vänligen ge det i appinställningarna.",
    [{ text: "Cancel" }, { text: "Open Settings", onPress: openAppSettings }],
    { cancelable: false },
  );

const somethingWhentWringAlert = () =>
  AlertInfo(
    "Något gick fel. Starta om appen och prova igen. Om det inte hjälper, kontakta din konsultchef.",
  );

const resizeImage = (path: string, setImageURL: (url: string) => void) => {
  ImageResizer.createResizedImage(path, 1000, 1000, "JPEG", 15)
    .then((response) => {
      let pathAfterResize =
        Platform.OS === "android" ? `file://${response.path}` : response.path;
      setImageURL(pathAfterResize ?? "");
    })
    .catch((err) => {
      somethingWhentWringAlert();
      console.log(err);
    });
};

const openImagePicker = async (setImageURL: (url: string) => void) => {
  try {
    await ImagePicker.openPicker({
      mediaType: "photo",
      cropping: true,
      freeStyleCropEnabled: true,
    }).then((image) => {
      resizeImage(image.path, setImageURL);
    });
  } catch (err) {
    somethingWhentWringAlert();
    console.log(err);
  }
};

export const checkPermissionAndOpenImage = async (
  setImageURL: (url: string) => void,
) => {
  try {
    const result = await check(permission);
    if (result === RESULTS.GRANTED) {
      openImagePicker(setImageURL);
    } else {
      requestPermission();
    }
  } catch (err) {
    somethingWhentWringAlert();
    console.warn(err);
  }
};

const requestPermission = async () => {
  try {
    const result = permission && (await request(permission));
    if (result === RESULTS?.GRANTED) {
    } else {
      showPermissionDeniedAlert();
    }
  } catch (err) {
    somethingWhentWringAlert();
    console.warn(err);
  }
};

const openAppSettings = () => {
  Linking.openSettings();
};
