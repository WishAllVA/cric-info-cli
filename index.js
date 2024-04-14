#!/usr/bin/env node

require('dotenv').config()
const { program } = require('commander')
const axios = require('axios')
const API_KEY = process.env.API_KEY

program
	.version('1.0.1')
	.description('A simple CLI tool for cricket info')
	.option('-g --greet', 'Greeting')
	.option('-lm --list-matches', 'List all the current cricket matches')
	.option('-sp --search-player <playerName>', 'Finds the information for the player')
	.parse(process.argv)

const options = program.opts()

if (options.greet) {
	console.log("Hello from CLI")
} else if (options.listMatches) {
	axios
		.get(`https://api.cricapi.com/v1/matches?apiKey=${API_KEY}`)
		.then(data => {
			const displayData = []
			data.data.forEach(match => {
				displayData.push({

					matchName: match.name,
					matchType: match.matchType,
					matchDate: match.date
				})
			})
			console.table(displayData)
		})
		.catch(error => console.log(err))

} else if (options.searchPlayer) {
	axios
		.get(`https://api.cricapi.com/v1/players?search=${options.searchPlayer}&apiKey=${API_KEY}`)
		.then(data => {
			const displayData = []
			data.data.forEach(player => {
				displayData.push({
					playerName: player.name,
					playerCountry: player.country
				})
			})
			displayData.length ? console.table(displayData) : console.log('No player found')
		})
	.catch(err => console.log(err))
}
