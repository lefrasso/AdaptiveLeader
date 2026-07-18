import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Lightweight, locale-aware wrappers around Next.js navigation APIs.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
