import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between p-6">
      <Link href="/" className="text-blue font-bold text-4xl" >TASKGOAL</Link>
      <div>Toggle</div>
    </header>
  );
}
