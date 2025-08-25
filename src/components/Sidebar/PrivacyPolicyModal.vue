<template>
  <modal id="privacyPolicyModal" className="w-11/12">
    <template #title>
      <h3 class="text-lg font-bold">Privacy Policy</h3>
    </template>

    <template #content>
			
      <!-- Content -->
      <div class="mx-auto px-2 py-4 text-left">
        <div class="rounded-lg shadow-sm">
          <!-- Introduction -->
          <div class="border-b border-gray-200 p-6">
            <h2 class="mb-4 text-xl font-semibold">
              Introducción
            </h2>
            <p class="leading-relaxed">
              En MyNotes valoramos tu privacidad y nos comprometemos a proteger
              tu información personal. Esta política explica qué información
              recopilamos, cómo la usamos y cuáles son tus derechos.
            </p>
          </div>

          <!-- Information We Collect -->
          <div class="border-b border-gray-200 p-6">
            <h2 class="mb-6 text-xl font-semibold">
              Información que Recopilamos
            </h2>

            <div class="space-y-6">
              <div>
                <h3 class="mb-3 text-lg font-medium">
                  Información de la Cuenta
                </h3>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <span
                      class="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"
                    ></span>
                    Dirección de correo electrónico
                  </li>
                  <li class="flex items-start">
                    <span
                      class="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"
                    ></span>
                    Nombre de usuario (opcional)
                  </li>
                  <li class="flex items-start">
                    <span
                      class="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"
                    ></span>
                    Fecha de creación de la cuenta
                  </li>
                  <li class="flex items-start">
                    <span
                      class="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"
                    ></span>
                    Configuraciones de preferencias
                  </li>
                </ul>
              </div>

              <div>
                <h3 class="mb-3 text-lg font-medium">
                  Contenido de las Notas
                </h3>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <span
                      class="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"
                    ></span>
                    Texto de tus notas
                  </li>
                  <li class="flex items-start">
                    <span
                      class="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"
                    ></span>
                    Imágenes y archivos adjuntos
                  </li>
                  <li class="flex items-start">
                    <span
                      class="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"
                    ></span>
                    Etiquetas y categorías
                  </li>
                  <li class="flex items-start">
                    <span
                      class="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"
                    ></span>
                    Fechas de creación y modificación
                  </li>
                </ul>
              </div>

              <div>
                <h3 class="mb-3 text-lg font-medium">
                  Información Técnica
                </h3>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <span
                      class="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500"
                    ></span>
                    Tipo de dispositivo y sistema operativo
                  </li>
                  <li class="flex items-start">
                    <span
                      class="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500"
                    ></span>
                    Versión de la aplicación
                  </li>
                  <li class="flex items-start">
                    <span
                      class="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500"
                    ></span>
                    Dirección IP (solo para autenticación)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- How We Use Information -->
          <div class="border-b border-gray-200 p-6 text-left">
            <h2 class="mb-6 text-xl font-semibold">
              Cómo Usamos tu Información
            </h2>

            <div class="grid gap-6 md:grid-cols-1">
              <div class="rounded-lg p-2">
                <h3 class="mb-3 text-lg font-medium">
                  Servicios Principales
                </h3>
                <ul class="space-y-1 text-sm ">
                  <li>• Almacenar y sincronizar notas</li>
                  <li>• Proporcionar búsqueda y organización</li>
                  <li>• Realizar copias de seguridad</li>
                  <li>• Autenticar acceso a la aplicación</li>
                </ul>
              </div>

              <div class="rounded-lg p-2">
                <h3 class="mb-3 text-lg font-medium">
                  Mejora del Servicio
                </h3>
                <ul class="space-y-1 text-sm">
                  <li>• Analizar uso para mejoras</li>
                  <li>• Identificar y corregir errores</li>
                  <li>• Desarrollar nuevas características</li>
                  <li>• Optimizar rendimiento</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Storage and Security -->
          <div class="border-b border-gray-200 p-6">
            <h2 class="mb-6 text-xl font-semibold">
              Almacenamiento y Seguridad
            </h2>

            <div class="space-y-6">
              <div class="rounded-lg p-4">
                <h3 class="mb-3 text-lg font-medium">
                  Medidas de Seguridad
                </h3>
                <div class="grid gap-4 md:grid-cols-2">
                  <div class="flex items-center space-x-3">
                    <div
                      class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100"
                    >
                      <svg
                        class="h-4 w-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="font-medium">
                        Encriptación TLS 1.3
                      </p>
                      <p class="text-sm text-gray-600">En tránsito</p>
                    </div>
                  </div>

                  <div class="flex items-center space-x-3">
                    <div
                      class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100"
                    >
                      <svg
                        class="h-4 w-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p class="font-medium">AES-256</p>
                      <p class="text-sm text-gray-600">En reposo</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="mb-3 text-lg font-medium">
                  Ubicación de Datos
                </h3>
                <p>
                  Servidores ubicados en Estados Unidos (AWS) con centros de
                  datos certificados SOC 2 y respaldo en múltiples ubicaciones
                  geográficas.
                </p>
              </div>
            </div>
          </div>

          <!-- Your Rights -->
          <div class="border-b border-gray-200 p-6">
            <h2 class="mb-6 text-xl font-semibold">
              Tus Derechos
            </h2>

            <div class="grid gap-6 md:grid-cols-1">
              <div class="rounded-lg border border-gray-200 p-4 text-center">
                <div
                  class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"
                >
                  <svg
                    class="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 class="mb-2 font-medium">Acceder</h3>
                <p class="text-sm text-gray-600">
                  Ver todos tus datos almacenados
                </p>
              </div>

              <div class="rounded-lg border border-gray-200 p-4 text-center">
                <div
                  class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
                >
                  <svg
                    class="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 class="mb-2 font-medium">Exportar</h3>
                <p class="text-sm text-gray-600">
                  Descargar tus notas en varios formatos
                </p>
              </div>

              <div class="rounded-lg border border-gray-200 p-4 text-center">
                <div
                  class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100"
                >
                  <svg
                    class="h-6 w-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <h3 class="mb-2 font-medium">Eliminar</h3>
                <p class="text-sm text-gray-600">
                  Borrar tu cuenta y datos permanentemente
                </p>
              </div>
            </div>
          </div>

          <!-- Legal Compliance -->
          <div class="border-b border-gray-200 p-6">
            <h2 class="mb-6 text-xl font-semibold">
              Cumplimiento Legal
            </h2>

            <div class="grid gap-6 md:grid-cols-1 text-left">
              <div class="rounded-lg border border-blue-200 p-4">
                <h3 class="mb-2 font-medium text-blue-900">
                  RGPD (Usuarios de la UE)
                </h3>
                <ul class="space-y-1 text-sm text-blue-800">
                  <li>• Base legal: Ejecución de contrato</li>
                  <li>• Derecho al olvido respetado</li>
                  <li>• Transferencias con garantías adecuadas</li>
                </ul>
              </div>

              <div class="rounded-lg border border-purple-200 p-4">
                <h3 class="mb-2 font-medium text-purple-900">
                  CCPA (California)
                </h3>
                <ul class="space-y-1 text-sm text-purple-800">
                  <li>• Derecho a conocer información recopilada</li>
                  <li>• Derecho a eliminar información</li>
                  <li>• No discriminación por ejercer derechos</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="p-6">
            <h2 class="mb-2 text-xl font-semibold">Contacto</h2>

            <div class="rounded-lg p-6">
              <div class="grid gap-6 md:grid-cols-1">
                <div>
                  <h3 class="mb-3 font-medium">
                    Responsable de Privacidad
                  </h3>
                  <div class="space-y-2 text-sm">
                    <p class="flex items-center">
                      <svg
                        class="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                        />
                        <path
                          d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                        />
                      </svg>
                      olanda188@mynotes.app
                    </p>
                    <p class="flex items-start">
                      <svg
                        class="mr-2 mt-0.5 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Paucarpata 03001, Arequipa, Perú
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="rounded-b-lg px-6 py-4">
            <div
              class="flex flex-col items-center justify-between text-sm text-gray-600 md:flex-row"
            >
              <div class="mt-2 md:mt-0">
                Fecha efectiva: 24 de agosto de 2025
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </modal>
</template>

<script setup>
import Modal from "../commom/Modal.vue";
import pkg from "../../../package.json";

const version = pkg.version;
</script>

<style lang="scss" scoped></style>
