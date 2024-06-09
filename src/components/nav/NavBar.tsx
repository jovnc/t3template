import Link from "next/link";
import { Package2 } from "lucide-react";

import { ModeToggle } from "../dark-light-mode/toggle-dark-mode";
import { auth } from "@/auth";
import AvatarDropdownMenu from "./AvatarDropdownMenu";
import SignOutButton from "../auth/SignOutButton";
import SignInPageButton from "../auth/SignInPageButton";
import NavSheet from "./NavSheet";

export default async function NavBar() {
  const session = await auth();

  const isLoggedIn = session?.user == null ? false : true;

  return (
    <div className="flex w-full flex-row px-3 py-2">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">T3 Blog</span>
        </Link>
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Home
        </Link>
        {isLoggedIn && (
          <Link
            href="/protected"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Protected
          </Link>
        )}
      </nav>
      <NavSheet isLoggedIn={isLoggedIn} />
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex flex-row gap-2">
          <ModeToggle />
          {isLoggedIn && <AvatarDropdownMenu />}
          {isLoggedIn && <SignOutButton />}
          {!isLoggedIn && <SignInPageButton />}
        </div>
      </div>
    </div>
  );
}
