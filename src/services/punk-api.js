import axios from "axios";

const baseUrl = "https://api.punkapi.com/v2";

export const getBeers = async options => {
	const { page, perPage = 24 } = options;
	try {
		const request = await axios(
				`${baseUrl}/beers?page=${page}&per_page=${perPage}`
			),
			response = request?.data;
		return response;
	} catch (error) {
		throw new Error("Trouble getting Beers!");
	}
};
