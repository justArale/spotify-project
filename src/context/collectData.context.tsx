import React, { useState, useEffect, createContext, ReactNode } from "react";

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
}

const defaultContextValue: CollectContextType = {
  artistID: "",
  setArtistID: () => {},
  danceMin: null,
  setDanceMin: () => {},
  danceMax: null,
  setDanceMax: () => {},
  choosenArtistName: "",
  setChoosenArtistName: () => {},
  choosenMood: "",
  setChoosenMood: () => {},
  choosenArtistImage: "",
  setChoosenArtistImage: () => {},
};

// Kontext erstellen
const CollectContext = createContext<CollectContextType>(defaultContextValue);

// Types ffor the wrapper component
interface CollectWrapperProps {
  children: ReactNode;
}

const CollectWrapper: React.FC<CollectWrapperProps> = (props) => {
  const [artistID, setArtistID] = useState<string>("");
  const [danceMin, setDanceMin] = useState<number | null>(null);
  const [danceMax, setDanceMax] = useState<number | null>(null);
  const [choosenArtistName, setChoosenArtistName] = useState<string>("");
  const [choosenMood, setChoosenMood] = useState<string>("");
  const [choosenArtistImage, setChoosenArtistImage] = useState<string>("");

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
      }}
    >
      {props.children}
    </CollectContext.Provider>
  );
};

export { CollectWrapper, CollectContext };
