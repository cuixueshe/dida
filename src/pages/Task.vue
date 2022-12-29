<template>
	<div class="
		w-full  bg-gray-100 text-black dark:bg-#18181c dark:text-white
		h-40px px-1% flex justify-between items-center
		text-16px
	">
		<div>Vue3 Todo App Real-World</div>
		<TheHeader />
	</div>
	<NLayout has-sider class="!h-[calc(100vh-40px)]">
		<NLayoutSider collapse-mode="transform" :collapsed-width="0" :width="240" show-trigger="bar"
			content-style="padding: 24px;" bordered>
			<TaskLeftListView></TaskLeftListView>
		</NLayoutSider>
		<NLayoutContent>
			<NLayoutContent content-style="padding: 24px">
				<div class="flex w-full h-full">
					<TaskList class="flex-1"></TaskList>
					<TaskEditor class="flex-1"></TaskEditor>
				</div>
			</NLayoutContent>
		</NLayoutContent>
	</NLayout>
	<!-- <div class="flex h-[calc(100vh-40px)] w-screen flex">
		<div class="w-1/10 bg-gray-200 dark:bg-gray-800">
			<TaskLeftListView></TaskLeftListView>
		</div>
		<div class="w-2/5 bg-pink-500">
			<TaskList></TaskList>
		</div>
		<div class="w-2/5 bg-blue-500">
			<TaskEditor></TaskEditor>
		</div>
	</div> -->
</template>

<script setup lang="ts">
import TaskList from '@/components/task/TaskList.vue'
import TaskEditor from '@/components/task/TaskEditor.vue'
import TaskLeftListView from '@/components/task/TaskLeftListView.vue'
import TheHeader from '@/components/header/TheHeader.vue';
import { NLayout, NLayoutContent, NLayoutSider } from 'naive-ui';
</script>