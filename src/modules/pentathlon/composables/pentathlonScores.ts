import type { Hero } from "@modules/heroes/type";

export type PentathlonEvent =
	| "skyscraperClimbing"
	| "jokeTelling"
	| "villainShooting"
	| "race200km"
	| "catRescue";

export interface EventScore {
	heroId: string;
	score: number;
}

export interface EventResult {
	event: PentathlonEvent;
	scores: EventScore[];
}

/**
 * Calculate scores for the Skyscraper Climbing event
 * Formula: (Strength x 4) - (Weight x 2)
 */
export function calculateSkyscraperClimbingScore(
	players: Hero[]
): EventScore[] {
	return players.map((player) => ({
		heroId: player.id,
		score: player.attributes.strength * 4 - player.attributes.weight * 2,
	}));
}

/**
 * Calculate scores for the Joke Telling event
 * Formula: (Charisma^2) - (Sum of opponents' charisma)
 */
export function calculateJokeTellingScore(players: Hero[]): EventScore[] {
	return players.map((player) => {
		const opponentsCharismaSum = players
			.filter((opponent) => opponent.id !== player.id)
			.reduce((sum, opponent) => sum + opponent.attributes.charisma, 0);

		return {
			heroId: player.id,
			score:
				Math.pow(player.attributes.charisma, 2) - opponentsCharismaSum,
		};
	});
}

/**
 * Calculate scores for the Villain Shooting event
 * Formula: (Agility + Strength) + (If last in standings, 5 else 0)
 */
export function calculateVillainShootingScore(
	players: Hero[],
	previousResults: EventResult[]
): EventScore[] {
	// Get current standings based on previous events
	const standings = getCurrentStandings(players, previousResults);
	const lastPlace = standings[standings.length - 1]?.heroId;

	return players.map((player) => {
		const lastPlaceBonus = player.id === lastPlace ? 5 : 0;

		return {
			heroId: player.id,
			score:
				player.attributes.agility +
				player.attributes.strength +
				lastPlaceBonus,
		};
	});
}

/**
 * Calculate scores for the 200km Race event
 * Formula: (Agility x 4) + (Endurance x 2) + (If first in previous event, 10 else -1)
 */
export function calculate200kmRaceScore(
	players: Hero[],
	previousResults: EventResult[]
): EventScore[] {
	// Get winner of the last event
	const previousEvent = previousResults[previousResults.length - 1];
	const previousWinner = previousEvent?.scores.sort(
		(a, b) => b.score - a.score
	)[0]?.heroId;

	return players.map((player) => {
		const previousWinnerBonus = player.id === previousWinner ? 10 : -1;

		return {
			heroId: player.id,
			score:
				player.attributes.agility * 4 +
				player.attributes.endurance * 2 +
				previousWinnerBonus,
		};
	});
}

/**
 * Calculate scores for the Cat Rescue event
 * Formula: (Agility x 2) + (If won at least two previous events, 5 else 0)
 */
export function calculateCatRescueScore(
	players: Hero[],
	previousResults: EventResult[]
): EventScore[] {
	return players.map((player) => {
		const wonEvents = countWonEvents(player.id, previousResults);
		const wonEventsBonus = wonEvents >= 2 ? 5 : 0;

		return {
			heroId: player.id,
			score: player.attributes.agility * 2 + wonEventsBonus,
		};
	});
}

/**
 * Counts how many events the hero has won
 */
function countWonEvents(
	heroId: string,
	previousResults: EventResult[]
): number {
	return previousResults.filter((result) => {
		const sortedScores = [...result.scores].sort(
			(a, b) => b.score - a.score
		);
		return sortedScores[0]?.heroId === heroId;
	}).length;
}

/**
 * Get current standings based on total scores across all previous events
 */
function getCurrentStandings(
	players: Hero[],
	previousResults: EventResult[]
): EventScore[] {
	const totalScores = players.map((player) => {
		let totalScore = 0;

		previousResults.forEach((event) => {
			const playerScore = event.scores.find(
				(score) => score.heroId === player.id
			);
			if (playerScore) {
				totalScore += playerScore.score;
			}
		});

		return {
			heroId: player.id,
			score: totalScore,
		};
	});

	// Sort by score descending
	return totalScores.sort((a, b) => a.score - b.score);
}
