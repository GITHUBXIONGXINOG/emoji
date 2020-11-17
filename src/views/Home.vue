<template>
  <div class="home">
      <comment/>
  </div>
</template>

<script>
// 导入评论组件
import Comment from '@/components/Comment'

export default {
  name: 'Home',
  components: {
      Comment
  }
}
</script>
