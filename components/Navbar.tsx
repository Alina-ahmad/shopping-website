import React from "react";
import Link from "next/link";


const Navbar = () => {
  return (
    // hidden on mobile devices and will be shown on large: lg screen
    <div className="hidden lg:block">
      <div className="container">
        <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish">
          <Link className="navbar__link relative" href="/" target="blank" >
            HOME
          </Link>
          <Link className="navbar__link relative" href="#" target="blank" >
            CATEGORIES
          </Link>
          <Link className="navbar__link relative" href="#" target="blank" >
            MEN'S
          </Link>
          <Link className="navbar__link relative" href="#" target="blank" >
            WOMEN'S
          </Link>
          <Link className="navbar__link relative" href="#" target="blank" >
            JEWELRY
          </Link>
          <Link className="navbar__link relative" href="#" target="blank" >
            PERFUME
          </Link>
          <Link className="navbar__link relative" href="#" target="blank" >
            BLOG
          </Link>
          <Link className="navbar__link relative" href="#" target="blank" >
            HOT OFFERS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
