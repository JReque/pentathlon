<template>
	<div>
		<Navigation />
		<div class="flex-1">
			<main class="flex-1">
				<!-- <div class="pt-14"> -->
				<div class="">
					<router-view />
				</div>
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Navigation from "@/ui/Navigation.vue";
</script>
