<template>
	<div
		class="fixed inset-y-0 right-0 bg-white shadow-xl transform transition-transform duration-300 z-50"
		:class="{
			'translate-x-0': props.isOpen,
			'translate-x-full': !props.isOpen,
		}"
	>
		<div class="flex flex-col h-full">
			<div class="flex justify-between items-center bg-blue-950 p-3.5">
				<h2
					class="text-2xl font-bangers text-yellow-400 tracking-widest"
				>
					{{ drawerTitle }}
				</h2>
				<button @click="close" class="text-white transition-colors">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<form
				@submit.prevent="saveHero"
				class="flex-grow overflow-y-auto mt-6 p-6"
			>
				<div class="mb-6 flex justify-center">
					<div
						class="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400"
					>
						<img
							:src="hero.picture"
							:alt="hero.name"
							class="w-full h-full object-cover"
						/>
						<div
							class="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity"
						>
							<label
								for="imageUpload"
								class="cursor-pointer p-2 bg-white/80 rounded-full"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
										clip-rule="evenodd"
									/>
								</svg>
							</label>
						</div>
					</div>
				</div>
				<input
					id="imageUpload"
					type="file"
					accept="image/*"
					@change="handleImageUpload"
					class="hidden"
				/>
				<div>
					<label
						for="name"
						class="block text-sm font-medium text-gray-700 mb-1"
						>Hero Name</label
					>
					<input
						id="name"
						v-model="hero.name"
						type="text"
						placeholder="Enter hero name"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div class="mt-6">
					<h3 class="text-md font-medium text-gray-700 mb-3">
						Hero Attributes (1-10)
					</h3>
					<div class="grid grid-cols-2 gap-4">
						<div
							v-for="(value, key) in hero.attributes"
							:key="key"
							class="bg-gray-50 p-3 rounded-lg border border-gray-200"
						>
							<div class="flex justify-between items-center">
								<label
									:for="key"
									class="text-sm font-medium text-gray-700 capitalize"
									>{{ key }}</label
								>
								<div class="flex items-center space-x-1">
									<input
										:id="key"
										v-model.number="hero.attributes[key]"
										type="number"
										min="0"
										max="10"
										class="w-12 px-1 py-1 text-center bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
			<div class="pt-6 border-gray-200">
				<button
					type="button"
					@click="saveHero"
					class="w-full bg-red-700 p-8 text-white font-bangers text-3xl tracking-widest transition-all duration-300 hover:bg-red-800 hover:tracking-[0.2em] hover:shadow-lg"
				>
					<span>{{
						isNewHero ? "Create Hero" : "Save Changes"
					}}</span>
				</button>
			</div>
		</div>
	</div>
	<div
		v-if="props.isOpen"
		@click="close"
		class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
	></div>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";
	import type { Hero } from "../type";
	import { storeToRefs } from "pinia";
	import { useHeroesStore } from "@/modules/heroes/store/useHeroesStore";
	const heroesStore = useHeroesStore();

	const { selectedHero } = storeToRefs(heroesStore);

	const props = defineProps<{
		isOpen: boolean;
	}>();

	const hero = ref<Hero>(
		selectedHero.value
			? { ...selectedHero.value }
			: {
					id: "0",
					name: "",
					picture: "",
					attributes: {
						agility: 0,
						strength: 0,
						weight: 0,
						endurance: 0,
						charisma: 0,
					},
			  }
	);

	const emit = defineEmits<{
		(e: "update:isOpen", value: boolean): void;
		(e: "save", hero: Hero, action: string): void;
	}>();

	// Determine if we're creating a new hero or editing an existing one
	const isNewHero = computed(() => {
		return !selectedHero.value || selectedHero.value.id === "0";
	});

	// Dynamic title based on whether we're adding or editing a hero
	const drawerTitle = computed(() => {
		return isNewHero.value ? "Add New Hero..." : "Edit Hero...";
	});

	const close = () => {
		emit("update:isOpen", false);
	};

	const handleImageError = (e: Event) => {
		// Fallback image if the hero image fails to load
		const target = e.target as HTMLImageElement;
		target.src = "/images/hero-placeholder.png";
	};

	const handleImageUpload = (e: Event) => {
		const input = e.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const file = input.files[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target && typeof e.target.result === "string") {
					hero.value.picture = e.target.result;
				}
			};
			reader.readAsDataURL(file);
		}
	};

	// Convert attributes back to 0-100 scale before saving
	const saveHero = () => {
		const action = isNewHero.value ? "create" : "edit";
		emit("save", hero.value, action);
		hero.value = {
			id: "0",
			name: "",
			picture: "",
			attributes: {
				agility: 0,
				strength: 0,
				weight: 0,
				endurance: 0,
				charisma: 0,
			},
		};
		close();
	};
</script>
