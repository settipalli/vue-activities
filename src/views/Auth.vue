<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-300 via-gray-50 to-gray-300"
  >
    <div
      class="relative w-5/6 lg:w-1/2 rounded-lg bg-white p-10 overflow-hidden shadow-lg hover:shadow-lg"
    >
      <div class="flex space-x-5 mb-5 items center justify-between">
        <h1 class="text-5xl font-thin">{{ getAppTitle }}</h1>
        <img src="@/assets/img/logo.png" alt="Logo" class="h-16" />
      </div>
      <form @submit.prevent="onSubmit" class="relative flex flex-col space-y-5">
        <div v-if="error" class="text-red-700">
          Username and password do not match. Try again. (Attempt:
          {{ attemptCount }})
        </div>
        <input
          type="email"
          id="email"
          v-model.trim="email"
          autofocus
          required
          placeholder="Email"
          :class="[
            'appearance-none',
            'block',
            'py-2.5',
            'px-0',
            'w-full',
            'text-2xl',
            'font-extralight',
            'text-gray-900',
            'bg-transparent',
            'border-0',
            'border-b-2',
            error ? 'border-red-300' : 'border-gray-300',
            'appearance-none',
            'dark:text-white',
            'dark:border-gray-600',
            'dark:focus:border-blue-500',
            'focus:outline-none',
            'focus:ring-0',
            'focus:border-blue-600',
            'peer',
          ]"
        />
        <input
          type="password"
          id="password"
          v-model.trim="password"
          required
          placeholder="Password"
          @keypress.enter="onSubmit"
          :class="[
            'appearance-none',
            'block',
            'py-2.5',
            'px-0',
            'w-full',
            'text-2xl',
            'font-extralight',
            'text-gray-900',
            'bg-transparent',
            'border-0',
            'border-b-2',
            error ? 'border-red-300' : 'border-gray-300',
            'appearance-none',
            'dark:text-white',
            'dark:border-gray-600',
            'dark:focus:border-blue-500',
            'focus:outline-none',
            'focus:ring-0',
            'focus:border-blue-600',
            'peer',
          ]"
        />
        <button
          type="submit"
          class="flex justify-center items-center space-x-3 text-xl font-light uppercase tracking-wide rounded shadow-md bg-azure-500 text-gray-100 p-5 hover:bg-azure-700 hover:text-gray-50 hover:shadow-lg focus:bg-azure-700 focus:ring-0 active:shadow-lg active:bg-azure-800 transition duration-150 ease-in-out"
        >
          <span>Login</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-9"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from '@/base';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Auth',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      user: '',
      attemptCount: 0,
    };
  },
  computed: {
    ...mapGetters({
      getAppTitle: 'getAppTitle',
    }),
  },
  created() {
    const requiresAuth = auth.currentUser;
    if (requiresAuth) {
      // user is already logged in
      if (window.history.length > 2) {
        // if /auth was not the first page
        this.$router.back();
      } else {
        this.$router.replace({ name: 'Home' });
      }
    }
  },
  methods: {
    ...mapActions(['signInUser']),
    onSubmit() {
      this.attemptCount += 1;
      this.signInUser({ email: this.email, password: this.password })
        .then((user) => {
          console.log('Authentication successful.');
          this.user = user;
          this.$router.replace({ name: 'Home' });
        })
        .catch((error) => {
          console.log(
            `Authentication failed. ${JSON.stringify(error, null, 2)}`
          );
          this.error = error;
        });
    },
  },
};
</script>
