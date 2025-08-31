import { ScrollView as RNScrollView, type ScrollViewProps } from "react-native";

export function ScrollView({ style, ...otherProps }: ScrollViewProps) {
  return (
    <RNScrollView
      style={[{ backgroundColor: "transparent" }, style]}
      {...otherProps}
    />
  );
}
