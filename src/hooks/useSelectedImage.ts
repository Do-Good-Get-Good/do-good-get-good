import { useMemo } from "react";
import { ActivityImage } from "./useCloudImages";
import { Activity } from "../utility/types";

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
