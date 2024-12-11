import prisma from "@/app/lib/db";
import { unstable_noStore as noStore } from "next/cache";

async function getUser() {
  noStore();

  const users = await prisma.user.findMany();
  return users;
}

async function getData() {
  noStore();

  const batches = await prisma.batch.findMany();
  return batches;
}

export default async function page() {
    const data = await getData();
    const students = await getUser();

    const groupedData = data.map((batch) => ({
        date: batch.date,
        students: students.filter((user) => user.date === batch.date),
      }));

  return (
    <div className="p-5">
      <h1 className="text-xl text-center">All students</h1>
      <div className="mt-4">
        {groupedData.map((group) => (
          <div key={group.date} className="mb-6">
            <h2 className="text-lg font-bold">{group.date}</h2>
            <ul className="ml-4 list-disc">
              {group.students.map((student, index) => (
                <li key={student.id}>
                  {index + 1}. name - <span className="font-bold"> {student.userName || "Anonymous"} </span> - phone number - <span className="font-bold"> {student.phoneNumber}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
