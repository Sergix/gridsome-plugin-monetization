<template>
  <Layout>
    <g-image alt="sergix logo" src="~/favicon.png" width="135" />

    <h1>Gridsome Monetization Plugin</h1>

    <button @click="toggle">Toggle Monetization</button>
    <h2>Current state: {{ state }}</h2>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Web Monetization"
  },
  data() {
    return {
      state: "Waiting for monetization to load..."
    }
  },
  methods: {
    toggle() {
      this.$monetization.isEnabled()
        ? this.$monetization.disable()
        : this.$monetization.enable()
    }
  },
  mounted() {
    this.state = this.$monetization.getState()
    this.$monetization.onStateChange(
      event => (this.state = this.$monetization.getEventStateString(event))
    )
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
