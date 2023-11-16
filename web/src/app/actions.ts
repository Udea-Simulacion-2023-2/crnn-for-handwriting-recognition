"use server";

export async function submit(_: any, formData: FormData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/handwritings/`,
    { method: "POST", body: formData }
  );

  return res.json();
}
