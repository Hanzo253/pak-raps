import React from "react";

const Lyrics = ({ songs, index }) => {
  return (
    <div className="lyrics-page">
      <strong className="song-title">{songs[index - 1].title}</strong>
      <p className="song-lyrics">
        {songs[index - 1].lyrics.split(",").join("\n")}
      </p>
      {/* <p className="song-lyrics">{songId}</p> */}
    </div>
  );
};

export default Lyrics;
