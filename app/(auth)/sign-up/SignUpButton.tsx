"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="default" className="w-full" disabled={pending}>
      {pending ? "Submitting..." : "Sign Up"}
    </Button>
  );
}
