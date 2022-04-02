<template>
  <nav
    v-if="isUserAuthenticated"
    class="border-b-2 border-gray-200 px-2 sm:px-4 py-2.5"
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <a href="#" class="flex">
        <img src="@/assets/img/logo.png" alt="Logo" class="mr-3 h-10" />
        <span class="self-center text-lg font-light whitespace-nowrap">{{
          getAppTitle
        }}</span>
      </a>
      <div class="flex md:order-2">
        <!-- Search bar -->
        <div class="hidden relative mr-3 md:mr-0 md:block">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="search"
            class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-azure-500 focus:border-azure-500"
            placeholder="Search..."
          />
        </div>
        <!-- Three bars -->
        <button
          v-on:click="isOpen = !isOpen"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            class="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <!--Links-->
      <div
        :class="isOpen ? 'block' : 'hidden'"
        class="justify-between items-center w-full md:flex md:w-auto md:order-1"
        id="mobile-menu-3"
      >
        <ul
          class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
        >
          <li>
            <router-link
              to="/"
              class="block py-2 pr-4 pl-3 text-white bg-azure-700 rounded md:bg-transparent md:text-azure-700 md:p-0"
              aria-current="page"
            >
              Home
            </router-link>
          </li>
          <li>
            <a
              v-if="isUserAuthenticated"
              v-on:click="logout"
              class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-azure-700 md:p-0"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<router-link to="/auth" v-else> | Login</router-link>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'navbar',
  props: {
    title: String,
  },
  data() {
    return {
      isOpen: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters(['getAppTitle', 'isUserAuthenticated']),
  },
  methods: {
    ...mapActions(['signOutUser']),
    logout: function () {
      this.signOutUser()
        .then(() => {
          console.log('Signout successful.');
          this.$router.push({ name: 'Auth' });
        })
        .catch((error) => {
          console.log(`Signout failed. ${JSON.stringify(error, null, 2)}`);
          this.error = error;
        });
    },
  },
};
</script>

<style scoped></style>
