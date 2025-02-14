"use client";

import Image from "next/image";
import html2canvas from "html2canvas";
import { useDropzone } from "react-dropzone";
import { useState, useCallback, useEffect } from "react";

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

const LOCAL_STORAGE_KEY = "ticket-form-data";

const downloadTicket = async () => {
  const ticketElement = document.getElementById("ticket-section");
  if (!ticketElement) return;

  const canvas = await html2canvas(ticketElement);
  const image = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = image;
  link.download = "ticket.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const TicketSelection = () => {
  const [step, setStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState("Free");
  const [ticketCount, setTicketCount] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setStep(parsedData.step || 1);
      setSelectedTicket(parsedData.selectedTicket || "Free");
      setTicketCount(parsedData.ticketCount || 1);
      setName(parsedData.name || "");
      setEmail(parsedData.email || "");
      setRequest(parsedData.request || "");
      setImage(parsedData.image || "");
      setImageURL(parsedData.image || "");
    }
  }, []);

  useEffect(() => {
    const data = {
      step,
      selectedTicket,
      ticketCount,
      name,
      email,
      request,
      image,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [step, selectedTicket, ticketCount, name, email, request, image]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImage(base64String);
      setImageURL(base64String); // Ensure imageURL updates
    };

    reader.readAsDataURL(file);
  }, []);

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
    <div className="flex flex-col items-center justify-center w-full min-w-[335px] max-w-[700px] px-6 sm:px-12 py-12 gap-8 rounded-[40px] border border-[#0E464F] bg-[#041E23] mx-5 md:mx-0">
      <div className="flex flex-col items-start gap-3 w-full">
        <div className="flex items-center gap-4 w-full justify-between">
          <h2 className="text-white font-jeju text-2xl sm:text-3xl font-normal">
            {["Ticket Selection", "Attendee Details", "Ready"][step - 1]}
          </h2>
          <p className="text-[var(--color-grey-98,#FAFAFA)] text-sm sm:text-base font-normal leading-6">
            Step {step}/3
          </p>
        </div>
        <div className="flex h-1 w-full rounded-[5px] bg-[#0E464F]">
          <div
            className="rounded-[5px] bg-[#24A0B5] transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="flex flex-col justify-center items-start gap-8 self-stretch p-6 rounded-[32px] border border-[#0E464F] bg-[#08252B] w-full max-w-[600px] mx-auto">
          {/* Event Info */}
          <div className="flex flex-col items-center gap-10 self-stretch min-h-[200px] p-6 rounded-[24px] border-r-[2px] border-b-[2px] border-l-[2px] border-[#07373F] bg-gradient-to-br from-[rgba(36,160,181,0.2)] to-[rgba(10,12,17,0.8)] backdrop-blur-[7px]">
            <div className="flex flex-col items-center gap-2 self-stretch">
              <h3 className="text-[#FAFAFA] text-center text-[40px] sm:text-[62px] font-normal leading-[100%] self-stretch font-roadRage">
                Techember Fest &quot;25
              </h3>
              <p className="text-center text-sm md:text-[16px] font-normal leading-[24px] text-[#FAFAFA]">
                Join us for an unforgettable experience at Techember Fest!
                Secure your spot now.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-1 text-center text-white">
              <p className="text-base font-normal leading-[150%]">
                📍 Lekki Phase 1, Lagos
              </p>
              <p className="hidden sm:inline">| |</p>
              <p className="text-base font-normal leading-[150%]">
                March 15, 2025 | 7:00 PM
              </p>
            </div>
          </div>

          <div className="h-[4px] self-stretch bg-[#07373F]" />

          {/* Select Ticket Type */}
          <div className="flex flex-col items-start gap-2 self-stretch">
            <h4 className="self-stretch text-[#FAFAFA] text-base font-normal leading-[150%]">
              Select Ticket Type:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 self-stretch rounded-[24px] border border-[#07373F] bg-[#052228]">
              {tickets.map((ticket) => (
                <button
                  key={ticket.type}
                  onClick={() => setSelectedTicket(ticket.type)}
                  className={`flex flex-col w-full h-[110px] p-3 items-start gap-3 rounded-[12px] border-2 border-[#197686] ${
                    selectedTicket === ticket.type
                      ? "bg-[#12464E]"
                      : "bg-[#052228]"
                  } hover:border-teal-500 transition-all`}
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

          {/* Number of Tickets */}
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

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row h-12 justify-end items-end gap-4 self-stretch mt-12 md:mt-0">
            <Button className="w-full sm:w-auto flex-1 h-12 px-6 py-3 justify-center items-center gap-2 rounded-[8px] border border-[#24A0B5] bg-transparent text-[#24A0B5] font-jeju text-[16px] font-normal hover:bg-[#24A0B5] hover:text-white transition-all">
              Cancel
            </Button>
            <Button
              className="w-full sm:w-auto flex-1 h-12 px-6 py-3 justify-center items-center gap-2 rounded-[8px] border border-[#24A0B5] bg-[#24A0B5] text-white font-jeju text-[16px] font-normal hover:bg-[#1A8191] transition-all"
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
          <div className="flex flex-col max-w-[556px] md:w-[556px] p-[24px] pb-[48px] self-center md:items-start gap-[32px] rounded-[24px] md:border border-[#07373F] md:bg-[#052228]">
            <label className="text-center text-[#FAFAFA] text-[16px] font-normal leading-[150%]">
              Upload Profile Photo
            </label>
            <div className="flex h-[200px] justify-center items-center gap-[10px] self-stretch bg-[rgba(0,0,0,0.20)]">
              <div
                {...getRootProps()}
                className={`flex w-[240px] h-[240px] flex-col justify-center items-center gap-[16px] rounded-3xl border-[4px] ${
                  isDragActive
                    ? "border-[rgba(36,160,181,0.75)] bg-[rgba(36,160,181,0.1)]"
                    : "border-[rgba(36,160,181,0.25)] bg-[rgba(36,160,181,0.1)]"
                } rounded-xl bg-[#112B35] text-white cursor-pointer`}
              >
                <input {...getInputProps()} />

                {isDragActive ? (
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
                ) : image ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt="Uploaded"
                      fill
                      className="rounded-[12px] border border-[rgba(36,160,181,0.50)] object-cover"
                    />
                  </div>
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
              className={`flex h-12 px-3 items-center gap-2 self-stretch rounded-[12px] border ${
                name.trim() === "" ? "border-red-500" : "border-[#07373F]"
              } focus:border-[rgba(36,160,181,0.75)]`}
            />
            {name.trim() === "" && (
              <p className="text-red-500 text-sm">Name is required.</p>
            )}
          </div>

          {/* Email Address */}
          <div className="flex flex-col items-start gap-2 self-stretch">
            <label className="text-[#FAFAFA] text-[16px] font-normal leading-[150%]">
              Enter your email *
            </label>
            <div
              className={`group flex p-[12px] h-12 items-center gap-[8px] self-stretch rounded-[12px] border ${
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.trim() !== ""
                  ? "border-red-500"
                  : "border-[#07373F]"
              } group-focus-within:border-[rgba(36,160,181,0.75)] group-focus-within:bg-[#07373F]`}
            >
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
            {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
              email.trim() !== "" && (
                <p className="text-red-500 text-sm">Enter a valid email.</p>
              )}
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
          <div className="flex flex-col sm:flex-row h-12 justify-end items-end gap-4 self-stretch mt-16 md:mt-0">
            <Button
              className="w-full sm:w-auto flex-1 h-12 px-6 py-3 justify-center items-center gap-2 rounded-[8px] border border-[#24A0B5] bg-transparent text-[#24A0B5] font-jeju text-[16px] font-normal hover:bg-[#24A0B5] hover:text-white transition-all"
              onClick={prevStep}
            >
              Back
            </Button>
            <Button
              className="w-full sm:w-auto flex-1 h-12 px-6 py-3 justify-center items-center gap-2 rounded-[8px] border border-[#24A0B5] bg-[#24A0B5] text-white font-jeju text-[16px] font-normal hover:bg-[#1A8191] transition-all"
              onClick={() => {
                if (
                  name.trim() !== "" &&
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                ) {
                  nextStep();
                }
              }}
            >
              Get My Ticket
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col justify-center items-center gap-8 self-stretch">
          <div className="flex flex-col items-center gap-4 self-stretch">
            <h2 className="text-white text-center font-alatsi text-2xl font-normal leading-none">
              Your Ticket is Booked!
            </h2>
            <p className="text-gray-100 text-center text-[16px] font-normal leading-[150%] self-stretch">
              Check your email for a copy or you can{" "}
              <span className="font-bold">download</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 self-stretch">
            <div
              id="ticket-section"
              className="flex flex-col justify-center items-center gap-2.5 self-stretch rounded-3xl px-[21px] py-8"
            >
              <div className="flex flex-col items-center w-[300px] h-[600px] bg-[url('/images/ticket.png')] bg-cover bg-center">
                <div className="flex mt-5 w-[260px] h-[446px] p-[14px] items-center flex-shrink-0 rounded-[16px] border border-[#24A0B5] bg-[rgba(3,30,33,0.10)] backdrop-blur-[2px]">
                  <div className="flex w-[232px] flex-col items-center gap-[20px] flex-shrink-0">
                    <div className="flex w-[175px] flex-col items-center">
                      <h2 className="self-stretch text-white text-center font-roadRage text-[34px] font-normal leading-[100%]">
                        Techember Fest &quot;25
                      </h2>
                      <div className="flex flex-col justify-center items-center gap-[4px] p-[4px]">
                        <p className="text-white text-[10px] font-normal leading-[15px]">
                          📍 04 Rumens road, Ikoyi, Lagos
                        </p>
                        <p className="text-white text-[10px] font-normal leading-[150%]">
                          📅 March 15, 2025 | 7:00 PM
                        </p>
                      </div>
                    </div>
                    <Image
                      src={`${imageURL ? imageURL : "/images/image.webp"}`}
                      width={140}
                      height={140}
                      alt="User image"
                      className="rounded-[12px] border-[4px] border-[rgba(36,160,181,0.50)] bg-[url('/path-to-image')] bg-lightgray bg-center bg-cover bg-no-repeat"
                    />
                    <div className="flex flex-col justify-center items-center p-1 self-stretch rounded-md border border-[#133D44] bg-[#08343C]">
                      <div className="flex items-center gap-2 self-stretch border-b border-[#12464E]">
                        <div className="flex flex-col justify-center items-start gap-1 p-1 flex-[1_0_0] border-r border-[#12464E]">
                          <label className="text-white text-[10px] font-normal leading-[150%] opacity-[0.33]">
                            Enter your name
                          </label>
                          <p className="text-white text-[12px] font-bold leading-[150%] w-full overflow-hidden text-ellipsis whitespace-nowrap">
                            {name.length > 6 ? `${name.slice(0, 10)}...` : name}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center items-start gap-[4px] p-[4px] flex-[1_0_0]">
                          <label className="text-white text-[10px] font-normal leading-[150%] opacity-[0.33]">
                            Enter your email *
                          </label>
                          <p className="text-white text-[12px] font-bold leading-[150%] w-full overflow-hidden text-ellipsis whitespace-nowrap">
                            {email.length > 6
                              ? `${email.slice(0, 10)}...`
                              : email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-stretch border-b border-[#12464E]">
                        <div className="flex flex-col justify-center items-start gap-1 p-1 flex-[1_0_0] border-r border-[#12464E]">
                          <label className="text-white text-[10px] font-normal leading-[150%] opacity-[0.33]">
                            Ticket Type
                          </label>
                          <p className="text-white text-[12px] font-bold leading-[150%] truncate w-full">
                            {selectedTicket}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center items-start gap-1 p-1 flex-[1_0_0]">
                          <label className="text-white text-[10px] font-normal leading-[150%] opacity-[0.33]">
                            Ticket For:
                          </label>
                          <p className="text-white text-[12px] font-bold leading-[150%] truncate w-full">
                            {ticketCount}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-start gap-1 p-2 self-stretch">
                        <label className="text-white text-[10px] font-normal leading-[150%] opacity-[0.33]">
                          Special Request?
                        </label>
                        <p className="text-white font-roboto text-[10px] font-normal leading-[150%] self-stretch truncate w-full">
                          {request}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Image
                  src={`/images/barcode.svg`}
                  width={236}
                  height={68}
                  alt="Barcode"
                  className="mt-11"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row h-12 justify-end items-end gap-4 self-stretch mt-16 md:mt-0">
              <Button
                className="w-full sm:w-auto flex-1 h-12 px-6 py-3 justify-center items-center gap-2 rounded-[8px] border border-[#24A0B5] bg-transparent text-[#24A0B5] font-jeju text-[16px] font-normal hover:bg-[#24A0B5] hover:text-white transition-all"
                onClick={() => {
                  localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear stored data
                  localStorage.removeItem("image"); // Clear the stored image
                  setStep(1); // Reset the step
                  setSelectedTicket("Free");
                  setTicketCount(1);
                  setName("");
                  setEmail("");
                  setRequest("");
                  setImage("");
                  setImageURL("");
                }}
              >
                Book Another Ticket
              </Button>

              <Button
                className="w-full sm:w-auto flex-1 h-12 px-6 py-3 justify-center items-center gap-2 rounded-[8px] border border-[#24A0B5] bg-[#24A0B5] text-white font-jeju text-[16px] font-normal hover:bg-[#1A8191] transition-all"
                onClick={downloadTicket}
              >
                Download Ticket
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketSelection;
