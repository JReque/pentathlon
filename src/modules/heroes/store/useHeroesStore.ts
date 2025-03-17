import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { type Hero } from "../type";

export const useHeroesStore = defineStore("useHeroesStore", () => {
	// State
	const heroes = ref<Hero[]>([]);
	const isLoading = ref(false);
	const error = ref<string | null>(null);
	const selectedHero = ref<Hero | null>(null);

	// Getters
	const getHeroes = computed(() => heroes.value);
	const getHeroById = (id: string) =>
		computed(() => heroes.value.find((hero) => hero.id === id)).value;

	// Actions
	const setHeroes = (newHeroes: Hero[]) => (heroes.value = newHeroes);
	const setSelectedHero = (newHeroe: Hero | null) =>
		(selectedHero.value = newHeroe);
	const setLoading = (status: boolean) => (isLoading.value = status);
	const setError = (errorMessage: string | null) =>
		(error.value = errorMessage);

	return {
		// State
		heroes,
		isLoading,
		error,
		selectedHero,

		// Getters
		getHeroes,
		getHeroById,

		// Actions
		setHeroes,
		setLoading,
		setSelectedHero,
		setError,
	};
});
