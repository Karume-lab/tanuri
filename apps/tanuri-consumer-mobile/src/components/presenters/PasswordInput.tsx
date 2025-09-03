import { Eye, EyeOff, Lock } from "lucide-react-native";
import { forwardRef, useState } from "react";
import type { TextInput } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  returnKeyType?: "done" | "next";
  onSubmitEditing?: () => void;
}

const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  ({ value, onChange, onBlur, error, returnKeyType, onSubmitEditing }, ref) => {
    const [secure, setSecure] = useState(true);

    return (
      <Input
        ref={ref}
        label="Password"
        placeholder="Enter your password"
        icon={Lock}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChange}
        autoCapitalize="none"
        onBlur={onBlur}
        error={error}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        rightComponent={
          <Icon
            name={secure ? Eye : EyeOff}
            onPress={() => setSecure((prev) => !prev)}
          />
        }
      />
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
