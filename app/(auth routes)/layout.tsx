"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    router.refresh();
    setLoading(false);
  }, [router]);
  return <>{loading ? <p>Loading...</p> : children}</>;
}
