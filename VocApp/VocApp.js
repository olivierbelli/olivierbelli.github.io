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
	incrementIndex(){
		this.index = (this.index+1)%this.words.length
	}
	decrementIndex(){
		this.index = this.index-1 > -1 ? this.index-1 : this.words.length-1
	}
	currentWord(){
		return this.words[this.index]
	}
	shuffle(){
		shuffle(this.words)
		this.index = -1
	}
	browse(direction){
		do{
			if(direction >= 0) 
				this.incrementIndex() 
			else 
				this.decrementIndex()
		}while(this.currentWord().skip)
		return this.currentWord()
	}
	previous(){
		return this.browse(-1)
	}
	next(){
		return this.browse(1)
	}
	markSkippable(index,val){
		if(this.words[index])
			this.words[index].skip = val === undefined ? true : val
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
	document.querySelector("#mastered").checked = false
	nextWord()
	e.stopPropagation()
}
document.querySelector("#previous").onclick = (e) =>{
	document.querySelector("#mastered").checked = false
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

document.querySelector("#mastered").onclick = function(e){
	currentStack.markSkippable(currentStack.index,this.checked)
	e.stopPropagation()
}

createFilterSettings(vocabulary)



