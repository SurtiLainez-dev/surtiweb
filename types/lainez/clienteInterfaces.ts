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

export interface resMisDatos {
    cliente: ClienteInterfaz,
    cantCuentas: number,
    cantRecibos: number,
    cantSolicitudes: number
}
