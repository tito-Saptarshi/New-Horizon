import prisma from "@/app/lib/db";
import { CreateClassCom } from "@/components/CreateClassCom";
import { Separator } from "@/components/ui/separator";
import { unstable_noStore as noStore } from "next/cache";
async function getData() {
  noStore();
  return await prisma.batch.findMany();
}

export default async function page() {
  const data = await getData();
  return (
    <div>
      <h1 className="text-3xl font-bold text-center pb-3">Trial Class</h1>
      <Separator className="bg-slate-600 mx-2 mr-3" />
      <CreateClassCom trialData={data} />;
    </div>
  );
}
