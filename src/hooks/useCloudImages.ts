import { useState, useEffect } from "react";
import storage from "@react-native-firebase/storage";
import { Cache } from "../lib/cache-helper/cacheData";

export type ActivityImage = {
  photo: string;
  imageUrl?: string;
};

const useCloudImages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<ActivityImage[]>([]);
  const [error, setError] = useState<any>(null);

  const fetchImages = async () => {
    setLoading(true);
    setImages([]);
    setError(null);

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

      let fetchedImages = await Promise.all(imagesPromises);
      setImages(fetchedImages);
      Cache.storeData(fetchedImages, "Cloud_Images_Key");
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Cache.getData("Cloud_Images_Key").then((res) => {
      if (!res || res.length === 0) fetchImages();

      setImages(res);
    });
  }, []);

  return { loading, images, error };
};

export default useCloudImages;
