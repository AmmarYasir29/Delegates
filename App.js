import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen.js";
import DoctorsScreen from "./screens/DoctorsScreen.js";
import Details from "./screens/Details.js";
import AddDelegate from "./screens/AddDelegate.js";
import AddDoctor from "./screens/AddDoctor.js";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Delegates" component={HomeScreen} />
        <Stack.Screen name="Doctors" component={DoctorsScreen} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="AddDelegate" component={AddDelegate} />
        <Stack.Screen name="AddDoctor" component={AddDoctor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
