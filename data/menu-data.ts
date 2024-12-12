import { type IMenuItem, type IMobileType } from "@/types/menu-d-type";

export const menu_data:IMenuItem[] = [
  {
    id:2,
    link:'/surti/requisitos_sdc',
    title:'Surti Crédito',
    mega_menu:true,
    product_menus:[
      {
        id:1,
        title:'Créditos en Surtidora Laínez',
        link:'/surti/credito',
        dropdown_menus:[
          {title:'Requísitos para un Crédito',link:'/surti/requisitos_sdc'},
          {title:'Nueva Solicitúd de Crédito',link:'/surti/nueva_solicitud_credito'},
          {title:'Solicitudes Enviadas',link:'/surti/mis_solicitudes'},
        ]
      }
    ]
  },
  {
    id:3,
    link:'/blog',
    title:'Garantias y Gestiones',
    mega_menu:true,
    product_menus:[
      {
        id:1,
        title:'Garantia',
        link:'/surti/garantia/nueva',
        dropdown_menus:[
          {title:'Iniciar Proceso',link:'/surti/garantia/nueva'},
          {title:'Estado de Ficha',link:'/surti/garantia/consulta'},
        ]
      },
      {
        id:2,
        title:'Otras Gestiones',
        link:'/surti/credito',
        dropdown_menus:[
          {title:'Estado de Placa',link:'/surti/otras_gestiones/estado_placa'},
          // {title:'Estado de Traspaso',link:'/surti/garantia/consulta'},
          {title:'Solicitar Permiso de Circulación sin Placa',link:'/surti/otras_gestiones/permiso_circular_sin_placa'},
          {title:'Solicitar Constancia de Estado de Cuenta',link:'/surti/otras_gestiones/solicitar_finiquito'},
          {title:'Validar Documento Qr',link:'/surti/validar_documento_qr'},
        ]
      }
    ]
  },
]

// mobile menu data
export const mobile_menu:IMobileType[] = [
  {
    id: 1,
    sub_menu: true,
    title: 'Portal web',
    link: '',
    sub_menus: [
      { title: 'Login', link: '/login' },
      { title: 'Crear una Cuenta', link: '/register' },
    ],
  },
  {
    id: 2,
    sub_menu: true,
    title: 'Surti Créditos',
    link: '/surti/requisitos_sdc',
    sub_menus: [
      {title:'Requísitos para un Crédito',link:'/surti/requisitos_sdc'},
      {title:'Nueva Solicitúd de Crédito',link:'/surti/nueva_solicitud_credito'},
      {title:'Solicitudes Enviadas',link:'/surti/mis_solicitudes'},
    ],
  },
  {
    id: 3,
    sub_menu: true,
    title: 'Garantía',
    link: '/surti/garantia/nueva',
    sub_menus: [
      {title:'Iniciar Proceso',link:'/surti/garantia/nueva'},
      {title:'Estado de Ficha',link:'/surti/garantia/consulta'},
    ],
  },
  {
    id: 4,
    sub_menu: true,
    title: 'Otras Gestiones',
    link: '/',
    sub_menus: [
      {title:'Estado de Placa',link:'/surti/otras_gestiones/estado_placa'},
      // {title:'Estado de Traspaso',link:'/surti/garantia/consulta'},
      {title:'Solicitar Permiso de Circulación sin Placa',link:'/surti/otras_gestiones/permiso_circular_sin_placa'},
      {title:'Solicitar Constancia de Estado de Cuenta',link:'/surti/otras_gestiones/solicitar_finiquito'},
      {title:'Validar Documento Qr',link:'/surti/validar_documento_qr'},
    ],
  },
]
