import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PlaylistCard from "../components/PlaylistCard";
import { playlists } from "../data/playlists";

const Dashboard = () => {
  return (
    <div className="h-screen w-screen bg-[#121212] text-white overflow-hidden">
      <Sidebar />
      <div className="ml-60 h-full flex flex-col">
        <Header title="Welcome back" />
        <main className="flex-1 overflow-y-auto px-6 pb-8">
          <section className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Made for you</h3>
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 180px), 1fr))",
              }}
            >
              {playlists.map((p) => (
                <PlaylistCard
                  key={p.id}
                  title={p.title}
                  artist={p.artist}
                  image={p.image}
                />
              ))}
            </div>
          </section>

          <section className="pt-10">
            <h3 className="text-xl font-semibold mb-4">Recently played</h3>
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 180px), 1fr))",
              }}
            >
              {playlists.slice(0, 5).map((p) => (
                <PlaylistCard
                  key={`rp_${p.id}`}
                  title={p.title}
                  artist={p.artist}
                  image={p.image}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
