export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn && to.path !== "/portal-mockup/login") {
    return navigateTo("/portal-mockup/login");
  }
});
