import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex max-w-[1200px] h-[76px] px-4 justify-between items-center rounded-[24px] border border-[#197686] bg-[rgba(5,37,44,0.4)] backdrop-blur-[2px] mx-5 mt-[24px]">
      <div className="flex items-center gap-2">
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
        <Link
          href="/events"
          className="hover:text-gray-300 transition flex p-2.5 justify-center items-center gap-2.5 text-white text-[18px] font-normal leading-none font-jeju"
        >
          Events
        </Link>
        <Link
          href="/my-tickets"
          className="hover:text-gray-300 transition flex p-2.5 justify-center items-center gap-2.5 text-white text-[18px] font-normal leading-none font-jeju"
        >
          My Tickets
        </Link>
        <Link
          href="/about"
          className="hover:text-gray-300 transition flex p-2.5 justify-center items-center gap-2.5 text-white text-[18px] font-normal leading-none font-jeju"
        >
          About Project
        </Link>
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
