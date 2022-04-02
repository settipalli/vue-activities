<template>
  <div></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {},
  computed: {
    ...mapGetters(['isUserAuthenticated']),
  },
  methods: {
    ...mapActions({}),
  },
};
</script>
