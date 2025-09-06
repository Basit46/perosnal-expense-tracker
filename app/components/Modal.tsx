"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const Modal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    max: "",
    spent: "",
    category: id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        ...formData,
        max: Number(formData.max),
        spent: Number(formData.spent),
      };

      const res = await axios.post("/api", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      setOpen(false);
      setFormData({
        title: "",
        max: "",
        spent: "",
        category: id,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate();
  };

  return (
    <div
      onClick={() => setOpen(false)}
      className={`${
        !open ? "!hidden" : ""
      } fixed top-0 left-0 w-screen h-screen z-[1000] bg-[black]/20 grid place-items-center`}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-[80vw] max-w-[400px] h-fit bg-white p-[20px]"
      >
        <h1 className="text-[20px]">Add Item</h1>

        <div className="mt-[20px]">
          <label htmlFor="itemName">Item name</label>
          <input
            type="text"
            id="itemName"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="mt-[6px] w-full h-[40px] border border-[1px] px-[10px]"
          />
        </div>

        <div className="mt-[15px]">
          <label htmlFor="max">Max</label>
          <input
            type="number"
            id="max"
            value={formData.max}
            onChange={(e) => setFormData({ ...formData, max: e.target.value })}
            className="mt-[6px] w-full h-[40px] border border-[1px] px-[10px]"
          />
        </div>

        <div className="mt-[15px]">
          <label htmlFor="spent">Spent</label>
          <input
            type="number"
            id="spent"
            value={formData.spent}
            onChange={(e) =>
              setFormData({ ...formData, spent: e.target.value })
            }
            className="mt-[6px] w-full h-[40px] border border-[1px] px-[10px]"
          />
        </div>

        <button
          type="submit"
          className="mt-[40px] h-[40px] w-full bg-[green] text-[white]"
        >
          {isPending ? "Loading..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Modal;
