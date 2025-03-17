import { ref, computed } from "vue";
import type { Hero } from "@modules/heroes/type";
import {
	calculateSkyscraperClimbingScore,
	calculateJokeTellingScore,
	calculateVillainShootingScore,
	calculate200kmRaceScore,
	calculateCatRescueScore,
	type EventResult,
	type PentathlonEvent,
} from "./pentathlonScores";
import { usePentathlonStore } from "../store/usePentathlonStore";

export function usePentathlon() {
	const eventResults = ref<EventResult[]>([]);
	const pentathlonStore = usePentathlonStore();

	// Calculate score for a single event
	const calculateEventScores = (
		eventType: PentathlonEvent,
		players: Hero[]
	): EventResult => {
		let scores;

		switch (eventType) {
			case "skyscraperClimbing":
				scores = calculateSkyscraperClimbingScore(players);
				break;
			case "jokeTelling":
				scores = calculateJokeTellingScore(players);
				break;
			case "villainShooting":
				scores = calculateVillainShootingScore(
					players,
					eventResults.value
				);
				break;
			case "race200km":
				scores = calculate200kmRaceScore(players, eventResults.value);
				break;
			case "catRescue":
				scores = calculateCatRescueScore(players, eventResults.value);
				break;
		}

		const result: EventResult = {
			event: eventType,
			scores,
		};

		// Store the result
		eventResults.value.push(result);

		return result;
	};

	// Run all pentathlon events at once
	const runAllEvents = (players: Hero[]) => {
		// Clear previous results
		eventResults.value = [];

		// Event order
		const events: PentathlonEvent[] = [
			"skyscraperClimbing",
			"jokeTelling",
			"villainShooting",
			"race200km",
			"catRescue",
		];

		// Run all events in order
		events.forEach((event) => {
			calculateEventScores(event, players);
		});

		// Return final standings
		return finalStandings.value;
	};

	const resetGame = () => {
		eventResults.value = [];
	};

	const finalStandings = computed(() => {
		if (eventResults.value.length === 0) return [];

		const heroScores: Record<string, number> = {};

		// Sum up all scores across events
		eventResults.value.forEach((event) => {
			event.scores.forEach((score) => {
				if (!heroScores[score.heroId]) {
					heroScores[score.heroId] = 0;
				}
				heroScores[score.heroId] += score.score;
			});
		});

		// Convert to array and sort by total score
		return Object.entries(heroScores)
			.map(([heroId, score]) => ({ heroId, score }))
			.sort((a, b) => b.score - a.score);
	});

	return {
		isPlayerSelected: pentathlonStore.isPlayerSelected,
		selectPlayer: pentathlonStore.selectPlayer,
		clearSelectedPlayers: pentathlonStore.clearSelectedPlayers,
		eventResults,
		calculateEventScores,
		runAllEvents,
		resetGame,
		finalStandings,
	};
}
