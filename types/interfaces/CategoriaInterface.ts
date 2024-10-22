export interface dataInit {
    menu: dataCategories[],
    user: null
}
export type dataCategories = {
    nombre: String,
    id: Number,
    sub_familia_articulos: sub_familia_articulos[] | []
}
export type sub_familia_articulos = {
    nombre: String,
    id: Number
}

export interface articuloInterface{
    nombre_articulo: String,
    modelo: String,
    marca: String,
    descripcion_corta: String,
    cat: String,
    precio_contado: Number,
    precio_online: Number,
    codigo_sistema: String,
    familia: String,
    Colores: [] | null | String
}

export interface dataBanner{
    pre_titulo: String,
    pre_precio: Number | null,
    detalle: String,
    sub_title_1: String | null
    sub_title_2: String | null
    sub_precio: Number | null,
    btn: Boolean,
    btn_titulo: String | null,
    img_bacl: null,
    img: String,
    ruta: String | null,
    color: String,
    estado: Boolean
}

export interface dataTop20{
    nombre_articulo: String,
    id: Number,
    modelo: String,
    marca: String,
    url: String,
    cat: String,
    precio_online: Number,
    precio_contado: Number,
    fecha_end: Date,
    codigo_sistema: String,
    fotos: [],
    stock: Number
}
export interface fotosArticulosInterface{
    color: null | String
    isPrincipal: Number,
    url: String,
}

export interface detalleArticulosInterface{
    titulo: String,
    detale: String
}
