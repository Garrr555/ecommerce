import { Phone, PhoneCall, PhoneForwarded } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h2 className="text-xl font-black">
              SOLE<span className="text-primary">.</span>
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Sepatu pilihan untuk menemani setiap langkah dan aktivitasmu.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Shop</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link to="/products">All Products</Link>
              <Link to="/products">Running</Link>
              <Link to="/products">Lifestyle</Link>
              <Link to="/products">Casual</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Information</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>Returns</span>
              <span>Contact</span>
              <span>FAQ</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Follow us</h3>

            <div className="mt-4 flex gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border">
                <Phone className="h-4 w-4" />
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border">
                <PhoneCall className="h-4 w-4" />
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border">
                <PhoneForwarded className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-sm text-muted-foreground">
          © 2026 SOLE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
