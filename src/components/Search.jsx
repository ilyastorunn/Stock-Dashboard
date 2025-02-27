import React, { useState, useContext } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchResults from "./SearchResults";
import ThemeContext from "../context/ThemeContext";
import { searchSymbols } from "../api/stock-api";

const Search = () => {
    const [input, setInput] = useState("");
    const [bestMatches, setBestMatches] = useState([]);

    const { darkMode } = useContext(ThemeContext);

    const clear = () => {
        setInput("");
        setBestMatches([]);
    };

    const updateBestMathces = async () => {
        try {
            if (input) {
                const searchResults = await searchSymbols(input);
                const result = searchResults.result;
                setBestMatches(result);
            }
        } catch(error) {
            setBestMatches([])
            console.log(error);
        }
    };

    return (
        <div className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96 custom-scrollbar ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}>
            <input
                type="text"
                value={input}
                className={`w-full px-4 py-2 focus:outline-none rounded-md ${darkMode ? "bg-gray-900" : null}`}
                placeholder="Search stock..."
                onChange={(event) => {
                    setInput(event.target.value);
                }}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        updateBestMathces();
                    }
                }}
            />
            {input && (
                <button onClick={clear} className="m-1">
                    <XMarkIcon className="h-4 w-4 fill-gary-500" />
                </button>
            )}

            <button onClick={updateBestMathces} className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2">
                <MagnifyingGlassIcon className="h-4 w-4 fill-gray-100" />
            </button>

            {input && bestMatches.length > 0 ? (
                <SearchResults results={bestMatches} />
            ) : null}
        </div>
    )
};

export default Search;