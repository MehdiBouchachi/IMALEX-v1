import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div
      className="
        grid 
        grid-cols-[4rem_1fr] 
        md:grid-cols-[16rem_1fr] 
        h-full 
        gap-6 
        md:gap-12
      "
    >
      <SideNavigation />
      <div className="py-4 sm:px-8">{children}</div>
    </div>
  );
}
