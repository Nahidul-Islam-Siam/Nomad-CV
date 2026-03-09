"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen bg-[#edf2f8] text-[#0f172a]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-3 pb-3 pt-4 sm:px-6 sm:pb-4 sm:pt-6 lg:px-10">
        <header className="mb-4 sm:mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0f172a] text-sm font-bold text-white">
              N
            </span>
            <span className="text-xl font-semibold leading-none text-[#111827]">
              Nomad<span className="text-[#2563eb]">CV</span>
            </span>
          </Link>
        </header>

        <main className="flex flex-1 items-start sm:items-center">
          <div className="grid w-full items-start gap-4 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
            <section className="order-2 rounded-2xl border border-[#d8e0ea] bg-[#f4f7fb] p-4 sm:rounded-3xl sm:p-6 lg:order-1 lg:p-10">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d5dde9] bg-[#eff4fa] px-3 py-1 text-[9px] font-semibold tracking-[0.2em] text-[#53627a] sm:px-4 sm:text-[11px] sm:tracking-[0.22em]">
                <Star className="h-3 w-3 fill-current" />
                STANDARD CORPORATE 2026
              </div>

              <h1 className="mt-5 max-w-[460px] text-[1.7rem] font-bold leading-[1.1] text-[#0f172a] sm:mt-8 sm:text-[2rem] lg:text-[2.4rem]">
                Excellence for your
                <br />
                career
              </h1>

              <p className="mt-4 max-w-[520px] text-[0.92rem] leading-7 text-[#55657d] sm:mt-6 sm:text-[0.96rem] sm:leading-8">
                Join the elite candidates. Our tools are designed with recruiters to maximize your chances of success.
              </p>

              <div className="mt-5 h-px w-full bg-[#dbe3ed] sm:mt-8" />

              <div className="mt-5 grid grid-cols-2 gap-4 sm:mt-8 sm:gap-8">
                <div>
                  <p className="text-4xl font-bold leading-none text-[#0f172a] sm:text-5xl">98%</p>
                  <p className="mt-2 text-[0.7rem] font-semibold tracking-[0.15em] text-[#50607a]">SUCCESS RATE</p>
                </div>
                <div>
                  <p className="text-4xl font-bold leading-none text-[#0f172a] sm:text-5xl">450+</p>
                  <p className="mt-2 text-[0.7rem] font-semibold tracking-[0.15em] text-[#50607a]">
                    ACTIVE RECRUITERS
                  </p>
                </div>
              </div>

              <div className="mt-5 flex w-full max-w-[360px] items-center gap-3 rounded-2xl border border-[#d8e0ea] bg-white px-3 py-2.5 sm:mt-8 sm:gap-4 sm:px-4 sm:py-3">
                <div className="flex -space-x-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#f8d6bf] text-[10px] font-semibold text-[#7c3e21]">
                    AN
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#bfd8f8] text-[10px] font-semibold text-[#1d4270]">
                    JL
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#cce9d3] text-[10px] font-semibold text-[#195430]">
                    SR
                  </div>
                </div>
                <p className="text-sm font-semibold text-[#0f172a]">
                  +12k <span className="font-normal text-[#5b6880]">satisfied users</span>
                </p>
              </div>
            </section>

            <Card className="order-1 mx-auto w-full max-w-[430px] rounded-2xl border border-[#d8e0ea] bg-[#f8fbff] shadow-[0_20px_40px_rgba(15,23,42,0.08)] sm:rounded-[30px] lg:order-2">
              <CardHeader className="space-y-2 px-5 pb-4 pt-6 text-center sm:px-8 sm:pt-8">
                <CardTitle className="text-[1.65rem] font-bold text-[#0f172a] sm:text-[2rem]">Candidate Space</CardTitle>
                <CardDescription className="text-sm text-[#63748a]">Access your career tools</CardDescription>
              </CardHeader>

              <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[0.7rem] font-semibold tracking-[0.13em] text-[#5f6f86]">
                      EMAIL
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8898ad]" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="jean.dupont@email.com"
                        className="h-11 rounded-xl border-[#d3dbe6] bg-[#f8fbff] pl-10 text-sm text-[#1f2937] placeholder:text-[#9babc0] focus-visible:ring-[#99abc2]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-[0.7rem] font-semibold tracking-[0.13em] text-[#5f6f86]"
                      >
                        PASSWORD
                      </label>
                      <Link href="/forget-password" className="text-[0.72rem] font-semibold text-[#5f6f86] hover:underline">
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8898ad]" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="*******"
                        className="h-11 rounded-xl border-[#d3dbe6] bg-[#f8fbff] pl-10 pr-10 text-sm text-[#1f2937] placeholder:text-[#9babc0] focus-visible:ring-[#99abc2]"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7c8ca1]"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 pt-1 text-[0.65rem] leading-4 text-[#67778f]">
                    <input
                      type="checkbox"
                      checked={policyAccepted}
                      onChange={() => setPolicyAccepted(!policyAccepted)}
                      className="mt-0.5 h-3.5 w-3.5 rounded border-[#b8c4d4] text-[#1d4ed8] focus:ring-[#1d4ed8]"
                    />
                    <span>
                      I agree to the{" "}
                      <Link href="/privacy&policy" className="font-semibold text-[#1f4f91] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy&policy" className="font-semibold text-[#1f4f91] hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      (GDPR).
                    </span>
                  </label>

                  <Button
                    type="button"
                    className="h-12 w-full rounded-xl bg-[#e4ebf5] text-base font-semibold text-[#5f6d80] shadow-[0_8px_18px_rgba(15,23,42,0.1)] hover:bg-[#dae4f2]"
                  >
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <div className="space-y-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 w-full rounded-xl border-[#d3dbe6] bg-[#f8fbff] text-sm font-semibold text-[#2b3a4f] hover:bg-[#f0f5fb]"
                    >
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#d97706]">
                        G
                      </span>
                      Continue with Google
                    </Button>

                    <Button
                      type="button"
                      className="h-11 w-full rounded-xl border border-[#1d4ed8] bg-[#1d4ed8] text-sm font-semibold text-white hover:bg-[#1b45c5]"
                    >
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#3b82f6] text-xs font-bold text-white">
                        f
                      </span>
                      Continue with Facebook
                    </Button>
                  </div>
                </form>

                <p className="mt-6 text-center text-sm text-[#6b7c93]">
                  No account yet?{" "}
                  <Link href="/signup" className="font-semibold text-[#334155] hover:underline">
                    Sign up
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="mt-3 rounded-2xl border border-[#d8e0ea] bg-[#f8fbff] px-3 py-3 text-[0.6rem] leading-4 text-[#60728a] sm:mt-4 sm:px-4 sm:text-[0.62rem] sm:leading-normal sm:flex sm:items-center sm:justify-between">
          <p className="font-semibold tracking-[0.18em] text-[#8a99ad]">NOMAD CV PLATFORM (C) 2026</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 sm:mt-0">
            <span className="font-semibold tracking-[0.14em]">CORPORATE</span>
            <span className="font-semibold tracking-[0.14em]">RECRUITERS</span>
            <span className="font-semibold tracking-[0.14em] text-[#a43f48]">NON-REIMBOURSABLE</span>
            <span>nomadcv13.assistance@gmail.com</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
