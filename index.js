import { CATEGORY, SORT_BY, SORT_ORDER, search } from 'leboncoin-api-search';
import fs from 'fs';

async function generateApiData() {
	try {
		console.log("Extraction des données Leboncoin...");
		const results = await search({
			keywords: 'Atari',
			only_title: true,
			category: CATEGORY.CONSOLES,
			sort_by: SORT_BY.TIME,
			sort_order: SORT_ORDER.DESC,
			price_min: 30,
			price_max: 60,
		});

		const apiResponse = {
			last_updated: new Date().toISOString(),
			total_results: results.length,
			data: results
		};

		if (!fs.existsSync('./public')) {
			fs.mkdirSync('./public');
		}

		fs.writeFileSync('./public/atari.json', JSON.stringify(apiResponse, null, 2));
		console.log("API JSON mise à jour avec succès dans ./public/atari.json");

	} catch (error) {
		console.error("Erreur lors de la génération de l'API :", error);
		process.exit(1);
	}
}

generateApiData();
