import {
  useEffect,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";

import storage from "@react-native-firebase/storage";

import { setTheRightPhoto } from "../lib/images";
import { ImageSourcePropType } from "react-native/Libraries/Image/Image";
import { Cache } from "../lib/cache-helper/cacheData";

export type ActivityImage = {
  photo: string;
  imageUrl?: string;
};

const ActivityImageContext = createContext<{
  getImages: () => ActivityImage[];
  getImageForActivity: (
    photo: string,
    imageUrl?: string,
  ) => ImageSourcePropType | undefined;
  loading: boolean;
  error?: any;
}>({
  getImages: (): ActivityImage[] => [],
  getImageForActivity: (photo: string, imageUrl?: string) => undefined,
  loading: false,
});

export const useActivityImages = () => {
  return useContext(ActivityImageContext);
};

export const ActivityImagesProvider = ({ children }: PropsWithChildren) => {
  const [images, setImages] = useState<ActivityImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();

  const fetchImages = async () => {
    setLoading(true);
    setImages([]);
    try {
      let result = await storage().ref("activity-images").listAll();

      let imagesPromises = result.items.map(async (ref) => {
        const photo = ref.fullPath;
        const imageUrl = await storage().ref(photo).getDownloadURL();
        const image: ActivityImage = {
          photo,
          imageUrl,
        };
        return image;
      });

      let images = await Promise.all(imagesPromises);
      setImages(images);
      Cache.storeData(images, "Cloud_Images_Key");
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    Cache.getData("Cloud_Images_Key")
      .then((res) => {
        if (!res) fetchImages();

        setImages(res);
      })
      .catch((error) => console.log(error));
  }, []);

  const getImages = () => {
    return images;
  };

  const getImageForActivity = (photo: string, imageUrl?: string) =>
    setTheRightPhoto(photo, imageUrl);

  return (
    <ActivityImageContext.Provider
      value={{ getImages, getImageForActivity, loading, error }}
    >
      {children}
    </ActivityImageContext.Provider>
  );
};
