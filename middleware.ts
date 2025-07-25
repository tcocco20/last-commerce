import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req: NextRequest) => {
  // Check if sessionCartId cookie exists
  if (!req.cookies.get("sessionCartId")) {
    const sessionCartId = crypto.randomUUID();
    const response = NextResponse.next();

    // Set the sessionCartId cookie
    response.cookies.set("sessionCartId", sessionCartId, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
