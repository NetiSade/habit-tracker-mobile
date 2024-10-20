import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput, TextInputProps } from "react-native-paper";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

const ThemedTextInput = (props: ThemedTextInputProps) => {
  const color = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "text"
  );

  return <TextInput {...props} style={[props.style, { color }]} />;
};

export default ThemedTextInput;
