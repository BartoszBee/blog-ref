import Link from 'next/link'
 
export default function NotFound() {
  return (
    <article className="space-y-6">
      <h2 className="text-3xl font-bold">Not Found</h2>
      <p className="text-muted-foreground">Could not find requested post</p>
      <Link href="/" className="text-xl font-semibold hover:underline">Return Home</Link>
    </article>
  )
}