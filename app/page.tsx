"use client";

import React, { useState } from "react";
import Collection from "./components/Collection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Home = () => {
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await axios.get("/api");
      return res.data;
    },
  });

  const allMax = data?.all?.reduce(
    (total: number, obj: any) => total + obj.max,
    0
  );
  const allSpent = data?.all?.reduce(
    (total: number, obj: any) => total + obj.spent,
    0
  );
  const allBal = allMax - allSpent;

  return (
    <div>
      <h1 className="text-[24px] font-medium">Expense Tracker</h1>

      <div className="mt-[40px]">
        <div className="w-full border-y-[2px] border-y-gray-200 flex py-[10px] px-[6px] items-center justify-between">
          <p className="font-medium text-[20px]">Max:</p>
          <p className="text-[18px]">₦{allMax?.toLocaleString()}</p>
        </div>
        <div className="w-full border-b-[2px] border-b-gray-200 flex py-[10px] px-[6px] items-center justify-between">
          <p className="font-medium text-[20px]">Spent:</p>
          <p className="text-[18px]">₦{allSpent?.toLocaleString()}</p>
        </div>
        <div className="w-full border-b-[2px] border-b-gray-200 flex py-[10px] px-[6px] items-center justify-between">
          <p className="font-medium text-[20px]">Balance:</p>
          <p className="text-[18px]">₦{allBal?.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-[40px]">
        <div className="mb-[10px] w-full flex items-center justify-between">
          <h1 className="text-[18px]">Items:</h1>
        </div>
        <div className="mt-[10px] w-full grid grid-cols-2 gap-[10px]">
          <Collection name="monthly" />
          <Collection name="weekly" />
        </div>
      </div>
    </div>
  );
};

export default Home;
