// api.ts
import axios from "axios";

type queries = {
  query1: string;
  query2: string | undefined;
};

export async function sendToExternalApi(formData: FormData, queries: queries) {
  try {
    const response = await axios.post(
      "http://192.168.18.204:4500/documentos/upload",
      formData,
      {
        params: {
          query1: queries.query1,
          query2: queries.query2,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending data to external API:", error);
    throw error;
  }
}
