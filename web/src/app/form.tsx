import { PaperClipIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import { ChangeEvent, useState } from "react";
import { SubmitButton } from "@/app/submit-button";
import { submit } from "@/app/actions";
import Image from "next/image";

type FormProps = {
  onSave: ({ source, sentence }: { source: string; sentence: string }) => void;
};

export function Form({ onSave }: FormProps) {
  const [state, action] = useFormState(submit, { writing: "" });
  const [source, setSource] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    }

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target === null) {
          return;
        }
        setSource(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (source === null || state.writing === "") {
      return;
    }
    onSave({ source, sentence: state.writing });
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <form action={action}>
          <div>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="image"
                className="cursor-pointer inline-flex items-center rounded-sm gap-2 py-2 px-4 text-sm font-normal text-gray-900 border border-slate-900/20"
              >
                <PaperClipIcon className="h-5 w-5" />
                <span className="hidden sm:inline-flex">Attach</span>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="sr-only"
                  onChange={handleChange}
                />
              </label>
              <SubmitButton disabled={source === null} />
              <span
                className="cursor-pointer inline-flex gap-2 items-center rounded-sm py-2 px-4 text-sm font-normal text-gray-900 border border-slate-900/20"
                onClick={handleSave}
              >
                <BookmarkIcon className="w-5 h-5" />
                <span className="hidden sm:inline-flex">Save</span>
              </span>
            </div>
          </div>

          <div className="mt-2">
            <span className="text-gray-900 font-normal text-sm">
              Please attach a file png or jpg with white background.
            </span>
          </div>
        </form>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div>
            <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-700">
              Handwriting
            </h4>
          </div>
          <div className="w-full">
            <div className="flex items-center justify-center w-full aspect-video bg-slate-900/20 rounded-sm">
              {source ? (
                <Image
                  src={source}
                  alt="Selected Image"
                  width={200}
                  height={200}
                  className="w-full aspect-video object-contain object-center rounded-sm"
                />
              ) : (
                <PhotoIcon className="w-8 h-8 text-gray-400" />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-x-4">
            <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-700">
              Recognition
            </h4>
          </div>
          <div className="w-full border border-slate-900/20 rounded-sm aspect-video">
            <div className="p-2">
              <p className="text-gray-700">
                {state.writing === "" ? "..." : state.writing}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
