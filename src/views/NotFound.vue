<template>
	<div class="flex items-center justify-center h-screen">
		<div class="bg-white p-10 rounded shadow-lg text-center">
			<h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
			<p class="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
			<router-link to="/" class="text-blue-500 hover:underline">Go back to the homepage</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
	// No additional logic required for this component
	// The component's name is inferred from the filename
</script>

<style scoped>
	/* Styles will be managed through Tailwind classes in the template */
</style>
