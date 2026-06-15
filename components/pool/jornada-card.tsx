"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePoolStore } from "@/lib/pool-store"

export function JornadaCard() {
  const active = usePoolStore((s) => s.active)
  const startNew = usePoolStore((s) => s.startNew)
  const finishDay = usePoolStore((s) => s.finishDay)

  const start = active.start
    ? new Date(active.start).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
    : "—:—"
  const end = active.end
    ? new Date(active.end).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
    : "—:—"

  const status = active.start && !active.end ? "running" : active.start && active.end ? "done" : "idle"

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Jornada</CardTitle>
        <Badge variant={status === "done" ? "secondary" : "default"}>
          {status === "idle" && "No iniciada"}
          {status === "running" && "En curso"}
          {status === "done" && "Finalizada"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-center text-3xl font-mono">
          {start} → {end}
        </div>
        <div className="flex gap-2">
          <Button className="flex-1" onClick={startNew} disabled={status === "running"}>
            Iniciar
          </Button>
          <Button className="flex-1" variant="secondary" onClick={finishDay} disabled={status !== "running"}>
            Finalizar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}