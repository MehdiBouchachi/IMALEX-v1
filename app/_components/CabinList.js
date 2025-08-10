import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";
import AnimatedCard from "./AnimatedCard";

async function CabinList({ filter }) {
  // noStore(); achive prepartiail rendering

  const cabins = await getCabins();

  if (!cabins.length) return null;

  let desplayedCabins;

  if (filter === "all") {
    desplayedCabins = cabins;
  }
  if (filter === "small") {
    desplayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }

  if (filter === "medium") {
    desplayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  }
  if (filter === "large") {
    desplayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {desplayedCabins?.map((cabin, i) => (
        <AnimatedCard key={cabin.id} index={i}>
          <CabinCard cabin={cabin} />
        </AnimatedCard>
      ))}
    </div>
  );
}

export default CabinList;
