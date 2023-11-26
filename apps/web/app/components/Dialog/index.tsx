"use client";

import { useAppStore } from "../../store/useAppStore";

export const Dialog = () => {
  const { dialogMessage, setDialogMessage } = useAppStore();
  return (
    <section className="bg-blue-300 w-full">
      <dialog className="nes-dialog z-10 w-96" open={!!dialogMessage}>
        <form method="dialog">
          <p className="title">Info</p>
          <p>{dialogMessage}</p>
          <menu className="dialog-menu">
            <button
              className="nes-btn is-primary"
              onClick={() => {
                setDialogMessage("");
              }}
            >
              Ok
            </button>
          </menu>
        </form>
      </dialog>
    </section>
  );
};
