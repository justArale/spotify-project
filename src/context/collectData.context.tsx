import React, { useState, createContext, ReactNode, useEffect } from "react";

interface CollectContextType {
  artistID: string;
  setArtistID: React.Dispatch<React.SetStateAction<string>>;
  danceMin: number | null;
  setDanceMin: React.Dispatch<React.SetStateAction<number | null>>;
  danceMax: number | null;
  setDanceMax: React.Dispatch<React.SetStateAction<number | null>>;
  choosenArtistName: string;
  setChoosenArtistName: React.Dispatch<React.SetStateAction<string>>;
  choosenMood: string;
  setChoosenMood: React.Dispatch<React.SetStateAction<string>>;
  choosenArtistImage: string;
  setChoosenArtistImage: React.Dispatch<React.SetStateAction<string>>;
  playlistData: any[];
  setPlaylistData: React.Dispatch<React.SetStateAction<any[]>>;
}

const defaultContextValue: CollectContextType = {
  artistID: "",
  setArtistID: () => {
    throw new Error("setArtistID function not initialized");
  },
  danceMin: null,
  setDanceMin: () => {
    throw new Error("setDanceMin function not initialized");
  },
  danceMax: null,
  setDanceMax: () => {
    throw new Error("setDanceMax function not initialized");
  },
  choosenArtistName: "",
  setChoosenArtistName: () => {
    throw new Error("setChoosenArtistName function not initialized");
  },
  choosenMood: "",
  setChoosenMood: () => {
    throw new Error("setChoosenMood function not initialized");
  },
  choosenArtistImage: "",
  setChoosenArtistImage: () => {
    throw new Error("setChoosenArtistImage function not initialized");
  },
  playlistData: [],
  setPlaylistData: () => {
    throw new Error("setPlaylistData function not initialized");
  },
};

// Create context
const CollectContext = createContext<CollectContextType>(defaultContextValue);

// Types for the wrapper component
interface CollectWrapperProps {
  children: ReactNode;
}

const CollectWrapper: React.FC<CollectWrapperProps> = (props) => {
  const [artistID, setArtistID] = useState<string>(
    () => localStorage.getItem("artistID") || ""
  );
  const [danceMin, setDanceMin] = useState<number | null>(() => {
    const value = localStorage.getItem("danceMin");
    return value ? JSON.parse(value) : null;
  });
  const [danceMax, setDanceMax] = useState<number | null>(() => {
    const value = localStorage.getItem("danceMax");
    return value ? JSON.parse(value) : null;
  });
  const [choosenArtistName, setChoosenArtistName] = useState<string>(
    () => localStorage.getItem("choosenArtistName") || ""
  );
  const [choosenMood, setChoosenMood] = useState<string>(
    () => localStorage.getItem("choosenMood") || ""
  );
  const [choosenArtistImage, setChoosenArtistImage] = useState<string>(
    () => localStorage.getItem("choosenArtistImage") || ""
  );
  const [playlistData, setPlaylistData] = useState<any[]>(() => {
    const value = localStorage.getItem("playlistData");
    return value ? JSON.parse(value) : [];
  });

  // Save to localStorage whenever a state changes
  useEffect(() => {
    localStorage.setItem("artistID", artistID);
  }, [artistID]);

  useEffect(() => {
    if (danceMin !== null) {
      localStorage.setItem("danceMin", JSON.stringify(danceMin));
    } else {
      localStorage.removeItem("danceMin");
    }
  }, [danceMin]);

  useEffect(() => {
    if (danceMax !== null) {
      localStorage.setItem("danceMax", JSON.stringify(danceMax));
    } else {
      localStorage.removeItem("danceMax");
    }
  }, [danceMax]);

  useEffect(() => {
    localStorage.setItem("choosenArtistName", choosenArtistName);
  }, [choosenArtistName]);

  useEffect(() => {
    localStorage.setItem("choosenMood", choosenMood);
  }, [choosenMood]);

  useEffect(() => {
    localStorage.setItem("choosenArtistImage", choosenArtistImage);
  }, [choosenArtistImage]);

  useEffect(() => {
    localStorage.setItem("playlistData", JSON.stringify(playlistData));
  }, [playlistData]);

  return (
    <CollectContext.Provider
      value={{
        artistID,
        setArtistID,
        danceMin,
        setDanceMin,
        danceMax,
        setDanceMax,
        choosenArtistName,
        setChoosenArtistName,
        choosenMood,
        setChoosenMood,
        choosenArtistImage,
        setChoosenArtistImage,
        playlistData,
        setPlaylistData,
      }}
    >
      {props.children}
    </CollectContext.Provider>
  );
};

export { CollectWrapper, CollectContext };
