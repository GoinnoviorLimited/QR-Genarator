import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Link href={"/dashboard"} className="bg-green-900 text-white px-6 py-3 rounded-full">Go to Dashboard</Link>
    </div>
  );
}
