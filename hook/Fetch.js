import { useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const Fetchget = (endpoint1, endpoint2) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
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
      setData(response.data);
    } catch (error) {
      setError(error);
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
    console.log("refetch");
  };

  return { data, refetch ,  isLoading, error};
};

export default Fetchget;