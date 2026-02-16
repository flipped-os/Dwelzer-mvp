// components/Modal.tsx
"use client";
import { ReactNode } from "react";

export default function Modal({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white p-6 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
