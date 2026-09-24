import { Link, NavLink, useNavigate } from "react-router";
import { ShoppingBag, Search, Menu, LogOut, LogIn, User, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useAuthStore } from "../../store/auth.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "react-toastify";

const navItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Shop",
    path: "/products",
  },
];

export default function NavbarView() {
  const { token, removeTokenData, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeTokenData();
    toast.success("Logout Berhasil");
    navigate("/");
  };
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to={"/"} className="text-xl font-black tracking-tight">
          SOLE<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="lg">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="lg">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </Link>
          {/* User Popup */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              {token ? (
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2 flex items-center justify-start gap-1">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <UserIcon />
                    </div>
                    <div>
                      <div className="font-semibold">{user?.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {user?.email}
                      </div>
                    </div>
                  </div>

                  <DropdownMenuItem onClick={() => handleLogout()} className={`p-2`}>
                    <LogOut className="h-4 w-4 " />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              ) : (
                <DropdownMenuItem>
                  <Link to="/login" className="flex items-center gap-1 w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="lg" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
