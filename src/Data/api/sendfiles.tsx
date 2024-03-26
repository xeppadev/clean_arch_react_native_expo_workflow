// api.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";
type queries = {
  query1: string;
  query2: string | undefined;
};

export async function sendToExternalApi(formData: FormData, queries: queries) {
  const token = await SecureStore.getItemAsync("token");
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  try {
    const response = await axios.post(
      `${apiUrl}/documentos/upload`,
      formData,
      {
        params: {
          query1: queries.query1,
          query2: queries.query2,
        },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}` 
          
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending data to external API:", error);
    throw error;
  }
}
