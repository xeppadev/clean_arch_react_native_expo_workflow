// api.ts
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

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

export async function DowloandFile(ruta: string, filename: string) {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const result = await FileSystem.downloadAsync(
    `${apiUrl}/documentos/download/${ruta}`,
    FileSystem.documentDirectory + filename
  );
  const mimetype = result.headers["Content-Type"] || "application/octet-stream";
  saveFile(result.uri, filename, mimetype );
}
