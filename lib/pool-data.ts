export interface TaskInfo {
    title: string
    steps: string[]
}

export const DAILY_TASKS: TaskInfo[] = [
    {
        title: "Contadores",
        steps: [
            "Hacer foto del contador amarillo (agua depurada).",
            "Hacer foto del contador gris (agua renovada).",
        ],
    },
    {
        title: "Lavado del filtro de arenas",
        steps: [
            "Parar la bomba antes de tocar las válvulas.",
            "Configurar válvulas en modo Lavado.",
            "Encender la bomba durante 5 minutos.",
        ],
    },
    {
        title: "Limpiafondos",
        steps: [
            "Parar la bomba antes de tocar las válvulas.",
            "Configurar válvulas en modo Limpiafondos.",
            "Cepillar escaleras y suelo.",
            "Pasar el limpiafondos, evitando que la manguera flote.",
        ],
    },
    {
        title: "Limpieza de cestillos de bombas",
        steps: [
            "Cerrar la llave B.",
            "Limpiar los cestillos.",
            "Abrir la llave B.",
        ],
    },
    {
        title: "Relleno de la piscina",
        steps: [
            "Rellenar agua hasta la mitad del skimmer central.",
            "Analizar pH con Phenol Red.",
            "Analizar cloro libre con DPD1.",
            "Analizar cloro total con DPD3.",
        ],
    },
    {
        title: "Depuración",
        steps: [
            "Parar la bomba antes de tocar las válvulas.",
            "Configurar válvulas en modo Depuración.",
            "Encender la bomba.",
        ],
    },
]

export const WEEKLY_TASKS: TaskInfo[] = [
    {
        title: "Algidesa en vaso",
        steps: [
            "Aplicar 3 L al cerrar la piscina.",
            "Aplicar preferiblemente por la noche.",
            "Adelantar la aplicación si se prevén tormentas.",
        ],
    },
    {
        title: "Algidesa D en playas y duchas",
        steps: [
            "Preparar la mezcla: 8 L agua + 2 L Algidesa D (proporción 4:1).",
            "Aplicar en playas y duchas.",
            "Evitar el contacto con el césped.",
        ],
    },
]

export const VALVE_CONFIG = [
    { mode: "Lavado", open: "Fondo, Skimmer, 2, 3", close: "Limpiafondos, 1, 4, 5" },
    { mode: "Limpiafondos", open: "Limpiafondos, 1, 4", close: "Fondo, Skimmer, 2, 3" },
    { mode: "Depuración", open: "Fondo, Skimmer, 1, 4", close: "Limpiafondos, 2, 3, 5" },
]

export const CHEM_INFO = {
    cloro: { min: 0.5, max: 2, target: 1, unit: "ppm" },
    ph: { min: 7.2, max: 8.0, target: 7.4 },
    acido: "5 L por cada 100 m³ reducen aproximadamente 0,2 unidades de pH. No excederse.",
}