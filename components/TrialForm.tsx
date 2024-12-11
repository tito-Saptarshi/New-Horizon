"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { bookTrial } from "@/lib/actions";


interface TrialClass {
  id: string;
  date: string;
}

export function TrialForm({ classData }: { classData: TrialClass[] }) {
  const router = useRouter();



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.get("name") as string | null;
    formData.get("phone") as string | null;
    formData.get("subject") as string | null;

    console.log("name " +   formData.get("name") as string | null);
    console.log("num " +  formData.get("phone") as string | null);
    console.log("date " +  formData.get("subject") as string | null);
    

    const result = await bookTrial(formData); // Call the server action
    if (!result) {
      console.error("No response from the server.");
      return;
    }

    if (result.success) {
      router.push(result.redirectTo || "/success");
    } else if (result.redirectTo) {
      router.push(result.redirectTo); // Handle redirect if not logged in
    } else {
      console.error(result.error); // Handle any errors
    }
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register for Online Classes</CardTitle>
          <CardDescription>
            Enter your details to register for our coaching institute&apos;s
            online classes.
          </CardDescription>
        </CardHeader>
        <form className="mt-8 space-y-6 p-5" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1"
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1"
                placeholder="+91"
              />
            </div>
            <div>
              <Label htmlFor="subject">Choose Date</Label>
              <Select name="subject" required>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a date for trial class" />
                </SelectTrigger>
                <SelectContent>
                  {classData.map((classItem) => (
                    <SelectItem value={classItem.date} key={classItem.id}>
                      {classItem.date}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Book Trial Class
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}
