<script setup lang="ts">
import { NCard, NTabPane, NTabs } from 'naive-ui'
import SignUp from '@/components/login/SignUp.vue'
import SignIn from '@/components/login/SignIn.vue'
</script>

<template>
  <div>
    <NCard>
      <NTabs
        class="card-tabs"
        default-value="signIn"
        size="large"
        animated
        pane-wrapper-style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <NTabPane name="signIn" tab="登录">
          <SignIn />
        </NTabPane>
        <NTabPane name="signup" tab="注册">
          <SignUp />
        </NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<style>
body {
  @apply dark bg-black text-white;
}

.h-full {
  height: 100vh;
}

.n-card {
  width: 400px;
}

.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>
