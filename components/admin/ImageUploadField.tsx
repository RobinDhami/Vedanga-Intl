"use client";

import { useId, useState } from "react";
import { ImageIcon, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type ImageUploadCollection, uploadCmsImage } from "@/lib/cms-api";

type ImageUploadFieldProps = {
  collection: ImageUploadCollection;
  value?: string;
  onChange: (url: string) => void;
  required?: boolean;
};

export function ImageUploadField({ collection, value = "", onChange, required }: ImageUploadFieldProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = async (file: File | undefined) => {
    if (!file) return;

    setUploading(true);
    setMessage("");
    try {
      const url = await uploadCmsImage(file, collection);
      onChange(url);
      setMessage("Upload complete. The image was resized and converted to WebP.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
        Image{required ? " (required)" : " (optional)"}
      </label>

      {value ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
          <img src={value} alt="Selected upload preview" className="h-44 w-full object-cover" />
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-500">
          <ImageIcon aria-hidden="true" />
          <span className="ml-2 text-sm">No image selected</span>
        </div>
      )}

      <Input
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        disabled={uploading}
        className="sr-only"
        onChange={(event) => {
          void handleFileChange(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" disabled={uploading} asChild>
          <label htmlFor={inputId}>
            <Upload data-icon="inline-start" aria-hidden="true" />
            {uploading ? "Uploading..." : value ? "Replace image" : "Choose image"}
          </label>
        </Button>
        {value ? (
          <Button type="button" variant="outline" disabled={uploading} onClick={() => onChange("")}>
            <Trash2 data-icon="inline-start" aria-hidden="true" />
            Clear
          </Button>
        ) : null}
      </div>

      <p className="text-xs text-gray-500">
        JPEG, PNG, or WebP up to 8 MB. Uploads are resized to 1600 px and stored as WebP.
      </p>
      {message ? <p className="text-sm text-gray-600">{message}</p> : null}
    </div>
  );
}
