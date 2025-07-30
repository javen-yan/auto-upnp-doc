<template>
  <div class="github-badges">
    <a href="https://github.com/javen-yan/auto-upnp" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/github/stars/javen-yan/auto-upnp?style=social&label=Star" alt="GitHub Stars">
    </a>
    <a href="https://github.com/javen-yan/auto-upnp/releases" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/github/release/javen-yan/auto-upnp?style=flat-square&label=Release" alt="GitHub Release">
    </a>
    <a href="https://github.com/javen-yan/auto-upnp/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/github/license/javen-yan/auto-upnp?style=flat-square" alt="License">
    </a>
    <a href="https://github.com/javen-yan/auto-upnp" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/github/last-commit/javen-yan/auto-upnp?style=flat-square" alt="Last Commit">
    </a>
  </div>
</template>

<script setup>
// 组件逻辑
</script>

<style scoped>
.github-badges {
  text-align: center;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.github-badges a {
  display: inline-block;
  transition: transform 0.2s ease;
}

.github-badges a:hover {
  transform: translateY(-2px);
}

.github-badges img {
  height: 20px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .github-badges {
    gap: 0.5rem;
  }
  
  .github-badges img {
    height: 18px;
  }
}
</style> 