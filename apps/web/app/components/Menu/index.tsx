"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "ui";

export function Menu() {
  const [checked, setChecked] = useState(1);

  const router = useRouter();

  const goToPage = () => {
    switch (checked) {
      case 1:
        router.push("supergroups?action=create");
        break;
      case 2:
        router.push("/supergroups?filter=owned");
        break;
      case 3:
        router.push("/supergroups");
        break;
    }
  };

  return (
    <div className="">
      <div>Please choose an option:</div>
      <div className="py-8 flex flex-col">
        <label onClick={() => { setChecked(1); }}>
          <input
            checked={checked === 1}
            className="nes-radio"
            name="answer"
            type="radio"
          />
          <span>Create supergroup</span>
        </label>

        <label onClick={() => { setChecked(2); }}>
          <input
            checked={checked === 2}
            className="nes-radio"
            name="answer"
            type="radio"
          />
          <span>View my supergroups</span>
        </label>

        <label onClick={() => { setChecked(3); }}>
          <input
            checked={checked === 3}
            className="nes-radio"
            name="answer"
            type="radio"
          />
          <span>View all supergroups</span>
        </label>
      </div>
      <Button onClick={goToPage} variant="primary">
        {checked === 1 ? "Create" : "View"}
      </Button>
    </div>
  );
}
