/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  CloudUpload,
  CreditCard,
  Download,
  Eye,
  FileText,
  Lock,
  Mail,
  MapPin,
  Palette,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  TriangleAlert,
  WandSparkles,
  X,
} from "lucide-react";

type TemplateCard = {
  title: string;
  subtitle: string;
  seed: string;
};

const templateFilters = [
  "2 columns",
  "ATS fit",
  "Student profile",
  "Recent graduate",
  "Executive",
  "By country",
  "Top picks",
];

const templateCards: TemplateCard[] = [
  { title: "Professional Modern", subtitle: "Finance and legal", seed: "professional-modern-cv" },
  { title: "Creative Designer", subtitle: "Portfolio profile", seed: "creative-designer-cv" },
  { title: "Minimalist", subtitle: "Simple and clean", seed: "minimalist-cv-template" },
  { title: "Modern Graduate", subtitle: "First role ready", seed: "modern-graduate-cv" },
  { title: "Medical Resident", subtitle: "Clinical experience", seed: "medical-resident-cv" },
  { title: "Human Resources", subtitle: "People operations", seed: "hr-manager-cv" },
  { title: "Apprentice Electrician", subtitle: "Trade skills", seed: "apprentice-electrician-cv" },
  { title: "Architect", subtitle: "Project focused", seed: "architect-cv-template" },
  { title: "Academic Skills", subtitle: "University and labs", seed: "academic-cv-template" },
  { title: "International Graduate", subtitle: "Multilingual profile", seed: "international-graduate-cv" },
  { title: "Full Stack Developer", subtitle: "Tech and product", seed: "full-stack-cv-template" },
  { title: "Data Scientist", subtitle: "ML and analytics", seed: "data-scientist-cv" },
  { title: "Nurse", subtitle: "Patient-centered care", seed: "nurse-cv-template" },
  { title: "Doctor", subtitle: "Medical specialist", seed: "doctor-cv-template" },
  { title: "General Specialist", subtitle: "Multi-domain profile", seed: "specialist-cv-template" },
  { title: "Ski Instructor", subtitle: "Sport and coaching", seed: "ski-instructor-cv" },
  { title: "Hotel Receptionist", subtitle: "Hospitality service", seed: "hotel-receptionist-cv" },
  { title: "Restaurant Server", subtitle: "Customer support", seed: "restaurant-server-cv" },
  { title: "Agricultural Worker", subtitle: "Farm operations", seed: "agri-worker-cv" },
  { title: "Grape Picker", subtitle: "Seasonal role", seed: "grape-picker-cv" },
  { title: "Junior Developer", subtitle: "Entry-level tech", seed: "junior-developer-cv" },
  { title: "Book Seller", subtitle: "Retail and sales", seed: "book-seller-cv" },
  { title: "Caregiver", subtitle: "Home support", seed: "caregiver-cv" },
  { title: "Carpenter", subtitle: "Construction craft", seed: "carpenter-cv" },
  { title: "Professional Pitch CV", subtitle: "Startup profile", seed: "professional-pitch-cv" },
  { title: "Remote Worker CV", subtitle: "Distributed teams", seed: "remote-worker-cv" },
  { title: "Warehouse Supervisor", subtitle: "Ops leadership", seed: "warehouse-supervisor-cv" },
  { title: "Soccer CV", subtitle: "Sports career", seed: "soccer-cv" },
  { title: "French Format CV", subtitle: "Locale optimized", seed: "french-format-cv" },
  { title: "German Format CV", subtitle: "DACH profile", seed: "german-format-cv" },
  { title: "UK CV", subtitle: "United Kingdom style", seed: "uk-cv-template" },
  { title: "USA Resume", subtitle: "US market style", seed: "usa-resume-template" },
  { title: "Canadian CV", subtitle: "Canada format", seed: "canadian-cv-template" },
  { title: "Mexico CV", subtitle: "LATAM profile", seed: "mexico-cv-template" },
  { title: "Brazilian CV", subtitle: "Portuguese market", seed: "brazilian-cv-template" },
  { title: "Argentinian CV", subtitle: "Spanish market", seed: "argentinian-cv-template" },
  { title: "China CV", subtitle: "Regional style", seed: "china-cv-template" },
  { title: "Japan CV", subtitle: "Regional style", seed: "japan-cv-template" },
  { title: "Singapore CV", subtitle: "APAC market", seed: "singapore-cv-template" },
  { title: "Online Tutor CV", subtitle: "Education profile", seed: "online-tutor-cv" },
  { title: "Moroccan CV", subtitle: "Regional format", seed: "moroccan-cv-template" },
  { title: "South Africa CV", subtitle: "Regional format", seed: "south-africa-cv-template" },
  { title: "Senegal CV", subtitle: "Regional format", seed: "senegal-cv-template" },
  { title: "UAE CV", subtitle: "Gulf market", seed: "uae-cv-template" },
  { title: "Qatar CV", subtitle: "Gulf market", seed: "qatar-cv-template" },
  { title: "Saudi Arabia CV", subtitle: "Gulf market", seed: "saudi-arabia-cv-template" },
  { title: "Australia CV", subtitle: "Oceania format", seed: "australia-cv-template" },
  { title: "New Zealand CV", subtitle: "Oceania format", seed: "new-zealand-cv-template" },
];

const reviews = [
  {
    name: "Marie L.",
    role: "Marketing Specialist",
    text: "The model suggestions were accurate and saved me hours. I got interview calls in one week.",
  },
  {
    name: "Arielle D.",
    role: "Junior Engineer",
    text: "I uploaded my old CV and received a cleaner, stronger version in minutes. Very practical.",
  },
  {
    name: "Sophia W.",
    role: "HR Lead",
    text: "As a recruiter, this quality level is impressive. The structure is clear and ATS-friendly.",
  },
];

function HeroSection() {
  return (
    <section id="how-it-works" className="px-3 pb-6 pt-8 sm:px-6 sm:pt-10">
      <div className="mx-auto max-w-4xl text-center">
        <Badge variant="secondary" className="rounded-full bg-[#e8f0ff] px-4 py-1 text-[11px] font-semibold text-[#2554d7]">
          AI-Powered Models
        </Badge>
        <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[1.95rem] font-extrabold leading-[1.2] tracking-tight text-[#111827] sm:text-[2.5rem] md:text-[3rem]">
          Create a professional CV adapted to your profession and country in minutes with AI.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#4b5563] sm:text-base">
          Select from modern templates, country-ready formats, and role-focused structures. Start with your profile and let AI refine
          every section.
        </p>
        <div className="mt-6">
          <Button className="h-11 rounded-full bg-[#2458f5] px-7 text-sm font-semibold text-white hover:bg-[#1f4ed9]">
            Start now for free
          </Button>
        </div>
      </div>
    </section>
  );
}

function TemplateCardItem({
  title,
  subtitle,
  seed,
  onUseModel,
  onPreview,
}: TemplateCard & {
  onUseModel: (template: TemplateCard) => void;
  onPreview: (template: TemplateCard) => void;
}) {
  return (
    <Card className="overflow-hidden border-[#dbe4f3] bg-white shadow-sm">
      <div className="relative h-48 overflow-hidden rounded-none">
        <img
          src={`https://picsum.photos/seed/${seed}/720/900`}
          alt={`${title} template`}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-sm font-bold text-white">{title}</p>
          <p className="text-xs text-white/80">{subtitle}</p>
        </div>
      </div>
      <CardContent className="grid grid-cols-2 gap-2 p-2">
        <Button
          type="button"
          onClick={() => onUseModel({ title, subtitle, seed })}
          className="h-8 rounded-md bg-[#2458f5] text-xs font-semibold hover:bg-[#1f4ed9]"
        >
          Use this model
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onPreview({ title, subtitle, seed })}
          className="h-8 rounded-md border-[#cfd9ec] bg-white text-xs font-semibold text-[#1f355f]"
        >
          See preview
        </Button>
      </CardContent>
    </Card>
  );
}

function TemplatesSection({
  onUseModel,
  onPreview,
}: {
  onUseModel: (template: TemplateCard) => void;
  onPreview: (template: TemplateCard) => void;
}) {
  return (
    <section id="templates" className="px-3 py-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#111827]">Choose your template model</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-[#6b7280]">Browse by role, profile level, and country format.</p>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Badge className="rounded-full bg-[#0f172a] px-3 py-1 text-xs text-white">2 columns</Badge>
          {templateFilters.slice(1).map((filter) => (
            <Badge key={filter} variant="outline" className="rounded-full border-[#cfd9ec] bg-white px-3 py-1 text-xs text-[#334155]">
              {filter}
            </Badge>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {templateCards.map((template) => (
            <TemplateCardItem key={template.seed} {...template} onUseModel={onUseModel} onPreview={onPreview} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplateLoadingDialog({
  open,
  progress,
}: {
  open: boolean;
  progress: number;
}) {
  const selectedDone = progress >= 20;
  const loadingDone = progress >= 70;
  const finalizingDone = progress >= 100;

  return (
    <Dialog open={open}>
      <DialogContent className="w-[92vw] max-w-[560px] rounded-[26px] border-[#d8e0ee] bg-white p-0 [&>button]:hidden">
        <div className="p-8 text-center sm:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#dbe8ff]">
            <Sparkles className="h-10 w-10 animate-pulse text-[#2458f5]" />
          </div>
          <h3 className="mt-6 text-4xl font-extrabold text-[#0f172a]">Loading your CV...</h3>
          <p className="mt-2 text-2xl text-[#53647d]">Preparing your CV template</p>

          <div className="mt-7 h-3 w-full overflow-hidden rounded-full bg-[#d7deea]">
            <div
              className="h-full rounded-full bg-[#2563eb] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-[1.35rem] font-semibold text-[#2563eb]">{progress}%</p>

          <div className="mt-6 space-y-3 text-left text-[1.2rem] text-[#475569]">
            <p className={selectedDone ? "text-[#0f172a]" : "text-[#8ea0b8]"}>
              <span className={selectedDone ? "mr-2 text-[#16a34a]" : "mr-2 text-[#b8c6da]"}>●</span>
              Template selected {selectedDone ? "check" : ""}
            </p>
            <p className={loadingDone ? "text-[#0f172a]" : "text-[#8ea0b8]"}>
              <span className={loadingDone ? "mr-2 text-[#16a34a]" : "mr-2 text-[#b8c6da]"}>●</span>
              Loading CV...
            </p>
            <p className={finalizingDone ? "text-[#0f172a]" : "text-[#8ea0b8]"}>
              <span className={finalizingDone ? "mr-2 text-[#16a34a]" : "mr-2 text-[#b8c6da]"}>●</span>
              Finalizing...
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SelectedTemplateDialog({
  open,
  onOpenChange,
  template,
  onChooseTemplate,
  onChooseAiAssistant,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: TemplateCard | null;
  onChooseTemplate: () => void;
  onChooseAiAssistant: () => void;
}) {
  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[1180px] rounded-[28px] border-[#cfd8e6] bg-[#eceff4] p-0">
        <div className="max-h-[88vh] overflow-y-auto p-4 sm:p-6">
          <div className="rounded-2xl border border-[#c8d3e3] bg-[#e2e7ef] p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-2xl font-bold text-[#0f172a] sm:text-[2.1rem]">Selected Template Preview</h3>
              <Button type="button" className="h-9 rounded-xl bg-[#2458f5] px-5 text-sm font-semibold hover:bg-[#1f4ed9]">
                Selected
              </Button>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/60 bg-white">
              <img
                src={`https://picsum.photos/seed/${template.seed}/1400/1700`}
                alt={`${template.title} large preview`}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          <div className="px-1 pb-2 pt-8 sm:px-0 sm:pt-10">
            <div className="text-center">
              <h4 className="text-[2rem] font-bold tracking-tight text-[#0f172a]">How would you like to continue?</h4>
              <p className="mt-2 text-lg text-[#46566f]">Choose your working method for this CV</p>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <Card
                onClick={onChooseTemplate}
                className="cursor-pointer rounded-3xl border-0 bg-gradient-to-br from-[#1f2c46] via-[#182843] to-[#0c1731] text-white shadow-xl"
              >
                <CardContent className="p-6 sm:p-7">
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                      <FileText className="h-8 w-8 text-[#dbeafe]" />
                    </div>
                    <FileText className="h-8 w-8 text-white/35" />
                  </div>

                  <h5 className="text-[2.05rem] font-bold leading-tight">CV Template</h5>
                  <p className="mt-3 max-w-md text-[1.45rem] leading-relaxed text-[#d6e0f0]">
                    Use this CV template directly and fill it manually with your information.
                  </p>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.2rem] text-[#dbe7ff] marker:text-[#38d39f]">
                    <li>Fast and simple</li>
                  </ul>

                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChooseTemplate();
                    }}
                    className="mt-8 h-12 w-full rounded-2xl bg-white/10 text-[1.5rem] font-bold text-white hover:bg-white/15"
                  >
                    Use template
                  </Button>
                </CardContent>
              </Card>

              <Card
                onClick={onChooseAiAssistant}
                className="cursor-pointer rounded-3xl border-0 bg-gradient-to-br from-[#2a66ff] via-[#2458f5] to-[#1f47cf] text-white shadow-xl"
              >
                <CardContent className="p-6 sm:p-7">
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                      <Sparkles className="h-8 w-8 text-[#dbeafe]" />
                    </div>
                    <Sparkles className="h-8 w-8 text-white/30" />
                  </div>

                  <h5 className="text-[2.05rem] font-bold leading-tight">AI Assistant</h5>
                  <p className="mt-3 max-w-md text-[1.45rem] leading-relaxed text-[#d6e0f0]">
                    Let artificial intelligence guide you and automatically optimize your CV.
                  </p>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.2rem] text-[#dbe7ff] marker:text-[#fde047]">
                    <li>Automatic optimization</li>
                    <li>Personalized suggestions</li>
                  </ul>

                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChooseAiAssistant();
                    }}
                    className="mt-8 h-12 w-full rounded-2xl bg-white/15 text-[1.5rem] font-bold text-white hover:bg-white/20"
                  >
                    Use AI
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AiAssistantWorkspaceDialog({
  open,
  onOpenChange,
  template,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: TemplateCard | null;
}) {
  const previewTitle = template?.title ?? "Academic Skills";
  const [workspaceStep, setWorkspaceStep] = useState<"edit" | "payment">("edit");
  const [activeTab, setActiveTab] = useState<"content" | "design" | "ai">("content");
  const [selectedColor, setSelectedColor] = useState("#2E64E6");
  const [selectedFont, setSelectedFont] = useState("Inter");

  const designColors = [
    "#2E64E6", "#1E3A8A", "#7C3AED", "#DB2777",
    "#16A34A", "#EA580C", "#0891B2", "#475569",
    "#1E293B", "#4F46E5", "#0D9488", "#C026D3",
  ];
  const fontOptions = ["Inter", "Roboto", "Poppins", "Lato", "Montserrat", "Open Sans"];
  const provenResultsByTab = {
    content: { percent: "68%", text: "got an interview within 2 weeks", activeBar: 1 },
    design: { percent: "85%", text: "recommend our AI tool", activeBar: 2 },
    ai: { percent: "91%", text: "received positive feedback on their CV", activeBar: 3 },
  } as const;
  const paymentResult = { percent: "42%", text: "increased their chances of being contacted", activeBar: 0 } as const;
  const activeResult = workspaceStep === "payment" ? paymentResult : provenResultsByTab[activeTab];

  useEffect(() => {
    if (!open) return;
    setWorkspaceStep("edit");
    setActiveTab("content");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[96vw] max-w-[1140px] rounded-[20px] border-[#ccd7e6] bg-[#edf2f8] p-0 [&>button]:hidden">
        <div className="flex max-h-[88vh] flex-col overflow-hidden">
          <div className="border-b border-[#d4dcea] bg-[#e4eaf2] px-6 py-5">
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4dcea] bg-white text-3xl font-bold text-[#2458f5]">
                  N
                </div>
                <div>
                  <h3 className="text-[2.8rem] font-extrabold leading-none text-[#0f172a]">
                    Nomad<span className="text-[#2458f5]">CV</span>
                    <WandSparkles className="ml-1 inline h-6 w-6 text-[#2458f5]" />
                  </h3>
                  <p className="mt-2 text-[1.15rem] font-medium text-[#4b5c74]">
                    {workspaceStep === "payment" ? "Complete your order" : "Customize your CV with AI"}
                  </p>
                </div>
              </div>

              <div className="min-w-[390px] rounded-2xl border border-[#d0d9e8] bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-[#2458f5]">
                    <Eye className="h-4 w-4" />
                    PROVEN RESULTS
                  </span>
                  <button type="button" onClick={() => onOpenChange(false)} className="text-[#9badc2] hover:text-[#64748b]">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <span className="text-6xl font-extrabold leading-none text-[#2458f5]">{activeResult.percent}</span>
                  <span className="text-[1.25rem] font-medium text-[#334155]">{activeResult.text}</span>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-1.5">
                  {[0, 1, 2, 3].map((barIndex) => (
                    <div key={barIndex} className={`h-1 rounded-full ${barIndex === activeResult.activeBar ? "bg-[#2458f5]" : "bg-[#cfd8e6]"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-[#d4dcea] bg-[#f6f8fc] px-6 py-4">
            <div className="mx-auto flex max-w-[500px] items-center justify-between text-[#8ca0b8]">
              <span className="inline-flex items-center gap-2 text-[1rem] font-semibold">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#cfdae8] text-sm text-[#42546c]">1</span>
                Template
              </span>
              <span className="h-1 w-14 rounded bg-[#cdd7e6]" />
              <button
                type="button"
                onClick={() => setWorkspaceStep("edit")}
                className={`inline-flex items-center gap-2 text-[1rem] font-semibold ${
                  workspaceStep === "edit" ? "text-[#2458f5]" : "text-[#8ca0b8]"
                }`}
              >
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                    workspaceStep === "edit" ? "bg-[#2458f5] text-white" : "bg-[#cfdae8] text-[#42546c]"
                  }`}
                >
                  2
                </span>
                Edit
              </button>
              <span className="h-1 w-14 rounded bg-[#cdd7e6]" />
              <button
                type="button"
                onClick={() => setWorkspaceStep("payment")}
                className={`inline-flex items-center gap-2 text-[1rem] font-semibold ${
                  workspaceStep === "payment" ? "text-[#2458f5]" : "text-[#8ca0b8]"
                }`}
              >
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                    workspaceStep === "payment" ? "bg-[#2458f5] text-white" : "bg-[#cfdae8] text-[#42546c]"
                  }`}
                >
                  3
                </span>
                Payment
              </button>
            </div>
          </div>

          {workspaceStep === "payment" && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="mx-auto max-w-[640px] rounded-[22px] border border-[#cfd8e6] bg-white p-5 shadow-sm sm:p-7">
                <h4 className="text-center text-[2.05rem] font-extrabold text-[#0f172a]">
                  <span className="inline-flex items-center gap-2">
                    <CreditCard className="h-7 w-7 text-[#1d4ed8]" />
                    Secure Payment
                  </span>
                </h4>

                <div className="mt-6 rounded-2xl border border-[#cfd8e6] bg-[#f6f8fc] p-5">
                  <h5 className="text-[1.55rem] font-bold text-[#0f172a]">Order Summary</h5>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[1.55rem] font-medium text-[#334155]">AI-Optimized CV</p>
                      <p className="mt-2 text-[1.05rem] text-[#64748b]">Selected template:</p>
                      <p className="text-[1.05rem] font-medium text-[#334155]">{template?.title ?? previewTitle}</p>
                    </div>
                    <p className="text-[1.7rem] font-bold text-[#0f172a]">20EUR</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[1.05rem] text-[#64748b]">
                    <span>Formats included:</span>
                    <span>PDF + Word</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-[#cfd8e6] pt-3">
                    <span className="text-[1.9rem] font-bold text-[#0f172a]">Total</span>
                    <span className="text-[1.9rem] font-bold text-[#2458f5]">20EUR</span>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-[#dce5f3] bg-[#f8fbff] p-4">
                  <h5 className="inline-flex items-center gap-2 text-[1.45rem] font-bold text-[#0f172a]">
                    <CheckCircle2 className="h-5 w-5 text-[#16a34a]" />
                    Included in your purchase:
                  </h5>
                  <ul className="mt-3 space-y-2 text-[1.1rem] text-[#334155]">
                    {[
                      "Instant download in PDF and Word",
                      "AI-optimized CV",
                      "nomadcv watermark (discreet)",
                      "One-time payment - No subscription",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-[#2563eb]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  type="button"
                  className="mt-5 h-14 w-full rounded-xl bg-[#1174b7] text-[1.35rem] font-bold text-white hover:bg-[#0f6aa8]"
                >
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-base font-extrabold">P</span>
                  Pay with PayPal
                </Button>
              </div>
            </div>
          )}

          {workspaceStep === "edit" && (
            <>
              <div className="grid flex-1 gap-4 overflow-hidden p-4 md:grid-cols-2">
            <div className="min-h-0 rounded-2xl border border-[#cfd8e6] bg-[#eaf0f8] p-3">
              <div className="grid grid-cols-3 gap-2 rounded-2xl border border-[#cfd8e6] bg-white p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("content")}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    activeTab === "content"
                      ? "bg-[#2458f5] text-white"
                      : "text-[#4b5c74] hover:bg-[#f2f6fb]"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="h-4 w-4" />
                    Content
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("design")}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    activeTab === "design"
                      ? "bg-[#2458f5] text-white"
                      : "text-[#4b5c74] hover:bg-[#f2f6fb]"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Palette className="h-4 w-4" />
                    Design
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("ai")}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    activeTab === "ai"
                      ? "bg-[#2458f5] text-white"
                      : "text-[#4b5c74] hover:bg-[#f2f6fb]"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Bot className="h-4 w-4" />
                    AI
                  </span>
                </button>
              </div>

              <div className="mt-3 max-h-[430px] space-y-3 overflow-y-auto pr-1">
                {activeTab === "content" && (
                  <>
                    <div className="rounded-xl border border-[#cfd8e6] bg-white p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="text-base font-bold text-[#0f172a]">Experience</h4>
                        <Button type="button" className="h-7 rounded-full bg-[#2458f5] px-3 text-xs font-semibold">
                          + Add
                        </Button>
                      </div>
                      <div className="space-y-2 rounded-lg border border-[#d7deea] bg-[#f8fafc] p-2.5">
                        <input type="text" defaultValue={previewTitle} className="h-8 w-full rounded border border-[#d4dcea] bg-white px-2 text-sm" />
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" defaultValue="Enterprise Corp" className="h-8 rounded border border-[#d4dcea] bg-white px-2 text-sm" />
                          <input type="text" defaultValue="2021 - 2026" className="h-8 rounded border border-[#d4dcea] bg-white px-2 text-sm" />
                        </div>
                        <textarea
                          rows={3}
                          defaultValue={"- Complex project management\n- Team leadership\n- Performance improvement"}
                          className="w-full resize-none rounded border border-[#d4dcea] bg-white px-2 py-1.5 text-sm"
                        />
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#cfd8e6] bg-white p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="text-base font-bold text-[#0f172a]">Education</h4>
                        <Button type="button" className="h-7 rounded-full bg-[#2458f5] px-3 text-xs font-semibold">
                          + Add
                        </Button>
                      </div>
                      <div className="space-y-2 rounded-lg border border-[#d7deea] bg-[#f8fafc] p-2.5">
                        <input
                          type="text"
                          defaultValue="Professional Master's"
                          className="h-8 w-full rounded border border-[#d4dcea] bg-white px-2 text-sm"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" defaultValue="Universite de Paris" className="h-8 rounded border border-[#d4dcea] bg-white px-2 text-sm" />
                          <input type="text" defaultValue="2017 - 2019" className="h-8 rounded border border-[#d4dcea] bg-white px-2 text-sm" />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#cfd8e6] bg-white p-3">
                      <h4 className="mb-2 text-base font-bold text-[#0f172a]">Skills</h4>
                      <div className="flex items-center gap-2">
                        <input type="text" placeholder="Add a skill..." className="h-9 flex-1 rounded border border-[#d4dcea] bg-[#f8fafc] px-2 text-sm" />
                        <Button type="button" className="h-9 w-9 rounded-xl bg-[#2458f5] p-0 text-lg">
                          +
                        </Button>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {["Leadership", "Communication", "Management", "Innovation"].map((skill) => (
                          <span key={skill} className="rounded-lg border border-[#a8c4ff] bg-[#eef4ff] px-2.5 py-1 text-xs text-[#2458f5]">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "design" && (
                  <>
                    <div className="rounded-xl border border-[#cfd8e6] bg-white p-3">
                      <h4 className="mb-3 text-base font-bold text-[#0f172a]">Main Color</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {designColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`relative h-11 rounded-lg border-4 ${
                              selectedColor === color ? "border-[#0f172a]" : "border-transparent"
                            }`}
                            style={{ backgroundColor: color }}
                          >
                            {selectedColor === color && <Check className="mx-auto h-5 w-5 text-white" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#cfd8e6] bg-white p-3">
                      <h4 className="mb-3 text-base font-bold text-[#0f172a]">Font (30 fonts)</h4>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">Modern</p>
                      <div className="rounded-xl border border-[#2E64E6] bg-[#f8fafc] p-2">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm font-medium text-[#1e293b]"
                        >
                          <span style={{ fontFamily: selectedFont }}>{selectedFont}</span>
                          <Check className="h-4 w-4 text-[#2E64E6]" />
                        </button>
                        <div className="mt-2 space-y-1 rounded-lg border border-[#dbe4f2] bg-white p-1.5">
                          {fontOptions.map((font) => (
                            <button
                              key={font}
                              type="button"
                              onClick={() => setSelectedFont(font)}
                              className={`block w-full rounded-md px-2 py-1.5 text-left text-sm ${
                                selectedFont === font ? "bg-[#eaf1ff] text-[#2E64E6]" : "text-[#334155] hover:bg-[#f1f5f9]"
                              }`}
                              style={{ fontFamily: font }}
                            >
                              {font}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "ai" && (
                  <>
                    <div className="rounded-xl border border-[#7db6ff] bg-[#dce9ff] p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <h4 className="inline-flex items-center gap-2 text-[1.55rem] font-bold text-[#0f172a]">
                          <Sparkles className="h-5 w-5 text-[#2458f5]" />
                          AI Assistant
                        </h4>
                        <div className="flex items-center gap-2 text-[#2b5dff]">
                          <WandSparkles className="h-4 w-4" />
                          <X className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#9ec2ff] bg-[#eaf1ff] p-4 shadow-sm">
                      <h4 className="inline-flex items-center gap-2 text-[1.55rem] font-bold text-[#0f172a]">
                        <Sparkles className="h-5 w-5 text-[#2b5dff]" />
                        Improve Summary with AI
                      </h4>
                      <p className="mt-2 text-[1.05rem] text-[#475569]">
                        AI will rewrite your summary to make it more impactful and professional.
                      </p>
                      <Button
                        type="button"
                        className="mt-4 h-11 w-full rounded-xl bg-gradient-to-r from-[#2458f5] to-[#4f46e5] text-[1.05rem] font-semibold text-white hover:from-[#1f4ed9] hover:to-[#4338ca]"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Improve with AI
                      </Button>
                    </div>

                    <div className="rounded-xl border border-[#c7b8ff] bg-[#f0ecff] p-4 shadow-sm">
                      <h4 className="inline-flex items-center gap-2 text-[1.55rem] font-bold text-[#0f172a]">
                        <FileText className="h-5 w-5 text-[#7c3aed]" />
                        Improve Work Experiences
                      </h4>
                      <p className="mt-2 text-[1.05rem] text-[#475569]">
                        AI enriches your work experiences with quantifiable achievements and powerful action verbs.
                      </p>
                      <Button
                        type="button"
                        className="mt-4 h-11 w-full rounded-xl bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#a21caf] text-[1.05rem] font-semibold text-white hover:from-[#4338ca] hover:via-[#6d28d9] hover:to-[#86198f]"
                      >
                        <WandSparkles className="mr-2 h-4 w-4" />
                        Improve Experiences
                      </Button>
                    </div>

                    <div className="rounded-xl border border-[#9be7b6] bg-[#e8f8ee] p-4 shadow-sm">
                      <h4 className="inline-flex items-center gap-2 text-[1.55rem] font-bold text-[#0f172a]">
                        <ShieldCheck className="h-5 w-5 text-[#16a34a]" />
                        Optimize for ATS Systems
                      </h4>
                      <p className="mt-2 text-[1.05rem] text-[#475569]">
                        Improves your CV&apos;s compatibility with automatic recruitment software.
                      </p>
                      <Button
                        type="button"
                        className="mt-4 h-11 w-full rounded-xl bg-gradient-to-r from-[#16a34a] to-[#059669] text-[1.05rem] font-semibold text-white hover:from-[#15803d] hover:to-[#047857]"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Optimize for ATS
                      </Button>
                    </div>

                    <div className="rounded-xl border border-[#e2c2ff] bg-[#f6f0ff] p-4 shadow-sm">
                      <h4 className="inline-flex items-center gap-2 text-[1.55rem] font-bold text-[#0f172a]">
                        <WandSparkles className="h-5 w-5 text-[#9333ea]" />
                        Generate Keywords
                      </h4>
                      <p className="mt-2 text-[1.05rem] text-[#475569]">
                        AI suggests relevant skills for your profile.
                      </p>
                      <Button
                        type="button"
                        className="mt-4 h-11 w-full rounded-xl bg-gradient-to-r from-[#9333ea] to-[#e6007a] text-[1.05rem] font-semibold text-white hover:from-[#7e22ce] hover:to-[#be185d]"
                      >
                        <span className="mr-2 text-lg leading-none">+</span>
                        Generate Keywords
                      </Button>
                    </div>

                    <div className="rounded-xl border border-[#f3d685] bg-[#fff8df] p-4 shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="inline-flex items-center gap-2 text-[1.55rem] font-bold text-[#0f172a]">
                          <Bot className="h-5 w-5 text-[#d97706]" />
                          AI Suggestions
                        </h4>
                        <Button
                          type="button"
                          className="h-8 rounded-full bg-[#f59e0b] px-4 text-xs font-bold text-white hover:bg-[#d97706]"
                        >
                          <WandSparkles className="mr-1.5 h-3.5 w-3.5" />
                          Generate
                        </Button>
                      </div>
                      <p className="mt-2 text-[1rem] italic text-[#64748b]">Click &apos;Generate&apos; to get personalized tips</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="min-h-0 rounded-2xl border border-[#cfd8e6] bg-[#eaf0f8] p-3">
              <h4 className="mb-2 text-[1.7rem] font-bold text-[#0f172a]">
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="h-5 w-5 text-[#2458f5]" />
                  Live Preview
                </span>
              </h4>
              <div className="relative max-h-[468px] overflow-y-auto rounded-xl border border-[#d7deea] bg-white p-5">
                <div className="pointer-events-none absolute right-6 top-28 -rotate-45 text-6xl font-semibold text-[#e7edf8]">nomadcv</div>
                <h4 style={{ color: selectedColor, fontFamily: selectedFont }} className="text-[2.1rem] font-extrabold uppercase tracking-tight">
                  JEAN DUPONT
                </h4>
                <p className="text-[1.2rem] text-[#334155]">{previewTitle}</p>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#334155]">
                  <span className="inline-flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-[#2458f5]" />
                    jean.dupont@email.com
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-[#2458f5]" />
                    +33 6 12 34 56 78
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-[#2458f5]" />
                    Paris, France
                  </span>
                </div>

                <div className="my-4 h-px" style={{ backgroundColor: selectedColor }} />

                <h5 style={{ color: selectedColor, fontFamily: selectedFont }} className="text-[1.4rem] font-bold uppercase">Professional Summary</h5>
                <p className="mt-1.5 text-[1.05rem] leading-relaxed text-[#334155]">
                  Professional with 5+ years of experience. Passionate and results-oriented expert.
                </p>

                <h5 style={{ color: selectedColor, fontFamily: selectedFont }} className="mt-4 text-[1.4rem] font-bold uppercase">Work Experience</h5>
                <p className="mt-1 text-[1.5rem] font-bold text-[#0f172a]">{previewTitle}</p>
                <p className="text-sm text-[#475569]">Enterprise Corp - 2021 - 2026</p>
                <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-sm text-[#334155]">
                  <li>Complex project management</li>
                  <li>Team leadership</li>
                  <li>Performance improvement</li>
                </ul>

                <h5 style={{ color: selectedColor, fontFamily: selectedFont }} className="mt-4 text-[1.4rem] font-bold uppercase">Education</h5>
                <p className="mt-1 text-[1.5rem] font-bold text-[#0f172a]">Professional Master&apos;s</p>
                <p className="text-sm text-[#475569]">Universite de Paris - 2017 - 2019</p>

                <h5 style={{ color: selectedColor, fontFamily: selectedFont }} className="mt-4 text-[1.4rem] font-bold uppercase">Skills</h5>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["Leadership", "Communication", "Management", "Innovation"].map((skill) => (
                    <span key={skill} className="rounded-lg px-2.5 py-1 text-xs font-semibold text-white" style={{ backgroundColor: selectedColor }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[#d4dcea] bg-white px-6 py-4">
            <button type="button" className="text-[1.1rem] font-medium text-[#334155] hover:text-[#0f172a]">
              &larr; Change template
            </button>
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" className="h-11 rounded-2xl border-[#c7d3e6] bg-[#eef3fa] px-6 text-[1rem] font-semibold text-[#0f172a]">
                <Download className="mr-2 h-4 w-4" />
                Download (free)
              </Button>
              <Button
                type="button"
                onClick={() => setWorkspaceStep("payment")}
                className="h-11 rounded-2xl bg-[#2b5dff] px-7 text-[1rem] font-bold hover:bg-[#2453e6]"
              >
                Unlock Premium - 20EUR
              </Button>
            </div>
          </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function UploadSection() {
  return (
    <section id="ai-tools" className="mt-10 bg-[#eaf0f9] px-3 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Card className="border-[#d9e2f0] bg-white shadow-md">
          <CardContent className="p-6 sm:p-8">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f0ff] text-[#2458f5]">
              <CloudUpload className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-center text-2xl font-extrabold text-[#111827]">Upload your current CV</h3>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-[#6b7280]">
              Get AI suggestions for role alignment, readability, and keyword optimization.
            </p>

            <div className="mt-6 rounded-xl border border-dashed border-[#93b0eb] bg-[#f5f8ff] p-6">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#2458f5] text-white">
                <FileText className="h-5 w-5" />
              </div>
              <p className="mt-3 text-center text-sm font-semibold text-[#1e293b]">Click to upload or drag your file</p>
              <p className="mt-1 text-center text-xs text-[#64748b]">PDF, DOCX, or TXT up to 5MB</p>
            </div>

            <p className="mt-4 text-center text-xs text-[#64748b]">GDPR-safe processing and encrypted storage.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="pricing" className="px-3 pb-16 pt-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Badge variant="outline" className="rounded-full border-[#f4d98f] bg-[#fff7da] px-4 py-1 text-[11px] font-semibold text-[#926b00]">
            Verified reviews
          </Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#111827]">What our users say</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-[#6b7280]">
            Thousands of professionals have improved interviews and response rates.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.name} className="border-[#e4eaf5] bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center gap-1 text-[#f59e0b]">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-sm leading-6 text-[#334155]">{review.text}</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dbe7ff] text-xs font-bold text-[#2458f5]">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f172a]">{review.name}</p>
                    <p className="text-xs text-[#64748b]">{review.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button className="h-11 rounded-full bg-[#2458f5] px-8 text-sm font-semibold text-white hover:bg-[#1f4ed9]">
            <Sparkles className="mr-2 h-4 w-4" />
            Discover all models
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-[#6b7280]">
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#16a34a]" />
            ATS optimized
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#16a34a]" />
            Multi-country formats
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#16a34a]" />
            AI writing assistance
          </div>
        </div>
      </div>
    </section> 
  );
}

function PurchaseDialog({
  open,
  onOpenChange,
  template,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: TemplateCard | null;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[1150px] rounded-[30px] border-[#c8d3e4] bg-[#ecedf1] p-0">
        <div className="max-h-[88vh] overflow-y-auto">
          <div className="grid gap-4 p-4 md:grid-cols-[1fr_1fr] md:gap-6 md:p-8">
            <div className="rounded-[26px] bg-gradient-to-b from-[#2c66ff] to-[#1f47cf] p-6 text-white md:p-8">
              <Badge className="rounded-full bg-[#facc15] px-4 py-1 text-sm font-bold text-[#0f172a] hover:bg-[#facc15]">
                Launch Offer
              </Badge>

              <h3 className="mt-7 text-5xl font-extrabold leading-tight">Nomad CV Premium</h3>

              <p className="mt-4 text-7xl font-extrabold leading-none">
                20EUR <span className="text-4xl font-medium text-white/80">One-time payment</span>
              </p>

              <p className="mt-6 text-4xl leading-snug text-[#dbe7ff]">Full and unlimited access to all premium features</p>

              <p className="mt-7 text-[2rem] font-bold">Everything included:</p>
              <ul className="mt-4 space-y-4 text-[2rem] leading-tight">
                {[
                  "CV without watermark",
                  "Unlimited PDF downloads",
                  "All premium templates",
                  "Advanced AI optimization",
                  "24/7 priority support",
                  "Lifetime access",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#22c55e] text-[#0f172a]">
                      <Check className="h-5 w-5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/30 pt-5 text-[1.6rem] text-[#dbe7ff]">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    100% secure payment
                  </span>
                  <span>4.9/5</span>
                </div>
              </div>
            </div>

            <div className="rounded-[26px] bg-[#f8fafc] p-6 md:p-8">
              <h3 className="text-5xl font-extrabold text-[#111827]">Complete your purchase</h3>
              <p className="mt-3 text-3xl text-[#546377]">Secure payment with PayPal</p>

              <Button
                type="button"
                className="mt-7 h-16 w-full rounded-2xl bg-[#1174b7] text-[2rem] font-bold text-white hover:bg-[#0f6aa8]"
              >
                <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg font-extrabold">P</span>
                Pay with PayPal
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>

              <p className="mt-8 text-center text-[1.4rem] text-[#64748b]">Accepted payment method</p>
              <div className="mt-3 flex justify-center">
                <div className="inline-flex h-14 w-20 items-center justify-center rounded-xl bg-[#e2e8f0] text-2xl font-extrabold text-[#1174b7]">
                  P
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-[#86efac] bg-[#eaf8ef] p-5">
                <p className="inline-flex items-center gap-3 text-[2rem] font-bold text-[#0f172a]">
                  <ShieldCheck className="h-8 w-8 text-[#16a34a]" />
                  100% secure payment
                </p>
                <p className="mt-2 text-[1.45rem] leading-relaxed text-[#475569]">
                  Your banking information is protected by bank-level SSL encryption. We never store your payment data.
                </p>
              </div>

              <div className="mt-7 rounded-2xl bg-[#e5e7eb] p-5">
                <p className="text-[2rem] font-bold text-[#111827]">Order Summary</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-[2.2rem] font-bold text-[#111827]">{template?.title ?? "Nomad CV Premium"}</p>
                  <p className="text-[2.2rem] font-bold text-[#111827]">20EUR</p>
                </div>
                <p className="mt-2 text-center text-[1.25rem] text-[#64748b]">VAT included - No additional fees</p>
              </div>

              <div className="mt-7 rounded-2xl border border-[#bfdbfe] bg-[#eaf5ff] p-5">
                <p className="inline-flex items-center gap-2 text-[2rem] font-bold text-[#111827]">
                  <Mail className="h-7 w-7 text-[#2563eb]" />
                  Need help?
                </p>
                <p className="mt-2 text-[1.35rem] text-[#475569]">Contact our support before proceeding with payment</p>
                <p className="mt-2 text-[1.5rem] font-bold text-[#2458f5]">nomadcv13.assistance@gmail.com</p>
              </div>

              <div className="mt-7 rounded-2xl border border-[#fde68a] bg-[#fefce8] p-4">
                <p className="inline-flex items-center gap-2 text-[1.5rem] font-semibold text-[#1f2937]">
                  <TriangleAlert className="h-5 w-5 text-[#d97706]" />
                  No Refund Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function HomeCvLanding() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateCard | null>(null);
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [isAiAssistantDialogOpen, setIsAiAssistantDialogOpen] = useState(false);

  const handleUseModel = (template: TemplateCard) => {
    if (isLoaderOpen) return;
    setSelectedTemplate(template);
    setIsLoaderOpen(true);
    setLoadingProgress(0);
  };

  const handlePreview = (template: TemplateCard) => {
    setSelectedTemplate(template);
    setIsTemplateDialogOpen(true);
  };

  const handleChooseTemplate = () => {
    setIsTemplateDialogOpen(false);
    setIsPurchaseDialogOpen(true);
  };

  const handleChooseAiAssistant = () => {
    setIsTemplateDialogOpen(false);
    setIsAiAssistantDialogOpen(true);
  };

  useEffect(() => {
    if (!isLoaderOpen) return;

    let progress = 0;
    const interval = setInterval(() => {
      const step = Math.floor(Math.random() * 14) + 9;
      progress = Math.min(progress + step, 100);
      setLoadingProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaderOpen(false);
          setIsTemplateDialogOpen(true);
        }, 280);
      }
    }, 180);

    return () => clearInterval(interval);
  }, [isLoaderOpen]);

  return (
    <div className="bg-[#f5f7fb]">
      <HeroSection />
      <TemplatesSection onUseModel={handleUseModel} onPreview={handlePreview} />
      <UploadSection />
      <TestimonialsSection />
      <TemplateLoadingDialog open={isLoaderOpen} progress={loadingProgress} />
      <SelectedTemplateDialog
        open={isTemplateDialogOpen}
        onOpenChange={setIsTemplateDialogOpen}
        template={selectedTemplate}
        onChooseTemplate={handleChooseTemplate}
        onChooseAiAssistant={handleChooseAiAssistant}
      />
      <PurchaseDialog
        open={isPurchaseDialogOpen}
        onOpenChange={setIsPurchaseDialogOpen}
        template={selectedTemplate}
      />
      <AiAssistantWorkspaceDialog
        open={isAiAssistantDialogOpen}
        onOpenChange={setIsAiAssistantDialogOpen}
        template={selectedTemplate}
      />
    </div>
  );
}
