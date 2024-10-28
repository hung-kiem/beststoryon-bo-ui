"use client";

import { ReactNode, useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

export default function Template({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) return <Loader />;

  return children;
}
