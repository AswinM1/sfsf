"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function TrashPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH TRASH ----------------
  const getTrash = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/trash");

      setData(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrash();
  }, []);

  // ---------------- RESTORE ----------------
  const restoreBookmark = async (
    e: any,
    id: string
  ) => {
    e.preventDefault();

    try {
      await axios.put("/api/trash", {
        id,
      });

      getTrash();
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- DELETE FOREVER ----------------
  const deleteForever = async (
    e: any,
    id: string
  ) => {
    e.preventDefault();

    try {
      await axios.delete("/api/trash", {
        data: {
          id,
        },
      });

      getTrash();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0c0c0c] text-white font-sans tracking-tight">

      {/* ================= SIDEBAR ================= */}
      <aside
        className="
          w-60 bg-[#111111]
          border-r border-white/[0.06]
          flex flex-col
        "
      >

        {/* Logo */}
        <div className="px-6 py-7 border-b border-white/[0.06]">
          <span className="text-white font-semibold text-sm uppercase">
            ◈ Workspace
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">

          <Link
            href="/dashboard"
            className="
              w-full flex items-center gap-3
              px-4 py-2.5 rounded-lg text-sm
              text-white/40 hover:text-white/80
              hover:bg-white/[0.04]
              transition-all
            "
          >
            <span>▦</span>
            All
          </Link>

          <Link
            href="/trash"
            className="
              w-full flex items-center gap-3
              px-4 py-2.5 rounded-lg text-sm
              bg-white/10 text-white
            "
          >
            <span>🗑</span>
            Trash
          </Link>

        </nav>

        {/* Bottom */}
        <div className="px-4 py-5 border-t border-white/[0.06]">
          <Link
            href="/dashboard"
            className="
              w-full flex items-center justify-center
              gap-2 bg-white text-black
              text-sm font-medium
              px-4 py-2.5 rounded-lg
              hover:bg-white/90
              transition-all
            "
          >
            ← Back
          </Link>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-6 overflow-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">
            Trash
          </h1>

          <p className="text-white/40 text-sm mt-1">
            Deleted bookmarks
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-4
          ">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="
                  h-32 rounded-xl
                  bg-white/[0.03]
                  animate-pulse
                  border border-white/[0.05]
                "
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32">
            <span className="text-5xl opacity-20">
              🗑
            </span>

            <p className="mt-4 text-white/40">
              Trash is empty
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && data.length > 0 && (
          <div
            className="
              grid grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-4
            "
          >

            {data.map((item) => (
              <Link
                href={item.link}
                key={item.bid}
                className="
                  bg-[#111111]
                  border border-white/[0.07]
                  rounded-xl
                  overflow-hidden
                  hover:border-white/[0.15]
                  hover:bg-[#151515]
                  transition-all duration-200
                "
              >

                {/* Card Content */}
                <div className="p-4 flex items-center gap-3">

                  {/* Icon */}
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="
                        w-9 h-9 rounded-full
                        object-cover shrink-0
                      "
                    />
                  ) : (
                    <div
                      className="
                        w-9 h-9 rounded-full
                        bg-white/10
                        flex items-center justify-center
                        text-xs text-white/40
                        shrink-0
                      "
                    >
                      ◈
                    </div>
                  )}

                  {/* Text */}
                  <div className="overflow-hidden">
                    <h2 className="text-sm font-medium text-white truncate">
                      {item.title || "Untitled"}
                    </h2>

                    <p className="text-xs text-white/35 truncate">
                      {item.link}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 px-4 pb-4">

                  {/* Restore */}
                  <button
                    onClick={(e) =>
                      restoreBookmark(e, item.bid)
                    }
                    className="
                      flex-1 py-2 rounded-lg
                      bg-neutral-300
                      text-black text-sm
                      hover:bg-white
                      transition-all
                      cursor-pointer
                    "
                  >
                    Restore
                  </button>

                  {/* Delete Forever */}
                  <button
                    onClick={(e) =>
                      deleteForever(e, item.id)
                    }
                    className="
                      flex-1 py-2 rounded-lg
                      bg-neutral-700
                      text-white text-sm
                      hover:bg-neutral-600
                      transition-all
                      cursor-pointer
                    "
                  >
                    Delete
                  </button>

                </div>
              </Link>
            ))}

          </div>
        )}
      </main>
    </div>
  );
}

export default TrashPage;