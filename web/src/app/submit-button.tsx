import { LanguageIcon } from "@heroicons/react/24/outline";
import { useFormStatus } from "react-dom";

export function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending || disabled}
      disabled={pending || disabled}
      className="cursor-pointer inline-flex items-center rounded-sm gap-2 py-2 px-4 text-sm font-normal text-gray-900 border border-slate-900/20"
    >
      <LanguageIcon className="w-5 h-5" />
      <span className="hidden sm:inline-flex">Recognize</span>
    </button>
  );
}
