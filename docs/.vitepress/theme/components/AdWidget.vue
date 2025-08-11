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
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
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
