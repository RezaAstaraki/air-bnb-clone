import Image from "next/image";
import Link from "next/link";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import AddPropertyButton from "./AddPropertyButton";
import CurrentUser from "../server components/CurrentUser";

const Navbar = async () => {
  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="relative w-36 h-auto md:w-44 lg:w-52">
              <Image
                alt="DjangoBnb logo"
                width={180}
                height={38}
                src="/logo.png"
                priority
              />
            </div>
          </Link>
          <div className="flex space-x-6">
            <SearchFilters />
          </div>
          <div className="flex items-center space-x-6">
            <AddPropertyButton />
            <UserNav />
          </div>
        </div>
        <CurrentUser />
      </div>
    </nav>
  );
};

export default Navbar;
