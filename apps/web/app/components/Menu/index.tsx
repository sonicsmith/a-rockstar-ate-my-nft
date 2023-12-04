"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "ui";

export const Menu = () => {
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
        <label onClick={() => setChecked(1)}>
          <input
            type="radio"
            className="nes-radio"
            name="answer"
            checked={checked === 1}
          />
          <span>Create supergroup</span>
        </label>

        <label onClick={() => setChecked(2)}>
          <input
            type="radio"
            className="nes-radio"
            name="answer"
            checked={checked === 2}
          />
          <span>View my supergroups</span>
        </label>

        <label onClick={() => setChecked(3)}>
          <input
            type="radio"
            className="nes-radio"
            name="answer"
            checked={checked === 3}
          />
          <span>View all supergroups</span>
        </label>
      </div>
      <Button variant="primary" onClick={goToPage}>
        {checked === 1 ? "Create" : "View"}
      </Button>
    </div>
  );
};
