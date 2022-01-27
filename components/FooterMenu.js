import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function FooterMenu() {
  const router = useRouter();
  return (
    <>
      <div className="footer__menu shadow-2-reverse">
        <span className="footer__menu_back" onClick={() => router.back()}>
          back
        </span>
        <Link href="/" className="footer__menu_home">
          home
        </Link>
        <Link href="/" className="footer__menu_random">
          random
        </Link>
      </div>
    </>
  );
}

export default FooterMenu;
