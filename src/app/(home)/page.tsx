import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1 gap-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">fiscal-rs</h1>
        <p className="text-lg text-muted-foreground">
          Biblioteca Rust para documentos fiscais brasileiros (NF-e / NFC-e)
        </p>
      </div>
      <div className="flex flex-row gap-4 justify-center">
        <Link
          href="/docs"
          className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90"
        >
          Documentos
        </Link>
        <Link
          href="https://docs.rs/fiscal"
          className="px-6 py-2 rounded-md border font-medium hover:bg-accent"
          target="_blank"
        >
          API Reference
        </Link>
      </div>
      <pre className="mx-auto text-sm bg-muted px-4 py-2 rounded-md">
        cargo add fiscal
      </pre>
    </div>
  );
}
