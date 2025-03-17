<template>
	<div
		class="home-container relative min-h-screen w-full bg-cover bg-center bg-fixed"
	>
		<div class="absolute inset-0 bg-black opacity-50"></div>
		<div class="absolute inset-0 flex items-center">
			<div class="max-w-5xl mx-auto p-8 w-full">
				<h1
					class="text-5xl font-bold text-yellow-400 mb-8 leading-tight opacity-0 animate-fadeInUp font-bangers tracking-wider"
				>
					Welcome to Pentathlon
				</h1>
				<div class="max-w-xl opacity-0 animate-fadeInUp delay-200">
					<p class="text-lg leading-relaxed text-gray-300 mb-10">
						Experience the extraordinary world of heroes and their
						unique abilities in our comprehensive collection.
					</p>
					<button
						@click="navigateToPentathlon"
						class="inline-flex items-center px-6 py-3 bg-blue-950 text-white rounded-lg font-semibold transition-all duration-300 border-none cursor-pointer gap-2 hover:translate-y-[-2px] hover:shadow-lg"
					>
						<span>View Collection</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							class="w-5 h-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from "vue-router";

	const router = useRouter();

	const navigateToPentathlon = () => {
		router.push("/pentathlon");
	};
</script>

<style scoped>
	.home-container {
		background-image: url("@/assets/pentathlon_home.png");
	}
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fadeInUp {
		animation: fadeInUp 0.8s ease forwards;
	}

	.delay-200 {
		animation-delay: 0.2s;
	}
</style>
