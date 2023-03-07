import { useEffect, useState } from "react";
import { getAllActivities } from "../firebase-functions/get";

export const useActivitySuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSuggestions = async () => {
    const suggestions = await getAllActivities();
    setSuggestions(suggestions);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchSuggestions();
  }, []);

  return { suggestions, loading };
};
