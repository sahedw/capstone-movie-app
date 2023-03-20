import React from "react";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();
  function handleChangePage() {
    router.push("/");
  }
  return <button onClick={handleChangePage}>Back to Search</button>;
}
