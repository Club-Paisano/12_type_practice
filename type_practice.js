/**define variables */

const pressed = []
const practiceText = []


/**retrieve filler text from api */
function startPrac() {
const endpoint = 'https://baconipsum.com/api/?type=meat-and-filler&paras=1';
let letterArray;

fetch(endpoint)
.then(res => res.json())
.then(data => practiceText.push(...data))
.then(() => {
    const wordArray = practiceText[0].toLowerCase().split('');
    letterArray = wordArray.map(word => {
       return word.split('')
    }).flat();
    textPop(letterArray);
    grader(letterArray);
} )
}


/***organize filler text */

/**get all DOM elements */

const fillerTextContainer = document.querySelector('.type_text_container');
const startBtn = document.querySelector('.start');
const scoreContainer = document.querySelector('.score');
const resetBtn = document.querySelector('.reset');
const timeToComplete = document.querySelector('.timer')

/*create functions*/

function textPop(letterArray){
    let id = 0
    resetBtn.style.display ='block'
    fillerTextContainer.style.display= 'block'
    for(let fillLetter of letterArray){
        let letter = document.createElement('span');
        letter.innerText =`${fillLetter}`
        letter.setAttribute('id',`${id}` )
        fillerTextContainer.appendChild(letter)
        id++
    }
    console.log(fillerTextContainer)
}

function grader(letterArray){
    let i = 0;
    let time=0;
    let score = 0;
    let incorrect =0
    startBtn.style.display= 'none'
    function timer() {
			time++;
			timeToComplete.innerText = `${time}s`;
		}
		const seconds = setInterval(timer, 1000);
    window.addEventListener('keyup', (e) => {
        
			if (i < letterArray.length) {
                let letterCur = document.getElementById(`${i}`);
				if (e.key === letterArray[i]) {
					score++;
					
                    // console.log(`correct: ${e.key} score:${score}`);
                    if(!letterCur.className){
                        letterCur.className = 'correct';
                    }
					pressed.push(e.key);
					i++;
				} else if (e.key !== letterArray[i]) {
					incorrect++;
					i = i;
					if (incorrect <= 1) {
						score--;
					}
					console.log('incorrect');
					letterCur.className = 'incorrect'
				}
			}else{
                clearInterval(seconds);
                scoreContainer.innerText = `You typed ${score} words correctly in ${
                time} seconds`;
            }
		});
        // let letterCur = document.getElementById(`${i}`);
        
}

function init(){
    // startBtn.style.display = 'block'
    // resetBtn.style.display = 'none'
    // fillerTextContainer.innerHTML= ''
    // fillerTextContainer.style.display = 'none'
   location.reload()

}

//  const pressed = []
//   const secretCode = 'athegrayt'
//   window.addEventListener('keyup', (e) => {
//     console.log(e.key);
//     pressed.push(e.key);
//     pressed.splice(-secretCode.length-1, pressed.length-secretCode.length)
//     if(pressed.join('').includes(secretCode)){
//       console.log('Ding Ding!')
//       cornify_add();
//     }
//     console.log(pressed);
//   })

/**add eventListeners */

