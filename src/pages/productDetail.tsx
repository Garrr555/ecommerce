/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { formatPrice } from "../data/product";
import { Button } from "../components/ui/button";
import CustomFetch from "../config/db";
import type { EventType } from "../types/type";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/auth.store";

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const userName = user?.name;
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [eventData, setEventData] = useState<EventType>();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()

  console.log(loading, notFound);

  const fetchDetailEvent = async () => {
    setLoading(true);
    try {
      const response = await CustomFetch.get(`/events/${id}`);
      setEventData(response?.data?.event);
    } catch (error: any) {
      console.log(error.status);
      if (error.status === 404) {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveEvent = async (id: number) => {
    try {
      const response = await CustomFetch.post("/booking", {
        phone: userName,
        count: quantity,
        eventId: id,
      });

      console.log(response.data);
      toast.success("Ditambahkan ke Keranjang");
      navigate("/cart")
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Gagal Menambahkan ke Keranjang",
      );
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetailEvent();
    }
  }, [id]);

  if (!eventData) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>

        <Link to="/products">
          <Button className="mt-6">Back to products</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
      <Link
        to="/products"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-muted">
          <img
            src={eventData.image}
            alt={eventData.name}
            className="aspect-square h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm text-muted-foreground">{eventData.type}</p>

          <h1 className="mt-2 text-4xl font-black md:text-5xl">
            {eventData.name}
          </h1>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((item) => (
                <Star key={item} className="h-4 w-4 fill-current" />
              ))}
            </div>

            <span className="text-sm text-muted-foreground">
              4.9 (128 reviews)
            </span>
          </div>

          <p className="mt-6 text-2xl font-bold">
            {eventData.price != null
              ? formatPrice(eventData.price)
              : "Price unavailable"}
          </p>

          <p className="mt-6 leading-7 text-muted-foreground">
            {eventData.description}
          </p>

          <p className="mt-6 leading-7 text-muted-foreground">
            {eventData.count}
          </p>

          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold">Quantity</h3>

            <div className="flex w-fit items-center rounded-xl border">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-none rounded-l-xl"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <div className="flex h-11 w-14 items-center justify-center border-x text-sm font-semibold">
                {quantity}
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-none rounded-r-xl"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold">Select size</h3>

            {/* <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className="h-11 w-14"
                >
                  {size}
                </Button>
              ))}
            </div> */}
          </div>

          <Button
            size="lg"
            onClick={() => saveEvent(eventData.ID)}
            className="mt-8 w-full rounded-full p-5"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Add to cart
          </Button>
        </div>
      </div>
    </main>
  );
}
