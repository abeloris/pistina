"use client"
import { Button } from "@/components/ui/button"
import { usePoolStore } from "@/lib/pool-store"

export function BottomBar() {
    const save = usePoolStore((s) => s.save)
    const reset = usePoolStore((s) => s.reset)
    const mode = usePoolStore((s) => s.mode)

    return (
        <div className="fixed inset-x-0 bottom-0 flex gap-2 border-t bg-background p-3">
            <Button className="flex-1" onClick={save}>
                {mode === "edit" ? "Guardar cambios" : "Guardar registro"}
            </Button>
            <Button className="flex-1" variant="destructive" onClick={reset}>
                {mode === "edit" ? "Cancelar" : "Vaciar"}
            </Button>
        </div>
    )
}