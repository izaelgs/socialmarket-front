<script setup lang="ts"></script>

<template>
  <div class="bg-white dark:bg-slate-900">
    <HomeHeader />

    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div
        class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        ></div>
      </div>

      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center" v-motion-fade>
          <div
            class="
              relative rounded-full px-3 py-1 text-sm leading-6
              text-gray-600 dark:text-gray-400
              ring-1 ring-gray-900/10 dark:ring-gray-400/10 hover:ring-gray-900/20 dark:hover:ring-gray-400/20
            "
          >
            Announcing our next round of funding.
            <a href="#" class="font-semibold text-indigo-600">
              <span class="absolute inset-0" aria-hidden="true"></span>Read more
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div class="text-center">
          <h1
            class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-6xl"
            v-motion
            :initial="{
              opacity: 0,
              y: 100
            }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 150,
                damping: 25,
                delay: 10
              }
            }"
          >
            Data to enrich your online business
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400" v-motion-fade>
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
            commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6" v-motion-fade>
            <router-link
              to="register"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >Get started</router-link
            >

            <a href="#" class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
              >Learn more <span aria-hidden="true">→</span></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    aria-hidden="true"
  >
    <div
      class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      style="
        clip-path: polygon(
          74.1% 44.1%,
          100% 61.6%,
          97.5% 26.9%,
          85.5% 0.1%,
          80.7% 2%,
          72.5% 32.5%,
          60.2% 62.4%,
          52.4% 68.1%,
          47.5% 58.3%,
          45.2% 34.5%,
          27.5% 76.7%,
          0.1% 64.9%,
          17.9% 100%,
          27.6% 76.8%,
          76.1% 97.7%,
          74.1% 44.1%
        );
      "
    ></div>
  </div>

  <footer class="text-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <!-- Column 1: Contact Information -->
        <div class="grid grid-cols-2 gap-8 xl:col-span-1">
          <div>
            <h2 class="text-lg font-medium tracking-wide">Contact</h2>
            <ul class="mt-4 space-y-4">
              <!-- <li>
                <p class="text-base">Address: Main St, 123</p>
              </li> -->
              <li>
                <p class="text-base">Phone: +55 (27) 9 8812-6640</p>
              </li>
              <li>
                <p class="text-base">Email: izael.dev@gmail.com</p>
              </li>
            </ul>
          </div>
        </div>

        <!-- Column 2: Social Media Links -->
        <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
          <div>
            <h2 class="text-lg font-medium tracking-wide">Social Media</h2>
            <ul class="mt-4 space-y-4">
              <li>
                <a href="https://twitter.com/Izael65" class="text-base hover:text-gray-300"
                  >Twitter</a
                >
              </li>
              <li>
                <a href="https://www.facebook.com/izael.gs" class="text-base hover:text-gray-300"
                  >Facebook</a
                >
              </li>
              <li>
                <a href="https://www.instagram.com/izael_hs/" class="text-base hover:text-gray-300"
                  >Instagram</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import HomeHeader from '@/layouts/home/HomeHeader.vue'
</script>
