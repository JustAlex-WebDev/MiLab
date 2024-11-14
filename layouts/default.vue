<template>
  <v-app>
    <NavBar layout="default" />
    <v-main>
      <slot />
    </v-main>
    <Footer />
  </v-app>
</template>

<style scoped lang="scss">
.v-main {
  min-height: 80vh;
}
</style>
