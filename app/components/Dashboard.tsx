"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

function Dashboard() {
  const [allData, setAllData] = useState<any[]>([]);
  const[sv,setSv]=useState(false)
  const[title,setTitle]=useState("")
  const [link, setLink] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sh, setSh] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>("All");
  const searchhook=useRef(null)
  const[search,setSearch]=useState("")
  const spanref=useRef(null)

  useEffect(() => {
    

    getData();
    
    const handleSearch=(e:any)=>
  {
     const activeEl = document.activeElement?.tagName;
      if (activeEl === 'INPUT' || activeEl === 'TEXTAREA') {
        return; 
      }
    if(e.key.toLowerCase()>="a" && e.key.toLowerCase()<="z" ||e.key>='0' && e.key<='9')
    {
      e.preventDefault();
      setSv(true);
      searchhook.current?.focus()
      

    }
    if(e.key==='Enter')
    {
      e.preventDefault()
      searchhook.current?.blur()
      setSv(false)
    }


  }
  window.addEventListener("keydown",handleSearch)

   return () => {
    window.removeEventListener("keydown", handleSearch);
  };
  }, []);


  const handleDelete=async(e:any,id:any)=>
    {
   
    e.preventDefault();

    try {
      await axios.delete("/api/upload", {
        data: {
          id: id,
        },
      });

      getData();
    } catch (err) {
      console.log(err);
    }
  }
      
  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/upload");
      const filtered = res.data.data.filter(
  (val: any) => val.deleted === false
);

setData(filtered);
setAllData(filtered);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const share = async () => {
    await axios
      .post("/api/upload", { data: true })
      .then((res) => {
        setSh(res.data.hash);
      })
      .catch((err) => console.log(err));
  };

  const handleUpload = async () => {
    if (!link || !title) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const tagArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);
      await axios.post(
        "/api/upload",
        { link,title, tags: tagArray},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLink("");
      setTags("");
      getData();
      setTitle("")
      setError(null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { label: "All", icon: "▦" },
    {label:"Collections",icon:"[]"}
  ];

  return (
    <div
      className="min-h-screen flex bg-[#0c0c0c] text-white font-sans tracking-tight"
    >
      {/* ---------- SIDEBAR OVERLAY (mobile) ---------- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ---------- SIDEBAR ---------- */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 w-60
          bg-[#111111] border-r border-white/[0.06]
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex
        `}
      >
        {/* Logo */}
        <div className="px-6 py-7 border-b border-white/[0.06]">
          <span className="text-white font-semibold text-sm tracking-tight uppercase">
            ◈ Workspace
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveNav(item.label);
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm
                transition-all duration-150 cursor-pointer text-left
                ${
                  activeNav === item.label
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                }
              `}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom action */}
        <div className="px-4 py-5 border-t border-white/[0.06]">
          <button
            onClick={() => { setShowModal(true); setSidebarOpen(false); }}
            className="
              w-full flex items-center justify-center gap-2
              bg-white text-black text-sm font-medium
              px-4 py-2.5 rounded-lg
              hover:bg-white/90 transition-colors duration-150 cursor-pointer
            "
          >
            <span className="text-base leading-none">+</span>
            Add Bookmark
          </button>
        </div>
      </aside>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-[#0c0c0c]/90 backdrop-blur border-b border-white/[0.06] px-5 py-4 flex items-center gap-4">
          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-1 cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="w-5 h-px bg-white/70 block" />
            <span className="w-5 h-px bg-white/70 block" />
            <span className="w-3 h-px bg-white/70 block" />
          </button>

          
          <div className="flex-1 relative max-w-sm">
<input
  value={search}
  placeholder="Search bookmarks…"
  onBlur={()=>setSv(false)}
  onFocus={()=>setSv(true)}
  ref={searchhook}
  onChange={(e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim().length > 0) {
      const filtered = allData.filter((val) => {
        return (
          val.title?.toLowerCase().includes(value.toLowerCase()) ||
          val.link?.toLowerCase().includes(value.toLowerCase()) ||
          val.tags?.some((tag:any) =>
            tag.name.toLowerCase().includes(value.toLowerCase())
          )
        );
      });

      setData(filtered);
    } else {
      setData(allData);
    }
  }}

  className={
  
    ` ${`sv ? "w-full bg-white/[0.05] border border-white/[0.08] rounded-lg
    pl-8 pr-4 py-2 text-sm text-white/80 placeholder-white/25
    outline-none focus:border-white/20 focus:bg-white/[0.07]
    transition-all duration-150" : "w-0 opacity-0"`}
  `}
/>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={share}
              className="
                flex items-center gap-1.5 px-3 py-2
                text-xs text-white/50 hover:text-white/80
                border border-white/[0.08] rounded-lg
                hover:border-white/[0.15] hover:bg-white/[0.04]
                transition-all duration-150 cursor-pointer
              "
            >
              <span className="text-sm">↗</span>
              Share
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="
                hidden sm:flex items-center gap-1.5 px-3 py-2
                text-xs text-black font-medium
                bg-white rounded-lg
                hover:bg-white/90 transition-colors duration-150 cursor-pointer
              "
            >
              <span>+</span>
              Add
            </button>
          </div>
        </header>

       
        <div className="flex-1 px-5 py-6 overflow-auto">

        

          {/* Error */}
          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {/* Loading shimmer */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/[0.03] rounded-xl h-64 animate-pulse border border-white/[0.05]" />
              ))}
            </div>
          )}

          {/* Cards grid */}
          {!loading && (
            <>
              {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-28 text-center">
                  <span className="text-4xl mb-4 opacity-20">◈</span>
                  <p className="text-white/30 text-sm">No bookmarks yet.</p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 text-xs text-white/50 hover:text-white/80 underline underline-offset-4 cursor-pointer"
                  >
                    Add your first bookmark
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {data.map((item, index) => (

                    <Link
                    href={item.link}
                      key={index}
                      className="
                        group bg-[#111111] border border-white/[0.07]
                        rounded-xl overflow-hidden
                        hover:border-white/[0.15] hover:bg-[#141414]
                        transition-all duration-200
                        flex flex-col
                      "
                    >
                      
                      {/* Thumbnail */}
                      <div className="w-full h-10 bg-white/[0.04] flex overflow-hidden justify-start items-center mx-0">
                      
                        {item.icon ? (
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="w-10 h-fit rounded-full justify-center items-center flex object-cover opacity-100 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/10 text-3xl">
                            ◈
                          </div>
                        )}
                      </div>

                      {/* Info */}
                     <div className="p-3 flex justify-between items-start gap-2">
                      
                        <h3 className="text-sm font-medium text-white/90 px-2">
                          {item.name || "Untitled"}
                        </h3>
                         <button
  onClick={ (e)=>handleDelete(e,item.bid)}
  className="
    text-red-400 hover:text-red-300
    text-xs border border-red-500/20
    px-2 py-1 rounded-md
    hover:bg-red-500/10
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
            </>
          )}
        </div>
      </main>

      {/* ---------- ADD BOOKMARK MODAL ---------- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          />
          <div
            className="relative bg-[#111111] border border-white/[0.1] rounded-2xl w-full max-w-md p-6 shadow-2xl"
            style={{ boxShadow: "0 0 60px rgba(0,0,0,0.6)" }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-sans text-white/90 tracking-tight">New Bookmark</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/30 hover:text-white/70 text-lg leading-none cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-white/35 mb-1.5 uppercase tracking-tight">URL</label>
                <input
                  type="text"
                  placeholder="https://…"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="
                    w-full bg-white/[0.04] border border-white/[0.08] rounded-lg
                    px-4 py-2.5 text-sm text-white/80 placeholder-white/20
                    outline-none focus:border-white/20 focus:bg-white/[0.06]
                    transition-all duration-150
                  "
                />
              </div>
              <div>
                <label className="block text-xs text-white/35 mb-1.5 uppercase tracking-tight">Title</label>
                <input
                  type="text"
                  placeholder="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="
                    w-full bg-white/[0.04] border border-white/[0.08] rounded-lg
                    px-4 py-2.5 text-sm text-white/80 placeholder-white/20
                    outline-none focus:border-white/20 focus:bg-white/[0.06]
                    transition-all duration-150
                  "
                />
              </div>
              <div>
                <label className="block text-xs text-white/35 mb-1.5 uppercase tracking-tight">Tags</label>
                <input
                  type="text"
                  placeholder="design, tools, reference"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="
                    w-full bg-white/[0.04] border border-white/[0.08] rounded-lg
                    px-4 py-2.5 text-sm text-white/80 placeholder-white/20
                    outline-none focus:border-white/20 focus:bg-white/[0.06]
                    transition-all duration-150
                  "
                />
                <p className="text-[10px] text-white/20 mt-1.5">Separate tags with commas</p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="mt-3 text-xs text-red-400/80">{error}</p>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="
                  flex-1 px-4 py-2.5 rounded-lg text-sm
                  text-white/40 border border-white/[0.08]
                  hover:text-white/60 hover:border-white/[0.15]
                  transition-all duration-150 cursor-pointer
                "
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={loading}
                className="
                  flex-1 px-4 py-2.5 rounded-lg text-sm font-medium
                  bg-white text-black
                  hover:bg-white/90 disabled:opacity-40
                  transition-all duration-150 cursor-pointer
                "
              >
                {loading ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;