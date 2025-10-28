import Image from "next/image";
import Link from "next/link";

const SiteLogo = () => {
  return (
    <Link href="/">
      <Image
        width={200}
        height={200}
        src={"/logo.png"}
        className="size-12 p-2"
        alt="Website logo"
      />
    </Link>
  );
};

export default SiteLogo;
