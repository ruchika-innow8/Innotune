// import React from "react";

// const Dashboard = () => {
//   return (
//     <div className="flex justify-center items-center h-screen bg-black text-white">
//       <h1 className="text-4xl font-bold">🎵 Welcome to Dashboard</h1>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const sampleTrending = [
  {
    id: 1,
    title: "Arz Kiya Hai",
    artist: "Anuv Jain",
    img: "/images/track1.jpg",
  },
  {
    id: 2,
    title: "Oorum Blood",
    artist: "Sai Abhyankkar",
    img: "/images/track2.jpg",
  },
  {
    id: 3,
    title: "Bijuria",
    artist: "Tanishk Bagchi",
    img: "/images/track3.jpg",
  },
  {
    id: 4,
    title: "For A Reason",
    artist: "Karan Aujla",
    img: "/images/track4.jpg",
  },
  {
    id: 5,
    title: "Deewaniyat",
    artist: "Vishal Mishra",
    img: "/images/track5.jpg",
  },
];

const sampleArtists = [
  { id: 1, name: "Pritam", img: "/images/artist1.jpg" },
  { id: 2, name: "A.R. Rahman", img: "/images/artist2.jpg" },
  { id: 3, name: "Arijit Singh", img: "/images/artist3.jpg" },
  { id: 4, name: "Sachin-Jigar", img: "/images/artist4.jpg" },
  { id: 5, name: "Vishal-Shekhar", img: "/images/artist5.jpg" },
  { id: 6, name: "Atif Aslam", img: "/images/artist6.jpg" },
];

const Dashboard = ({ role }) => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Header />
      <div className="flex gap-6 px-6 py-6">
        <aside className="w-[260px] hidden lg:block">
          <Sidebar />
        </aside>

        {/* main content */}
        <main className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Trending songs</h2>

          {/* horizontal scrollable cards */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {sampleTrending.map((t) => (
              <div
                key={t.id}
                className="min-w-[200px] bg-neutral-800 rounded-lg p-3 hover:scale-[1.02] transition-transform"
              >
                <div className="h-40 rounded-md overflow-hidden bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-end">
                  {/* image fallback */}
                  <img
                    src={t.img}
                    alt={t.title}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-3 font-semibold text-md">{t.title}</h3>
                <p className="text-sm text-neutral-400">{t.artist}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Popular artists</h2>
            <div className="flex gap-6 overflow-x-auto pb-4 items-center">
              {sampleArtists.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-col items-center min-w-[120px]"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center">
                    <img
                      src={a.img}
                      alt={a.name}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                      className="w-full h-full object-cover"
                    />
                    {/* if no image, show initial */}
                    <span className="text-xl font-semibold">
                      {a.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  </div>
                  <p className="mt-2 text-center">{a.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* more sections can be added similarly */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
