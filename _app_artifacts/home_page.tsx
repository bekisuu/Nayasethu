import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center space-y-8">
      <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-300">
        NyayaSathi
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl">
        "Understand your legal notice. Know your next safe step."
      </p>
      <div className="flex space-x-4">
        <Link
          href="/en/select-issue"
          className="px-6 py-3 bg-teal-600 hover:bg-teal-500 rounded-lg transition"
        >
          Get Started (English)
        </Link>
        <Link
          href="/hi/select-issue"
          className="px-6 py-3 bg-teal-600 hover:bg-teal-500 rounded-lg transition"
        >
          प्रारंभ करें (Hindi)
        </Link>
        <Link
          href="/mr/select-issue"
          className="px-6 py-3 bg-teal-600 hover:bg-teal-500 rounded-lg transition"
        >
          सुरू करा (Marathi)
        </Link>
      </div>
    </section>
  );
}
