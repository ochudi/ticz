"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const TicketSelection = () => {
  const [step, setStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState("Free");
  const [ticketCount, setTicketCount] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageURL(imageUrl); // Save for Step 3
    },
    [setImageURL]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const tickets = [
    {
      type: "Free",
      price: "Free",
      access: "REGULAR ACCESS",
      available: "201/500",
    },
    { type: "VIP", price: "$150", access: "VIP ACCESS", available: "115/200" },
    { type: "VVIP", price: "$300", access: "VVIP ACCESS", available: "35/100" },
  ];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="flex flex-col items-center justify-center w-[700px] p-12 gap-8 rounded-[40px] border border-[#0E464F] bg-[#041E23]">
      <div className="flex flex-col items-start gap-3 self-stretch">
        <div className="flex flex-row items-center gap-4 flex-1 justify-between w-full">
          <h2 className="text-white font-jeju text-3xl font-normal">
            {["Ticket Selection", "Attendee Details", "Ready"][step - 1]}
          </h2>
          <p className="text-[var(--color-grey-98,#FAFAFA)] text-base font-normal leading-6">
            Step {step}/3
          </p>
        </div>
        <div className="flex h-1 items-center self-stretch rounded-[5px] bg-[#0E464F]">
          <div
            className={`self-stretch rounded-[5px] bg-[#24A0B5] transition-all duration-300`}
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="flex flex-col justify-center items-start gap-8 self-stretch p-6 rounded-[32px] border border-[#0E464F] bg-[#08252B]">
          <div className="flex flex-col items-center gap-2 self-stretch h-[200px] p-6 rounded-[24px] border-r-[2px] border-b-[2px] border-l-[2px] border-[#07373F] bg-gradient-to-br from-[rgba(36,160,181,0.2)] to-[rgba(10,12,17,0.8)] backdrop-blur-[7px]">
            <div className="flex flex-col items-center gap-2 self-stretch">
              <h3 className="text-[#FAFAFA] text-center text-[62px] font-normal leading-[100%] self-stretch font-roadRage">
                Techember Fest &quot;25
              </h3>
              <p className="text-center text-[16px] font-normal leading-[24px] text-[#FAFAFA] w-[340px]">
                Join us for an unforgettable experience at Techember Fest!
                Secure your spot now.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <p className="text-[#FAFAFA] text-base font-normal leading-[150%]">
                📍 Lekki Phase 1, Lagos
              </p>
              <p className="text-[#FAFAFA] text-base font-normal leading-[150%]">
                | |
              </p>
              <p className="text-[#FAFAFA] text-base font-normal leading-[150%]">
                March 15, 2025 | 7:00 PM
              </p>
            </div>
          </div>

          <div className="h-[4px] self-stretch bg-[#07373F]" />

          <div className="flex flex-col items-start gap-2 self-stretch">
            <h4 className="self-stretch text-[#FAFAFA] text-base font-normal leading-[150%]">
              Select Ticket Type:
            </h4>
            <div className="flex items-center justify-center gap-4 p-4 self-stretch rounded-[24px] border border-[#07373F] bg-[#052228]">
              {tickets.map((ticket) => (
                <button
                  key={ticket.type}
                  onClick={() => setSelectedTicket(ticket.type)}
                  className={`flex flex-col w-[158px] h-[110px] p-3 items-start gap-3 rounded-[12px] border-2 border-[#197686] ${
                    selectedTicket === ticket.type
                      ? "bg-[#12464E]"
                      : "bg-[#052228]"
                  }  hover:border-teal-500 transition-all`}
                >
                  <p className="text-white text-[24px] font-semibold leading-[110%]">
                    {ticket.price}
                  </p>
                  <p className="text-[#FAFAFA] text-sm font-normal leading-[150%] uppercase">
                    {ticket.access}
                  </p>
                  <p className="text-[#D9D9D9] text-[14px] font-normal leading-[150%]">
                    {ticket.available}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 self-stretch">
            <h4 className="text-[#FAFAFA] text-[16px] font-normal leading-[150%]">
              Number of Tickets:
            </h4>
            <Select
              value={String(ticketCount)}
              onValueChange={(value) => setTicketCount(Number(value))}
            >
              <SelectTrigger className="w-full h-12 rounded-[12px] border border-[#07373F] bg-[#052228] hover:bg-[#0A1B1F] hover:border-teal-500 px-4 text-white flex items-center justify-between">
                <SelectValue placeholder="1" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A1B1F] border border-[#07373F] rounded-[12px] text-white">
                {[...Array(10)].map((_, i) => (
                  <SelectItem
                    key={i + 1}
                    value={String(i + 1)}
                    className="px-4 py-2 hover:bg-[#07373F]"
                  >
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex h-12 justify-end items-end gap-6 self-stretch">
            <Button className="flex flex-1 h-12 px-6 py-3 justify-center items-center gap-2 rounded-[8px] border border-[#24A0B5] bg-inherit hover:bg-[#24A0B5] text-[#24A0B5] font-jeju text-[16px] font-normal hover:text-[#fff]">
              Cancel
            </Button>
            <Button
              className="flex flex-1 h-12 px-6 py-3 justify-center items-center gap-2 rounded-[8px] border border-[#24A0B5] font-jeju text-[16px] font-normal hover:text-[#24A0B5]"
              onClick={nextStep}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col p-[24px] justify-center items-start gap-[32px] self-stretch rounded-[32px] border border-[#0E464F] bg-[#08252B]">
          {/* Upload Profile Photo */}
          <div className="flex flex-col w-[556px] p-[24px] pb-[48px] items-start gap-[32px] rounded-[24px] border border-[#07373F] bg-[#052228]">
            <label className="text-center text-[#FAFAFA] text-[16px] font-normal leading-[150%]">
              Upload Profile Photo
            </label>
            <div className="flex h-[200px] justify-center items-center gap-[10px] self-stretch bg-[rgba(0,0,0,0.20)]">
              <div
                {...getRootProps()}
                className={`flex w-[240px] h-[240px] p-[24px] flex-col justify-center items-center gap-[16px] rounded-3xl border-[4px] ${
                  isDragActive
                    ? "border-[rgba(36,160,181,0.75)]"
                    : "border-[rgba(36,160,181,0.25)] bg-[rgba(36,160,181,0.1)]"
                } rounded-xl p-10 bg-[#112B35] text-white cursor-pointer`}
              >
                <input {...getInputProps()} />
                {image ? (
                  <Image
                    src={image}
                    alt="Uploaded"
                    height={80}
                    width={80}
                    className="w-80 h-80 object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <Image
                      src={`/icons/upload.svg`}
                      height={32}
                      width={32}
                      alt="Upload Icon"
                    />
                    <p className="text-center text-[16px] font-normal leading-[150%] text-[#FAFAFA] self-stretch">
                      Drag & drop or click to upload
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="h-[4px] self-stretch bg-[#07373F]" />

          {/* Full Name */}
          <div className="flex flex-col items-start gap-2 self-stretch">
            <label className="text-[#FAFAFA] text-[16px] font-normal leading-[150%] self-stretch">
              Enter your name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              className="flex h-12 px-3 items-center gap-2 self-stretch rounded-[12px] border border-[#07373F] focus:border-[rgba(36,160,181,0.75)]"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col items-start gap-2 self-stretch">
            <label className="text-[#FAFAFA] text-[16px] font-normal leading-[150%]">
              Enter your email *
            </label>
            <div className="group flex p-[12px] h-12 items-center gap-[8px] self-stretch rounded-[12px] border border-[#07373F] group-focus-within:border-[rgba(36,160,181,0.75)] group-focus-within:bg-[#07373F]">
              <Image
                src="/icons/envelope.svg"
                height={24}
                width={24}
                alt="Upload Icon"
                className="p-0 m-0"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                className="flex-1 text-white text-[16px] font-normal leading-[150%] border-none outline-none"
              />
            </div>
          </div>

          {/* Special Request */}
          <div className="flex flex-col items-start gap-2 self-stretch">
            <label className="text-[#FAFAFA] text-[16px] self-stretch font-normal leading-[150%]">
              Special request?
            </label>
            <Textarea
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder=""
              className="flex h-[127px] p-[12px] items-start gap-[8px] self-stretch rounded-[12px] border border-[#07373F]"
            />
          </div>

          {/* Buttons */}
          <div className="flex h-12 justify-end items-end gap-6 self-stretch">
            <Button
              className="flex flex-1 h-12 px-6 py-3 justify-center items-center gap-2 rounded-[8px] border border-[#24A0B5] bg-inherit hover:bg-[#24A0B5] text-[#24A0B5] font-jeju text-[16px] font-normal hover:text-[#fff]"
              onClick={prevStep}
            >
              Back
            </Button>
            <Button
              className="flex flex-1 h-12 px-6 py-3 justify-center items-center gap-2 rounded-[8px] border border-[#24A0B5] font-jeju text-[16px] font-normal hover:text-[#24A0B5]"
              onClick={nextStep}
            >
              Get My Ticket
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-lg font-bold">Confirm Your Selection</h3>
          <div className="bg-gray-800 p-4 rounded-lg my-4">
            <p className="text-lg font-semibold">
              Ticket Type: {selectedTicket}
            </p>
            <p className="hidden">
              {imageURL}
            </p>
            <p className="text-sm">Quantity: {ticketCount}</p>
            <p className="text-sm">
              Total:{" "}
              {selectedTicket === "Free" ? "Free" : `$${150 * ticketCount}`}
            </p>
          </div>
          <p className="text-sm text-gray-400">
            Proceed to payment to secure your ticket.
          </p>

          <div className="flex h-12 justify-end items-end gap-6 self-stretch">
            <Button className="flex flex-1 h-12 px-6 py-3 justify-center items-center gap-2 rounded-[8px] border border-[#24A0B5] bg-inherit hover:bg-[#24A0B5] text-[#24A0B5] font-jeju text-[16px] font-normal hover:text-[#fff]">
              Book Another Ticket
            </Button>
            <Button className="flex flex-1 h-12 px-6 py-3 justify-center items-center gap-2 rounded-[8px] border border-[#24A0B5] font-jeju text-[16px] font-normal hover:text-[#24A0B5]">
              Download Ticket
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketSelection;
