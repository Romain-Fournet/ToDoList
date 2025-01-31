import { TextStyle } from "../consts/TextStyle";
import { useColorScheme } from "react-native";

export function useTextStyles(){
    const theme = useColorScheme() ?? "light";
    return TextStyle[theme]
}