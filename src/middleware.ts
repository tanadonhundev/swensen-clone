import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
      },
    }
  );

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (session.user.role === "user") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // อย่าลืมป้องกัน api ด้วย
  // matcher: ["api/product","/dashboard","/contact","about"], // Apply middleware to specific routes
  matcher: ["/product/:path*"], //ป้องกัน route ทุก route ที่อยู่ภายใต้ dashboard
};
