<template>
  <v-app>
    <NavBar layout="login" />

    <v-main>
      <slot />
    </v-main>

    <Footer />
  </v-app>
</template>
