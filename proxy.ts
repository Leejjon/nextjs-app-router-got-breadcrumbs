import {NextResponse} from "next/server";

export function proxy(request: Request) {
    const url = new URL(request.url);

    const response = NextResponse.next();
    response.headers.set('x-url', url.pathname);
    return response;
}
