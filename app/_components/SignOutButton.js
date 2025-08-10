"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "@/app/_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction} className="w-full">
      <button
        className="
          group w-full flex items-center justify-start md:justify-start 
          py-3 px-4 md:px-5 
          hover:bg-primary-900 hover:text-primary-100 transition-colors 
          font-semibold text-primary-200
          text-sm md:text-base
        "
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />

        {/* Hide text on small screens */}
        <span
          className="
            ml-3 hidden sm:inline
          "
        >
          Sign out
        </span>
      </button>
    </form>
  );
}

export default SignOutButton;
