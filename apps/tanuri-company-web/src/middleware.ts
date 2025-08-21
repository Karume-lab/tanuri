import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
  return NextResponse.next();
};

export default middleware;
