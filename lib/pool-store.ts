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

type Mode = "create" | "edit"

interface Store {
    active: PoolRecord
    historial: PoolRecord[]
    mode: Mode
    editingIndex: number | null
    startNew: () => void
    setField: <K extends keyof PoolRecord>(k: K, v: PoolRecord[K]) => void
    toggleCheck: (i: number) => void
    setImage: (k: "img1" | "img2", v: string) => void
    save: () => void
    exportData: () => void
    editRecord: (i: number) => void
    deleteRecord: (i: number) => void
    finishDay: () => void
    reset: () => void
}

function recalcClComb(active: PoolRecord): PoolRecord {
    const libre = parseFloat(active.clLibre)
    const total = parseFloat(active.clTotal)
    const clComb =
        !isNaN(libre) && !isNaN(total) ? Math.max(0, total - libre).toFixed(2) : ""
    return { ...active, clComb }
}

export const usePoolStore = create<Store>()(
    persist(
        (set, get) => ({
            active: { ...EMPTY },
            historial: [],
            mode: "create",
            editingIndex: null,

            startNew() {
                set({
                    active: { ...EMPTY, start: new Date().toISOString() },
                    mode: "create",
                    editingIndex: null,
                })
            },

            setField(k, v) {
                set((s) => ({ active: recalcClComb({ ...s.active, [k]: v }) }))
            },

            toggleCheck(i) {
                set((s) => {
                    const checks = [...s.active.checks]
                    checks[i] = !checks[i]
                    return { active: { ...s.active, checks } }
                })
            },

            setImage(k, v) {
                set((s) => ({ active: { ...s.active, [k]: v } }))
            },

            save() {
                const { active, historial, mode, editingIndex } = get()
                if (mode === "create") {
                    const updated = [...historial, active]
                    set({ historial: updated, active: { ...EMPTY }, mode: "create", editingIndex: null })
                } else if (mode === "edit" && editingIndex !== null) {
                    const updated = [...historial]
                    updated[editingIndex] = active
                    set({ historial: updated, active: { ...EMPTY }, mode: "create", editingIndex: null })
                }
            },

            exportData() {
                const data = get().historial
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
                const a = document.createElement("a")
                a.href = URL.createObjectURL(blob)
                a.download = "historial_piscina.json"
                a.click()
            },

            editRecord(i) {
                const item = get().historial[i]
                if (!item) return
                set({ active: item, mode: "edit", editingIndex: i })
            },

            deleteRecord(i) {
                const updated = [...get().historial]
                updated.splice(i, 1)
                set({ historial: updated })
            },

            finishDay() {
                set((s) => ({ active: { ...s.active, end: new Date().toISOString() } }))
            },

            reset() {
                set({ active: { ...EMPTY }, mode: "create", editingIndex: null })
            },
        }),
        {
            name: "piscina-storage",
            skipHydration: true,
            partialize: (state) => ({
                active: state.active,
                historial: state.historial,
                mode: state.mode,
                editingIndex: state.editingIndex,
            }),
        }
    )
)