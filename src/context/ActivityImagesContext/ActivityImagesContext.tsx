import { createContext, PropsWithChildren, useContext } from "react";
import useCloudImages from "../../hooks/useCloudImages";
import { getImageForActivity } from "../../lib/images";
import { IActivityImagesContext } from "./ActivityImagesContext.config";

const ActivityImageContext = createContext<IActivityImagesContext>({
  images: [],
  loading: true,
  getImageForActivity,
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
