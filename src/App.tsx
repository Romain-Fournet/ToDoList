import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Navigation } from "./navigation";
import CategoryContextProvider from "@components/context/CategoryContext";
import TaskContextProvider from "@components/context/TaskContext";
import NewSubTaskContextProvider from "@components/context/NewSubTaskContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeContextProvider from "@components/context/HomeContext";

Asset.loadAsync([
  ...NavigationAssets,
  require("../src/assets/images/newspaper.png"),
  require("../src/assets/images/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <HomeContextProvider>
      <CategoryContextProvider>
        <TaskContextProvider>
          <NewSubTaskContextProvider>
            <GestureHandlerRootView>
              <Navigation
                onReady={() => {
                  SplashScreen.hideAsync();
                }}
              />
            </GestureHandlerRootView>
          </NewSubTaskContextProvider>
        </TaskContextProvider>
      </CategoryContextProvider>
    </HomeContextProvider>
  );
}
