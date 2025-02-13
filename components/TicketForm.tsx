"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TicketSelection = () => {
  const [step, setStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState("Free");
  const [ticketCount, setTicketCount] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const tickets = [
    { type: "Free", price: "Free", access: "REGULAR ACCESS", available: "20/52" },
    { type: "VIP", price: "$150", access: "VIP ACCESS", available: "20/52" },
    { type: "VVIP", price: "$150", access: "VVIP ACCESS", available: "20/52" },
  ];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-xl font-semibold">Ticket Selection</h2>
      <div className="w-full h-1 bg-teal-500 my-2" />
      <p className="text-right text-sm text-gray-400">Step {step}/3</p>

      {step === 1 && (
        <>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-2xl font-bold">Techember Fest "25</h3>
            <p className="text-gray-400 mt-2">Join us for an unforgettable experience!</p>
            <p className="mt-2 text-gray-300">📍 [Event Location] || March 15, 2025 | 7:00 PM</p>
          </div>
          <div className="my-4">
            <h4 className="mb-2 text-sm">Select Ticket Type:</h4>
            <div className="flex gap-2">
              {tickets.map((ticket) => (
                <button
                  key={ticket.type}
                  onClick={() => setSelectedTicket(ticket.type)}
                  className={`p-4 rounded-lg flex-1 border ${
                    selectedTicket === ticket.type ? "border-teal-500" : "border-gray-600"
                  } bg-gray-800 hover:border-teal-500 transition-all`}
                >
                  <p className="text-lg font-semibold">{ticket.price}</p>
                  <p className="text-sm text-gray-400">{ticket.access}</p>
                  <p className="text-xs text-gray-500">{ticket.available}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="my-4">
            <h4 className="mb-2 text-sm">Number of Tickets</h4>
            <div className="relative">
              <select
                value={ticketCount}
                onChange={(e) => setTicketCount(Number(e.target.value))}
                className="w-full bg-gray-800 p-2 rounded-lg text-white appearance-none border border-gray-600"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-400" size={16} />
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="text-lg font-bold">Enter Your Details</h3>
          <div className="my-4">
            <label className="text-sm">Full Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
          </div>
          <div className="my-4">
            <label className="text-sm">Email Address</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
          </div>
          <div className="my-4">
            <label className="text-sm">Phone Number</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 706 220 0791" />
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h3 className="text-lg font-bold">Confirm Your Selection</h3>
          <div className="bg-gray-800 p-4 rounded-lg my-4">
            <p className="text-lg font-semibold">Ticket Type: {selectedTicket}</p>
            <p className="text-sm">Quantity: {ticketCount}</p>
            <p className="text-sm">Total: {selectedTicket === "Free" ? "Free" : `$${150 * ticketCount}`}</p>
          </div>
          <p className="text-sm text-gray-400">Proceed to payment to secure your ticket.</p>
        </>
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <Button variant="outline" className="border-gray-600 text-gray-300" onClick={prevStep}>
            Back
          </Button>
        )}
        {step < 3 ? (
          <Button className="bg-teal-500 text-white hover:bg-teal-600" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button className="bg-teal-500 text-white hover:bg-teal-600">Confirm & Pay</Button>
        )}
      </div>
    </div>
  );
};

export default TicketSelection;
