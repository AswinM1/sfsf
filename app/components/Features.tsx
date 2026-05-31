
export default function Features() {
  const features = [
    {
      title: "Capture Instantly",
      description: "Save  and organize notes, links, with a single click.",
      img:"jmashja"
    },
    {
      title: "Organize Easily",
      description: "Use tags and smart folders to keep your digital brain tidy.",
      img:"jmashja"
    },

    {
      title: "Easy share",
      description: "Share with your friends through social medias",
      img:"jmashja"
    },
  ];

  return ( 
    <div className="flex w-full h-screen bg-neutral-200 mt-5 py-10 rounded-t-2xl  shadow-black">
    <div className="text-center flex flex-col w-full h-screen mx-auto">
      <h2 className="text-5xl font-bold mb-10 tracking-tight text-black">How does it work</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="p-6 rounded-lg bg-neutral-300 shadow hover:shadow-lg transition">
            <div className=" bg-gradient-to-t from-purple-600 rounded-xl via-purple-500 to-blue-500 w-70 h-30 bg-neutral-400  border-black mx-auto flex"></div>
            <h3 className="text-xl font-semibold mb-2 text-black mt-5 tracking-tight font-sans">{f.title}</h3>
            <p className="text-gray-600">{f.description}</p>
          </div>
        ))}
      </div>
      </div> 
    </div>
  );
}
