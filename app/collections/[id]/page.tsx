"use client";

import EditModal from "@/app/components/EditModal";
import Modal from "@/app/components/Modal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const CollectionDetails = () => {
  const router = useRouter();
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [itemDetails, setItemDetails] = useState({
    title: "",
    spent: 0,
    max: 0,
    category: "weekly",
  });

  const handleEdit = (item: any) => {
    setOpenEdit(true);
    setItemDetails(item);
  };

  const { data: expenses } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await axios.get("/api");
      return res.data;
    },
  });

  const data = expenses?.filter((e: any) => e.category == id);

  const collectionMax = data?.reduce(
    (total: number, obj: any) => total + obj.max,
    0
  );
  const collectionSpent = data?.reduce(
    (total: number, obj: any) => total + obj.spent,
    0
  );
  const collectionBal = collectionMax - collectionSpent;

  return (
    <div>
      <Modal open={open} setOpen={setOpen} />
      <EditModal
        open={openEdit}
        setOpen={setOpenEdit}
        itemDetails={itemDetails}
      />

      <div className="flex items-center gap-[12px]">
        <button
          onClick={() => router.back()}
          className="bg-[black] size-[30px] grid place-items-center rounded-[6px] text-white text-[20px]"
        >
          {"<"}
        </button>
        <h1 className="text-[24px] font-medium capitalize">{id}</h1>
      </div>

      <div className="mt-[40px]">
        <div className="w-full border-y-[2px] border-y-gray-200 flex py-[10px] px-[6px] items-center justify-between">
          <p className="font-medium text-[20px]">Max:</p>
          <p className="text-[18px]">₦{collectionMax?.toLocaleString()}</p>
        </div>
        <div className="w-full border-b-[2px] border-b-gray-200 flex py-[10px] px-[6px] items-center justify-between">
          <p className="font-medium text-[20px]">Spent:</p>
          <p className="text-[18px]">₦{collectionSpent?.toLocaleString()}</p>
        </div>
        <div className="w-full border-b-[2px] border-b-gray-200 flex py-[10px] px-[6px] items-center justify-between">
          <p className="font-medium text-[20px]">Balance:</p>
          <p className="text-[18px]">₦{collectionBal?.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-[40px]">
        <div className="mb-[10px] w-full flex items-center justify-between">
          <h1 className="text-[18px]">Items:</h1>
          <button
            onClick={() => setOpen(true)}
            className="bg-black px-[20px] py-[6px] text-white"
          >
            Add Item
          </button>
        </div>

        {data?.map((item: any) => (
          <div
            key={item._id}
            onClick={() => handleEdit(item)}
            className="w-full border-b-[2px] border-b-gray-200 flex flex-col gap-[4px] py-[10px]"
          >
            <p className="font-medium capitalize">{item.title}</p>
            <div className="flex items-center justify-between">
              <p className="">Max:</p>
              <p className="">₦{item?.max?.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="">Spent:</p>
              <p className="">₦{item?.spent?.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="">Balance:</p>
              <p className="">₦{(item?.max - item?.spent).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionDetails;
