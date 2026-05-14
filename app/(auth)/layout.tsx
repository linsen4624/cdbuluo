import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-full flex flex-col gap-6 items-center px-24 py-16 justify-center">
      <div className="relative flex">
        <Link href="/">
          <Image
            className="dark:invert object-cover"
            src="/logo.png"
            alt="CD buluo"
            width="96"
            height="96"
            loading="eager"
          />
        </Link>
      </div>
      {children}
    </main>
  );
}
