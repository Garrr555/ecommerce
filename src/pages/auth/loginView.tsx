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

export default function LoginView() {
  const navigate = useNavigate();
  const { setTokenData } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await CustomFetch.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        setTokenData(response.data.user, response.data.token);
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error("Gagal Login");
      }
    } catch (error: any) {
      console.log(error.response);

      if (error.response?.status === 401) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Terjadi kesalahan saat login");
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

                <h2 className="text-4xl font-black tracking-tight">Sign In</h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Masuk ke akunmu untuk melanjutkan belanja.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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

                    <Link
                      to="#"
                      className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      Forgot password?
                    </Link>
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
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <Separator className="flex-1" />

                <span className="text-xs text-muted-foreground">OR</span>

                <Separator className="flex-1" />
              </div>

              {/* Google */}
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full rounded-xl"
              >
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                  alt="Google"
                  className="mr-2 h-4 w-4"
                />
                Continue with Google
              </Button>

              {/* Register */}
              <p className="mt-7 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-primary hover:underline"
                >
                  Create account
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
