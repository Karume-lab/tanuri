import {
  SafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";

const ScreenWrapper: React.FC<SafeAreaViewProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <SafeAreaView {...props} style={[{ flex: 1, paddingHorizontal: 8 }, style]}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;
