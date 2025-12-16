"use client";

import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/getSchools");
        const data = await res.json();
        setSchools(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = schools.filter((s) =>
    cityFilter ? s.city?.toLowerCase().includes(cityFilter.toLowerCase()) : true
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Browse schools</h1>
          <p className="text-slate-300 text-sm">
            Scroll through the catalogue of schools added in the system. Use the city filter to
            narrow down results.
          </p>
        </div>

        <div className="flex gap-3">
          <input
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            placeholder="Filter by city…"
            className="w-full md:w-60 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-slate-300 text-sm">Loading schools…</p>
      ) : filtered.length === 0 ? (
        <p className="text-slate-400 text-sm">No schools found. Try removing filters or add one.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((school) => (
            <article
              key={school.id}
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-sm hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-shadow transition-colors"
            >
              <div className="relative aspect-[4/3] bg-slate-800 overflow-hidden">
                {school.image ? (
                  <img
                    src={`/schoolImages/${school.image}`}
                    alt={school.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-4 space-y-1.5">
                <h2 className="text-sm font-semibold text-slate-50 line-clamp-2">
                  {school.name}
                </h2>
                <p className="text-xs text-slate-400 line-clamp-2">{school.address}</p>
                <p className="text-[11px] text-cyan-300 font-medium mt-1">{school.city}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
