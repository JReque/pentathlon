export interface HeroAttributes {
	agility: number;
	strength: number;
	weight: number;
	endurance: number;
	charisma: number;
}

export interface Hero {
	id: string;
	name: string;
	picture: string;
	attributes: HeroAttributes;
}

export interface HeroesState {
	heroes: Hero[];
	isLoading: boolean;
	error: string | null;
}

export const MAX_SELECTED_PLAYERS = 3;
