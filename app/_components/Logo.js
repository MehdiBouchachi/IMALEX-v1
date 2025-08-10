import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      {/* Simple mark */}
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white text-base font-bold">
        I
      </span>
      <div className="leading-tight">
        <span className="block text-base sm:text-lg font-semibold text-slate-900">
          IMALEX
        </span>
        <span className="block text-xs text-slate-500">
          Natural Formulation Lab
        </span>
      </div>
    </Link>
  );
}

export default Logo;
