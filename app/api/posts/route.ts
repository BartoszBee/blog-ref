import { NextResponse } from "next/server";

type Post = {
  id: number;
  title: string;
};

const POSTS: Post[] = [
  { id: 1, title: "Hello Next.js" },
  { id: 2, title: "Routing w App Router" },
];

export async function GET(): Promise<NextResponse<Post[]>> {
  return NextResponse.json(POSTS);
}
