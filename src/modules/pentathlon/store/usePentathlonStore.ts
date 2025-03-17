import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { MAX_SELECTED_PLAYERS } from "../type";
import { type Hero } from "@/modules/heroes/type";

export const usePentathlonStore = defineStore("usePentathlonStore", () => {
	// State
	const heroes = ref<Hero[]>([]);
	const isLoading = ref(false);
	const error = ref<string | null>(null);
	const selectedPlayers = ref<Hero[]>([]);

	// Getters
	const getHeroes = computed(() => heroes.value);
	const getSelectedPlayers = computed(() => selectedPlayers.value);
	const isPlayerSelected = (heroId: string) =>
		selectedPlayers.value.some((player: Hero) => player.id === heroId);

	// Actions
	const setHeroes = (newHeroes: Hero[]) => (heroes.value = newHeroes);
	const setLoading = (status: boolean) => (isLoading.value = status);
	const setError = (errorMessage: string | null) =>
		(error.value = errorMessage);

	const selectPlayer = (hero: Hero) => {
		if (isPlayerSelected(hero.id)) {
			selectedPlayers.value = selectedPlayers.value.filter(
				(player) => player.id !== hero.id
			);
		} else if (selectedPlayers.value.length < MAX_SELECTED_PLAYERS) {
			selectedPlayers.value.push(hero);
		}
	};

	const clearSelectedPlayers = () => {
		selectedPlayers.value = [];
	};

	return {
		// State
		heroes,
		isLoading,
		error,
		selectedPlayers,

		// Getters
		getHeroes,
		getSelectedPlayers,
		isPlayerSelected,

		// Actions
		setHeroes,
		setLoading,
		setError,
		selectPlayer,
		clearSelectedPlayers,
	};
});
