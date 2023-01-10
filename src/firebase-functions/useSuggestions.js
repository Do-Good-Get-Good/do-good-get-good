import { useEffect, useState } from "react";
import { getAllFavoriteActivities } from "./getFunctions";

export const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSuggestions = async () => {
    const suggestions = await getAllFavoriteActivities();
    setSuggestions(suggestions);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchSuggestions();
  }, []);

  return { suggestions, loading };
};
