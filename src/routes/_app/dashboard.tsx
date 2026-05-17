import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks, type Task } from "@/lib/tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListTodo, CheckCircle2, Clock, Loader2, ArrowRight, TrendingUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Flowtask" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { data: tasks = [], isLoading } = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const completionRate = total ? Math.round((completed / total) * 100) : 0;
  const recent = tasks.slice(0, 5);

  const stats = [
    { label: "Total tasks", value: total, icon: ListTodo, color: "from-violet-500 to-indigo-500" },
    { label: "Completed", value: completed, icon: CheckCircle2, color: "from-emerald-500 to-teal-500" },
    { label: "In progress", value: inProgress, icon: Loader2, color: "from-amber-500 to-orange-500" },
    { label: "Pending", value: pending, icon: Clock, color: "from-rose-500 to-pink-500" },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your productivity at a glance.</p>
      </div>

      {/* stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="overflow-hidden transition hover:shadow-elegant">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{s.label}</p>
                  <p className="mt-2 text-3xl font-bold">{isLoading ? "—" : s.value}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-soft`}>
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* progress */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-primary" /> Productivity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completion rate</span>
                <span className="font-semibold">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            <div className="space-y-3 text-sm">
              <Row label="Completed" value={completed} total={total} color="bg-emerald-500" />
              <Row label="In progress" value={inProgress} total={total} color="bg-amber-500" />
              <Row label="Pending" value={pending} total={total} color="bg-rose-500" />
            </div>
          </CardContent>
        </Card>

        {/* recent */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent tasks</CardTitle>
            <Link to="/tasks"><Button variant="ghost" size="sm">View all <ArrowRight className="ml-1 h-3 w-3" /></Button></Link>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
            ) : recent.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                <p>No tasks yet.</p>
                <Link to="/tasks"><Button size="sm" className="mt-3 bg-gradient-primary">Create your first task</Button></Link>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {recent.map((t) => <RecentRow key={t.id} task={t} />)}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = total ? (value / total) * 100 : 0;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function RecentRow({ task }: { task: Task }) {
  const statusColor = {
    pending: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    in_progress: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  }[task.status];
  return (
    <li className="flex items-center justify-between py-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{task.title}</p>
        <p className="text-xs text-muted-foreground">
          {task.category && <span className="mr-2">#{task.category}</span>}
          Updated {formatDistanceToNow(new Date(task.updated_at), { addSuffix: true })}
        </p>
      </div>
      <Badge variant="secondary" className={statusColor}>{task.status.replace("_", " ")}</Badge>
    </li>
  );
}
