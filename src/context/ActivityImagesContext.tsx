import { createContext, useContext, PropsWithChildren } from "react";

import { getImageForActivity } from "../lib/images";
import useCloudImages, { ActivityImage } from "../hooks/useCloudImages";

const ActivityImageContext = createContext<{
  images: ActivityImage[];
  loading: boolean;
  getImageForActivity: typeof getImageForActivity;
  error?: any;
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
