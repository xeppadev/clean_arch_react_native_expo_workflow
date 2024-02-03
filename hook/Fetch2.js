import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store';

const Fetchpost = (endpoint1, endpoint2,  modo = "json", initialBody  ) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const bodyRef = useRef(initialBody);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = await SecureStore.getItemAsync('token');
      const options = {
        method: "POST",
        url: `http://192.168.18.204:4000/api/${endpoint1}/${endpoint2}`,
        headers: {
          "Content-Type": 
          
          modo === "json" ? "application/json" :
          "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: bodyRef.current,
      };
      const response = await axios.request(options);
      setData(response.data);
    }
    catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    } 
  }

   
  const redirect = () => {
    router.back();
  }

  const refetch = (newBody) => {
    bodyRef.current = newBody;
    fetchData();
    
  };

  return { data, isLoading, error, refetch, redirect };
}

export default Fetchpost;