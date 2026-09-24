/* eslint-disable react-hooks/set-state-in-effect */
import { ArrowRight, Truck, ShieldCheck, RefreshCcw } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import ProductCard from "../components/view/productCard";
import { Card } from "../components/ui/card";
import CustomFetch from "../config/db";
import { useEffect, useState } from "react";
import type { EventType } from "../types/type";

export default function Home() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [currentEvent, setCurrentEvent] = useState(0);
  console.log(events);

  const getEventByUser = async () => {
    const response = await CustomFetch.get("/events/tag/7");
    setEvents(response.data.events);
  };

  useEffect(() => {
    getEventByUser();
  }, []);

  useEffect(() => {
    if (events.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [events]);
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden">
        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Step into something new
            </p>

            <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
              Find your perfect pair.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">
              Koleksi sepatu modern untuk menemani aktivitas, olahraga, dan gaya
              sehari-harimu.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products">
                <Button size="lg" className="rounded-full px-7">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Button size="lg" variant="outline" className="rounded-full">
                Explore Collection
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="text-2xl font-bold">50K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>

              <div className="h-10 w-px bg-border" />

              <div>
                <p className="text-2xl font-bold">100+</p>
                <p className="text-sm text-muted-foreground">Shoe Models</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] bg-muted">
              <div className="relative overflow-hidden rounded-[2rem] bg-muted">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${currentEvent * 100}%)`,
                  }}
                >
                  {events.map((event, i) => (
                    <div key={i} className="min-w-full">
                      <img
                        src={event.image}
                        alt="Featured shoes"
                        className="aspect-square w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3 md:px-6">
          <div className="flex gap-4">
            <Truck className="h-6 w-6 shrink-0" />

            <div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Gratis pengiriman untuk pembelian tertentu.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <ShieldCheck className="h-6 w-6 shrink-0" />

            <div>
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Pembayaran aman dan terpercaya.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <RefreshCcw className="h-6 w-6 shrink-0" />

            <div>
              <h3 className="font-semibold">Easy Returns</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Proses pengembalian mudah dan cepat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Featured
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Popular this week
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden items-center gap-2 text-sm font-semibold md:flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.slice(0, 4).map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </section>

      {/* Promo */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <Card className="overflow-hidden border-0 bg-black text-white">
          <div className="grid items-center md:grid-cols-2">
            <div className="p-8 md:p-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
                Limited offer
              </p>

              <h2 className="mt-4 text-4xl font-black md:text-5xl">
                Up to 30% off
              </h2>

              <p className="mt-5 max-w-md leading-7 text-white/70">
                Dapatkan harga spesial untuk koleksi pilihan kami. Jangan
                lewatkan kesempatan ini.
              </p>

              <Link to="/products">
                <Button
                  variant="secondary"
                  size="lg"
                  className="mt-8 rounded-full"
                >
                  Shop the sale
                </Button>
              </Link>
            </div>

            <div className="h-full min-h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80"
                alt="Shoe collection"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
