import Link from "next/link";

export default function Home() {
  return (
    <section className="grid gap-10 md:grid-cols-2 items-center">
      <div className="space-y-6">
        <p className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
          {/* Mini project · React · Next.js · MySQL */}
          Make your school globally accessible
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Manage schools with a <span className="text-cyan-400">clean</span> and{" "}
          <span className="text-indigo-400">simple</span> interface.
        </h1>
        <p className="text-slate-300 text-sm md:text-base">
          Add school details, upload campus photos, and browse them in the gallery.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/addSchool"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-2.5 text-sm font-medium shadow-md shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.99] transition-transform"
          >
            Add a school
          </Link>
          <Link
            href="/showSchools"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-5 py-2.5 text-sm font-medium hover:border-cyan-400/70 hover:text-cyan-200 transition-colors"
          >
            View schools
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-10 bg-gradient-to-tr from-cyan-500/20 via-indigo-500/10 to-transparent blur-3xl" />
        <div className="relative grid gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
            <p className="text-xs font-medium text-cyan-300 mb-2">Example card : Winkler International School design walk through</p>

            {/* video file intro.mp4*/}
            {/* <div className="aspect-video rounded-xl overflow-hidden mb-3 bg-slate-900">
              <video
                src="/videos/intro.mp4"
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                controls
              />
            </div> */}


            {/* youtube embed video */}
            <div className="aspect-video rounded-xl overflow-hidden mb-3 bg-slate-900">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/Af2ucXqXIRo?autoplay=1&mute=1&loop=1&si=yZvLqZ5pIpkM6Vck"
                title="School Explorer demo"
                allow="accelerometer; autoplay;loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

            </div>


            <div className="space-y-1">
              <p className="font-semibold text-sm">Winkler International School</p>
              <p className="text-xs text-slate-400">MG Road, Bengaluru · Karnataka</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
