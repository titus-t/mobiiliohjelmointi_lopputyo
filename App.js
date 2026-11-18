import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExerciseDetailsScreen from "./src/screens/ExerciseDetailsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RoutineScreen from "./src/screens/RoutineScreen";
import SearchScreen from "./src/screens/SearchScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="My Routine" component={RoutineScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExerciseDetails"
          component={ExerciseDetailsScreen}
          options={{ title: "Exercise Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
