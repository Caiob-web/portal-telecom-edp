import { cn } from "@/lib/utils";

export function EDPLogo({
  className,
  showPortalName = false,
  inverted = false
}: {
  className?: string;
  showPortalName?: boolean;
  inverted?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="flex h-11 w-[118px] items-center justify-center rounded-md bg-white px-3 shadow-sm ring-1 ring-graphite-200/80">
        <img src="/edp-logo.svg" alt="EDP" className="h-8 w-auto" />
      </span>
      {showPortalName ? (
        <span>
          <span
            className={cn(
              "block text-sm font-black leading-tight",
              inverted ? "text-white" : "text-graphite-950"
            )}
          >
            Portal Telecom EDP
          </span>
          <span
            className={cn(
              "block text-xs font-semibold",
              inverted ? "text-white/65" : "text-graphite-500"
            )}
          >
            Empresas compartilhantes
          </span>
        </span>
      ) : null}
    </div>
  );
}
