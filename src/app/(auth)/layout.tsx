"use client";

import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden">
      <div className=" overflow-y-auto">{children}</div>
    </div>
  );
};

export default layout;
