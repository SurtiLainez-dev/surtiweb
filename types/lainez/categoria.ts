export type CategoriaArt = {
    id: number,
    nombre: string,
    codigo: string,
    img:                     null;
    created_at:              Date;
    updated_at:              Date;
    sub_familia_articulo:    SubFamiliaArticulo;
}

export interface SubFamiliaArticulo {
    id:                  number;
    nombre:              string;
    codigo:              number;
    familia_articulo_id: number;
    created_at:          Date;
    updated_at:          Date;
    is_online:           number;
    img:                 string;
}
