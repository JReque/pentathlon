import { ref, computed } from "vue";
import { useHeroesStore } from "../store/useHeroesStore";
import { api } from "../api";
import type { Hero } from "../type";

export function useHeroes() {
	const heroesStore = useHeroesStore();
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	/**
	 * Fetch all heroes from the API
	 */
	const fetchHeroes = async () => {
		isLoading.value = true;
		heroesStore.setLoading(true);
		heroesStore.setError(null);
		error.value = null;

		try {
			const heroes = await api.getHeroes();
			heroesStore.setHeroes(heroes);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Failed to fetch heroes";
			error.value = errorMessage;
			heroesStore.setError(errorMessage);
		} finally {
			isLoading.value = false;
			heroesStore.setLoading(false);
		}
	};

	/**
	 * Create a new hero
	 * @param heroData - The hero data to create
	 */
	const createHero = async (heroData: Hero): Promise<Hero> => {
		isLoading.value = true;
		heroesStore.setLoading(true);
		error.value = null;
		heroesStore.setError(null);

		try {
			const createdHero = await api.createHero(heroData);
			return createdHero;
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Failed to create hero";
			error.value = errorMessage;
			heroesStore.setError(errorMessage);
			throw err;
		} finally {
			fetchHeroes();
			isLoading.value = false;
			heroesStore.setLoading(false);
		}
	};

	/**
	 * Update an existing hero
	 * @param updatedHero - The hero data to update
	 */
	const updateHero = async (updatedHero: Hero): Promise<Hero> => {
		isLoading.value = true;
		heroesStore.setLoading(true);
		error.value = null;
		heroesStore.setError(null);

		try {
			const updated = await api.updateHero(updatedHero);
			return updated;
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Failed to update hero";
			error.value = errorMessage;
			heroesStore.setError(errorMessage);
			throw err;
		} finally {
			fetchHeroes();
			isLoading.value = false;
			heroesStore.setLoading(false);
		}
	};

	/**
	 * Delete a hero by ID
	 * @param id - The ID of the hero to delete
	 */
	const deleteHero = async (id: string): Promise<void> => {
		isLoading.value = true;
		heroesStore.setLoading(true);
		error.value = null;
		heroesStore.setError(null);

		try {
			await api.deleteHero(id);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Failed to delete hero";
			error.value = errorMessage;
			heroesStore.setError(errorMessage);
			throw err;
		} finally {
			fetchHeroes();
			isLoading.value = false;
			heroesStore.setLoading(false);
		}
	};

	return {
		getHeroById: heroesStore.getHeroById,
		fetchHeroes,
		createHero,
		updateHero,
		deleteHero,
		setSelectedHero: heroesStore.setSelectedHero,
	};
}
