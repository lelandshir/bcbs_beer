<template>
	<div class="company-banner">
		<img alt="Beer logo" src="../../assets/beer-mug.svg" id="beer-mug" />
		<h2 id="company">{{ company }}</h2>
	</div>

	<div class="search">
		<label for="search-beer">Search</label>&nbsp;
		<input
			id="search-beer"
			placeholder="Search for Beer by name"
			type="text"
			v-model="this.query"
			class="search-bar"
			autofocus
		/>&nbsp;
	</div>

	<section class="beer-directory" v-if="this.currentBeers.length > 0">
		<div
			class="beer-card"
			v-for="(beer, index) in filteredBeer() || currentBeers"
			:key="index"
		>
			<button
				id="show-modal"
				@click="beer.showModal = true"
				title="see beer details"
			>
				details
			</button>
			<h3>
				{{ beer.name }}, <span id="abv">{{ beer.abv }}% abv</span>
			</h3>
			<p>{{ beer.tagline }}</p>
			<div style="height: 5rem">
				<img alt="beer" class="beer-img" :src="beer.image_url" />
			</div>

			<modal
				:show="beer.showModal"
				@close="beer.showModal = false"
				:beer="beer"
			/>
		</div>
	</section>

	<div class="pagination-container">
		<div class="pagination-form">
			<button
				@click="this.prevPage()"
				:disabled="this.page === 1"
				title="previous page"
			>
				prev</button
			>&nbsp;
			<button
				@click="this.nextPage()"
				:disabled="this.page === 14"
				title="next page"
			>
				next
			</button>
			<br />
			<label for="per-page">page</label>&nbsp;
			<input
				id="page"
				placeholder="page #"
				type="number"
				min="1"
				max="14"
				step="1"
				:value="this.page"
				class="pagination-input"
			/>&nbsp;

			<label for="per-page">per page</label>&nbsp;
			<input
				id="per-page"
				placeholder="items per page"
				type="number"
				min="7"
				step="4"
				v-model="this.perPage"
				class="pagination-input"
			/>&nbsp;

			<button @click="this.getBeer()">Submit</button>
		</div>
	</div>
</template>

<script>
import { getBeers } from "../../services/punk-api.js";
import Modal from "../Modal/Modal.vue";
export default {
	name: "Home",
	components: { Modal },

	async created() {
		await this.getBeer();
		console.log(this.currentBeers);
	},
	data() {
		return {
			company: "Happy Brewing Co.",
			beers: [],
			currentBeers: [],
			page: 1,
			perPage: 7,
			showModal: false,
			modalVisible: false,
			query: ""
		};
	},

	methods: {
		/**
		 * Gets beers
		 */
		async getBeer() {
			this.currentBeers = [];
			return [
				...(await getBeers({
					page: this.page,
					perPage: this.perPage || 7
				}))
			].forEach(beer => {
				const newBeer = {
					...beer,
					showModal: false,
					like: false
				};

				this.currentBeers.push(newBeer);
			});
		},

		/**
		 * Gets next page of beers
		 */
		async nextPage() {
			if (this.page === 14) return;
			this.page += 1;
			await this.getBeer();
		},

		/**
		 * Gets previous page of beers
		 */
		async prevPage() {
			if (this.page === 1) return;
			this.page -= 1;
			await this.getBeer();
		},

		/**
		 * Open Modal for Beer Details
		 * @param beer
		 */
		openModal(beer) {
			this.modalData = beer;
			this.modalVisible = true;
		},

		/**
		 * Returns beers that match user query
		 * @returns searched beer list
		 */
		filteredBeer() {
			if (this.query) {
				return [
					...this.currentBeers.filter(({ name }) =>
						name.toLowerCase().includes(this.query.toLowerCase())
					)
				];
			}
		}
	}
};
</script>

<style scoped>
.company-banner,
.company-banner > img {
	margin: 0 auto;
	color: #fff;
}

img#beer-mug {
	width: 5%;
	margin-bottom: -20px;
}

.beer-directory {
	width: 50%;
	display: flex;
	flex-wrap: wrap;
	margin: 0 auto;
	justify-content: space-around;
}

#company {
	font-size: x-large;
}

.beer-card {
	background: #fff;
	margin: 5px;
	min-width: 14rem;
	height: 20rem;
	flex: 2;
	font-size: 0.7rem;
	border: none;
	border-radius: 3px;
	padding: 3px;
}

#abv {
	font-weight: 100;
}

.pagination-input {
	width: 2rem;
}

.pagination-form {
	border-radius: 3px;
	margin: 20px auto;
	background: #fff;
	width: 20rem;
	padding: 0.5rem;
}

form > button {
	border: none;
	padding: 3px;
	background: darkgray;
	border-radius: 3px;
	cursor: pointer;
}

.beer-img {
	width: 50px;
}

#show-modal {
	margin: 0 0 0 250px;
	border: none;
	cursor: pointer;
}

button {
	border: none;
	margin-bottom: 10px;
}

.search {
	background: #000;
	padding: 1rem;
	margin: 0 auto;
	margin-bottom: 2rem;
	color: #fff;
	font-weight: 900;
	font-size: 22px;
	width: fit-content;
}

.search-bar {
	width: 400px;
}
</style>
