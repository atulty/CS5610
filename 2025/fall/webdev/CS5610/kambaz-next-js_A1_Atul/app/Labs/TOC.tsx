import Link from "next/link";
import Lab1 from "./Lab1/page";

export default function TOC() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/Labs" id="wd-labs-link">
            Home{" "}
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1{" "}
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2{" "}
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3{" "}
          </Link>
        </li>
        <li>
          <Link href="/" id="wd-kambaz-link">
            Kambaz{" "}
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/atulty/CS5610/tree/main/2025/fall/webdev/CS5610/kambaz-next-js_A1_Atul"
            id="wd-github-link"
          >
            Github repo{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
}
