import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Zap, BarChart3, Layers, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flowtask — Beautiful task management" },
      { name: "description", content: "Organize tasks, track progress, and stay productive with Flowtask." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* nav */}
      <header className="border-b border-border/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary shadow-glow" />
            <span className="text-lg font-bold tracking-tight">Flowtask</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link to="/register"><Button size="sm" className="bg-gradient-primary shadow-elegant">Get started</Button></Link>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-hero blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-24 text-center md:py-32">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Built for modern productivity
          </div>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
            Get more done with{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">beautiful clarity</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A delightful task manager designed for focus. Organize, prioritize, and track your work with smooth, elegant interactions.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-primary shadow-elegant">
                Start free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">Sign in</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* features */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Zap, title: "Lightning fast", desc: "Instant CRUD on every task. Smooth filters, search, and sort." },
            { icon: BarChart3, title: "Productivity insights", desc: "See your completion rate, pending work, and progress at a glance." },
            { icon: Layers, title: "Organized by priority", desc: "Categories, priorities, due dates — all the structure you need." },
          ].map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 transition hover:shadow-elegant">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 py-8">
        <div className="container mx-auto flex items-center justify-between px-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>Flowtask</span>
          </div>
          <span>© {new Date().getFullYear()} — Crafted with care.</span>
        </div>
      </footer>
    </div>
  );
}
