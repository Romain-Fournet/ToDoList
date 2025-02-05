import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";
import { Home } from "./screens/Home";
import { AddTask } from "./screens/AddTask";
import { ViewTask } from "./screens/ViewTask";
import { Calendar } from "@components/ViewCalendar";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        headerShown: false,
        animation: "none",
      },
    },
    AddTask: {
      screen: AddTask,
      options: {
        headerShown: false,
      },
    },
    ViewTask: {
      screen: ViewTask,
      options: {
        headerShown: false,
      },
    },
    Calendar: {
      screen: Calendar,
      options: {
        headerShown: false,
        animation: "none",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
