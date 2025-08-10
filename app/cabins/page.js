import { Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "@/app/_components/ReservationReminder";
import CabinHeader from "../_components/CabinHeader";
import AnimatedFilter from "../_components/AnimatedFilter";

export const revalidate = 3600; // seconds

export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <CabinHeader delay={0} />
      <AnimatedFilter delay={1} key="filter">
        <div className="flex justify-end mb-8 gap-4">
          <Filter />
        </div>
      </AnimatedFilter>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
