/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  ShoppingBag,
  Trash2,
  MapPin,
  CalendarDays,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import type { BookingType } from "../types/type";
import CustomFetch from "../config/db";
import { toast } from "react-toastify";

export default function Cart() {
  const [events, setEvents] = useState<BookingType[]>([]);

  const getEventByUser = async () => {
    const response = await CustomFetch.get("/booking/user");
    setEvents(response.data.booking);
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      const response = await CustomFetch.delete(`/booking/${id}`);

      console.log(response.data);
      toast.success("Unsave");
      getEventByUser();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Gagal Unsave");
    }
  };

  useEffect(() => {
    getEventByUser();
  }, []);

  return (
    <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-12 md:px-6 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Your Cart
        </p>

        <div className="mt-2 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              Shopping Cart
            </h1>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium sm:flex">
            <ShoppingBag className="h-4 w-4" />
            {events.length} item
          </div>
        </div>
      </div>

      {events.length === 0 ? (
        /* Empty Cart */
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-8 w-8" />
            </div>

            <h2 className="mt-6 text-2xl font-bold">Your cart is empty</h2>

            <p className="mt-3 text-muted-foreground">
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link to="/products">
              <Button className="mt-7 rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue shopping
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <Card className="hidden overflow-hidden md:block px-2">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[45%]">Product</TableHead>

                    <TableHead className="text-center">Count</TableHead>

                    <TableHead className="text-center">Price</TableHead>

                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {events.map((booking) => (
                    <TableRow key={booking.ID}>
                      {/* Product */}
                      <TableCell className="overflow-x-hidden ">
                        <div className="flex items-center gap-4">
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                            <img
                              src={booking.event.image}
                              alt={booking.event.name}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div>
                            <p className="font-semibold">
                              {booking.event.name}
                            </p>

                            <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                              {booking.event.type}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Count */}
                      <TableCell className="overflow-x-hidden text-center">
                        <p className="font-semibold">{booking.count}</p>
                      </TableCell>

                      {/* Price */}
                      <TableCell className="text-center">
                        <span className="font-semibold">
                          {booking.event.price
                            ? `Rp ${(
                                booking.event.price * booking.count
                              ).toLocaleString("id-ID")}`
                            : "-"}
                        </span>
                        {booking.count > 1 && (
                          <p className="text-sm text-gray-400">
                            Rp {booking?.event?.price?.toLocaleString("id-ID") ?? "-"} x {booking.count}
                          </p>
                        )}
                      </TableCell>

                      {/* Action */}
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteEvent(booking.ID)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Mobile Cards */}
          <div className="space-y-4 md:hidden">
            {events.map((booking) => (
              <Card key={booking.ID} className="overflow-hidden">
                <div className="flex gap-4 p-4">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <img
                      src={booking.event.image}
                      alt={booking.event.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="line-clamp-2 font-semibold">
                        {booking.event.name}
                      </h2>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteEvent(booking.ID)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      {booking.event.description}
                    </p>

                    <p className="mt-3 font-bold">
                      {booking.event.price
                        ? `Rp ${booking.event.price.toLocaleString("id-ID")}`
                        : "-"}
                    </p>
                  </div>
                </div>

                <CardContent className="border-t bg-muted/30 px-4 py-3">
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {booking.event.location}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(booking.event.datetime).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/products">
              <Button variant="outline" className="rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue shopping
              </Button>
            </Link>

            <div className="text-sm text-muted-foreground">
              {events.length} product saved
            </div>
          </div>
        </>
      )}
    </main>
  );
}
