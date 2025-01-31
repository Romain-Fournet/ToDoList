import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Navigation } from "./navigation";
import CategoryContextProvider from "./components/context/CategoryContext";
import TaskContextProvider from "./components/context/TaskContext";

Asset.loadAsync([
  ...NavigationAssets,
  require("../src/assets/images/newspaper.png"),
  require("../src/assets/images/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <CategoryContextProvider>
      <TaskContextProvider>
        <Navigation
          onReady={() => {
            SplashScreen.hideAsync();
          }}
        />
      </TaskContextProvider>
    </CategoryContextProvider>
  );
}
