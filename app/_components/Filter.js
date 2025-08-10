"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams(); // Get the search params
  const router = useRouter(); // Get the router object
  const pathname = usePathname(); // Get the current path

  const activeFilter = searchParams.get("capacity") ?? "all"; // Get the capacity filter from the search params or default to "all"

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams); // Create a new URLSearchParams object with the current search params
    params.set("capacity", filter); // Set the capacity filter to the new params object
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // Replace the current URL with the new params object
  }

  // conclusion: The Filter component is a simple component that displays a set of buttons to filter the cabins based on their capacity. It uses the useSearchParams and useRouter hooks from next/navigation to get the current search params and update the URL with the new filter value when a button is clicked.

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
export default Filter;
