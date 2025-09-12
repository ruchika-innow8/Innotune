import React from "react";

const PlaylistCard = ({ title, artist, image }) => {
  return (
    <div className="group cursor-pointer rounded-md bg-neutral-800/60 hover:bg-neutral-800 transition-colors p-4">
      <div className="relative w-full overflow-hidden rounded-md aspect-square bg-neutral-700">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : null}
      </div>
      <div className="mt-3">
        <h3 className="text-white font-semibold truncate">{title}</h3>
        <p className="text-neutral-400 text-sm truncate">{artist}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
