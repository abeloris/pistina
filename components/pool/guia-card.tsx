import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VALVE_CONFIG, CHEM_INFO } from "@/lib/pool-data"

export function GuiaCard() {
    return (
        <div className="space-y-4">
            <Card className="border-amber-300 bg-amber-50">
                <CardHeader>
                    <CardTitle className="text-amber-800">Importante</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-amber-800">
                    <p>Antes de mover cualquier llave, parar la bomba.</p>
                    <p>Antes de encender la bomba, comprobar que las llaves están en la posición correcta.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Configuración de válvulas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="py-1 pr-2">Modo</th>
                                    <th className="py-1 pr-2">Abrir</th>
                                    <th className="py-1">Cerrar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {VALVE_CONFIG.map((v) => (
                                    <tr key={v.mode} className="border-b last:border-0">
                                        <td className="py-2 pr-2 font-medium">{v.mode}</td>
                                        <td className="py-2 pr-2">{v.open}</td>
                                        <td className="py-2">{v.close}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Productos químicos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p>
                        <span className="font-medium">Cloro: </span>
                        rango {CHEM_INFO.cloro.min}–{CHEM_INFO.cloro.max} ppm, objetivo ≈ {CHEM_INFO.cloro.target} ppm.
                    </p>
                    <p>
                        <span className="font-medium">pH: </span>
                        rango {CHEM_INFO.ph.min}–{CHEM_INFO.ph.max}, objetivo {CHEM_INFO.ph.target}.
                    </p>
                    <p>
                        <span className="font-medium">Ácido clorhídrico: </span>
                        {CHEM_INFO.acido}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Otros productos</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                    <p>
                        <span className="font-medium">Delsafloc: </span>
                        no utilizar sin autorización. Si el cloro y el pH son correctos pero el agua sigue turbia, contactar con Miguel antes de añadir producto.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}