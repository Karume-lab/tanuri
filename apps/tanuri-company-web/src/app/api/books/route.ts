import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json([
    { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien" },
    { id: 2, title: "1984", author: "George Orwell" },
    { id: 3, title: "Clean Code", author: "Robert C. Martin" },
  ]);
};
