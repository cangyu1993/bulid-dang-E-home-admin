<template>
    <div class="loading">
      <img src="./01.gif" class="img">
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">
    .loading{
      position: fixed;
      z-index: 998;
      top: 30%;
      left: 40%;
      .img{
        width: 300px;
        height: 300px;
      }
    }
</style>
