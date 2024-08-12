import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchArtist.css";
import arrowIcon from "../assets/icons/arrow.svg";
import searchIcon from "../assets/icons/search.svg";

interface ArtistProps {
  getArtistId: (id: string) => void;
}

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface SearchResult {
  artists: {
    items: Artist[];
  };
}

const SearchArtist: React.FC<ArtistProps> = ({ getArtistId }) => {
  const [artistNameInput, setArtistNameInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const minSearchLength = 2; // Minimum search length for the artist name
  const tokenFromLocalStorage = localStorage.getItem("accessTokenLocal");

  const searchArtist = async () => {
    if (!tokenFromLocalStorage) {
      console.log("No access token available");
      return;
    }

    try {
      const response = await axios.get<SearchResult>(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          artistNameInput
        )}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${tokenFromLocalStorage}`,
          },
        }
      );

      setSearchResults(response.data.artists.items);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error searching for artists:", error.response?.data);
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };

  // Function to fetch the specific artist by ID
  const getArtistById = async (artistId: string) => {
    if (!tokenFromLocalStorage) {
      console.log("No access token available");
      return;
    }

    try {
      const response = await axios.get<Artist>(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
          headers: {
            Authorization: `Bearer ${tokenFromLocalStorage}`,
          },
        }
      );
      setSelectedArtist(response.data);
      getArtistId(response.data.id);
      localStorage.setItem("artistImage", response.data.images[0]?.url || "");
      localStorage.setItem("artist", response.data.name);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error searching for artist image:", error.response?.data);
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };

  // Trigger search when artistNameInput changes
  useEffect(() => {
    if (
      artistNameInput.trim() !== "" &&
      artistNameInput.length >= minSearchLength
    ) {
      searchArtist();
    } else {
      setSearchResults([]); // Clear results if input is empty or too short
    }
  }, [artistNameInput]);

  // Function to handle the form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No need for search, just select the artist if available
    const selected = searchResults.find(
      (artist) => artist.name.toLowerCase() === artistNameInput.toLowerCase()
    );
    if (selected) {
      handleOptionClick(selected);
    }
  };

  // Function to set the selected artist when an option is clicked
  const handleOptionClick = (artist: Artist) => {
    getArtistById(artist.id);
  };

  return (
    <div className="contentFieldWrapper">
      <h1 className="title">Search Artist</h1>
      <form onSubmit={handleSubmit} className="contentField">
        <div className="searchBarWrapper">
          <div className="iconWrapper">
            <img
              src={searchIcon}
              alt="Icon of a magnifying glass"
              className="searchIcon"
            />
          </div>
          <input
            type="text"
            value={artistNameInput}
            onChange={(e) => setArtistNameInput(e.target.value)}
            placeholder="Search Artist"
            className="searchBar inputFont"
          />
        </div>
      </form>

      {artistNameInput.trim() !== "" && searchResults.length > 0 && (
        <ul className="contentList">
          {searchResults.slice(0, 5).map((artist) => (
            <li
              key={artist.id}
              onClick={() => handleOptionClick(artist)}
              className="contentField contentListItem"
            >
              {artist.images &&
                artist.images.length > 0 &&
                artist.images[0].url && (
                  <div className="artistImageWrapper">
                    <img
                      src={artist.images[0].url}
                      alt={artist.name}
                      className="artistImage"
                    />
                  </div>
                )}

              <span className="inputFont contentText">{artist.name}</span>
              <img
                src={arrowIcon}
                alt="Icon of an arrow that shows to the right side"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchArtist;
