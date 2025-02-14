"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    localStorage.clear(); // Clears local storage
    router.push("/"); // Navigates to home page
  };

  return (
    <nav className="flex max-w-[1200px] h-[76px] px-4 justify-between items-center rounded-[24px] border border-[#197686] bg-[rgba(5,37,44,0.4)] backdrop-blur-[2px] mx-5 md:mx-auto mt-[24px]">
      <div className="flex items-center gap-2 cursor-pointer" onClick={handleClick}>
        <div className="flex p-[6px_8px] justify-center items-center gap-[10px] rounded-[12px] border border-[#0E464F] bg-[#052F35]">
          <Image src="/icons/logo.svg" width={24} height={24} alt="Ticz Icon" />
        </div>
        <Image
          src="/icons/ticz.svg"
          width={43.793}
          height={22.624}
          alt="Ticz"
          className="sm:block"
        />
      </div>

      <div className="hidden sm:flex items-center gap-4">
        {[
          { href: "/events", label: "Events" },
          { href: "/my-tickets", label: "My Tickets" },
          { href: "/about", label: "About Project" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex p-2.5 justify-center items-center gap-2.5 text-[18px] font-normal leading-none font-jeju transition ${
              pathname === href
                ? "text-[#24A0B5]"
                : "text-white hover:text-gray-300"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button className="bg-white text-black px-4 py-6 justify-center items-center gap-2 rounded-[12px] hover:bg-gray-200 border border-[rgba(213,234,0,0.10)]">
          MY TICKETS →
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
