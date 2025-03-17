<template>
	<div class="p-10 pt-20">
		<div class="fixed inset-0 bg-black opacity-70 -z-10"></div>

		<div class="flex flex-col items-center mb-10">
			<h1
				class="text-4xl font-bold font-bangers text-yellow-400 tracking-wider mb-4"
			>
				Heroes Gallery
			</h1>

			<input
				type="text"
				placeholder="Search heroes..."
				v-model="searchQuery"
				class="max-w-[300px] bg-white p-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
			/>
		</div>
		<div class="fixed top-20 right-10">
			<button
				@click.stop="() => openEditDrawer(null)"
				class="flex items-center gap-2 px-4 py-2 font-bangers text-2xl bg-red-700 text-white rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
			>
				<span>Add new hero</span>
				<PlusIcon class="h-5 w-5" />
			</button>

			<button
				v-if="selectedPlayers.length === 3"
				@click="startGame"
				class="font-bangers text-white text-5xl fixed bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 px-10 py-5 bg-red-700 text-white text-5xl rounded-md shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
			>
				<span>Start Game</span>
				<ArrowRightIcon class="h-8 w-8" />
			</button>
		</div>
		<div v-if="isLoading" class="flex justify-center items-center py-10">
			<span class="font-bangers text-yellow-400 text-4xl"
				>Loading heroes...</span
			>
		</div>
		<div v-else-if="error" class="bg-red-100 p-4 rounded text-red-700 mb-4">
			{{ error }}
		</div>
		<div
			v-if="!isLoading && !error"
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 max-w-[1500px] mx-auto"
		>
			<HeroCard
				v-for="hero in filteredHeroes"
				:key="hero.id"
				:hero="hero"
				:isSelected="isPlayerSelected(hero.id)"
				@edit="openEditDrawer"
				@select="selectPlayer"
				@delete="deleteHero(hero.id)"
			/>
		</div>
		<div class="fixed bottom-10 right-10">
			<p class="text-white text-2xl mt-2">
				Selected Players: {{ selectedPlayers.length }}/{{
					MAX_SELECTED_PLAYERS
				}}
			</p>
		</div>

		<!-- Hero Drawer -->
		<HeroDrawer
			v-if="isDrawerOpen"
			:isOpen="isDrawerOpen"
			@update:isOpen="
				(value) => {
					isDrawerOpen = value;
					if (!value) setSelectedHero(null);
				}
			"
			@save="handleSaveHero"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from "vue";
	import HeroCard from "@/modules/heroes/components/HeroCard.vue";
	import HeroDrawer from "@/modules/heroes/components/HeroDrawer.vue";
	import { useHeroes } from "@/modules/heroes/composables/useHeroes";
	import { usePentathlon } from "@/modules/pentathlon/composables/usePentathlon";
	import { type Hero, MAX_SELECTED_PLAYERS } from "@/modules/heroes/type";
	import { PlusIcon, ArrowRightIcon } from "@heroicons/vue/24/solid";
	import { useHeroesStore } from "@/modules/heroes/store/useHeroesStore";
	import { usePentathlonStore } from "@/modules/pentathlon/store/usePentathlonStore";
	import { useRouter } from "vue-router";
	import { storeToRefs } from "pinia";

	const router = useRouter();
	const { fetchHeroes, updateHero, createHero, deleteHero, setSelectedHero } =
		useHeroes();
	const { isPlayerSelected, selectPlayer } = usePentathlon();

	const heroesStore = useHeroesStore();
	const pentathlonStore = usePentathlonStore();
	const { heroes, isLoading, error } = storeToRefs(heroesStore);
	const { selectedPlayers } = storeToRefs(pentathlonStore);

	// Drawer state
	const isDrawerOpen = ref(false);
	// const selectedHero = ref(null);
	const searchQuery = ref("");

	onMounted(() => {
		fetchHeroes();
	});

	// Filter heroes based on search query
	const filteredHeroes = computed((): Hero[] => {
		return heroes.value.filter((hero) =>
			hero.name.toLowerCase().includes(searchQuery.value.toLowerCase())
		);
	});

	// Function to open drawer and set selected hero
	const openEditDrawer = async (hero: Hero | null) => {
		await setSelectedHero(hero);
		isDrawerOpen.value = true;
	};

	// Function to handle hero save (both create and update)
	const handleSaveHero = async (hero: Hero, action: string) => {
		try {
			if (action === "create") {
				await createHero(hero);
				// Optional: Show success notification for creation
				console.log("Hero created successfully");
			} else if (action === "edit") {
				await updateHero(hero);
				// Optional: Show success notification for update
				console.log("Hero updated successfully");
			}
		} catch (e) {
			console.error(`Failed to ${action} hero:`, e);
			// Handle error (maybe show an error notification)
		}
	};

	// Function to handle starting the game
	const startGame = () => {
		if (selectedPlayers.value.length === 3) {
			router.push("/pentathlon/game");
		} else {
			router.push("/pentathlon");
		}
	};
</script>
<style scoped></style>
