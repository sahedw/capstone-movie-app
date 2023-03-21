import React from "react";
import { useRouter } from "next/router";

export default function PushButton({ name, route }) {
  const router = useRouter();
  function handleChangePage() {
    router.push(`${route}`);
  }
  return <button onClick={handleChangePage}>{name}</button>;
}
