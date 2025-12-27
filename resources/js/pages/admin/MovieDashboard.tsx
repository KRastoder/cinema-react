import React, { useState, ChangeEvent, FormEvent } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/components/mycomponents/AdminLayout";

interface Movie {
  id: number;
  title: string;
  duration: number;
  description: string;
  release_date: string;
  poster: string | null;
}

interface Props {
  movies: Movie[];
}

interface MovieFormData {
  id: number | null;
  title: string;
  duration: string;
  description: string;
  release_date: string;
  poster: File | null;
  _method: string;
}

export default function MoviesDashboard({ movies }: Props) {
  const { data, setData, post, processing, reset, delete: destroy } =
    useForm<MovieFormData>({
      id: null,
      title: "",
      duration: "",
      description: "",
      release_date: "",
      poster: null,
      _method: "",
    });

  const [editing, setEditing] = useState(false);

  function handleEdit(movie: Movie) {
    setEditing(true);
    setData({
      id: movie.id,
      title: movie.title,
      duration: movie.duration.toString(),
      description: movie.description,
      release_date: movie.release_date,
      poster: null,
      _method: "PUT",
    });
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    setData("poster", file ?? null);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    post(
      editing
        ? `/admin/movies/${data.id}`
        : "/admin/movies",
      {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          reset();
          setEditing(false);
        },
      }
    );
  }

  function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this movie?")) {
      destroy(`/admin/movies/${id}`, {
        preserveState: true,
        preserveScroll: true,
      });
    }
  }

  return (
    <>
      <Head title="Admin / Movies" />

      <div className="space-y-6">
        {/* Header + Breadcrumb */}
        <div>
          <h1 className="text-3xl font-bold text-white">Movies</h1>
          <p className="text-gray-400 text-sm">Dashboard / Movies</p>
        </div>

        {/* Create/Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-5 rounded shadow space-y-4"
        >
          <h2 className="text-xl text-white font-semibold">
            {editing ? "Edit Movie" : "Create Movie"}
          </h2>

          <input
            type="text"
            placeholder="Title"
            value={data.title}
            onChange={(e) => setData("title", e.target.value)}
            className="w-full border-gray-700 bg-gray-900 text-white rounded p-2"
            required
          />

          <input
            type="number"
            placeholder="Duration (minutes)"
            value={data.duration}
            onChange={(e) => setData("duration", e.target.value)}
            className="w-full border-gray-700 bg-gray-900 text-white rounded p-2"
            required
          />

          <textarea
            placeholder="Description"
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            className="w-full border-gray-700 bg-gray-900 text-white rounded p-2"
            required
          />

          <input
            type="date"
            value={data.release_date}
            onChange={(e) => setData("release_date", e.target.value)}
            className="w-full border-gray-700 bg-gray-900 text-white rounded p-2"
            required
          />

          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-white"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {editing ? "Update Movie" : "Add Movie"}
            </button>

            {editing && (
              <button
                type="button"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                onClick={() => {
                  reset();
                  setEditing(false);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Movies List */}
        <table className="w-full table-auto bg-gray-800 text-white rounded overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-left">Release</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} className="even:bg-gray-900">
                <td className="px-4 py-2">{movie.title}</td>
                <td className="px-4 py-2">{movie.duration}</td>
                <td className="px-4 py-2">{movie.release_date}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="text-blue-400 hover:underline"
                    onClick={() => handleEdit(movie)}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(movie.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

MoviesDashboard.layout = (page: React.ReactNode) => (
  <AdminLayout>{page}</AdminLayout>
);
