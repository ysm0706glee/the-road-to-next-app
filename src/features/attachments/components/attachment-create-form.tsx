"use client";

import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createAttachments } from "../actions/create-attachments";
import { ACCEPTED, IMAGE_TYPES } from "../constants";

type AttachmentCreateFormProps = {
  ticketId: string;
};

type FilePreview = {
  file: File;
  preview: string | null;
};

const AttachmentCreateForm = ({ ticketId }: AttachmentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createAttachments.bind(null, ticketId),
    EMPTY_ACTION_STATE
  );

  const [files, setFiles] = useState<FilePreview[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles).map((file) => ({
      file,
      preview: IMAGE_TYPES.includes(file.type)
        ? URL.createObjectURL(file)
        : null,
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      const [removedFile] = newFiles.splice(index, 1);
      if (removedFile.preview) {
        URL.revokeObjectURL(removedFile.preview);
      }
      return newFiles;
    });
  };

  const customAction = async () => {
    const formData = new FormData();
    files.forEach((filePreview) => {
      formData.append("files", filePreview.file);
    });
    action(formData);
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      setFiles([]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [actionState]);

  return (
    <Form action={customAction} actionState={actionState}>
      <Input
        ref={inputRef}
        name="files"
        id="files"
        type="file"
        multiple
        accept={ACCEPTED.join(",")}
        onChange={handleFileChange}
      />
      <FieldError actionState={actionState} name="files" />

      {files.length > 0 && (
        <div className="mt-4 space-y-4">
          {files.map((filePreview, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-md border p-2"
            >
              <div className="flex items-center gap-2">
                {filePreview.preview ? (
                  <div className="relative h-16 w-16">
                    <Image
                      src={filePreview.preview}
                      alt={`Preview ${filePreview.file.name}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-500">
                    Preview not available
                  </div>
                )}
                <span className="text-sm">{filePreview.file.name}</span>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveFile(index)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      <SubmitButton label="Upload" />
    </Form>
  );
};

export { AttachmentCreateForm };
