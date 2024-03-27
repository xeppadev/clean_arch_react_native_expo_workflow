import { View, Text, StyleSheet, Platform } from "react-native";
import TitleIcon from "./titleIcon";
import DropdownComponent from "./dropdown";
import { COLORS } from "@/constants/Colors";


const elementos = [
    "Elemento 1",
    "Elemento 2",
    "Elemento 3",
    "Elemento 4",
    "Elemento 5",
  ];
  
  const puntuacion = [
    { value: "1", label: "⭐ 1" },
    { value: "2", label: "⭐ 2" },
    { value: "3", label: "⭐ 3" },
    { value: "4", label: "⭐ 4" },
    { value: "5", label: "⭐ 5" },
    { value: "6", label: "⭐ 6" },
    { value: "7", label: "⭐ 7" },
    { value: "8", label: "⭐ 8" },
    { value: "9", label: "⭐ 9" },
    { value: "10", label: "⭐ 10" },
  ];
  
type RatingProps = {
    values: any;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    handleBlur: (e: any) => void;
  };



const Rating = ({values,setFieldValue,handleBlur }: RatingProps) => {
    return (
        <>
        
        <View style={styles.titles}>
                    <TitleIcon title="Elemento Critico" />
                    <TitleIcon title="Estado actual" />
                  </View>
                  <View style={styles.contain}>
                    {elementos.map((elemento, index) => (
                      <View key={index} style={styles.states}>
                        <View style={styles.elemento}>
                          <Text style={styles.elementext}>{elemento}</Text>
                        </View>
                        <DropdownComponent
                          onBlur={() => handleBlur(`estados.${index}`)}
                          placeholder=""
                          style={{ width: "28%" }}
                          data={puntuacion}
                          value={values.estados[index]}
                          onChange={(item) => {
                            // Crear una copia del estado actual
                            const newEstados = [...values.estados];

                            // Actualizar el valor seleccionado en la copia del estado
                            newEstados[index] = item.value;

                            // Establecer la copia del estado como el nuevo estado
                            setFieldValue("estados", newEstados);

                            // Calcular el promedio de los valores seleccionados
                            const total = newEstados.reduce(
                              (sum, value) => sum + Number(value),
                              0
                            );
                            const average = total / newEstados.length;
                            //convertir a string
                            const averageString = average?.toString();

                           
                            // Establecer el promedio en otro campo del estado
                            setFieldValue("average", averageString);
                          }}
                        />
                      </View>
                    ))}
                  </View>
        </>
    );
    }
export default Rating;
    const styles = StyleSheet.create({
        titles: {
            flexDirection: "row",
            justifyContent: "space-between",
          },
          states: {
            flexDirection: "row",
          },
          elemento: {
            width: "65%",
            justifyContent: "center",
            backgroundColor: COLORS.bg, // El fondo es el color de fondo definido en COLORS
            paddingHorizontal: 15, // Padding horizontal de 15
            borderRadius: 12, // Borde redondeado con radio de 14
            paddingVertical: Platform.OS === "ios" ? 16 : 10,
            marginVertical: 6, // Margen vertical de 6
          },
          contain: {
            marginHorizontal: 25,
          },
          elementext: {
            fontSize: 14,
            fontWeight: "400",
            color: COLORS.gray,
          },
    });