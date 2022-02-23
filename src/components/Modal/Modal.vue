<script>
export default {
	name: "Modal",
	props: {
		show: Boolean,
		beer: Object
	},

	methods: {
		hops(beer) {
			return beer.ingredients.hops.map(
				ing =>
					`${ing.name} ${ing.attribute} - ${ing.amount.value} ${ing.amount.unit}`
			);
		},
		malts(beer) {
			return beer.ingredients.malt.map(
				ing => `${ing.name} - ${ing.amount.value} ${ing.amount.unit}`
			);
		},

		pairings(beer) {
			return beer.food_pairing.map(food => `${food}`);
		}
	}
};
</script>

<template>
	<div v-if="show" class="overlay">
		<div class="outter-container">
			<div class="inner-container">
				<div class="header">
					<h2>{{ beer.name }}</h2>
					<p>{{ beer.tagline }}</p>
				</div>

				<div class="body">
					<p><b>Description</b>: {{ beer.description }}</p>

					<div>
						<img
							style="width: 20%"
							alt="beer"
							class="beer-img"
							:src="beer.image_url"
						/>
					</div>

					<p><b>First Brewed</b>: {{ beer.first_brewed }}</p>
					<p><b>ABV</b>: {{ beer.abv }}%, <b>IBU</b>: {{ beer.ibu }}</p>

					<h3>Ingredients</h3>
					<p>
						<b>Hops</b>:
						<i v-for="(ing, i) in hops(beer)" :key="i"> {{ ing }}... </i>
					</p>
					<p>
						<b>Malts</b>:
						<i v-for="(ing, i) in malts(beer)" :key="i"> {{ ing }}... </i>
					</p>

					<p><b>Yeast</b>: {{ beer.ingredients.yeast }}</p>

					<p>
						<b>Suggested Food Pairings</b>:
						<i v-for="(food, i) in pairings(beer)" :key="i"> {{ food }}... </i>
					</p>

					<p><b>Brewers Tips</b>: {{ beer.brewers_tips }}</p>
				</div>

				<div class="footer">
					<p><b>Contributer</b>: {{ beer.contributed_by }}</p>
					<button class="modal-default-button" @click="$emit('close')">
						close
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.overlay {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(56, 56, 56, 0.87);
	display: table;
}

.outter-container {
	display: table-cell;
	vertical-align: middle;
}

.inner-container {
	width: 300px;
	margin: 0px auto;
	padding: 20px 30px;
	background-color: #fff;
	border-radius: 2px;
}

.header > h2 {
	margin-top: 0;
	color: #1e382d;
}

.header > p {
	margin-top: -15px;
}

.body {
	margin: 20px 0;
}

.modal-default-button {
	float: right;
	cursor: pointer;
	border: none;
}

.footer {
	margin-bottom: 1.5rem;
}
</style>
