<template>
  <div class="flex flex-col min-h-screen">
    <navbar v-if="isUserAuthenticated" />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import { mapActions, mapGetters } from 'vuex';
import { auth } from '@/base';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  components: { navbar: Navbar },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.setUser(user);
    });
  },
  methods: {
    ...mapActions(['setUser']),
  },
  computed: {
    ...mapGetters(['isUserAuthenticated']),
  },
};
</script>
