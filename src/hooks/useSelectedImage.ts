import { useMemo } from "react";
import { Activity } from "../utility/types";
import { ActivityImage } from "./useCloudImages";

const useSelectedImage = (imageObject: ActivityImage, activity?: Activity) => {
  const photo = useMemo(() => {
    return {
      photo: imageObject?.photo || activity?.photo || "placeholder",
      imageUrl: imageObject?.imageUrl || activity?.imageUrl || "",
    };
  }, [
    imageObject?.photo,
    imageObject?.imageUrl,
    activity?.photo,
    activity?.imageUrl,
  ]);

  return photo;
};

export default useSelectedImage;
