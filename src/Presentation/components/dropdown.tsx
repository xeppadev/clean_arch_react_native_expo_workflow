import { Dropdown} from "react-native-element-dropdown";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { COLORS } from "@/constants/Colors";

interface DropdownComponentProps {
    data: any[];
    onChange: (item: any) => void;
    onBlur?: () => void;
    value: any;
    placeholder: string;
    style?: StyleProp<ViewStyle>;
  }

const DropdownComponent = ({
  data,
  onChange,
  onBlur,
  value,
  placeholder,
  style,
}: DropdownComponentProps) => {
  return (
    <Dropdown
      placeholderStyle={styles.placeholderStyle}
      style={[styles.dropdown, style]}
      placeholder={placeholder}
      labelField="label"
      valueField="value"
      onBlur={onBlur}
      searchPlaceholder="Search..."
      data={data}
      containerStyle={styles.dropdownContainer}
      confirmSelectItem={false}
      value={value}
      onChange={onChange}
      activeColor="transparent"
    />
  );
};

export default DropdownComponent;

export const styles = StyleSheet.create({
  dropdown: {
    marginHorizontal: 24,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 14,
    borderRadius: 12,
    paddingVertical: 7,
    marginVertical: 6,

  },
  placeholderStyle: {
    color: COLORS.gray,
    fontWeight: "400",
    fontSize: 14,
  },
  dropdownContainer: {
    borderRadius: 10,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    

  },
});