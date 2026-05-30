"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function Dashboard() {
  const [allData, setAllData] = useState<any[]>([]);
  const [link, setLink] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [data, setData] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sh, setSh] = useState("");

  useEffect(() => {
    getData();
      
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/upload");
      setData(res.data.data);
      setAllData(res.data.data)
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
    if ( !link ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const tagArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);

      const res = await axios.post(
        "/api/upload",
        {  link, tags: tagArray },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    
      setLink("");
    
      setTags("");
      getData();
      setError(null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError("Upload failed.");
    } finally {
      setLoading(false);
    }
  };
  const printdata=()=>
  {
    axios.get("/api/upload").then((res)=>
    {
      setData(res.data)
    })
  }

  return (
    <div className="min-h-screen bg-neutral-200 text-white p-6  ">
      <div className="md:max-w-5xl mx-auto border px-4 py-4 rounded-md border-neutral-400 bg-neutral-200 ">
        <div className="flex justify-between gap-3 bg-neutral-100 shadow-lg items-center mb-6 border border-neutral-200 px-4 py-4 rounded-md">
          <h1 className="text-2xl font-bold text-black font-sans tracking-tighter">Dashboard</h1>
          <div className="gap-4 flex px-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-t from-black to-neutral-700 cursor-pointer text-white px-4 py-2 rounded"
          >
          Add Item
          </button>
           <button
            onClick={share}
              className="bg-gradient-to-t from-black to-neutral-700 cursor-pointer text-white px-4 py-2 rounded"
          >
            Share 
          </button>
          <input onChange={(e)=>
            {
              if(e.target.value.length>0){setData(data.filter((val)=>val.title.includes(e.target.value)))}
              else{
                setData(allData)
              }
            }
          } placeholder="search" className="text-black rounded-md border-neutral-800 border px-4 py-3 items-center  "></input>
          </div>
        </div>

        {loading && <p className="text-black rounded-full w-10 h-10 mx-auto flex justify-center items-center">loading</p>}
        {error && <p className="text-black">{error}</p>}

       

        {sh && (
          <div className="bg-blue-600 text-white p-2 rounded mb-4 break-all">
            Shared Link Hash: {sh}
          </div>
        )}

        <div className=" flex flex-wrap gap-3">
          {data.length === 0 ? (
            <p className="text-white bg-red-300 px-4 w-fit justify-center mx-auto py-4 rounded-md">No items found.</p>
          ) : (
            data.map((item, index) => (
              <div
                key={index}
                className="bg-neutral-100 py-4 border-neutral-400 shadow-lg w-80 h-90 overflow-y-scroll p-4 rounded-md"
              >
                 <img src={item.img} alt={`${"https://picsum.photos/200/300/?blur"}`} className="w-70 bg-neutral-300 mb-3 h-50 mx-auto  rounded-md"></img>
                <h3 className="text-lg font-semibold text-black font-sans tracking-tight">
                 {item.title}</h3>
                <p className="text-black font-sans justify-start  flex font-medium cursor-pointer tracking-tight">
                 {item.link ? (
  <Link
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline break-all"
  >
    {item.link}
  </Link>
) : (
  <p className="text-neutral-600">no link</p>
)}

                
                </p>
                {/* {item.tags && (
                  <div className="mt-2 flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag: any, i: number) => (
                      <span
                        key={i}
                        className="bg-blue-300 font-sans tracking-tight font-semibold text-blue-900 text-md px-2 py-1 rounded-md w-fit h-fit"
                      >
                      {tag}
                      </span>
                    ))}
                
                  </div>
                )} */}
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-70 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-neutral-100 p-6 rounded-lg w-full max-w-md">
             
            <h2 className="text-xl font-sans font-semibold tracking-tight gap-2 justify-between flex text-black mb-4">Add Something
              <button
                onClick={() => setShowModal(false)}
                className="text-black rounded cursor-pointer justify-center items-center text-xl"
              >
                x
              </button>
            </h2>
           
            <input
              type="text"
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 mb-3 rounded bg-neutral-100 border border-black text-black  outline-none"
            />
           
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 mb-3 rounded bg-neutral-100 border border-black text-black  outline-none"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={handleUpload}
                className="bg-gradient-to-t from-black to-neutral-700 hover:bg-blue-700 px-4 py-2 rounded text-white"
              >
                Upload
              </button>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
