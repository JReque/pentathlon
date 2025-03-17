<template>
	<div
		class="flex flex-col items-center justify-center px-4 py-12 text-center"
	>
		<h1>404 - Page Not Found</h1>
		<p>The page you are looking for does not exist.</p>
		<router-link to="/">Return to Home</router-link>
	</div>
</template>

<script setup lang="ts">
	// No additional logic required for this component
	// The component's name is inferred from the filename
</script>

<style scoped>
	/* Styles will be managed through Tailwind classes in the template */
</style>
