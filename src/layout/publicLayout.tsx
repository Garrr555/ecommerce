import { Outlet } from "react-router";
import NavbarView from "../components/view/navbarView";
import Footer from "../components/view/footer";

export default function PublicLayout() {
  return (
    <div>
      <NavbarView />
      <Outlet />
      <Footer />
    </div>
  );
}
