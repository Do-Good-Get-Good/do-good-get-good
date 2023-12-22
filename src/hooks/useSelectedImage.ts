import { useMemo } from "react";
import { ActivityImage } from "./useCloudImages";

const useSelectedImage = (imageObject: ActivityImage) => {
  const photo = useMemo(() => {
    if (!imageObject) return { photo: "placeholder", imageUrl: "" };

    return {
      photo: imageObject?.photo,
      imageUrl: imageObject?.imageUrl,
    };
  }, [imageObject?.photo, imageObject?.imageUrl]);

  return photo;
};

export default useSelectedImage;
