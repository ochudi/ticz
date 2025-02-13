import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border rounded-full bg-[#0E1A1F] border-[#1E3A3E]">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-[#1E3A3E] rounded-full">
          {/* Placeholder for logo icon */}
          <span className="text-white">🎟️</span>
        </div>
        <span className="text-xl font-bold text-white">ticz</span>
      </div>

      <div className="flex gap-8 text-white">
        <Link href="/events" className="hover:text-gray-300 transition">Events</Link>
        <Link href="/my-tickets" className="hover:text-gray-300 transition">My Tickets</Link>
        <Link href="/about" className="hover:text-gray-300 transition">About Project</Link>
      </div>

      <Button className="bg-white text-black px-6 py-2 rounded-full shadow-md hover:bg-gray-200">
        MY TICKETS →
      </Button>
    </nav>
  );
};

export default Navbar;
