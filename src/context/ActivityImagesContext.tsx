import {
  useEffect,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";

import storage from "@react-native-firebase/storage";

export type ActivityImage = {
  imageName: string;
  imageUrl: string;
};

const ActivityImageContext = createContext<{
  getImages: () => ActivityImage[];
  getImageByName: (imageName: string) => ActivityImage | undefined;
  loading: boolean;
  error?: any;
}>({
  getImages: (): ActivityImage[] => [],
  getImageByName: (imageName: string): ActivityImage | undefined => undefined,
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
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const getImages = () => images;

  const getImageByName = (imageName: string) =>
    images.find((image) => image.imageName === imageName);

  return (
    <ActivityImageContext.Provider
      value={{ getImages, getImageByName, loading, error }}
    >
      {children}
    </ActivityImageContext.Provider>
  );
};
