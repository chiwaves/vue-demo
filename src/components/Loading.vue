<template>
  <div class="loading">
    <img :src="loadingImage" alt="loading">
  </div>
</template>

<script>
export default {
  name: 'loading',
  data() {
    return {
      loadingImage: require('@/assets/imgs/loading-svg/loading-bars.svg')
    };
  }
}
</script>

<style lang="scss">
.loading{
  text-align: center;
  padding: 20px 0;
}
</style>