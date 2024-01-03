import { Stack } from "expo-router";
import BackHeader from "../../components/common/header/BackHeader";
import { useRouter } from "expo-router";
const StackLayout = () => {
   const router = useRouter();
  return (
    <Stack>
    <Stack.Screen name="index" options={{ headerTitle: "" , headerStyle: { backgroundColor:'#FFFFFF' }, 
  headerShadowVisible:false,
   
   headerLeft: () => (
      <BackHeader
        handlePress={() => {router.back()}}
      />
    ),
  }} />
  </Stack>
  );
};

export default StackLayout;