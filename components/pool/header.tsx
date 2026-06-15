export function Header() {
    const today = new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    return (
        <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Mantenimiento Pistina del Lloc</h1>
            <p className="text-sm capitalize text-muted-foreground">{today}</p>
        </div>
    )
}