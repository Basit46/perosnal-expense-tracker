"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const EditModal = ({
  open,
  setOpen,
  itemDetails,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  itemDetails: any;
}) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(itemDetails);
  useEffect(() => {
    setFormData(itemDetails);
  }, [itemDetails]);

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        ...formData,
        max: Number(formData.max),
        spent: Number(formData.spent),
      };

      const res = await axios.put(
        `http://localhost:3000/api/expenses/${itemDetails._id}`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      setOpen(false);
    },
  });

  const { mutate: deleteMutate, isPending: deleteIsPending } = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        `http://localhost:3000/api/expenses/${itemDetails._id}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      setOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    editMutate();
  };

  return (
    <div
      onSubmit={handleSubmit}
      onClick={() => setOpen(false)}
      className={`${
        !open ? "!hidden" : ""
      } fixed top-0 left-0 w-screen h-screen z-[1000] bg-[black]/20 grid place-items-center`}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="w-[80vw] max-w-[400px] h-fit bg-white p-[20px]"
      >
        <h1 className="text-[20px]">Edit Item</h1>

        <div className="mt-[20px]">
          <label htmlFor="itemName">Item name</label>
          <input
            type="text"
            id="itemName"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="mt-[6px] w-full h-[40px] border px-[10px]"
          />
        </div>

        <div className="mt-[15px]">
          <label htmlFor="max">Max</label>
          <input
            type="number"
            id="max"
            value={formData.max}
            onChange={(e) =>
              setFormData({ ...formData, max: Number(e.target.value) })
            }
            className="mt-[6px] w-full h-[40px] border px-[10px]"
          />
        </div>

        <div className="mt-[15px]">
          <label htmlFor="spent">Spent</label>
          <input
            type="number"
            id="spent"
            value={formData.spent}
            onChange={(e) =>
              setFormData({ ...formData, spent: Number(e.target.value) })
            }
            className="mt-[6px] w-full h-[40px] border px-[10px]"
          />
        </div>

        <button
          type="submit"
          className="mt-[40px] h-[40px] w-full bg-[green] text-white"
        >
          {editIsPending ? "Loading..." : "Edit"}
        </button>
        <button
          onClick={() => deleteMutate()}
          type="button"
          className="mt-[10px] h-[40px] w-full bg-[red] text-white"
        >
          {deleteIsPending ? "Loading..." : "Delete"}
        </button>
      </form>
    </div>
  );
};

export default EditModal;
