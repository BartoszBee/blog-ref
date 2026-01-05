import fs from "fs";
import path from "path";

export type Post = {
  id: number;
  title: string;
};

/**
 * Plik danych (JSON jako storage)
 */
const DATA_FILE = path.join(process.cwd(), "data", "posts.json");

/**
 * Inicjalizacja pliku, jeśli nie istnieje
 */
function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

/**
 * READ — całość (internal)
 */
function readPosts(): Post[] {
  ensureFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Post[];
}

/**
 * WRITE — całość (internal)
 */
function writePosts(posts: Post[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

/**
 * READ — lista
 */
export function getPosts(): Post[] {
  return readPosts();
}

/**
 * READ — jeden wpis
 */
export function getPostById(id: number): Post | undefined {
  return readPosts().find((p) => p.id === id);
}

/**
 * CREATE
 */
export function createPost(title: string): Post {
  const posts = readPosts();

  const post: Post = {
    id: Date.now(),
    title,
  };

  posts.push(post);
  writePosts(posts);

  return post;
}

/**
 * UPDATE
 */
export function updatePost(id: number, title: string): boolean {
  const posts = readPosts();
  const post = posts.find((p) => p.id === id);

  if (!post) return false;

  post.title = title;
  writePosts(posts);

  return true;
}

/**
 * DELETE
 */
export function deletePost(id: number): void {
  const posts = readPosts().filter((p) => p.id !== id);
  writePosts(posts);
}
