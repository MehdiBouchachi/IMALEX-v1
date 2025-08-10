import AnimatedSection from "@/app/_components/AnimatedSection";
import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// PLACEHOLDER DATA
/* export const metadata = {
    title : "Cabin",
}; */

// idea : we need to create this generateMetadata function to get the title of the page
export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);
  const { name } = cabin;

  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin?.id),
  }));
  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);
  // const settings = await getSettings();
  //const bookedDates = await getBookedDatesByCabinId(params.cabinId);

  // a problem here! the fetching of the data of getCabins is fetched in 2s and than the second one is fetched in 1s and the third one is fetched in 2s, why? bcz the second line has to wait ot finish the fetching of the getCabins than he will fetch and the third one aslo need to wait the second one which he's also waiting the first one and all of this will create a bad user experience bcz it has to take 5s to fetched all data , so we need to fetch all of them in the same time and we can do that by using Promise.all and we can do that by using the following code

  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-20">
      {/* Animate Cabin */}
      <AnimatedSection>
        <Cabin cabin={cabin} />
      </AnimatedSection>

      {/* Animate H2 title */}
      <AnimatedSection delay={0.2}>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </AnimatedSection>

      {/* Animate Reservation */}
      <AnimatedSection delay={0.2}>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </AnimatedSection>
    </div>
  );
}
