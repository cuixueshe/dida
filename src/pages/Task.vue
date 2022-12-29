<template>
	<div class="
		w-full  bg-gray-400 text-black dark:bg-#111111 dark:text-white
		h-40px px-1% flex justify-between items-center
		text-16px
	">
		<div>Vue3 Todo App Real-World</div>
		<TheHeader />
	</div>
	<div class="flex h-[calc(100vh-40px)] w-screen">
		<div class="w-1/5 bg-gray-500">
			<TaskLeftListView></TaskLeftListView>
		</div>
		<div class="w-2/5 bg-pink-500">
			<TaskList></TaskList>
		</div>
		<div class="w-2/5 bg-blue-500">
			<TaskEditor></TaskEditor>
		</div>
	</div>
</template>

<script setup lang="ts">
import TaskList from '@/components/task/TaskList.vue'
import TaskEditor from '@/components/task/TaskEditor.vue'
import TaskLeftListView from '@/components/task/TaskLeftListView.vue'
import TheHeader from '@/components/header/TheHeader.vue';
</script>