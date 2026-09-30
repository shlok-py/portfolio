"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ModeSwitcher } from "@/components/ModeSwitcher";
import { Navbar } from "@/components/Navbar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const isPublicUserPage = pathname === "/contact";
  const mode =
    modeParam === "dev" || modeParam === "user"
      ? modeParam
      : isPublicUserPage
        ? "user"
        : null;
  const isDevMode = mode === "dev";
  const hasModeSwitcher = mode !== null;
  const isLanding = pathname === "/" && mode === null;

  return (
    <>
      <ModeSwitcher mode={mode} />
      {!isDevMode && !isLanding && <Navbar hasModeSwitcher={hasModeSwitcher} />}
      <div
        className={`${isDevMode ? "h-screen overflow-hidden" : "min-h-0 flex-1"} ${
          isDevMode ? "pt-[28px]" : hasModeSwitcher ? "pt-[108px]" : isLanding ? "pt-0" : "pt-[80px]"
        }`}
      >
        {children}
      </div>
    </>
  );
}
