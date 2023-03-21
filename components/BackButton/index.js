import React from "react";
import { useRouter } from "next/router";

export default function BackButton({ route }) {
  const router = useRouter();
  function handleChangePage() {
    router.push(`${route}`);
  }
  return <button onClick={handleChangePage}>Back to Search</button>;
}
