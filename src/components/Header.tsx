import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full h-[100px] bg-gray-800 text-gray-200 flex justify-center items-center">
      <nav className="p-4">
        <Link to="/" className="font-bold text-lg">
          Home Page
        </Link>
      </nav>
    </div>
  );
};

export default Header;
