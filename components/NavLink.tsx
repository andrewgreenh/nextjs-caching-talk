"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, PropsWithChildren, Suspense } from "react";

type NavLinkProps = ComponentProps<typeof Link> & {
  exact?: boolean;
  activeClassName?: string;
  inactiveClassName?: string;
};

export function NavLink(props: PropsWithChildren<NavLinkProps>) {
  return (
    <Suspense fallback={<ActiveLink {...props} isActive={false} />}>
      <AutomaticActiveLink {...props} />
    </Suspense>
  );
}

function AutomaticActiveLink(props: NavLinkProps) {
  const pathname = usePathname();
  const { href, exact = false, ...rest } = props;
  const hrefStr = typeof href === "string" ? href : (href as any).pathname ?? "";
  // Ensure trailing slash inconsistencies don't break matching
  const normalize = (v: string) => (v.endsWith("/") && v.length > 1 ? v.slice(0, -1) : v);
  const current = normalize(pathname);
  const target = normalize(hrefStr);
  const isActive = exact
    ? current === target
    : current === target || current.startsWith(target + "/");
  return <ActiveLink {...rest} href={href} isActive={isActive} />;
}

function ActiveLink(
  props: ComponentProps<typeof Link> & {
    activeClassName?: string;
    inactiveClassName?: string;
    isActive: boolean;
  }
) {
  const { activeClassName, inactiveClassName = "", isActive, className, ...linkProps } = props;
  const composed = [className, isActive ? activeClassName : inactiveClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      {...linkProps}
      aria-current={isActive ? "page" : undefined}
      className={composed}
      data-active={isActive ? "true" : "false"}
    >
      {props.children}
    </Link>
  );
}
