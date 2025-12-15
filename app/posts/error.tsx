"use client";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  return (
    <div className="space-y-6 rounded-md border border-destructive/20 bg-destructive/10 p-6">
      <h2 className="text-2xl font-bold text-destructive">
        Coś poszło nie tak
      </h2>

      <p className="text-sm text-destructive/80">
        Wystąpił nieoczekiwany podczas pobierania wpisów.
      </p>

      <pre className="rounded bg-background p-4 text-xs text-muted-foreground">
        {error.message}
      </pre>

      <button
        onClick={reset}
        className="rounded-md bg-destructive px-4 py-2 text-white hover:bg-destructive/90"
      >
        Spróbuj ponownie
      </button>
    </div>
  );
}
