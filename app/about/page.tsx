"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import { toast } from "react-hot-toast";

const handleDesignClick = () => {
  toast("Design coming soon!", {
    icon: "🎨",
    style: {
      background: "#24A0B5",
      color: "#fff",
      fontFamily: "Jeju",
    },
  });
};

const handleCodeClick = () => {
  toast("Code will be available soon!", {
    icon: "💻",
    style: {
      background: "#24A0B5",
      color: "#fff",
      fontFamily: "Jeju",
    },
  });
};

const About = () => {
  return (
    <div className="max-w-4xl p-6 md:p-10 bg-[#052228] rounded-[24px] border border-[#07373F] text-white mx-5 md:mx-auto mt-[24px]">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#24A0B5] mb-6">
        About Ticz
      </h1>

      {/* Introduction */}
      <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center leading-relaxed">
        Ticz is a <strong>seamless, login-free event ticket booking UI</strong>{" "}
        designed for developers to explore, clone, and build upon. With a{" "}
        <strong>three-step booking flow</strong>, users can book event tickets{" "}
        <strong>quickly and efficiently</strong>.
      </p>

      {/* Features Section */}
      <div className="mt-8 sm:mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#24A0B5]">
          Features
        </h2>
        <ul className="mt-4 space-y-3 text-gray-300 text-sm sm:text-base">
          <li className="flex items-start gap-2">
            - Browse & select Free or Paid tickets
          </li>
          <li className="flex items-start gap-2">
            - Smooth & intuitive three-step booking flow
          </li>
          <li className="flex items-start gap-2">
            - Secure payment integration (e.g. Paystack)
          </li>
          <li className="flex items-start gap-2">
            - QR Code validation for event check-ins
          </li>
          <li className="flex items-start gap-2">
            - Downloadable & sharable tickets
          </li>
        </ul>
      </div>

      {/* Tech Stack Section */}
      <div className="mt-8 sm:mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#24A0B5]">
          Tech Stack
        </h2>
        <p className="mt-4 text-gray-300 text-sm sm:text-base">
          Built with <strong>Next.js</strong>, <strong>React</strong>,{" "}
          <strong>Tailwind CSS</strong>, and optional backend integrations using{" "}
          <strong>Node.js, Firebase, and MongoDB</strong>.
        </p>
      </div>

      {/* Learn More & CTA */}
      <div className="mt-8 sm:mt-10 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#24A0B5]">
          Ready to Explore?
        </h2>
        <p className="mt-4 text-gray-300 text-sm sm:text-base">
          Check out the <strong>design file</strong> or explore the{" "}
          <strong>GitHub repo</strong> to dive into the code and start building.
        </p>

        <div className="flex flex-col sm:flex-row h-12 justify-end items-end gap-4 self-stretch mt-[100px] md:mt-16">
          <Button
            className="w-full sm:w-auto flex-1 h-12 px-6 py-3 justify-center items-center gap-2 rounded-[8px] border border-[#24A0B5] bg-transparent text-[#24A0B5] font-jeju text-[16px] font-normal hover:bg-[#24A0B5] hover:text-white transition-all"
            onClick={handleDesignClick}
          >
            Design File
          </Button>
          <Button
            className="w-full sm:w-auto flex-1 h-12 px-6 py-3 justify-center items-center gap-2 rounded-[8px] border border-[#24A0B5] bg-[#24A0B5] text-white font-jeju text-[16px] font-normal hover:bg-[#1A8191] transition-all"
            onClick={handleCodeClick}
          >
            GitHub Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
