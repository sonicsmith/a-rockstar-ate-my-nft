"use client";

import { Button } from "ui";
import { useAppStore } from "../../store/useAppStore";

export const Dialog = () => {
  const { dialogMessage, setDialogMessage } = useAppStore();
  if (!dialogMessage) return null;
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className="bg-white p-6 z-20 absolute nes-dialog left-1/2 top-20 transform -translate-x-1/2 w-96">
        <p className="title">Info</p>
        <p>{dialogMessage}</p>
        <Button
          variant="primary"
          onClick={() => {
            setDialogMessage("");
          }}
        >
          Ok
        </Button>
      </div>
    </div>
  );
};
