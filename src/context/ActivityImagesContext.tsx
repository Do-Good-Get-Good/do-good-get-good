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

type Activity = {
  id: string;
  title: any;
  city: any;
  place: any;
  description: any;
  photo: any;
  popular: any;
  imageUrl?: string;
};

export type ActivityImage = {
  imageName: string;
  imageUrl: string;
};

const ActivityImageContext = createContext<{
  getImages: () => ActivityImage[];
  getImageForActivity: (activity: Activity) => ImageSourcePropType | undefined;
  loading: boolean;
  error?: any;
}>({
  getImages: (): ActivityImage[] => [],
  getImageForActivity: (activity: Activity) => undefined,
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
        const imageName = ref.fullPath;
        const imageUrl = await storage().ref(imageName).getDownloadURL();
        const image: ActivityImage = {
          imageName,
          imageUrl,
        };
        return image;
      });

      let images = await Promise.all(imagesPromises);
      setImages(images);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const getImages = () => {
    return images;
  };

  const getImageForActivity = (activity: Activity) =>
    setTheRightPhoto(activity);

  return (
    <ActivityImageContext.Provider
      value={{ getImages, getImageForActivity, loading, error }}
    >
      {children}
    </ActivityImageContext.Provider>
  );
};
