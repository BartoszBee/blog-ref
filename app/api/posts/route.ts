// app/api/posts/route.ts
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

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();

  if (typeof body.title !== "string" || body.title.length === 0) {
    return NextResponse.json(
      { error: "Pole 'title' jest wymagane" },
      { status: 400 }
    );
  }

  const newPost: Post = {
    id: Date.now(),
    title: body.title,
  };

  POSTS.push(newPost);

  return NextResponse.json(newPost, { status: 201 });
}
