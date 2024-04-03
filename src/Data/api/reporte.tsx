import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
async function saveFile(uri: string, filename: string, mimetype: string) {
  if (Platform.OS === "android") {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        filename,
        mimetype
      )
        .then(async (res) => {
          await FileSystem.writeAsStringAsync(res, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
        })
        .catch((error) => {
          console.error("Error creating file:", error);
        });
    } else {
      Sharing.shareAsync(uri);
    }
  } else {
    Sharing.shareAsync(uri);
  }
}

export async function DowloandReporte(
  cliente: string,
  fechaDesde: string,
  fechaHasta: string,
  filename: string
) {
  const token = await SecureStore.getItemAsync("token");
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  // Crear un objeto con las consultas
  const queryParams = new URLSearchParams({
    cliente,
    fechaDesde,
    fechaHasta,
  });

  // Agregar las consultas a la URL
  const url = `${apiUrl}/report?${queryParams.toString()}`;

  const result = await FileSystem.downloadAsync(
    url,
    FileSystem.documentDirectory + filename,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const mimetype = result.headers["content-type"] || result.headers["Content-Type"];
  saveFile(result.uri, filename, mimetype);
}
