"use server";

import { revalidatePath } from "next/cache";

export async function submit(_, formData: FormData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/handwritings/`,
    { method: "POST", body: formData }
  );

  return res.json();
}
