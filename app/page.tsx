
import { TrialForm } from '@/components/TrialForm'
import { Montserrat } from 'next/font/google'
import { unstable_noStore as noStore } from "next/cache";
import prisma from './lib/db';

const montserrat = Montserrat({ subsets: ['latin'] })

async function getClassData() {
  noStore();
  return await prisma.batch.findMany()
}

export default async function Home() {
  const classData = await getClassData();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className={`${montserrat.className} text-4xl font-bold text-primary mb-4 text-center`}>
        New Horizon
      </h1>
      <TrialForm classData={classData}/>
    </div>
  )
}

