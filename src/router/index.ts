import {
	createRouter,
	createWebHistory,
	type RouteRecordRaw,
} from "vue-router";

import Home from "@/views/Home.vue";
import NotFound from "@/views/NotFound.vue";
import Heroes from "@/views/Heroes.vue";
import Pentathlon from "@/views/Pentathlon.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/pentathlon",
		name: "Pentathlon",
		component: Heroes,
	},
	{
		path: "/pentathlon/game",
		name: "PentathlonGame",
		component: Pentathlon,
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: NotFound,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
