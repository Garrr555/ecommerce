/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "../components/ui/button";
import ProductCard from "../components/view/productCard";
import { Input } from "../components/ui/input";
import CustomFetch from "../config/db";
import type { EventType } from "../types/type";

const categories = ["All", "Running", "Lifestyle", "Casual"];

export default function Products() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<EventType[]>([]);
  console.log(events);

  const getEventByUser = async () => {
    const response = await CustomFetch.get("/events/tag/7");
    setEvents(response.data.events);
  };

  const filteredProducts = useMemo(() => {
    return events.filter((product) => {
      const matchCategory = category === "All" || product.type === category;

      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [category, search, events]);

  useEffect(() => {
    getEventByUser();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Our collection
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
          Shop all shoes
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Temukan sepatu yang sesuai dengan gaya dan kebutuhanmu.
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <Button
              key={item}
              variant={category === item ? "default" : "outline"}
              onClick={() => setCategory(item)}
              className="rounded-full"
            >
              {item}
            </Button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search shoes..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">
            Tidak ada produk yang ditemukan.
          </p>
        </div>
      )}
    </main>
  );
}
