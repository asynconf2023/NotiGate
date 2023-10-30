// Importation de la bibliothèque 'prompt-sync' pour interagir avec l'utilisateur
const prompt = require('prompt-sync')()

/**
 * Pose une question à l'utilisateur et attend une réponse parmi celles proposées.
 * @param {string} question - La question à poser à l'utilisateur.
 * @param {Array} answers - Les réponses possibles avec leurs notes associées.
 * @return {number} - La note associée à la réponse choisie.
 */
function askQuestions(question, answers) {
		// Pose la question et affiche les options de réponse possibles
		const answer = prompt(`${question} (${answers.map((answer, index) => `${index + 1} - ${answer.text}`).join(', ')}) ("exit" pour quitter): `)
		// Si l'utilisateur saisit "exit", termine le processus
		if(answer == 'exit') {process.exit()}
		// Vérifie que la réponse est un nombre valide et se trouve dans la plage des réponses possibles
		if(isNaN(answer) || answer < 1 || answer > answers.length) {console.log('Vous devez saisir un nombre entre 1 et 4'); return askQuestions(question, answers)}
		// Renvoie la note associée à la réponse choisie
		return answers[answer - 1].note
}

/**
 * Calcule le score total basé sur les réponses de l'utilisateur à plusieurs questions.
 * @return {number} - Le score total.
 */
function getScore() {
		let score = 0
		// Importation du fichier JSON contenant les options et scores pour chaque question
		const answers = require('./scores.json')
		// Pose différentes questions et ajoute les scores des réponses aux scores totaux
		score += askQuestions('Quel est le type de votre véhicule ?', answers.vehicleType) 
		score += askQuestions('Quel est le type de carburant ?', answers.fuelType)
		score += askQuestions('Combien de kilomètres par an ?', answers.kmPerYear)
		score += askQuestions('Quelle est l\'année de création de votre véhicule ?', answers.creationYear)
		return score
}

/**
 * Calcule le taux d'intérêt basé sur le score obtenu et le nombre de passagers.
 * @param {number} score - Le score obtenu à partir des réponses de l'utilisateur.
 * @return {number} - Le taux d'intérêt.
 */
function getRate(score) {
		const answers = require('./scores.json')
		// Trouve le taux correspondant au score obtenu
		let rate = answers.rates.find(rate => score <= rate.scoreMax).rate
		// Ajoute un taux supplémentaire basé sur le nombre de passagers
		rate += askQuestions('Combien de passagers ?', answers.passengers)
		return rate
}

/**
 * Fonction principale. Calcule le score total et le taux d'intérêt, puis affiche le résultat.
 */
function main() {
		const score = getScore()
		const rate = getRate(score)
		console.log(`Avec les informations fournies, vous pouvez toucher un emprunt pour votre voiture à un taux de ${rate}% !`)
}

// Exécution de la fonction principale
main()
