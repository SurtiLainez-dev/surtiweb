<template>
  <div>
    <breadcrumb-4 title="Politicas de la Promoción" subtitle="Politicas de la Promoción - Referir Clientes Nuevos"/>
    <div class="tp-order-area pb-160">
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="tp-order-details" style="background-color: #4F3D97; height: 100%">
                <div class="tp-order-details-top mb-70">
                  <div class="tp-order-details-content">
                    <h3 class="tp-order-details-title">¿Cómo referir clientes nuevos a Surtidora Laínez?</h3>
                    <p>Para referir clientes a Surtidora Laínez y ganar cupones tienes seguir unas reglas y cumplir con
                    las políticas de la promoción, las cuales se detallan a continuación.</p>
                    <div class="tp-order-info-wrapper">
                      <div class="tp-order-info-list">
                        <ul>
                          <li class="tp-order-info-list-desc" v-for="(item, i) in detalles">
                            <p><span class="text-white">{{i+1}}. </span>{{item}}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const detalles:string[] = [
    "Puedes referirnos amistades y familiares",
    "El amigo o familiar que nos refieras no tiene que tener historial de compra en Surtidora Lainez",
    "El crédito se te hace entrega en forma de un cupón virtual",
    "El total del cupón es de 300.00 lps",
    "El cupón se te carga a tu perfil en linea. Es necesario tener cuenta en el portal web de Surtidora Laínez",
    "El cupón se hace visible en tu perfil hasta que el crédito del cliente referido sea aprobado. Si no se aprueba el crédito, no se te aplicará el cupón",
    "Cuando se apruebe el crédito del cliente que nos referistes, el cupón tarda de 12 a 18 horas para ser visible en tu perfil",
    "El límite de cupones es de 10 por mes",
    "Tienes que tener un crédito pendiente en Surtidora Lainez para aplicar a la promoción",
    "En caso de que tengas una cuenta pendiente, cancelas tu cuenta y no usas tus cupones; tienes hasta 15 días para usarlos",
    "Los cupones solo los puedes a pagar solamente en tu perfil en línea. En alguno casos con no contar con los recursos necesarios para tener una cuenta en linea puedes llamar al servicio al cliente para ayudarle a aplicar el cupón",
    "Puedes usar el cupón en saldo capital y mora de tu cuenta",
    "Todos los cupones tienen un identificador único el cual solo podrán ser usados una vez",
    "Puedes cancelar cuentas con cupones, pero si te queda un crédito del saldo del cupón no se podrá hacer uso ya que los cupones solo pueden cangearse una sola vez",
    "El saldo de los cupones no pueden ser usados para prima de un crédito",
]
</script>

<style scoped>

</style>
