"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpUser } from "@/lib/actions/user.actions";
import { signUpDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import SignUpButton from "./SignUpButton";

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={signUpDefaultValues.name}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={signUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={signUpDefaultValues.password}
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="confirm-password"
            defaultValue={signUpDefaultValues.confirmPassword}
          />
        </div>
        <div>
          <SignUpButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">
            <p>{data.message}</p>
          </div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" target="_self">
            Sign In.
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
