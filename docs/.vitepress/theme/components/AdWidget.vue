<template>
  <div class="ad-widget">
    <iframe 
      src="https://xuanyuan.cloud/widget/embed" 
      width="100%" 
      height="100" 
      frameborder="0" 
      scrolling="no"
      style="border: none; overflow: hidden;">
    </iframe>
  </div>
</template>

<script setup>
// 广告组件逻辑
</script>

<style scoped>
.ad-widget {
  overflow: hidden;
}

.ad-widget iframe {
  display: block;
  width: 100%;
  height: 100px;
  border: none;
}

@media (max-width: 768px) {
  .ad-widget {
    margin: 1rem 0;
  }
  
  .ad-widget iframe {
    height: 80px;
  }
}
</style>
