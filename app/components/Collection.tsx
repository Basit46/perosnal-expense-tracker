"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Collection = ({ name }: { name: "weekly" | "monthly" }) => {
  const router = useRouter();

  const { data: expenses } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await axios.get("/api");
      return res.data;
    },
  });

  const data = expenses?.[name];

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
    <div
      onClick={() => router.push(`/collections/${name}`)}
      role="button"
      className="bg-[teal]/10 w-full h-[200px] rounded-[10px] p-[10px] flex flex-col justify-between"
    >
      <p className="w-fit bg-[white] px-[8px] py-[2px] rounded-[8px] capitalize">
        {name}
      </p>

      <div className="text-[14px] space-y-[8px]">
        <div className="w-full flex items-center justify-between">
          <p className="font-medium">Max:</p>
          <p className="">₦{collectionMax?.toLocaleString()}</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="font-medium">Spent:</p>
          <p className="">₦{collectionSpent?.toLocaleString()}</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="font-medium">Balance:</p>
          <p className="">₦{collectionBal?.toLocaleString()}</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="font-medium">Items:</p>
          <p className="">{data?.length?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Collection;
