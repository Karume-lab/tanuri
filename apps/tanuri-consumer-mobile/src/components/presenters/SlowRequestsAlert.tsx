import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { AlertDialog, useAlertDialog } from "@/components/ui/alert-dialog";

const SlowRequestsAlert = () => {
  const dialog = useAlertDialog();
  const [shouldShow, setShouldShow] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: HA!
  useEffect(() => {
    const checkPreference = async () => {
      const disabled = await AsyncStorage.getItem("hideSlowRequestsAlert");
      if (!disabled) {
        setShouldShow(true);
        dialog.open();
      }
    };
    checkPreference();

    const interval = setInterval(
      async () => {
        const disabled = await AsyncStorage.getItem("hideSlowRequestsAlert");
        if (!disabled) {
          dialog.open();
        }
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  const handleCancel = async () => {
    await AsyncStorage.setItem("hideSlowRequestsAlert", "true");
    setShouldShow(false);
    dialog.close();
  };

  if (!shouldShow) return null;

  return (
    <AlertDialog
      isVisible={dialog.isVisible}
      onClose={dialog.close}
      title="Please Note"
      description={`Some requests may be slow or even time out because our backend is currently hosted on a free tier. We're working on improving performance — thanks for your patience!

This notice will appear again every 5 minutes as a reminder, unless you choose "Don't show again."`}
      confirmText="Got it"
      onConfirm={dialog.close}
      cancelText="Don't show again"
      onCancel={handleCancel}
    />
  );
};

export default SlowRequestsAlert;
