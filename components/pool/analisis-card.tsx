"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { usePoolStore } from "@/lib/pool-store"
import { CHEM_INFO } from "@/lib/pool-data"

function sanitize(value: string) {
  return value.replace(",", ".").replace(/[^0-9.]/g, "")
}

function outOfRange(value: string, min: number, max: number) {
  const n = parseFloat(value)
  if (isNaN(n)) return false
  return n < min || n > max
}

export function AnalisisCard() {
  const active = usePoolStore((s) => s.active)
  const setField = usePoolStore((s) => s.setField)

  const phWarn = outOfRange(active.ph, CHEM_INFO.ph.min, CHEM_INFO.ph.max)
  const clWarn = outOfRange(active.clLibre, CHEM_INFO.cloro.min, CHEM_INFO.cloro.max)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis del agua</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Input
              value={active.ph}
              onChange={(e) => setField("ph", sanitize(e.target.value))}
              placeholder="pH"
              className={phWarn ? "border-destructive" : ""}
            />
            <p className="text-xs text-muted-foreground">
              Objetivo {CHEM_INFO.ph.target} ({CHEM_INFO.ph.min}–{CHEM_INFO.ph.max})
            </p>
          </div>
          <div className="space-y-1">
            <Input
              value={active.clLibre}
              onChange={(e) => setField("clLibre", sanitize(e.target.value))}
              placeholder="Cl libre (ppm)"
              className={clWarn ? "border-destructive" : ""}
            />
            <p className="text-xs text-muted-foreground">
              Objetivo {CHEM_INFO.cloro.target} ppm ({CHEM_INFO.cloro.min}–{CHEM_INFO.cloro.max})
            </p>
          </div>
          <Input value={active.clTotal} onChange={(e) => setField("clTotal", sanitize(e.target.value))} placeholder="Cl total (ppm)" />
          <Input readOnly value={active.clComb} className="bg-muted" placeholder="Cl combinado" />
          <Input value={active.depurada} onChange={(e) => setField("depurada", sanitize(e.target.value))} placeholder="m³ depurada" />
          <Input value={active.renovada} onChange={(e) => setField("renovada", sanitize(e.target.value))} placeholder="m³ renovada" />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3">
          <span className="text-sm">Transparencia del agua</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={active.transparencia === true ? "default" : "outline"}
              onClick={() => setField("transparencia", true)}
            >
              Sí
            </Button>
            <Button
              size="sm"
              variant={active.transparencia === false ? "destructive" : "outline"}
              onClick={() => setField("transparencia", false)}
            >
              No
            </Button>
          </div>
        </div>

        {active.transparencia === false && !clWarn && !phWarn && (
          <p className="text-xs text-amber-600">
            Cloro y pH correctos pero agua turbia: contacta con Miguel antes de añadir producto. No usar Delsafloc sin autorización.
          </p>
        )}
      </CardContent>
    </Card>
  )
}