import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="container mx-auto flex justify-center border-y border-gray-400 py-5">
      <ul className="flex items-center gap-20 text-[13px] font-[550] uppercase tracking-widest">
        <li>
          <Link href="/" className="transition-colors hover:text-gray-900">
            Takı
          </Link>
        </li>
        <li>
          <Link href="/" className="transition-colors hover:text-gray-900">
            Flowers
          </Link>
        </li>
        <li>
          <Link href="/" className="transition-colors hover:text-gray-900">
            Kolye
          </Link>
        </li>
        <li>
          <Link href="/" className="transition-colors hover:text-gray-900">
            Altın 
          </Link>
        </li>
        <li>
          <Link href="/" className="transition-colors hover:text-gray-900">
            Takım 
          </Link>
        </li>
        <li>
          <Link href="/" className="transition-colors hover:text-gray-900">
             ayakkabı
          </Link>
        </li>
        <li>
          <Link href="/" className="transition-colors hover:text-gray-900">
             kıyafet
          </Link>
        </li>
        <li>
          <Link href="/" className="transition-colors hover:text-gray-900">
             eşyalar
          </Link>
        </li>
        <li>
          <Link href="/" className="transition-colors hover:text-gray-900">
             saat
          </Link>
        </li>
      </ul>
    </nav>
  );
}
