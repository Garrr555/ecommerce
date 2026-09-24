/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/auth.store";
import CustomFetch from "../../config/db";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { Card, CardContent } from "../../components/ui/card";

export default function RegisterView() {
  const navigate = useNavigate();
  const { setTokenData } = useAuthStore();

  const Type = import.meta.env.VITE_TYPE_URI;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    platform: Type,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await CustomFetch.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        platform: formData.platform,
      });

      if (response.status === 201) {
        setTokenData(response.data.user, response.data.token);
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error("Gagal Register");
      }
    } catch (error: any) {
      console.log(error.response);

      if (error.response?.status === 401) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Terjadi kesalahan saat Register");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-1">
        {/* Right - Login */}
        <div className="flex items-center justify-center px-4 py-12 sm:px-8">
          <Card className="w-full max-w-md border-0 shadow-none">
            <CardContent className="p-5">
              <div className="mb-8 text-center lg:text-left">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Welcome back
                </p>

                <h2 className="text-4xl font-black tracking-tight">Sign Up</h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Buat akunmu untuk melanjutkan belanja.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="email">Name</Label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-12 rounded-xl pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 rounded-xl pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Masukkan password"
                      value={formData.password}
                      onChange={handleChange}
                      className="h-12 rounded-xl pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-input accent-primary"
                  />

                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal text-muted-foreground"
                  >
                    Remember me
                  </Label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full rounded-xl"
                >
                  Sign Up
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <Separator className="flex-1" />

                <span className="text-xs text-muted-foreground">OR</span>

                <Separator className="flex-1" />
              </div>

              {/* Register */}
              <p className="mt-7 text-center text-sm text-muted-foreground">
                have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary hover:underline"
                >
                  Sign In account
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
