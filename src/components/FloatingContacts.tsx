"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  MdOutlineAlternateEmail,
  MdOutlinePhone,
  MdOutlinePhoneInTalk,
} from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";

export function FloatingContacts() {
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  const phoneNumber = "8976361077";
  const phoneDisplay = `🇮🇳 +91 ${phoneNumber}`;
  const phoneCopyValue = `+91${phoneNumber}`;
  const whatsappNumber = "918976361077";
  const contactEmail = "info@xardent.com";

  const phoneButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isPhoneHovered) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!phoneButtonRef.current) return;
      if (!phoneButtonRef.current.contains(event.target as Node)) {
        setIsPhoneHovered(false);
        setCopyStatus("idle");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPhoneHovered]);

  return (
    <div className="pointer-events-auto fixed bottom-8 right-6 z-40 flex gap-3">
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white">
          <FaWhatsapp className="h-6 w-6" />
        </div>
      </a>
      <a href={`mailto:${contactEmail}`} aria-label="Send us an email">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white">
          <MdOutlineAlternateEmail className="h-6 w-6" />
        </div>
      </a>
      <button
        type="button"
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white"
        aria-label="Call us"
        ref={phoneButtonRef}
        onMouseEnter={() => {
          setIsPhoneHovered(true);
          setCopyStatus("idle");
        }}
      >
        <FiPhoneCall className="h-6 w-6" />
        {isPhoneHovered && (
          <div className="absolute bottom-full right-0 mb-3 flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs shadow-lg">
            <span className="font-medium text-slate-900 whitespace-nowrap">
              {phoneDisplay}
            </span>
            <button
              type="button"
              className="font-semibold text-blue-600 hover:underline"
              onClick={(event) => {
                event.stopPropagation();
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(phoneCopyValue).then(() => {
                    setCopyStatus("copied");
                  });
                }
              }}
            >
              {copyStatus === "copied" ? "Copied" : "Copy"}
            </button>
          </div>
        )}
      </button>
    </div>
  );
}
