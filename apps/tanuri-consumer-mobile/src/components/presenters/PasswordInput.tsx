import { Eye, EyeOff, Lock } from "lucide-react-native";
import type React from "react";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur?: () => void;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
}) => {
  const [secure, setSecure] = useState(true);

  return (
    <Input
      label="Password"
      placeholder="Enter your password"
      icon={Lock}
      secureTextEntry={secure}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      error={error}
      rightComponent={
        <Icon name={secure ? Eye : EyeOff} onPress={() => setSecure(!secure)} />
      }
    />
  );
};

export default PasswordInput;
