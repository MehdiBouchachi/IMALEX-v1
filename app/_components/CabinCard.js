import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex flex-col sm:flex-row border border-primary-800 rounded-md sm:rounded-none overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3] sm:aspect-auto w-full sm:w-auto sm:flex-1">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-b sm:border-b-0 sm:border-r border-primary-800"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-grow">
        {/* Top section */}
        <div className="pt-5 pb-4 px-5 sm:px-7 bg-primary-950 space-y-4">
          <h3 className="text-accent-500 font-semibold text-xl sm:text-2xl">
            Cabin {name}
          </h3>

          <div className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-base sm:text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-2 justify-end items-baseline flex-wrap">
            {discount > 0 ? (
              <>
                <span className="text-2xl sm:text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl sm:text-3xl font-[350]">
                ${regularPrice}
              </span>
            )}
            <span className="text-sm sm:text-base text-primary-200">
              / night
            </span>
          </p>
        </div>

        {/* Footer */}
        <div className="bg-primary-950 border-t border-primary-800 text-right">
          <Link
            href={`/cabins/${id}`}
            className="block sm:inline-block border-t sm:border-t-0 sm:border-l border-primary-800 px-5 sm:px-6 py-4 hover:bg-accent-600 transition-all hover:text-primary-900 text-sm sm:text-base"
          >
            Details & reservation →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
