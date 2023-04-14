import { useEffect, useState } from "react";

import storage from "@react-native-firebase/storage";

export const useActivityImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setImages([]);
    try {
      let result = await storage().ref("activity-images").listAll();
      result.items.forEach(async (ref) => {
        const imagePath = ref.fullPath;
        const url = await storage().ref(imagePath).getDownloadURL();
        const imageData = {
          imageName: imagePath,
          imageUrl: url,
        };
        setImages((prev) => [...prev, imageData]);
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchImages();
  }, []);

  return { images, loading, error };
};
