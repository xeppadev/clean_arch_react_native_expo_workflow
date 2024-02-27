import {
  StyleSheet,
  Pressable,
  FlatList,
  Platform,
  ScrollView,
} from "react-native";

import { COLORS } from "@/constants/Colors";
import { Iconify } from "react-native-iconify";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";

const data = [
    { id: "132434", personal: "Pedro vasquez", status: "Vencido" },
    { id: "4341414", personal: "Jose Rodriguez", status: "Activo" },
    { id: "4134134", personal: "Pedro vasquez", status: "Activo" },
    { id: "14134143", personal: "Pedro vasquez", status: "Activo" },
    { id: "14314134", personal: "Jose Martinez", status: "Activo" },
    { id: "1414134", personal: "Enrique Gutierrez", status: "Por Vencer" },
    { id: "1431414", personal: "Pedro vasquez", status: "Activo" },
    { id: "14134141", personal: "Pedro vasquez", status: "Activo" },
    { id: "1431413", personal: "Pedro vasquez", status: "Vencido" },
    { id: "134341434", personal: "Pedro vasquez", status: "Por Vencer" },
  ];

export default function PesonalScreen() {
  const router = useRouter();
  return (
    <ScrollView 
    contentInsetAdjustmentBehavior="automatic"
    showsVerticalScrollIndicator={false}
    style={{ flex: 1, backgroundColor: COLORS.bg2 }}
   >
     <View style={styles.container}>
     <View style={styles.row}>
     <Text style={styles.dataLengthText}>{data.length} usuarios encontrados</Text>
       
     </View>
     <FlatList
       style={{ paddingTop: 8 }}
       data={data}
       scrollEnabled={false}
       showsVerticalScrollIndicator={false}
       keyExtractor={(item, index) => index.toString()}
       renderItem={({ item }) => {
         const texColor =
             item.status === "Activo"
               ? { color: COLORS.green, backgroundColor: COLORS.green2 }
               : item.status === "Por Vencer"
               ? { color: COLORS.wellow, backgroundColor: COLORS.wellowlg }
               : item.status === "Vencido"
               ? { color: COLORS.red2, backgroundColor: COLORS.red }
               : { color: COLORS.red2, backgroundColor: COLORS.blue };
         return (
           <Pressable style={styles.listItem}
            onPress={() => router.push("/admin/history/personal/" + item.id)}
           >
             <View style={styles.icon}>
               <Iconify
                 icon="fa6-solid:user"
                 size={21}
                 color={COLORS.blue2}
               />
             </View>
             <View style={styles.dates}>
               
               <Text style={styles.listItemTitle}>{item.personal}</Text>
               <Text style={styles.listItemStatus}>ID:{item.id}</Text>
             </View>
             <View
                 style={[
                   styles.contentstatus,
                   { backgroundColor: texColor.backgroundColor },
                 ]}
               >
                 <Text
                   style={[styles.listItemStatus, { color: texColor.color }]}
                 >
                   {item.status}
                 </Text>
                 </View>
           </Pressable>
         );
       }}
     />
     </View>
   </ScrollView>
 );
}

const styles = StyleSheet.create({
 container: {
   backgroundColor: COLORS.bg2,
   paddingHorizontal: 18,
   paddingTop:  9,
   flex: 1,
 },
 listItem: {
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
   padding: Platform.OS === "ios" ? 12 : 8,
   paddingHorizontal: 12,
   marginVertical: 5,
   backgroundColor: COLORS.white,
   borderRadius: 15,
   width: "100%",
 },
 listItemTitle: {
   fontSize: 15,
   fontWeight: "500",
   fontFamily: "Inter_500Medium",
   marginVertical: 2,
 },
 listItemPlate: {
   fontSize: 14,
   color: COLORS.graymodal,
   fontWeight: "500",
   fontFamily: "Inter_500Medium",
 },
 listItemStatus: {
   fontSize: 14,
   color: COLORS.blue,
   fontFamily: "Inter_500Medium",
 },
 dates: {
   flexDirection: "column",
   alignItems: "flex-start",
   marginRight: "auto",
   marginLeft: 5,
 },
 icon: {
   marginRight: 5,
   justifyContent: "center",
   alignItems: "center",
   paddingHorizontal: 8,
   paddingVertical: 6,
   backgroundColor: "rgba(11, 29, 91, 0.1)",
   borderRadius: 70,
 },
 row: {
   flexDirection: "row",
   backgroundColor: "transparent",
   alignContent: "center",
   alignItems: "center",
 },
 actividades: {
   flex: 1,
   backgroundColor: COLORS.bg,
   padding:15
 },
 title2: {
   fontSize: 15,
   fontWeight: "500",
   fontFamily: "Inter_500Medium",
 },
 dataLengthContainer: {
   backgroundColor: "rgba(11, 29, 91, 0.1)", // Cambia esto al color que quieras
   borderRadius: 50, // Esto hará que el fondo sea circular
   width: 26, // Ajusta esto según el tamaño que quieras
   height: 26, // Asegúrate de que el ancho y el alto sean iguales para un círculo perfecto
   justifyContent: "center",
   alignItems: "center",
   marginLeft: 5, // Añade un poco de margen si es necesario
 },
 dataLengthText: {
    // Cambia esto al color que quieras para el texto
   fontWeight: "600",
   fontFamily: "Inter_500Medium",
    fontSize: 15,
 },
 contentstatus: {
   justifyContent: "center",
   alignItems: "center",
   padding: 3,
   borderRadius: 7,
 },
});