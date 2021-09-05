
const message = document.querySelector(".message")
const output1 = document.querySelector(".output1")
const output2 = document.querySelector(".output2")
const btn = document.querySelector('button')

const myWords = ["javascript", "course", "laurence"]
let player = {}

btn.addEventListener("click", function(){
    // clean previous board 
    output1.innerHTML = ""
    output2.innerHTML = ""
    // if condition 
    if(myWords.length>0) {
        // wybieramy i zapisujemy randomowe slowo i budujemy board
        myWords.sort(function(){
            return 0.5 - Math.random()
        })
        let pickedWord = myWords.shift()
        player.solution = pickedWord.split('')
        buildBoard()
    } else {
        console.log("no more words")
    }     
})

function buildBoard() {
    // tworzymy _ dla kazdej litery i zapisujemy litere w letter div's property
    player.solution.forEach(function(letter){
        let div = document.createElement('div')
        div.classList.add('letter2')
        div.innerText = "_"
        div.myLetter = letter
        output2.appendChild(div)    
    })

    let solutionLetter = document.querySelectorAll(".letter2")

    for(let x=0; x<26;x++) {
        let temp = String.fromCharCode(65+x); 
        let div = document.createElement('div')
        div.classList.add('letter')
        div.myLetter = temp; 
        // once you click the letter you can only click it once
        let handler = function(e) {
            console.log(temp)
            div.removeEventListener('click',handler)
            div.classList.add("done")
            // checking if the cliced word is the right one
            let counter = 0
            let guess = 0
            solutionLetter.forEach(function(letter){
                // count how many is correctly selected
                if(letter.innerHTML != "_") {
                    counter++
                }
                // draw them on the board
                if(letter.myLetter.toUpperCase() == temp) {
                    letter.innerHTML = temp
                    guess++
                }
            })
            if(guess>0) {
                console.log("you found"+guess+"letters")
            }
            let letters = solutionLetter.length - (guess + counter)
            if (letters<1) {
                btn.classList.remove('hide')
            }
        }

        div.addEventListener("click", handler)
        div.innerHTML = temp; 
        output1.appendChild(div)
    }

    btn.setAttribute('class', 'hide')
}