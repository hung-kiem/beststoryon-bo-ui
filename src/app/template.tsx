"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Loader from "@/components/commons/Loader";

export default function Template({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) return <Loader />;

  return children;
}
