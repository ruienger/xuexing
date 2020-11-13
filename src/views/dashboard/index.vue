<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
    <backToTop></backToTop>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import backToTop from '@/components/BackToTop'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard,backToTop },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
