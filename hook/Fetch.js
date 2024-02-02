import { useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const Fetchget = (endpoint1, endpoint2) => {
  const [state, setState] = useState({
    data: [],
    isLoading: false,
    error: null
  });

  const fetchData = async () => {
    setState({ ...state, isLoading: true });
    try {
      const token = await SecureStore.getItemAsync('token');
      const options = {
        method: "GET",
        url: `http://192.168.18.204:4000/api/${endpoint1}/${endpoint2}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(options);
      setState({ data: response.data, isLoading: false, error: null });
    } catch (error) {
      setState({ ...state, isLoading: false, error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setState({ ...state, isLoading: true });
    fetchData();
    console.log("refetch");
  };

  return { ...state, refetch };
};

export default Fetchget;