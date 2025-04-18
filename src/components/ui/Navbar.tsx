"use client";

import { AboutIcon, ChartIcon, HomeIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Ana Sayfa",
      href: "/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      name: "Sonuçlar",
      href: "/result",
      icon: <ChartIcon className="h-5 w-5" />,
    },
    {
      name: "Hakkında",
      href: "/about",
      icon: <AboutIcon className="h-5 w-5" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glassmorphism border-b py-4">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Browser Footprint
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
