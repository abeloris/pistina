"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { DAILY_TASKS, WEEKLY_TASKS } from "./pool-data"

const TOTAL_TASKS = DAILY_TASKS.length + WEEKLY_TASKS.length

export interface PoolRecord {
    start: string
    end: string
    ph: string
    clLibre: string
    clTotal: string
    clComb: string
    depurada: string
    renovada: string
    transparencia: boolean | null
    checks: boolean[]
    img1: string
    img2: string
    filtroTimerEnd: number | null
}

type Mode = "create" | "edit"

interface PoolStore {
    active: PoolRecord
    historial: PoolRecord[]
    mode: Mode
    editingIndex: number | null

    startNew: () => void
    finishDay: () => void
    setField: <K extends keyof PoolRecord>(k: K, v: PoolRecord[K]) => void
    toggleCheck: (i: number) => void
    setImage: (k: "img1" | "img2", v: string) => void

    save: () => void
    editRecord: (i: number) => void
    deleteRecord: (i: number) => void
    reset: () => void

    exportDataJson: () => void
    exportDataCsv: () => void
    exportDataTxt: () => void
}

const EMPTY: PoolRecord = {
    start: "",
    end: "",
    ph: "",
    clLibre: "",
    clTotal: "",
    clComb: "",
    depurada: "",
    renovada: "",
    transparencia: null,
    checks: Array(TOTAL_TASKS).fill(false),
    img1: "",
    img2: "",
    filtroTimerEnd: null,
}

const pad = (n: number) => String(n).padStart(2, "0")

const nowTime = (): string => {
    const d = new Date()
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const today = (): string => {
    const d = new Date()
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const build = (date: string): string => `${date}T${nowTime()}`

const recalc = (r: PoolRecord): PoolRecord => {
    const l = parseFloat(r.clLibre)
    const t = parseFloat(r.clTotal)

    return {
        ...r,
        clComb: !isNaN(l) && !isNaN(t)
            ? Math.max(0, t - l).toFixed(2)
            : "",
    }
}

export const usePoolStore = create<PoolStore>()(
    persist(
        (set, get) => ({
            active: { ...EMPTY },
            historial: [],
            mode: "create",
            editingIndex: null,

            startNew() {
                set((s) => ({
                    active: {
                        ...s.active,
                        start: build(s.active.start?.slice(0, 10) || today()),
                    },
                }))
            },

            finishDay() {
                set((s) => {
                    if (!s.active.start) return s

                    const date = s.active.start.slice(0, 10)

                    return {
                        active: {
                            ...s.active,
                            end: build(date),
                        },
                    }
                })
            },

            setField(k, v) {
                set((s) => ({
                    active: recalc({
                        ...s.active,
                        [k]: v,
                    }),
                }))
            },

            toggleCheck(i) {
                set((s) => {
                    const checks = [...s.active.checks]
                    checks[i] = !checks[i]

                    return {
                        active: {
                            ...s.active,
                            checks,
                        },
                    }
                })
            },

            setImage(k, v) {
                set((s) => ({
                    active: {
                        ...s.active,
                        [k]: v,
                    },
                }))
            },

            save() {
                const { active, historial, mode, editingIndex } = get()

                if (!active.start) return

                if (mode === "edit" && editingIndex !== null) {
                    const updated = [...historial]
                    updated[editingIndex] = active

                    set({
                        historial: updated,
                        active: { ...EMPTY },
                        mode: "create",
                        editingIndex: null,
                    })
                    return
                }

                set({
                    historial: [...historial, active],
                    active: { ...EMPTY },
                    mode: "create",
                    editingIndex: null,
                })
            },

            editRecord(i) {
                const item = get().historial[i]
                if (!item) return

                set({
                    active: { ...item },
                    mode: "edit",
                    editingIndex: i,
                })
            },

            deleteRecord(i) {
                set((s) => ({
                    historial: s.historial.filter((_, idx) => idx !== i),
                }))
            },

            reset() {
                set({
                    active: { ...EMPTY },
                    mode: "create",
                    editingIndex: null,
                })
            },

            // -------------------------
            // EXPORTS
            // -------------------------

            exportDataJson() {
                const data = get().historial

                const blob = new Blob(
                    [JSON.stringify(data, null, 2)],
                    { type: "application/json" }
                )

                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")

                a.href = url
                a.download = "historial_piscina.json"
                a.click()

                URL.revokeObjectURL(url)
            },

            exportDataCsv() {
                const data = get().historial

                const headers = [
                    "start",
                    "end",
                    "ph",
                    "clLibre",
                    "clTotal",
                    "clComb",
                    "depurada",
                    "renovada",
                    "transparencia",
                ]

                const rows = data.map((r) =>
                    [
                        r.start,
                        r.end,
                        r.ph,
                        r.clLibre,
                        r.clTotal,
                        r.clComb,
                        r.depurada,
                        r.renovada,
                        r.transparencia,
                    ]
                        .map((v) => v ?? "")
                        .join(",")
                )

                const csv = [headers.join(","), ...rows].join("\n")

                const blob = new Blob([csv], { type: "text/csv" })
                const url = URL.createObjectURL(blob)

                const a = document.createElement("a")
                a.href = url
                a.download = "historial_piscina.csv"
                a.click()

                URL.revokeObjectURL(url)
            },

            exportDataTxt() {
                const data = get().historial

                const text = data
                    .map(
                        (r, i) => `
Registro ${i + 1}
Fecha: ${r.start} → ${r.end}
pH: ${r.ph}
Cl libre: ${r.clLibre}
Cl total: ${r.clTotal}
Cl combinado: ${r.clComb}
Depurada: ${r.depurada} m³
Renovada: ${r.renovada} m³
Transparencia: ${r.transparencia ? "Sí" : "No"}
-------------------
`
                    )
                    .join("\n")

                const blob = new Blob([text], { type: "text/plain" })
                const url = URL.createObjectURL(blob)

                const a = document.createElement("a")
                a.href = url
                a.download = "historial_piscina.txt"
                a.click()

                URL.revokeObjectURL(url)
            },
        }),
        {
            name: "piscina-storage",
            skipHydration: true,
            partialize: (s) => ({
                active: s.active,
                historial: s.historial,
                mode: s.mode,
                editingIndex: s.editingIndex,
            }),
        }
    )
)