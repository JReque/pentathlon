<template>
	<div class="p-10 pt-20">
		<div class="fixed inset-0 bg-black opacity-70 -z-10"></div>
		<h1
			class="text-5xl font-bold mb-6 font-bangers text-yellow-400 tracking-wider flex flex-col items-center"
		>
			Pentathlon Game
		</h1>

		<div v-if="heroesStore.selectedPlayers.length === 3">
			<div class="">
				<h2
					class="text-2xl font-semibold mb-4 font-bangers text-yellow-400 tracking-wider"
				>
					Selected Players
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div
						v-for="(player, index) in sortedPlayers"
						:key="player.id"
						class="border rounded-lg p-4 flex flex-col items-center space-y-3 bg-blue-950 text-white"
						:class="{
							'border-yellow-400': gameCompleted && index === 0,
							'border-gray-400': gameCompleted && index === 1,
							'border-amber-600': gameCompleted && index === 2,
						}"
					>
						<div
							v-if="gameCompleted"
							class="flex justify-center items-center mb-1"
						>
							<span
								v-if="index === 0"
								class="text-3xl text-yellow-600"
								>🥇</span
							>
							<span
								v-else-if="index === 1"
								class="text-3xl text-gray-500"
								>🥈</span
							>
							<span
								v-else-if="index === 2"
								class="text-3xl text-amber-700"
								>🥉</span
							>
						</div>
						<img
							:src="player.picture"
							:alt="player.name"
							class="w-16 h-16 rounded-full object-cover"
							:class="{
								'border-4': gameCompleted,
								'border-yellow-400':
									gameCompleted && index === 0,
								'border-gray-400': gameCompleted && index === 1,
								'border-amber-600':
									gameCompleted && index === 2,
							}"
						/>
						<div class="text-center">
							<h3 class="font-medium">{{ player.name }}</h3>
							<p class="text-sm text-gray-500">
								Player #{{
									heroesStore.selectedPlayers.findIndex(
										(p) => p.id === player.id
									) + 1
								}}
							</p>

							<p
								v-if="gameCompleted"
								class="font-bold text-lg mt-1"
							>
								Score: {{ getPlayerTotalScore(player.id) }}
							</p>
						</div>
					</div>
				</div>

				<div class="mt-4">
					<div class="flex justify-between">
						<button
							@click="runPentathlon"
							class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 transition-colors"
							:disabled="gameCompleted || isLoading"
						>
							<span v-if="isLoading" class="flex items-center">
								<svg
									class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
									></circle>
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Processing...
							</span>
							<span v-else>
								{{
									gameCompleted
										? "Game Completed"
										: "Run Pentathlon"
								}}
							</span>
						</button>
						<button
							v-if="gameCompleted"
							@click="resetGameHandler"
							class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
							:disabled="isLoading"
						>
							Reset Game
						</button>
					</div>
				</div>
			</div>

			<!-- Event Summary -->
			<div
				v-if="eventResults.length > 0"
				class="bg-white rounded-lg shadow-md p-6 mt-8"
			>
				<h2 class="text-xl font-semibold mb-4">Event Summary</h2>
				<div class="overflow-x-auto">
					<table class="min-w-full bg-white border">
						<thead>
							<tr>
								<th class="py-2 px-4 border-b">Event</th>
								<th
									v-for="player in heroesStore.selectedPlayers"
									:key="player.id"
									class="py-2 px-4 border-b"
								>
									{{ player.name }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(result, index) in eventResults"
								:key="index"
							>
								<td class="py-2 px-4 border-b font-medium">
									{{ formatEventName(result.event) }}
								</td>
								<td
									v-for="player in heroesStore.selectedPlayers"
									:key="player.id"
									class="py-2 px-4 border-b text-center"
								>
									{{ getPlayerScore(result, player.id) }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<div
			v-else
			class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center"
		>
			<p class="text-yellow-700 mb-4">
				You need exactly 3 selected players to start the game.
			</p>
			<button
				@click="router.push('/pentathlon/heroes')"
				class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
			>
				Return to Hero Selection
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref, computed } from "vue";
	import { useRouter } from "vue-router";
	import { usePentathlonStore } from "@/modules/pentathlon/store/usePentathlonStore";
	import { usePentathlon } from "@/modules/pentathlon/composables/usePentathlon";
	import type {
		PentathlonEvent,
		EventResult,
	} from "@/modules/pentathlon/composables/pentathlonScores";

	const router = useRouter();
	const heroesStore = usePentathlonStore();
	const {
		eventResults,
		runAllEvents,
		resetGame,
		clearSelectedPlayers,
		finalStandings,
	} = usePentathlon();

	const isLoading = ref(false);
	const gameCompleted = computed(() => finalStandings.value.length > 0);

	const sortedPlayers = computed(() => {
		if (!gameCompleted.value) {
			return heroesStore.selectedPlayers;
		}

		// Sort players based on their position in finalStandings
		return [...heroesStore.selectedPlayers].sort((a, b) => {
			const aIndex = finalStandings.value.findIndex(
				(s) => s.heroId === a.id
			);
			const bIndex = finalStandings.value.findIndex(
				(s) => s.heroId === b.id
			);
			return aIndex - bIndex;
		});
	});

	onMounted(() => {
		// If not enough players, redirect back to heroes page
		if (heroesStore.selectedPlayers.length !== 3) {
			router.push("/pentathlon/heroes");
		}
	});

	// Get player's total score
	const getPlayerTotalScore = (playerId: string): number => {
		const standing = finalStandings.value.find(
			(s) => s.heroId === playerId
		);
		return standing ? standing.score : 0;
	};

	// Run the pentathlon - execute all events at once with a loading delay
	const runPentathlon = () => {
		if (gameCompleted.value || isLoading.value) return;

		isLoading.value = true;

		setTimeout(() => {
			runAllEvents(heroesStore.selectedPlayers);
			isLoading.value = false;
		}, 5000); // 5 second delay
	};

	// Reset game and clear loading state
	const resetGameHandler = () => {
		resetGame();
		clearSelectedPlayers();
		router.push("/pentathlon");
		isLoading.value = false;
	};

	// Format event name for display
	const formatEventName = (eventType: PentathlonEvent): string => {
		const nameMap: Record<PentathlonEvent, string> = {
			skyscraperClimbing: "Skyscraper Climbing",
			jokeTelling: "Joke Telling",
			villainShooting: "Villain Shooting",
			race200km: "200km Race",
			catRescue: "Cat Rescue",
		};
		return nameMap[eventType] || eventType;
	};

	// Get player score for an event
	const getPlayerScore = (result: EventResult, playerId: string): number => {
		const playerScore = result.scores.find(
			(score) => score.heroId === playerId
		);
		return playerScore ? playerScore.score : 0;
	};
</script>

<style scoped>
	button:disabled {
		opacity: 0.8;
		cursor: not-allowed;
	}
</style>
