<template>
	<aside
		class="fixed top-0 left-0 right-0 z-50 bg-opacity-20 backdrop-blur-sm bg-blue-950"
	>
		<nav class="py-2">
			<ul class="flex flex-row list-none p-0 m-0 justify-center">
				<li class="mx-4">
					<router-link
						to="/"
						class="no-underline text-white px-3 py-2 inline-block hover:text-yellow-400 transition-colors duration-300 border-b-2 border-transparent hover:border-yellow-400"
						>Home</router-link
					>
				</li>
				<li class="mx-4">
					<router-link
						to="/pentathlon"
						class="no-underline text-white px-3 py-2 inline-block hover:text-yellow-400 transition-colors duration-300 border-b-2 border-transparent hover:border-yellow-400"
						>Pentathlon</router-link
					>
				</li>
				<li class="mx-4">
					<router-link
						to="/about"
						class="no-underline text-white px-3 py-2 inline-block hover:text-yellow-400 transition-colors duration-300 border-b-2 border-transparent hover:border-yellow-400"
						>About</router-link
					>
				</li>
				<li class="mx-4">
					<router-link
						to="/contact"
						class="no-underline text-white px-3 py-2 inline-block hover:text-yellow-400 transition-colors duration-300 border-b-2 border-transparent hover:border-yellow-400"
						>Contact</router-link
					>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script setup lang="ts">
	// No data or methods needed
</script>
