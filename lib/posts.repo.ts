export type Post = {
  id: number;
  title: string;
};

/**
 * Tymczasowe źródło danych (in-memory)
 * Zostanie zastąpione DB bez zmiany API
 */
let POSTS: Post[] = [
  { id: 1, title: "Hello Next.js" },
  { id: 2, title: "Routing w App Router" },
];

/**
 * READ — lista
 */
export function getPosts(): Post[] {
  return POSTS;
}

/**
 * READ — jeden wpis
 */
export function getPostById(id: number): Post | undefined {
  return POSTS.find((p) => p.id === id);
}

/**
 * CREATE
 */
export function createPost(title: string): Post {
  const post: Post = {
    id: Date.now(),
    title,
  };

  POSTS.push(post);
  return post;
}

/**
 * UPDATE
 */
export function updatePost(id: number, title: string): boolean {
  const post = POSTS.find((p) => p.id === id);
  if (!post) return false;

  post.title = title;
  return true;
}

/**
 * DELETE
 */
export function deletePost(id: number): void {
  POSTS = POSTS.filter((p) => p.id !== id);
}
