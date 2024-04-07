import { TouchableOpacity } from "react-native";

import { COLORS } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";

export default function ButtonBack() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Iconify icon="solar:arrow-left-linear" size={26} color={COLORS.blue3} />
    </TouchableOpacity>
  );
}
