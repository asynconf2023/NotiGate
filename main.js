const prompt = require('prompt-sync')()

function askQuestions(question, answers) {
		const answer = prompt(`${question} (${answers.map((answer, index) => `${index + 1} - ${answer.text}`).join(', ')}) ("exit" pour quitter): `)
		if(answer == 'exit') {process.exit()}
		if(isNaN(answer) || answer < 1 || answer > answers.length) {console.log('Vous devez saisir un nombre entre 1 et 4'); return askQuestions(question, answers)}
		return answers[answer - 1].note
}

function getScore() {
		let score = 0
		const answers = require('./scores.json')
		score += askQuestions('Quel est le type de votre véhicule ?', answers.vehicleType) 
		score += askQuestions('Quel est le type de carburant ?', answers.fuelType)
		score += askQuestions('Combien de kilomètres par an ?', answers.kmPerYear)
		score += askQuestions('Quelle est l\'année de création de votre véhicule ?', answers.creationYear)
		return score
}

function getRate(score) {
		const answers = require('./scores.json')
		let rate = answers.rates.find(rate => score <= rate.scoreMax).rate
		rate += askQuestions('Combien de passagers ?', answers.passengers)
		return rate
}

function main() {
		const score = getScore()
		const rate = getRate(score)
		console.log(`Avec les informations fournies, vous pouvez toucher un emprunt pour votre voiture à un taux de ${rate}% !`)
}

main()
