"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";

interface ModalProps {
  label: string;
  content: React.ReactElement | React.ReactNode;
  close: () => void;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ label, content, isOpen, close }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handelClose = useCallback(() => {
    setShowModal(false);

    setTimeout(() => {
      close();
    }, 300);
  }, [close]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex items-center justify-center fixed inset-0 z-50 bg-black/60">
      <div className="relative w-[90%] md:w-[80%] lg:w-[700px] mx-auto my-6 h-auto">
        <div
          className={`translate duration-500 h-full ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-10"
          } `}
        >
          <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
            <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border-b">
              <div
                className="p-3 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
                onClick={handelClose}
              >
                <XMarkIcon width={24} />
              </div>
              <h2 className="text-lg font-bold ">{label}</h2>
            </header>
            <section className="p-6 ">{content}</section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
