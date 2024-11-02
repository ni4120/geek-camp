"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy } from "lucide-react";

interface ShareUrlFormProps {
  url?: string;
}

const ShareUrlForm = ({ url }: ShareUrlFormProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (url) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="url" value={url || ""} readOnly className="flex-grow" />
        <Button
          type="button"
          onClick={copyToClipboard}
          className="flex items-center"
        >
          {copied ? (
            <Check className="h-4 w-4 mr-2" />
          ) : (
            <Copy className="h-4 w-4 mr-2" />
          )}
          {copied ? "コピー済み!" : "コピー"}
        </Button>
      </div>
    </div>
  );
};

export default ShareUrlForm;
