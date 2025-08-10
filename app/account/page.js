import { auth } from "@/app/_lib/auth";
import Link from "next/link";
import { FaSuitcase, FaUserEdit } from "react-icons/fa";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();
  const firstName = session.user.name.split(" ").at(0);

  const isButterflyUser = ["ouissem", "saidani"].includes(
    firstName.toLowerCase()
  );
  const emoji = isButterflyUser ? "🦋" : "🌲";

  return (
    <div className="bg-primary-900/50 backdrop-blur-sm rounded-lg shadow-md p-8 max-w-4xl mx-auto mt-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-accent-400 mb-4">
        Welcome back, {firstName}! {emoji}
      </h2>

      <p className="text-primary-200 text-base sm:text-lg max-w-2xl mb-8">
        We’re glad to have you again...
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href="/account/reservations"
          className="bg-primary-800 hover:bg-primary-700 text-primary-100 px-5 py-3 sm:px-6 sm:py-4 rounded shadow-md transition flex items-center gap-3 text-sm sm:text-base"
        >
          <FaSuitcase className="text-accent-400" />
          View My Reservations
        </Link>

        <Link
          href="/account/profile"
          className="bg-primary-800 hover:bg-primary-700 text-primary-100 px-5 py-3 sm:px-6 sm:py-4 rounded shadow-md transition flex items-center gap-3 text-sm sm:text-base"
        >
          <FaUserEdit className="text-accent-400" />
          Update My Profile
        </Link>
      </div>
    </div>
  );
}
