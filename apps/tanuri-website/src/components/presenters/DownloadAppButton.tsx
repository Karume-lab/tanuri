import { Download, Smartphone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DownloadAppButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          Download App
          <Smartphone className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Install Tanuri</DialogTitle>
          <DialogDescription>
            ⚠️ Currently available only for Android devices. Since the app is not
            yet on the Play Store, you must enable installation from unknown
            sources.
            <br />
            <br />📌 iPhone (iOS) not supported yet — App Store version coming
            soon!
          </DialogDescription>
        </DialogHeader>

        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li>Tap the download button below</li>
          <li>Allow your browser to download the file</li>
          <li>Open the APK from your notifications</li>
          <li>
            Enable <strong>Install unknown apps</strong> if prompted
          </li>
          <li>Continue and enjoy 🎉</li>
        </ul>

        <DialogFooter className="mt-4">
          <Button className="w-full" asChild>
            <Link href="/tanuri.apk" download>
              Continue to Download
              <Download className="size-4" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadAppButton;
