"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const NewPage = () => {
  const searchParams = useSearchParams();
  const passKey = searchParams.get("passKey");
  const pass = process.env.NEXT_PUBLIC_PASS_ADMIN;


  if (passKey !== pass) {
    return <div>invalid</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-center text-2xl">Admin panel</h1>
      <div className="flex flex-col p-3">
        <Link className="p-3" href={"/admin/dates"}>Create Dates</Link>
        <Link className="p-3" href={"/admin/students"}>View Students</Link>
      </div>
    </div>
  );
};

export default NewPage;
