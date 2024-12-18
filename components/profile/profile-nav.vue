<template>
  <nav>
    <div
      class="nav nav-tabs tp-tab-menu flex-column"
      id="profile-tab"
      role="tablist"
    >
      <button
        class="nav-link active"
        id="nav-profile-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-profile"
        type="button"
        role="tab"
        aria-controls="nav-profile"
        aria-selected="false"
      >
        <span><i class="fa-regular fa-user-pen"></i></span>Perfil
      </button>
      <button
        class="nav-link"
        id="nav-information-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-information"
        type="button"
        role="tab"
        aria-controls="nav-information"
        aria-selected="false"
      >
        <span><i class="fa-regular fa-circle-info"></i></span> Datos Personales
      </button>
<!--      <button-->
<!--        class="nav-link"-->
<!--        id="nav-address-tab"-->
<!--        disabled-->
<!--        data-bs-toggle="tab"-->
<!--        data-bs-target="#nav-address"-->
<!--        type="button"-->
<!--        role="tab"-->
<!--        aria-controls="nav-address"-->
<!--        aria-selected="false"-->
<!--      >-->
<!--        <span><i class="fa-light fa-location-dot"></i></span> Direcciones-->
<!--      </button>-->
      <button
          class="nav-link"
          id="nav-telefonos-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-telefonos"
          type="button"
          role="tab"
          aria-controls="nav-order"
          aria-selected="false"
      >
        <span><i class="fa-light fa-phone"></i></span> Telefonos y Referencias
      </button>
<!--      <button-->
<!--          class="nav-link"-->
<!--          id="nav-order-tab"-->
<!--          data-bs-toggle="tab"-->
<!--          data-bs-target="#nav-order"-->
<!--          type="button"-->
<!--          disabled-->
<!--          role="tab"-->
<!--          aria-controls="nav-order"-->
<!--          aria-selected="false"-->
<!--      >-->
<!--        <span><i class="fa-light fa-clipboard-list-check"></i></span> Mis Solicitudes de Credito-->
<!--      </button>-->
      <button
        class="nav-link"
        id="nav-cuentas-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-cuentas"
        type="button"
        role="tab"
        aria-controls="nav-cuentas"
        aria-selected="false"
      >
        <span><i class="fa-light fa-clipboard-list-check"></i></span> Mis Cuentas
      </button>
      <button
          class="nav-link"
          id="nav-fichasgarantias-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-fichasgarantias"
          type="button"
          role="tab"
          aria-controls="nav-fichasgarantias"
          aria-selected="false"
      >
        <span><i class="fa-light fa-clipboard-list-check"></i></span> Garantias
      </button>
      <button
          class="nav-link"
          id="nav-permisos-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-permisos"
          type="button"
          role="tab"
          aria-controls="nav-permisos"
          aria-selected="false"
      >
        <span><i class="fa-light fa-clipboard-list-check"></i></span> Permiso para Circular sin Placa
      </button>
      <button
        class="nav-link"
        id="nav-finiquitos-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-finiquitos"
        type="button"
        role="tab"
        aria-controls="nav-finiquitos"
        aria-selected="false"
      >
        <span><i class="fa-regular fa-bell"></i></span> Constancias de Estado de Cuentas
      </button>
<!--      <button-->
<!--        class="nav-link"-->
<!--        id="nav-password-tab"-->
<!--        data-bs-toggle="tab"-->
<!--        data-bs-target="#nav-password"-->
<!--        type="button"-->
<!--        role="tab"-->
<!--        aria-controls="nav-password"-->
<!--        aria-selected="false"-->
<!--      >-->
<!--        <span><i class="fa-regular fa-lock"></i></span> Change Password-->
<!--      </button>-->
<!--      <button-->
<!--          class="nav-link"-->
<!--          id="nav-order-tab"-->
<!--          data-bs-toggle="tab"-->
<!--          data-bs-target="#nav-order"-->
<!--          type="button"-->
<!--          role="tab"-->
<!--          disabled-->
<!--          aria-controls="nav-order"-->
<!--          aria-selected="false"-->
<!--      >-->
<!--        <span><i class="fa-light fa-check"></i></span> Realizar un Pago con Tarjeta-->
<!--      </button>-->
<!--      <button-->
<!--          class="nav-link"-->
<!--          id="nav-order-tab"-->
<!--          data-bs-toggle="tab"-->
<!--          data-bs-target="#nav-order"-->
<!--          type="button"-->
<!--          role="tab"-->
<!--          aria-controls="nav-order"-->
<!--          disabled-->
<!--          aria-selected="false"-->
<!--      >-->
<!--        <span><i class="fa-light fa-clipboard-list-check"></i></span> Recibos Vinculados-->
<!--      </button>-->
    </div>
  </nav>
</template>

<script setup lang="ts"></script>
