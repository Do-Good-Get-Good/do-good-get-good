import { createContext, useContext, PropsWithChildren } from "react";

import { getImageForActivity } from "../lib/images";
import { ImageSourcePropType } from "react-native/Libraries/Image/Image";
import useCloudImages, { ActivityImage } from "../hooks/useCloudImages";

const ActivityImageContext = createContext<{
  images: ActivityImage[];
  loading: boolean;
  error?: any;
  getImageForActivity: (
    photo: string,
    imageUrl?: string,
  ) => ImageSourcePropType | undefined;
}>({
  images: [],
  getImageForActivity: (photo: string, imageUrl?: string) => undefined,
  loading: false,
});

export const useActivityImages = () => {
  return useContext(ActivityImageContext);
};

export const ActivityImagesProvider = ({ children }: PropsWithChildren) => {
  const { images, loading, error } = useCloudImages();

  return (
    <ActivityImageContext.Provider
      value={{ images, loading, error, getImageForActivity }}
    >
      {children}
    </ActivityImageContext.Provider>
  );
};
