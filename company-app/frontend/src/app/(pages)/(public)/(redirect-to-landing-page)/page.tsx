import { redirect } from "next/navigation";

const RedirectToLandingPage = () => {
  // TODO: add landing page hosted url here
  redirect("https://tanuri.vercel.app");
};

export default RedirectToLandingPage;
