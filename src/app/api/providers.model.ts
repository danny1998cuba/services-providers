export interface Provider {
    servicio: string;   // categoria
    detalle_servicio: string;    // subcategoria
    nombre: string;
    local: number;
    telefono: string;
    email?: string;
    website?: string;
    detalles?: string;

    foto?: string;
}