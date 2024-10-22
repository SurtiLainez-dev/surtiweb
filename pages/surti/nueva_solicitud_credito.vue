<template>
  <div>
    <breadcrumb-4 title="Nueva Solicitúd de Crédito" subtitle="Nueva Solicitúd"/>


    <section class="tp-order-area pb-160">
      <div class="container">
        <div class="tp-order-inner">
          <div class="row gx-0">
            <div class="col-lg-12">
              <div class="profile__info" style="padding: 25px">
                <h3 class="profile__info-title">Datos de la Solicitúd</h3>
                <div class="profile__info-content">
                  <!-- form start -->

                  <form>
                    <div class="row">
                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input type="text" placeholder="Nombres">
                            <span><svg-user-3/></span>
                          </div>
                        </div>
                      </div>

                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input type="text" placeholder="Apellidos">
                            <span><svg-user-3/></span>
                          </div>
                        </div>
                      </div>

                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input type="text" placeholder="Identidad">
                            <span><svg-user-3/></span>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div class="row">
                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <ui-nice-select
                                :options="[
                                  { value: 0, text: 'Masculino' },
                                  { value: 1, text: 'Femenino' },
                                  { value: 3, text: 'Prefiero no decirlo'}
                                ]"
                                name="Masculino"
                                :default-current="0"
                                @onChange="changeHandler"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input type="text" placeholder="Lugar de Trabajo">
                            <span><svg-address/></span>
                          </div>
                        </div>
                      </div>

                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input type="text" placeholder="Ingreso Mensual">
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">


                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input type="text" placeholder="Número de Teléfono">
                            <span><svg-phone/></span>
                          </div>
                        </div>
                      </div>

                      <div class="col-xxl-4 col-md-4">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input type="text" placeholder="Correo Eléctronico">
                            <span><svg-email/></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-xxl-12">
                        <div class="profile__input-box">
                          <div class="profile__input">
                            <input type="text" placeholder="Dirección Completa de Vivienda">
                            <span>
                    <svg-address/>
                  </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-xxl-12">
                        <div class="profile__btn">
                          <button type="submit" class="tp-btn">Enviar Solicitúd</button>
                        </div>
                      </div>
                    </div>

                  </form>


                  <!-- form end -->
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
const changeHandler = (e: { value: number; text: string }, index: number) => {
  console.log(e);
};
</script>

<style scoped>

</style>
