import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import DeleteReservation from "./DeleteReservation";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col md:flex-row border border-primary-800">
      {/* Image */}
      <div className="relative w-full h-48 md:h-auto md:w-32">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-b md:border-b-0 md:border-r border-primary-800"
        />
      </div>

      {/* Main content */}
      <div className="flex-grow px-4 py-3 flex flex-col gap-2">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary-100">
            {numNights} nights in Cabin {name}
          </h3>

          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-6 px-3 uppercase text-xs font-bold flex items-center rounded-sm w-max">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-6 px-3 uppercase text-xs font-bold flex items-center rounded-sm w-max">
              upcoming
            </span>
          )}
        </div>

        {/* Dates */}
        <p className="text-sm sm:text-base text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        {/* Price & guests */}
        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-primary-300">
          <p className="text-lg font-semibold text-accent-400">${totalPrice}</p>
          <span>&bull;</span>
          <p>
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto w-full sm:w-auto text-xs text-primary-400 mt-1 sm:mt-0">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* Edit/Delete */}
      <div className="flex flex-row md:flex-col border-t md:border-t-0 md:border-l border-primary-800">
        {!isPast(startDate) && (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center justify-center gap-1 uppercase text-[10px] sm:text-xs font-bold text-primary-300 border-r md:border-r-0 md:border-b border-primary-800 px-3 py-2 md:py-3 hover:bg-accent-600 hover:text-primary-900 transition-colors w-full"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-900 transition-colors" />
              <span>Edit</span>
            </Link>

            <DeleteReservation
              onDelete={onDelete}
              bookingId={id}
              className="w-full"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
