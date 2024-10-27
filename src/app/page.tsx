"use client";

import "./globals.css";
import { useEffect } from "react";

export default function Landing() {
  useEffect(() => {
    window.location.href = "/explore";
  }, []);

  return <></>;
}
