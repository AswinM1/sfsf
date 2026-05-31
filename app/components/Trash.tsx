"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function TrashPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-[#0c0c0c] text-white p-6 font-sans tracking-tight">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">
            Trash
          </h1>

          <p className="text-white/40 text-sm mt-1">
            Deleted bookmarks
          </p>
        </div>

        <Link
          href="/dashboard"
          className="
            px-4 py-2 rounded-lg
            border border-white/10
            text-sm text-white/70
            hover:bg-white/5
            transition-all
          "
        >
          Back
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-white/40">
          Loading...
        </p>
      )}

      {/* Empty */}
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
      <div className="
        grid grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-4
      ">
        {data.map((item) => (
          <Link
            href={item.link}
            key={item.id}
            className="
              bg-[#111111]
              border border-white/10
              rounded-xl
              overflow-hidden
              hover:border-white/20
              transition-all
            "
          >
            {/* Icon */}
            <div className="
              h-14 bg-white/5
              flex items-center px-4
            ">
              {item.icon ? (
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <span className="text-2xl opacity-30">
                  ◈
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-sm font-medium truncate">
                {item.name}
              </h2>

             
              <div className="flex gap-2 mt-4">
                <button
                  onClick={(e) =>
                    restoreBookmark(e, item.bid)
                  }
                  className="
                    flex-1 py-2 rounded-lg
                    bg-green-500/10
                    text-green-400 text-xs
                    hover:bg-green-500/20
                    transition-all
                    cursor-pointer
                  "
                >
                  Restore
                </button>

                <button
                  onClick={(e) =>
                    deleteForever(e, item.bid)
                  }
                  className="
                  cursor-pointer
                    flex-1 py-2 rounded-lg
                    bg-red-500/10
                    text-red-400 text-xs
                    hover:bg-red-500/20
                    transition-all
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TrashPage;