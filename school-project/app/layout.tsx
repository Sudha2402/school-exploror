import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "School Explorer",
  description: "Add and browse schools",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-xs font-black">
                SE
              </div>
              <span className="font-semibold tracking-tight text-lg">School Explorer</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/addSchool" className="hover:text-cyan-300 transition-colors">
                Add school
              </Link>
              <Link href="/showSchools" className="hover:text-cyan-300 transition-colors">
                Browse schools
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

        <footer className="border-t border-slate-800 mt-8">
          <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-400 flex justify-between">
            <span>School Explorer · Mini project</span>
            <span>Built with Next.js & MySQL</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
