import { useToken } from "@/utils/contexts/token";
import { Home, LandPlot, UserCog } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useToken();

  return (
    <section
      className="w-full sticky bottom-0 bg-white border-t-2 rounded-3xl z-50"
      aria-label="navbar"
    >
      <nav className="mx-auto flex container items-center justify-center gap-16 py-2 [&>*]:font-semibold [&>*]:leading-6 [&>*]:text-gray-900 [&>*]:dark:text-white">
        <Link to={`/`}>
          <div className="flex flex-col text-center items-center hover:text-orange-400">
            <Home width={18} height={18} />
            <p className="text-sm">Home</p>
          </div>
        </Link>
        {user.role === "user" ? (
          <>
            <Link to={`/reservations`}>
              <div className="flex flex-col text-center items-center hover:text-orange-400">
                <LandPlot width={18} height={18} />
                <p className="text-sm">My Parking</p>
              </div>
            </Link>
            <Link to={`/profile`}>
              <div className="flex flex-col text-center items-center hover:text-orange-400">
                <UserCog width={18} height={18} />
                <p className="text-sm">Profile</p>
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link to={`/profile`}>
              <div className="flex flex-col text-center items-center p-2 hover:text-orange-400">
                <UserCog width={18} height={18} />
                <p className="text-sm">Profile</p>
              </div>
            </Link>
          </>
        )}
      </nav>
    </section>
  );
};

export default Navbar;
