<template>
<div class="com-dot">
  <div class="c-circle">
  </div>
</div>
</template>

<script>
export default {
  name: 'Dot'
}
</script>

<style lang="scss" scoped>
.com-dot {
  width: 30px;
  height: 30px;
  .c-circle {
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background: red;
    margin: 0 auto;
    animation: spread 1s infinite;
  }
}
@keyframes spread
{
  from {
    transform: scale(1)
  }
  to {
    transform: scale(2)
  }
}
</style>
