import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

import { Card } from "../ui/card";
import type { EventType } from "../../types/type";
import { formatPrice } from "../../data/product";

interface ProductCardProps {
  product: EventType;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.ID}`}>
      <Card className="group overflow-hidden border-0 bg-muted/40 shadow-none transition-all hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-white opacity-0 shadow transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5 text-black" />
          </div>
        </div>

        <div className="space-y-1 p-4">
          <p className="text-sm text-muted-foreground">{product.type}</p>

          <h3 className="font-semibold">{product.name}</h3>

          <p className="font-bold">
            {product.price != null ? formatPrice(product.price) : "Price unavailable"}
          </p>
        </div>
      </Card>
    </Link>
  );
}
