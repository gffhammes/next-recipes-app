import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function FooterMenu() {
  const router = useRouter();
  return (
    <div className="footer__menu__wrapper">
      <div className="footer__menu shadow-2">
        <span className="footer__menu_back" onClick={() => router.back()}>
          <i class="fas fa-arrow-left" />
        </span>
        <Link href="/">
          <a className="footer__menu_home shadow-2">
            <i class="fas fa-home" />
          </a>
        </Link>
        <Link href="/" className="footer__menu_random">
          <a className="footer__menu_random">
            <i class="fas fa-random" />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default FooterMenu;
