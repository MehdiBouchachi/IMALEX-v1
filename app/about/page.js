import AboutContent from "../_components/AboutContent";
import { getCabins } from "../_lib/data-service";

export const metadata = {
  title: "About",
};

export const revalidate = 86400;

export default async function Page() {
  const cabins = await getCabins();

  return <AboutContent cabins={cabins} />;
}
