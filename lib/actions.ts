"use server";

import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function bookTrial(formData: FormData) {
  const fullName = formData.get("name") as string;
  const phoneNumber = formData.get("phone") as string;
  const date = formData.get("subject") as string;
  console.log("name " + fullName);
  console.log("num " + phoneNumber);
  console.log("date " + date);

  try {
    await prisma.user.create({
      data: {
        userName: fullName,
        phoneNumber: phoneNumber,
        date: date,
      },
    });

    return { success: true, redirectTo: "/success" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to book trial." };
  }
}

export async function chooseTrialDates(formData: FormData) {
  const date = formData.get("date") as string;

  console.log("Trial Date:", date);

  try {
    console.log("chooseTrialDate");

    console.log(date);

    const data = await prisma.batch.create({
      data: {
        date: date,
      },
    });
    revalidatePath(`/dates`);
    return {
      message: "yes",
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "no",
    };
  }
}

export async function deleteTrialDates(formData: FormData) {
  const trialDate = formData.get("date") as string;
  try {
    await prisma.batch.deleteMany({
      where: {
        date: trialDate,
      },
    });

    await prisma.user.updateMany({
      where: {
        date: trialDate,
      },
      data: {
        date: "re-scheduled",
      },
    });
    revalidatePath(`/dates`);
    return {
      message: "yes",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "no",
    };
  }
}


// export async function updateTrialDates(formData: FormData, admin: boolean) {
//   try {
//     const oldDate = formData.get("oldDate") as string;
//     const date = formData.get("date") as string;
//     const classLink = formData.get("classLink") as string;
//     const optionalMessage = formData.get("optionalMessage") as string;

//     const { getUser } = getKindeServerSession();
//     const user = await getUser();
//     if (!user) {
//       return redirect("/api/auth/login");
//     }
//     if (!admin) {
//       return redirect("/");
//     }
//     await prisma.trailClassDate.updateMany({
//       where: {
//         trialClass: oldDate,
//       },
//       data: {
//         trialClass: date,
//         optionalMessage: optionalMessage,
//         trialClassLink: classLink,
//       },
//     });

//     await prisma.user.updateMany({
//       where: {
//         trialDate: oldDate,
//       },
//       data: {
//         trialDate: date,
//       },
//     });
//     revalidatePath(`/create-trial-class`);
//     return {
//       message: "yes",
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       message: "no",
//     };
//   }
// }
