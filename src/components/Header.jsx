import React from "react";
import Search from "./Search";
import ThemeIcon from "./ThemIcon";
import { mockCompanyDetails } from "../constants/mock";

const Header = ({ name }) => {
    return <>
        <div className="xl:px-32">
            <h1 className="text-5xl">{mockCompanyDetails.name}</h1>
            <Search />
        </div>
        <ThemeIcon/>
    </>
};

export default Header;