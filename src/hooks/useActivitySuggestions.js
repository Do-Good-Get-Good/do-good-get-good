import { useEffect, useState } from "react";
import { getAllActivities } from "../firebase-functions/get";

export const useActivitySuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    try {
      const suggestions = await getAllActivities();
      setSuggestions(suggestions);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchSuggestions();
  }, []);

  return { suggestions, loading, error };
};
