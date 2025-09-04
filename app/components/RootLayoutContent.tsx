"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const RootLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gray-100 w-screen min-h-screen max-w-[500px] mx-auto px-[20px] pt-[20px]">
        {children}
      </div>
    </QueryClientProvider>
  );
};

export default RootLayoutContent;
