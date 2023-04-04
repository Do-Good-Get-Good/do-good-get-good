import { useEffect, useState } from "react";

import storage from "@react-native-firebase/storage";

export const useActivityImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      const reference = storage().ref("activity-images");
      const images = listFilesAndDirectories(reference);
      setImages(images);
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

function listFilesAndDirectories(reference, pageToken) {
  return reference.list({ pageToken }).then((result) => {
    // Loop over each item
    result.items.forEach((ref) => {
      console.log(ref.fullPath);
    });

    if (result.nextPageToken) {
      return listFilesAndDirectories(reference, result.nextPageToken);
    }

    return Promise.resolve();
  });
}
