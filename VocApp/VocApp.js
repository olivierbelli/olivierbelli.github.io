'use strict'
//Util
const contains = (arr,word) => {
	for(let i = 0; i < arr.length; i++)
		if(arr[i] === word)
			return true
	return false
}
const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        let t = a[i]
        a[i] = a[j] 
        a[j] = t
    }
    return a
}
/*
const createFilterOptions = (arr) => {
	let options = {}
	for(let i = 0; i < arr.length;i++){
		if(!options[arr[i].category[0]]){
			options[arr[i].category[0]] = {}
		}
		for(let j = 1; j < arr[i].category.length; j++){
			options[arr[i].category[0]][arr[i].category[j]] = true
		}
	}
	
	return options
}*/


const getCategories = (arr) => {
	let categories = {}
	for(let i = 0; i < arr.length;i++){
		categories[arr[i].category] = true
	}
	return Object.keys(categories)
}


const createFilterSettings = (arr) => {
	let categories = getCategories(arr)
	let filters = document.querySelector("#filters")
	filters.innerHTML = ""
	for(let i = 0; i < categories.length;i++){
		filters.innerHTML+="<input class='FCAT' value="+categories[i]+" type='checkbox' checked></input>"+categories[i]+"<br/>"
	}
}

const card = {
	div : document.querySelector("#cardText"),
	word: undefined,
	state: 1,
	update: function(){
		this.setContent(this.state == 1 ? this.word.english : this.word.korean)
	},
	changeState: function(val){
		if(val)
			this.state = val
		else
			this.state *= -1
		this.update()
	},
	setContent: function(content) {
		this.div.innerHTML = content
	},
	flip :function() {
		this.changeState()
	},
	setWord : function(newword) {
		this.word = newword
		this.changeState(document.querySelector("#kte").checked ? -1 : 1)
	},
}


class WordStack {
	constructor(arr){
		this.words = arr
		this.index = -1
	}
	shuffle(){
		shuffle(this.words)
		this.index = -1
	}
	next(){
		this.index = (this.index+1)%this.words.length
		return this.words[this.index]
	}
	previous(){
		this.index = this.index-1 > -1 ? this.index-1 : this.words.length-1
		return this.words[this.index]
	}
}

class View{
	constructor(div){
		this.div = div
	}
	display(){
		this.div.style.display = "block"
	}
	hide(){
		this.div.style.display = "none"
	}
}
/*
	Main Logic
*/
let filterView = new View(document.querySelector("#filterView"))
let cardsView = new View(document.querySelector("#cardsView"))

let filteredPool;
let currentStack;
const init =() => {
	//Get filters
	let categories = Array.prototype.slice.call(document.querySelectorAll(".FCAT")).filter(e => e.checked).map(e => e.value)
	filteredPool = vocabulary.filter(el => contains(categories,el.category))
	currentStack = new WordStack(filteredPool)
	nextWord()
}

const nextWord = () => card.setWord(currentStack.next())
const prevWord = () => card.setWord(currentStack.previous())
//Interactions handlers
//FilterView
document.querySelector("#start").onclick = () =>{
	filterView.hide()
	cardsView.display()
	init()
}

//CardsView
document.querySelector("#back").onclick = () =>{
	cardsView.hide()
	filterView.display()
}

document.querySelector("#next").onclick = (e) =>{
	nextWord()
	e.stopPropagation()
}
document.querySelector("#previous").onclick = (e) =>{
	prevWord()
	e.stopPropagation()
}
document.querySelector("#card").onclick = () =>{
	card.flip()
}

document.querySelector("#shuffle").onclick = () =>{
	currentStack.shuffle()
	nextWord()
}
createFilterSettings(vocabulary)



