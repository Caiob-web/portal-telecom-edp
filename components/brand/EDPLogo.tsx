import { cn } from "@/lib/utils";

export function EDPLogo({
  className,
  showPortalName = false,
  inverted = false,
  compact = false,
  monochrome = false
}: {
  className?: string;
  showPortalName?: boolean;
  inverted?: boolean;
  compact?: boolean;
  monochrome?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex items-center justify-center rounded-md px-3",
          monochrome
            ? "bg-transparent ring-0"
            : "edp-logo-surface bg-[#ffffff] shadow-sm ring-1 ring-graphite-200/80",
          compact ? "h-10 w-[104px]" : "h-11 w-[118px]"
        )}
      >
        <img
          src="/edp-logo.svg"
          alt="EDP"
          className={cn(
            "w-auto",
            compact ? "h-7" : "h-8",
            monochrome && "brightness-0 invert"
          )}
        />
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
