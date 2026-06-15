"use client"
import { useState, useSyncExternalStore } from "react"
import { usePoolStore } from "@/lib/pool-store"
import { Header } from "@/components/pool/header"
import { JornadaCard } from "@/components/pool/jornada-card"
import { TareasCard } from "@/components/pool/tareas-card"
import { AnalisisCard } from "@/components/pool/analisis-card"
import { HistorialView } from "@/components/pool/historial-view"
import { GuiaCard } from "@/components/pool/guia-card"
import { BottomBar } from "@/components/pool/bottom-bar"

const TABS = ["Hoy", "Historial", "Guía"] as const

function useHydrated() {
  return useSyncExternalStore(
    (callback) => {
      const unsub = usePoolStore.persist.onFinishHydration(callback)
      if (!usePoolStore.persist.hasHydrated()) {
        usePoolStore.persist.rehydrate()
      }
      return unsub
    },
    () => usePoolStore.persist.hasHydrated(), // snapshot en cliente
    () => false // snapshot en servidor (siempre no-hidratado)
  )
}

export default function Home() {
  const [tab, setTab] = useState<typeof TABS[number]>("Hoy")
  const ready = useHydrated()

  if (!ready) {
    return (
      <div className="mx-auto max-w-xl space-y-4 p-4">
        <Header />
        <p className="pt-8 text-center text-sm text-muted-foreground">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl space-y-4 p-4 pb-24">
      <Header />

      <div className="flex gap-2 border-b">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Hoy" && (
        <div className="space-y-4">
          <JornadaCard />
          <TareasCard />
          <AnalisisCard />
        </div>
      )}

      {tab === "Historial" && <HistorialView />}
      {tab === "Guía" && <GuiaCard />}

      {tab === "Hoy" && <BottomBar />}
    </div>
  )
}