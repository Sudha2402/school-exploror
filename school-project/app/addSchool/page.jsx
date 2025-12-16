"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required("School name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  contact: yup.string().required("Contact is required"),
  email_id: yup.string().email("Invalid email").required("Email is required"),
  image: yup.mixed().required("Image is required"),
});

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const onSubmit = async (data) => {
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      formData.append("image", data.image[0]);

      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setMessage("Something went wrong. Please try again.");
        return;
      }

      setMessage("School added successfully!");
      setPreview(null);
      reset();
    } catch (e) {
      console.error(e);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <section className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Add a new school</h1>
        <p className="text-slate-300 text-sm">
          Fill in the details below. All fields are required. An image helps the card stand out in
          the listing.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-cyan-500/10 backdrop-blur">
          {message && (
            <p
              className={`mb-4 rounded-md px-3 py-2 text-sm ${
                message.includes("success")
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                  : "bg-rose-500/10 text-rose-300 border border-rose-500/40"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-1.5">
              <label className="text-xs font-medium text-slate-200">School name</label>
              <input
                {...register("name")}
                className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                placeholder="E.g. Gyan International School"
              />
              {errors.name && <p className="text-xs text-rose-400">{errors.name.message}</p>}
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs font-medium text-slate-200">Address</label>
              <input
                {...register("address")}
                className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                placeholder="Street, locality"
              />
              {errors.address && <p className="text-xs text-rose-400">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <label className="text-xs font-medium text-slate-200">City</label>
                <input
                  {...register("city")}
                  className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder="City"
                />
                {errors.city && <p className="text-xs text-rose-400">{errors.city.message}</p>}
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-medium text-slate-200">State</label>
                <input
                  {...register("state")}
                  className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder="State"
                />
                {errors.state && <p className="text-xs text-rose-400">{errors.state.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <label className="text-xs font-medium text-slate-200">Contact number</label>
                <input
                  {...register("contact")}
                  className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder="+91 98765 43210"
                />
                {errors.contact && <p className="text-xs text-rose-400">{errors.contact.message}</p>}
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-medium text-slate-200">Email</label>
                <input
                  {...register("email_id")}
                  className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder="contact@school.com"
                />
                {errors.email_id && (
                  <p className="text-xs text-rose-400">{errors.email_id.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs font-medium text-slate-200">School image</label>
              <input
                type="file"
                {...register("image")}
                onChange={handleImageChange}
                className="block w-full cursor-pointer rounded-lg border border-dashed border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-300 file:mr-3 file:rounded-md file:border-0 file:bg-cyan-500 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-slate-950 hover:border-cyan-400"
              />
              {errors.image && <p className="text-xs text-rose-400">{errors.image.message}</p>}
              <p className="text-[11px] text-slate-400">Recommended: 1200×800, JPG or PNG.</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2.5 text-sm font-medium text-slate-950 shadow-md shadow-cyan-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100 transition-transform"
            >
              {isSubmitting ? "Saving..." : "Save school"}
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl">
          <p className="text-xs font-medium text-slate-300 mb-3">Live preview</p>
          <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
            <div className="aspect-video bg-slate-800 relative">
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-500 text-xs">
                  Image preview will appear here
                </div>
              )}
            </div>
            <div className="p-3 space-y-1">
              <p className="text-sm font-semibold text-slate-50">
                {/** fallback preview text */}
                Sample School Name
              </p>
              <p className="text-xs text-slate-400">Address · City</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
