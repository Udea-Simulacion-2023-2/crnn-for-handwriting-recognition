"use client";

import Image from "next/image";
import { Form } from "@/app/form";
import { useState } from "react";

export function Translations() {
  const [translations, setTranslations] = useState<
    Array<{
      source: string;
      sentence: string;
    }>
  >([]);

  const handleSave = ({
    source,
    sentence,
  }: {
    source: string;
    sentence: string;
  }) => {
    setTranslations([...translations, { source, sentence }]);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-4xl w-full px-4 py-8 space-y-2">
        <Form onSave={handleSave} />
      </div>
      <div className="mx-auto max-w-4xl p-4">
        <div>
          <div>
            <h4 className="text-2xl font-normal tracking-tight text-gray-900">
              Saved
            </h4>
          </div>
          {translations.length === 0 ? (
            <p>Empty</p>
          ) : (
            <ul
              role="list"
              className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
            >
              {translations.map(({ source, sentence }, i) => (
                <li key={i} className="col-span-1 rounded-md">
                  <div className="w-full aspect-video bg-slate-900/20 text-white text-sm font-medium flex items-center justify-center">
                    <Image
                      src={source}
                      className="w-full object-contain aspect-video"
                      alt={"Image used to extract text"}
                    />
                  </div>
                  <div className=" flex flex-1 items-center justify-between truncate border border-slate-900/20 bg-white rounded-sm">
                    <div className="flex-1 truncate p-4 text-md">
                      <p className="text-gray-900 font-normal">{sentence}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
