import { PermissionsAndroid, Platform } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import ImageResizer from "@bam.tech/react-native-image-resizer";

const resizeImage = (path: string, setImageURL: (url: string) => void) => {
  ImageResizer.createResizedImage(path, 1000, 1000, "JPEG", 10)
    .then((response) => {
      let pathAfterResize =
        Platform.OS === "android" ? `file://${response.path}` : response.path;
      setImageURL(pathAfterResize ?? "");
    })
    .catch((err) => {
      console.log(err);
    });
};

const openImagePicke = (setImageURL: (url: string) => void) => {
  ImagePicker.openPicker({
    mediaType: "photo",
    cropping: true,
    freeStyleCropEnabled: true,
  }).then((image) => {
    resizeImage(image.path, setImageURL);
  });
};

const androidPermission = async (setImageURL: (url: string) => void) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      openImagePicke(setImageURL);
    } else {
      console.log("error on openImagePicker ");
    }
  } catch (err) {
    console.warn(err);
  }
};

export const selectImage = async (setImageURL: (url: string) => void) => {
  Platform.OS === "android"
    ? androidPermission(setImageURL)
    : openImagePicke(setImageURL);
};
