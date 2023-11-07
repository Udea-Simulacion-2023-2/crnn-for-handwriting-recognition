"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { SubmitButton } from "@/app/submit-button";
import { submit } from "@/app/actions";

export function Form() {
  const [state, action] = useFormState(submit, { writing: null });
  const [source, setSource] = useState(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSource(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form action={action} className="w-full">
      <div className="col-span-full">
        <label
          htmlFor="handwriting"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Choose a handwriting picture
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="image"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="sr-only"
                  onChange={handleChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>

      <SubmitButton />
      <p aria-live="polite">{state?.writing}</p>

      {source && (
        <img
          src={source}
          alt="Selected Image"
          style={{ maxWidth: "100%", maxHeight: "200px" }}
        />
      )}
    </form>
  );
}
