export interface ClienteInterfaz {
    nombres: string,
    apellidos: string,
    identidad: string,
    rtn: string | null,
    fecha_nacimiento: string | null,
    sexo: number,
    salario: number | null,
    empresa_trabaja: string | null,
    is_trabaja: number | null,
    is_casa: number | null,
    email: string | null

}

export interface TelefonoInterfaz{
    area: string,
    detalle: string,
    key: number,
    num: string
}
export interface CuentaInterfaz{
    cod: string,
    saldo_actual: string,
    sucursal: string,
    estado: number,
    num_cuotas: number,
    tipo_venta: number
}

export interface FichaGarantiInterfaz{
    ficha: string,
    estado: string,
    cod: string,
    comentario_inicial_usuario: string | null,
    comentario_cliente: string
}
export interface resMisDatos {
    cliente: ClienteInterfaz,
    cantCuentas: number,
    cantRecibos: number,
    cantSolicitudes: number,
    telefonos: TelefonoInterfaz[],
    cuentas: CuentaInterfaz[],
    garantias: FichaGarantiInterfaz[],
    finiquitos: []
}
