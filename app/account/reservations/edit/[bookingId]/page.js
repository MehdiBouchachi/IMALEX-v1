import EditReservationForm from "@/app/_components/EditReservationForm";
import EditReservationHeading from "@/app/_components/EditReservationHeading";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  // CHANGE
  const reservationId = params.bookingId;
  const { cabinId, numGuests, observations } = await getBooking(reservationId);
  const { maxCapacity } = await getCabin(cabinId);
  const booking = { numGuests, observations };

  return (
    <div>
      <EditReservationHeading reservationId={reservationId} />

      <EditReservationForm
        reservationId={reservationId}
        booking={booking}
        maxCapacity={maxCapacity}
      />
    </div>
  );
}
