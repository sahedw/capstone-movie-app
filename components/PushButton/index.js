import React from "react";
import { useRouter } from "next/router";

export default function PushButton() {
  const router = useRouter();
  function handleChangePage() {
    router.back();
  }
  return <button onClick={handleChangePage}>Back</button>;
}
