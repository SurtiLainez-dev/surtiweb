<template>
  <div>
    <breadcrumb-4 title="Mis Solicitudes de Crédito" subtitle="Solicitudes de Crédito Enviadas"/>

    <section class="tp-order-area pb-160">
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Consultando mis Solicitudes</h3>
                <div class="profile__info-content">
                  <form>
                    <div class="row">
                      <div class="col-xxl-6 col-md-6">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input type="text" placeholder="Identidad">
                            <span><svg-user-3/></span>
                          </div>
                        </div>
                      </div>

                      <div class="col-xxl-6 col-md-6">
                        <div class="row">
                          <div class="col-xxl-4 col-md-4">
                            <div class="profile__input-box">
                              <div class="profile__input">
                                <input type="text" placeholder="Día">
                                <span></span>
                              </div>
                            </div>

                          </div>
                          <div class="col-xxl-4 col-md-4">
                            <div class="profile__input-box">
                              <div class="profile__input">
                                <ui-nice-select
                                    :options="[
                                  { value: 1, text: 'Enero' },
                                  { value: 2, text: 'Febrero' },
                                  { value: 3, text: 'Marzo'},
                                  { value: 4, text: 'Abril'},
                                  { value: 5, text: 'Mayo'},
                                  { value: 6, text: 'Junio'},
                                  { value: 7, text: 'Julio'},
                                  { value: 8, text: 'Agosto'},
                                  { value: 9, text: 'Septiembre'},
                                  { value: 10, text: 'Octubre'},
                                  { value: 11, text: 'Noviembre'},
                                  { value: 12, text: 'Diciembre'},
                                ]"
                                    name="mes"
                                    :default-current="0"
                                    @onChange="changeHandlerMes"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-xxl-4 col-md-4">
                            <div class="profile__input-box">
                              <div class="profile__input">
                                <input type="text" placeholder="Año">
                                <span></span>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>

                    </div>
                    <p>Si quieres revisar todas las solicitudes con tu número de identidad, tienes que iniciar sesión con
                      tu cuenta a nuestra plataforma. Luego selecciona la opción Mis Solicitudes de Créditos en el menú de
                      la izquierda. *Solo puedes consultar tu solicitúd un maximo de 2 veces. Para mas consultas tienes
                      que iniciar sesión con cuenta a nuestra plataforma.</p>
                    <div class="row">
                      <div class="col-xxl-12">
                        <div class="profile__btn">
                          <button type="submit" class="tp-btn">Consultar</button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <br>

                  <div class="profile__ticket table-responsive">
                    <table class="table">
                      <thead>
                      <tr>
                        <th scope="col">Identidad</th>
                        <th scope="col">Nombre Completo</th>
                        <th scope="col">Artículo</th>
                        <th scope="col">Total</th>
                        <th scope="col">Estado</th>
                      </tr>
                      </thead>
                      <tbody>

                      </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const changeHandlerMes = (e: { value: number; text: string }, index: number) => {};
</script>

<style scoped>

</style>
