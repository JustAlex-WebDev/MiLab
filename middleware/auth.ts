import { defineNuxtRouteMiddleware, navigateTo } from '#app';

// Define the middleware
export default defineNuxtRouteMiddleware((to) => {
  // Retrieve the login status from localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Redirect to the login page if not logged in and trying to access a protected route
  if (!isLoggedIn && to.path !== '/portal-mockup/login') {
    return navigateTo('/portal-mockup/login');
  }
});
