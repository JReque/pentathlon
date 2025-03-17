<template>
	<div
		class="flex items-center rounded-lg overflow-hidden transition-all duration-200 cursor-pointer relative"
		:class="[
			isSelected
				? 'bg-gray-50 shadow-lg ring-2 ring-gray-900 scale-[1.02]'
				: 'bg-white shadow-md hover:shadow-lg',
		]"
		@click="selectCard"
	>
		<div
			class="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity"
		></div>

		<!-- Selected overlay -->
		<div
			v-if="isSelected"
			class="absolute inset-0 z-10 flex items-center justify-center"
		>
			<div class="absolute inset-0 bg-black opacity-50"></div>
			<span
				class="z-20 py-1 font-bangers text-yellow-400 text-3xl font-bold"
			>
				Player
				{{ selectedPlayers.findIndex((p) => p.id === hero.id) + 1 }}
			</span>
		</div>
		<!-- Hero image section -->
		<div
			class="flex-shrink-0 bg-gradient-to-r from-red-700 to-blue-950 flex items-center justify-center"
		>
			<img
				v-if="hasImage"
				:src="hero.picture"
				:alt="hero.name"
				class="w-32 h-32 object-cover bg-white rounded-full border-4 border-yellow-400 shadow-lg m-4"
				@error="handleImageError"
			/>
			<div
				v-else
				class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-yellow-400 shadow-lg m-4"
			>
				<span class="text-3xl text-gray-500">{{
					hero.name.charAt(0)
				}}</span>
			</div>
		</div>

		<div class="flex-1 p-10 pr-2 pl-2 bg-blue-950 text-white">
			<!-- Hero name -->
			<h2 class="text-xl font-bold mb-3 font-bangers tracking-wider">
				{{ hero.name }}
			</h2>
			<div class="grid grid-cols-5 gap-2 text-center text-sm">
				<div v-if="hero.attributes?.strength !== undefined">
					<div class="font-bold">
						{{ hero.attributes.strength }}/10
					</div>
					<div>Fuerza</div>
				</div>

				<div v-if="hero.attributes?.agility !== undefined">
					<div class="font-bold">
						{{ hero.attributes.agility }}/10
					</div>
					<div>Agilidad</div>
				</div>

				<div v-if="hero.attributes?.charisma !== undefined">
					<div class="font-bold">
						{{ hero.attributes.charisma }}/10
					</div>
					<div>Intel.</div>
				</div>

				<div v-if="hero.attributes?.endurance !== undefined">
					<div class="font-bold">
						{{ hero.attributes.endurance }}/10
					</div>
					<div>Resist.</div>
				</div>

				<div v-if="hero.attributes?.weight !== undefined">
					<div class="font-bold">{{ hero.attributes.weight }}/10</div>
					<div>Poder</div>
				</div>
			</div>
		</div>

		<div class="absolute top-3 right-3 flex space-x-2">
			<button
				class="p-1.5 bg-white bg-opacity-90 rounded-full shadow-md transition-all transform hover:scale-110 active:scale-95 focus:outline-none"
				@click.stop="openEditDrawer"
				title="Edit hero"
			>
				<PencilIcon class="h-5 w-5 text-gray-900" />
			</button>
			<button
				class="p-1.5 bg-white bg-opacity-90 rounded-full shadow-md transition-all transform hover:scale-110 active:scale-95 focus:outline-none"
				@click.stop="deleteHero"
				title="Delete hero"
			>
				<TrashIcon class="h-5 w-5 text-gray-900" />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
	import type { Hero } from "../type";
	import { computed } from "vue";
	import { usePentathlonStore } from "@/modules/pentathlon/store/usePentathlonStore";
	import { storeToRefs } from "pinia";

	const pentathlonStore = usePentathlonStore();
	const { selectedPlayers } = storeToRefs(pentathlonStore);

	const props = defineProps<{
		hero: Hero;
		isSelected?: boolean;
	}>();

	const emit = defineEmits(["edit", "select", "delete"]);

	const hasImage = computed(() => {
		return (
			props.hero.picture &&
			props.hero.picture.trim() !== "" &&
			(props.hero.picture.startsWith("data:image") ||
				props.hero.picture.startsWith("http") ||
				props.hero.picture.startsWith("/"))
		);
	});

	const handleImageError = (e: Event) => {
		// Fallback image if the hero image fails to load
		const target = e.target as HTMLImageElement;
		target.src = "/images/placeholder.jpg";
	};

	const openEditDrawer = () => {
		emit("edit", props.hero);
	};

	const selectCard = () => {
		emit("select", props.hero);
	};

	const deleteHero = () => {
		emit("delete", props.hero);
	};
</script>
