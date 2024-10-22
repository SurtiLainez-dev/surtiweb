export interface Articulo {
    nombre_articulo:   string;
    id:                number;
    modelo:            string;
    marca:             Marca;
    url:               string;
    descripcion_corta: string;
    cat:               string;
    precio_contado:    number;
    precio_online:     number;
    codigo_sistema:    string;
    fecha_end:         null;
    familia:           Familia;
    colores:           string;
    fotos:             Foto[];
}

export interface Marca {
    id: number,
    nombre: string
}

export interface Familia {
    id: number,
    nombre: string
}

export interface Foto {
    url:   string;
    color: null | string;
}
