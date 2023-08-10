"use client";
import { useState, useEffect } from "react";

export default function useUpdateClient(value: number) {
  const serverState = value;
  const [clientState, setClientState] = useState(0);

  useEffect(() => {
    setClientState(serverState);
  }, [serverState]);

  return clientState;
}
