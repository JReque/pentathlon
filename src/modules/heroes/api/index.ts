import axios from "axios";
import type { Hero } from "../type";

const HEROES_URL = import.meta.env.VITE_API_URL + "/heroes/";
const API_KEY = import.meta.env.VITE_API_KEY;

// Configure axios with default headers
const apiClient = axios.create({
	headers: {
		Authorization: API_KEY,
	},
});

export const api = {
	/**
	 * Get all heroes
	 * @returns Promise with the list of heroes
	 */
	getHeroes: async (): Promise<Hero[]> => {
		try {
			const response = await apiClient.get(HEROES_URL);
			return response.data;
		} catch (error) {
			console.error("Failed to fetch heroes:", error);
			throw error;
		}
	},

	/**
	 * Get a hero by ID
	 * @param id - The hero ID
	 * @returns Promise with the hero data
	 */
	getHeroById: async (id: string): Promise<Hero> => {
		try {
			const response = await apiClient.get(`${HEROES_URL}${id}`);
			return response.data;
		} catch (error) {
			console.error(`Failed to fetch hero with ID ${id}:`, error);
			throw error;
		}
	},

	/**
	 * Create a new hero
	 * @param hero - The hero data without ID
	 * @returns Promise with the created hero
	 */
	createHero: async (hero: Hero): Promise<Hero> => {
		try {
			const response = await apiClient.post(HEROES_URL, hero);
			return response.data;
		} catch (error) {
			console.error("Failed to create hero:", error);
			throw error;
		}
	},

	/**
	 * Update an existing hero
	 * @param id - The hero ID
	 * @param hero - The updated hero data
	 * @returns Promise with the updated hero
	 */
	updateHero: async (hero: Hero): Promise<Hero> => {
		try {
			const response = await apiClient.put(
				`${HEROES_URL}${hero.id}`,
				hero
			);
			return response.data;
		} catch (error) {
			console.error(`Failed to update hero with ID ${hero.id}:`, error);
			throw error;
		}
	},

	/**
	 * Delete a hero by ID
	 * @param id - The hero ID to delete
	 * @returns Promise with the deleted hero
	 */
	deleteHero: async (id: string): Promise<void> => {
		try {
			await apiClient.delete(`${HEROES_URL}${id}`);
		} catch (error) {
			console.error(`Failed to delete hero with ID ${id}:`, error);
			throw error;
		}
	},
};
