const paragraphs=["Artificial intelligence is rapidly transforming industries. Machine learning allows computers to identify patterns in vast datasets, enabling autonomous cars, personalized recommendations, and medical diagnoses. AI chatbots can answer questions in real time, while predictive algorithms optimize logistics and finance.","Despite its advantages, AI raises ethical challenges, including bias, privacy, and job displacement. ,Researchers advocate for transparent, explainable AI systems to ensure fairness and safety.Innovations in natural language processing and computer vision continue to expand AI’s capabilities.","As technology advances, society faces questions about governance, responsibility, and the balance between human and artificial intelligence in shaping the future.Detective Lane entered the abandoned manor cautiously."," The floorboards creaked, echoing in the empty halls.A  faint light flickered in the distance, revealing an overturned chair and scattered papers. Lane noticed a torn photograph with a cryptic symbol. Suddenly, a noise came from the attic.","Heart racing, Lane climbed the staircase, flashlight in hand. The figure of a shadow disappeared behind a door. A locked drawer caught attention, revealing a hidden journal detailing a secret inheritance and a mysterious disappearance. Every clue suggested someone wanted the truth buried.","In that instant, Lane realized the investigation was no longer safe and that danger lurked closer than expected. Have you ever wondered what a black hole really is Imagine a place in space where gravity is so strong that nothing can escape not even light They are formed when huge stars collapse at the end of their lives Around them you will see swirling matter getting pulled in heating up and glowing Scientists study black holes to understand gravity and how galaxies evolve Recently ","We got the first ever photo of a black hole It is like peeking into one of the universe deepest secretsHave you dreamed of exploring Iceland It is like another planet Volcanoes glaciers geysers and waterfalls are everywhere. The northern lights dance across the sky You can hike a glacier soak in the Blue Lagoon or even spot whales ","The villages are small but charming and the history is fascinating Every turn in Iceland feels like an adventure story If you love raw and powerful nature this is your playground Just imagining it makes you feel alive Thrilling beautiful and unforgettable"]
const TestPara = document.getElementById('Paragraph')
const typedoutput=document.getElementById('typedoutput');
const accuracyEl=document.getElementById('accuracy');
let wpmEl=document.getElementById('result')
let inactivityTimeout=null;

// TestPara.textContent=paragraphs[Math.floor(Math.random()*paragraphs.length)];
let currentParagraph='';
function getRandomParagraph(){
    return paragraphs[Math.floor(Math.random()*paragraphs.length)];
}
function generateMixedParagraph(){
    const sentences = [];
    paragraphs.forEach(para=>{
        const paraSentences = para.split(/[.!?]+/).filter(s=>s.trim().length>0);
        sentences.push(...paraSentences);
    });
    for(let i=sentences.length-1; i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [sentences[i],sentences[j]] = [sentences[j],sentences[i]];

    }
    const sentenceCount = Math.floor(Math.random()*3)+3;
    const selectedSentences = sentences.slice(0,4);
    return selectedSentences.map(s=>s.trim()).join('. ')+ '.';

}
function generateWordBasedParagraph(){
    const allWords = [];
    paragraphs.forEach(para =>{
        const words = para.split(/\s+/).filter(word=>word.length>0);
        allWords.push(...words);
    });
    const uniqueWords = [...new Set(allWords)];
    for(let i = uniqueWords.length -1; i>0; i--){
        const j = Math.floor(Math.random()* (i+1));
        [uniqueWords[i],uniqueWords[j]]=[uniqueWords[j],uniqueWords[i]]
    }
    const wordCount = Math.floor(Math.random()*16);
    const selectedWords = uniqueWords.slice(0,10);
    if(selectedWords.length >0){
        selectedWords[0]=selectedWords[0].charAt(0).toUpperCase()+s
    }
    return selectedWords.join(' ')+'.';

}
function startNewTest(){
    const method = Math.floor(Math.random()*3);
    switch(method){
        case 0:
            currentParagraph=getRandomParagraph();
            break;
        case 1:
            currentParagraph=getRandomParagraph();
            break;
        case 2:
            currentParagraph=getRandomParagraph();
            break;
        default:
            currentParagraph=getRandomParagraph();
            
    }
    TestPara.textContent= currentParagraph;
    
   
  
}
startNewTest();
let userinput='';
document.addEventListener('keydown',e=>{
    
    if(e.key==="Backspace"){
        e.preventDefault();
        userinput=userinput.slice(0,-1);

    }else if(e.key.length===1){
        userinput+=e.key;
    }
    UpdateTypedOuptut()
});
let isRunning=false;
let timer=null
let elapsedTime=0;
function startTimer() {
if(!isRunning){
        startTime = Date.now()-elapsedTime;
        timer = setInterval(updateTimer, 100); 
        isRunning=true;
    }
    

}
function updateTimer() {
    const elapsed = (Date.now() - startTime) / 1000;
    // timerEl.textContent = `Time: ${elapsed.toFixed(1)} s`;
    const minutes=Math.floor((elapsed*60)/60);
    const seconds=Math.floor(elapsed)/60
   
    timerEl.textContent=`Timing:${minutes}:${seconds.toFixed(1)}`
}
function updateWPM() {
    const userinput=display.value
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 1000; // seconds
    const wordsTyped = userinput.trim().split(/\s+/).length;
    const wpm = Math.round((wordsTyped / elapsedTime) * 60);
    wpmEl.textContent = `WPM: ${wpm}`;
}
function stopTimer(){
    if(isRunning){
    clearInterval(timer);
    elapsedTime=Date.now()-startTime;
    isRunning=false;
    }
}

function UpdateTypedOuptut(){
    const original=TestPara.textContent;
    let displayHTML='';
    let correct = 0;
    let errors = 0;
    l
    for(let i=0;i<userinput.length;i++){
      if (userinput[i] === original[i]) {
            displayHTML += `<span style="color:green;">${original[i]}</span>`;
                correct++;
            //   if (original[i] === ' ' && userinput[i] === ' ') {
            //         // Space mistake → highlight background
            //         displayHTML += `<span style="background-color:lightgreen">${original[i]}</span>`;
            //     } 
        } else if (original[i] === ' ' || userinput[i] === ' ') {
                    // Space mistake → highlight background
                    displayHTML += `<span style="background-color:rgb(252, 217, 164);;color:red;">${original[i]}</span>`;
errors++;
         } else if(original[i] === ' ' && userinput[i] === ' ') {
                      displayHTML += `<span style="background-color:lightgreen">${original[i]}</span>`;
                }else{
  displayHTML += `<span style="color:red;">${original[i]}</span>`;
                
                errors++;
                }
            }

            
                    // Letter mistake → just red text, no background
                  
        
    displayHTML+= `<span  placeholder="Start Typing...">${original.slice(userinput.length)}</span>`;
 
    display.innerHTML=displayHTML;
    startTimer();
   
    
        if(!finished&&userinput.trimEnd()===original.trimEnd()){
            finished=true;
            clearInterval(timer);
            
           
            timerEl.classList.add('blink')
        }
    const accuracy=100-((errors/original.length)*100);
    accuracyEl.textContent=`Accuracy:${accuracy.toFixed(2)}%`
    const errorEl=document.getElementById('errors');
    errorEl.textContent=`Errors : ${errors}`
    clearTimeout(inactivityTimeout);
    inactivityTimeout=setTimeout(()=>{
   stopTimer()
    },5000);
    const currentTime = new Date();
    const elapsedTime = (Date.now() - startTime) / 1000; 
    const wordsTyped = userinput.trim().split(/\s+/).length ;
    const wpm = Math.round((wordsTyped / elapsedTime) * 60) ;
    wpmEl.textContent = `WPM: ${wpm}`;
     
    display.addEventListener("keydown",(e)=>{
if(e.key==='' || e.key==='space'){
    e.preventDefault();
    display.value=' '
    display.scrollTop = display.scrollHeight;  
display.selectionStart = display.selectionEnd = display.value.length;
display.focus(); 
  
}
})
    
}

function moveCaretToEnd(el) {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false); // place caret at the end
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function appendToDisplay(input){
    const display=document.getElementById('display');
    display.value+=input;
}
    const display=document.getElementById('display');

const result=document.getElementById('result');
const timerEl= document.getElementById('timer');

let startTime = null;
let timerId = null;
let finished=false;
let finshtime=0;
// display.addEventListener('keydown',function(event){
//     const userinput=document.getElementById('display');
//     const original=document.getElementById('Paragraph')
// const userinp=userinput.value;
// const oritxt=original.textContent;
//     if(!startTime){
//         startTime=Date.now()
//         paragraphs.style.display='none'
//         timerId=setInterval(updateTimer,100);
          
      
//     }
// })
;


display.addEventListener('keydown', function(event) {
    let key = event.key;
    const isCapsLockOn = event.getModifierState('CapsLock');


    if (key.length === 1 && /[a-zA-Z]/.test(key)) {
        
        const shouldUpper = (isCapsLockOn && !event.shiftKey) || (!isCapsLockOn && event.shiftKey);
        display.value += shouldUpper ? key.toUpperCase() : key.toLowerCase();

        event.preventDefault(); 
    }
    if (key.length === 1 ) {
        paragraphs.style.display='none';
    }    
})
function backspace(){
    const currentvalue=display.value;
    if(currentvalue.length>0){
        display.value=currentvalue.substring(0,currentvalue.length-1);
    }
     
      
}
document.addEventListener('keypress',function(event){
    const Keys=event.key;
    
    switch(Keys){
        case '`':
            appendToDisplay(Keys);
            document.getElementById('backticks').style.backgroundColor='blue';
            document.getElementById('backticks').style.color='white';
            document.getElementById('backticks').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('backticks').style.backgroundColor='';
            document.getElementById('backticks').style.color='';
            document.getElementById('backticks').style.fontStyle='';
      
            },190);

            break;
        case '1':
            appendToDisplay(Keys);
            document.getElementById('one').style.backgroundColor='blue';
            document.getElementById('one').style.color='white';
            document.getElementById('one').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('one').style.backgroundColor='';
            document.getElementById('one').style.color='';
            document.getElementById('one').style.fontStyle='';
      
            },190);
            break;
        case '2':
            appendToDisplay(Keys);
            document.getElementById('two').style.backgroundColor='blue';
            document.getElementById('two').style.color='white';
            document.getElementById('two').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('two').style.backgroundColor='';
            document.getElementById('two').style.color='';
            document.getElementById('two').style.fontStyle='';
      
            },190);
            break;
        case '3':
            appendToDisplay(Keys);
            document.getElementById('three').style.backgroundColor='blue';
            document.getElementById('three').style.color='white';
            document.getElementById('three').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('three').style.backgroundColor='';
            document.getElementById('three').style.color='';
            document.getElementById('three').style.fontStyle='';
      
            },190);
            break;
        case '4':
            appendToDisplay(Keys);
            document.getElementById('four').style.backgroundColor='blue';
            document.getElementById('four').style.color='white';
            document.getElementById('four').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('four').style.backgroundColor='';
            document.getElementById('four').style.color='';
            document.getElementById('four').style.fontStyle='';
      
            },190);
            break;
        case '5':
            appendToDisplay(Keys);
            document.getElementById('five').style.backgroundColor='blue';
            document.getElementById('five').style.color='white';
            document.getElementById('five').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('five').style.backgroundColor='';
            document.getElementById('five').style.color='';
            document.getElementById('five').style.fontStyle='';
      
            },190);
            break;
        case '6':
            appendToDisplay(Keys);
            document.getElementById('six').style.backgroundColor='blue';
            document.getElementById('six').style.color='white';
            document.getElementById('six').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('six').style.backgroundColor='';
            document.getElementById('six').style.color='';
            document.getElementById('six').style.fontStyle='';
      
            },190);
            break;
        case '7':
            appendToDisplay(Keys);
            document.getElementById('seven').style.backgroundColor='blue';
            document.getElementById('seven').style.color='white';
            document.getElementById('seven').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('seven').style.backgroundColor='';
            document.getElementById('seven').style.color='';
            document.getElementById('seven').style.fontStyle='';
      
            },190);
            break;
        case '8':
            appendToDisplay(Keys);
            document.getElementById('eight').style.backgroundColor='blue';
            document.getElementById('eight').style.color='white';
            document.getElementById('eight').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('eight').style.backgroundColor='';
            document.getElementById('eight').style.color='';
            document.getElementById('eight').style.fontStyle='';
      
            },190);
            break;
        case '9':
            appendToDisplay(Keys);
            document.getElementById('nine').style.backgroundColor='blue';
            document.getElementById('nine').style.color='white';
            document.getElementById('nine').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('nine').style.backgroundColor='';
            document.getElementById('nine').style.color='';
            document.getElementById('nine').style.fontStyle='';
      
            },190);
            break;
        case '0':
            appendToDisplay(Keys);
            document.getElementById('zero').style.backgroundColor='blue';
            document.getElementById('zero').style.color='white';
            document.getElementById('zero').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('zero').style.backgroundColor='';
            document.getElementById('zero').style.color='';
            document.getElementById('zero').style.fontStyle='';
      
            },190);
            break;
        case '-':
            appendToDisplay(Keys);
            document.getElementById('minus').style.backgroundColor='blue';
            document.getElementById('minus').style.color='white';
            document.getElementById('minus').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('minus').style.backgroundColor='';
            document.getElementById('minus').style.color='';
            document.getElementById('minus').style.fontStyle='';
      
            },190);
            break;
        case '=':
            appendToDisplay(Keys);
            document.getElementById('equal').style.backgroundColor='blue';
            document.getElementById('equal').style.color='white';
            document.getElementById('equal').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('equal').style.backgroundColor='';
            document.getElementById('equal').style.color='';
            document.getElementById('equal').style.fontStyle='';
      
            },190);
            break;
        case '    ':
            appendToDisplay(Keys);
            document.getElementById('tabkey').style.backgroundColor='blue';
            document.getElementById('tabkey').style.color='white';
            document.getElementById('tabkey').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('tabkey').style.backgroundColor='';
            document.getElementById('tabkey').style.color='';
            document.getElementById('tabkey').style.fontStyle='';
      
            },190);
            break;
        case 'q':
            appendToDisplay(Keys);
            document.getElementById('q').style.backgroundColor='blue';
            document.getElementById('q').style.color='white';
            document.getElementById('q').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('q').style.backgroundColor='';
            document.getElementById('q').style.color='';
            document.getElementById('q').style.fontStyle='';
      
            },190);
            break;
        case 'w':
            appendToDisplay(Keys);
            document.getElementById('w').style.backgroundColor='blue';
            document.getElementById('w').style.color='white';
            document.getElementById('w').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('w').style.backgroundColor='';
            document.getElementById('w').style.color='';
            document.getElementById('w').style.fontStyle='';
      
            },190);
            break;
        case 'e':
            appendToDisplay(Keys);
            document.getElementById('e').style.backgroundColor='blue';
            document.getElementById('e').style.color='white';
            document.getElementById('e').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('e').style.backgroundColor='';
            document.getElementById('e').style.color='';
            document.getElementById('e').style.fontStyle='';
      
            },190);
            break;
        case 'r':
            appendToDisplay(Keys);
            document.getElementById('r').style.backgroundColor='blue';
            document.getElementById('r').style.color='white';
            document.getElementById('r').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('r').style.backgroundColor='';
            document.getElementById('r').style.color='';
            document.getElementById('r').style.fontStyle='';
      
            },190);
            break;
        case 't':
            appendToDisplay(Keys);
            document.getElementById('t').style.backgroundColor='blue';
            document.getElementById('t').style.color='white';
            document.getElementById('t').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('t').style.backgroundColor='';
            document.getElementById('t').style.color='';
            document.getElementById('t').style.fontStyle='';
      
            },190);
            break;
        case 'y':
            appendToDisplay(Keys);
            document.getElementById('y').style.backgroundColor='blue';
            document.getElementById('y').style.color='white';
            document.getElementById('y').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('y').style.backgroundColor='';
            document.getElementById('y').style.color='';
            document.getElementById('y').style.fontStyle='';
      
            },190);
            break;
        case 'u':
            appendToDisplay(Keys);
            document.getElementById('u').style.backgroundColor='blue';
            document.getElementById('u').style.color='white';
            document.getElementById('u').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('u').style.backgroundColor='';
            document.getElementById('u').style.color='';
            document.getElementById('u').style.fontStyle='';
      
            },190);
            break;
        case 'i':
            appendToDisplay(Keys);
            document.getElementById('i').style.backgroundColor='blue';
            document.getElementById('i').style.color='white';
            document.getElementById('i').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('i').style.backgroundColor='';
            document.getElementById('i').style.color='';
            document.getElementById('i').style.fontStyle='';
      
            },190);
            break;
        case 'o':
            appendToDisplay(Keys);
            document.getElementById('o').style.backgroundColor='blue';
            document.getElementById('o').style.color='white';
            document.getElementById('o').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('o').style.backgroundColor='';
            document.getElementById('o').style.color='';
            document.getElementById('o').style.fontStyle='';
      
            },190);
            break;
        case 'p':
            appendToDisplay(Keys);
            document.getElementById('p').style.backgroundColor='blue';
            document.getElementById('p').style.color='white';
            document.getElementById('p').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('p').style.backgroundColor='';
            document.getElementById('p').style.color='';
            document.getElementById('p').style.fontStyle='';
      
            },190);
            break;
        case '[':
            appendToDisplay(Keys);
            document.getElementById('osb').style.backgroundColor='blue';
            document.getElementById('osb').style.color='white';
            document.getElementById('osb').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('osb').style.backgroundColor='';
            document.getElementById('osb').style.color='';
            document.getElementById('osb').style.fontStyle='';
      
            },190);
            break;
        case ']':
            appendToDisplay(Keys);
            document.getElementById('csb').style.backgroundColor='blue';
            document.getElementById('csb').style.color='white';
            document.getElementById('csb').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('csb').style.backgroundColor='';
            document.getElementById('csb').style.color='';
            document.getElementById('csb').style.fontStyle='';
      
            },190);
            break;
        case '\\':
            appendToDisplay(Keys);
            
            document.getElementById('backlash').style.backgroundColor='blue';
            document.getElementById('backlash').style.color='white';
            document.getElementById('backlash').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('backlash').style.backgroundColor='';
            document.getElementById('backlash').style.color='';
            document.getElementById('backlash').style.fontStyle='';
      
            },190);
            break;
        case 'a':
            appendToDisplay(Keys);
            document.getElementById('a').style.backgroundColor='blue';
            document.getElementById('a').style.color='white';
            document.getElementById('a').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('a').style.backgroundColor='';
            document.getElementById('a').style.color='';
            document.getElementById('a').style.fontStyle='';
      
            },190);
            break;
        case 's':
            appendToDisplay(Keys);
            document.getElementById('s').style.backgroundColor='blue';
            document.getElementById('s').style.color='white';
            document.getElementById('s').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('s').style.backgroundColor='';
            document.getElementById('s').style.color='';
            document.getElementById('s').style.fontStyle='';
      
            },190);
            break;
        case 'd':
            appendToDisplay(Keys);
            document.getElementById('d').style.backgroundColor='blue';
            document.getElementById('d').style.color='white';
            document.getElementById('d').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('d').style.backgroundColor='';
            document.getElementById('d').style.color='';
            document.getElementById('d').style.fontStyle='';
      
            },190);
            break;
        case 'f':
            appendToDisplay(Keys);
            document.getElementById('f').style.backgroundColor='blue';
            document.getElementById('f').style.color='white';
            document.getElementById('f').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('f').style.backgroundColor='';
            document.getElementById('f').style.color='';
            document.getElementById('f').style.fontStyle='';
      
            },190);
            break;
        case 'g':
            appendToDisplay(Keys);
            document.getElementById('g').style.backgroundColor='blue';
            document.getElementById('g').style.color='white';
            document.getElementById('g').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('g').style.backgroundColor='';
            document.getElementById('g').style.color='';
            document.getElementById('g').style.fontStyle='';
      
            },190);
            break;
         case 'h':
            appendToDisplay(Keys);
            document.getElementById('h').style.backgroundColor='blue';
            document.getElementById('h').style.color='white';
            document.getElementById('h').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('h').style.backgroundColor='';
            document.getElementById('h').style.color='';
            document.getElementById('h').style.fontStyle='';
      
            },190);
            break;
         case 'j':
            appendToDisplay(Keys);
            document.getElementById('j').style.backgroundColor='blue';
            document.getElementById('j').style.color='white';
            document.getElementById('j').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('j').style.backgroundColor='';
            document.getElementById('j').style.color='';
            document.getElementById('j').style.fontStyle='';
      
            },190);
            break;
         case 'k':
            appendToDisplay(Keys);
            document.getElementById('k').style.backgroundColor='blue';
            document.getElementById('k').style.color='white';
            document.getElementById('k').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('k').style.backgroundColor='';
            document.getElementById('k').style.color='';
            document.getElementById('k').style.fontStyle='';
      
            },190);
            break;
         case 'l':
            appendToDisplay(Keys);
            document.getElementById('l').style.backgroundColor='blue';
            document.getElementById('l').style.color='white';
            document.getElementById('l').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('l').style.backgroundColor='';
            document.getElementById('l').style.color='';
            document.getElementById('l').style.fontStyle='';
      
            },190);
            break;
         case ';':
            appendToDisplay(Keys);
            document.getElementById(';').style.backgroundColor='blue';
            document.getElementById(';').style.color='white';
            document.getElementById(';').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById(';').style.backgroundColor='';
            document.getElementById(';').style.color='';
            document.getElementById(';').style.fontStyle='';
      
            },190);
            break;
         case '\'':
            appendToDisplay(Keys);
            document.getElementById('sq').style.backgroundColor='blue';
            document.getElementById('sq').style.color='white';
            document.getElementById('sq').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('sq').style.backgroundColor='';
            document.getElementById('sq').style.color='';
            document.getElementById('sq').style.fontStyle='';
      
            },190);
            break;
         case 'z':
            appendToDisplay(Keys);
            document.getElementById('z').style.backgroundColor='blue';
            document.getElementById('z').style.color='white';
            document.getElementById('z').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('z').style.backgroundColor='';
            document.getElementById('z').style.color='';
            document.getElementById('z').style.fontStyle='';
      
            },190);
            break;
         case 'x':
            appendToDisplay(Keys);
            document.getElementById('x').style.backgroundColor='blue';
            document.getElementById('x').style.color='white';
            document.getElementById('x').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('x').style.backgroundColor='';
            document.getElementById('x').style.color='';
            document.getElementById('x').style.fontStyle='';
      
            },190);
            break;
         case 'c':
            appendToDisplay(Keys);
            document.getElementById('c').style.backgroundColor='blue';
            document.getElementById('c').style.color='white';
            document.getElementById('c').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('c').style.backgroundColor='';
            document.getElementById('c').style.color='';
            document.getElementById('c').style.fontStyle='';
      
            },190);
            break;
         case 'v':
            appendToDisplay(Keys);
            document.getElementById('v').style.backgroundColor='blue';
            document.getElementById('v').style.color='white';
            document.getElementById('v').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('v').style.backgroundColor='';
            document.getElementById('v').style.color='';
            document.getElementById('v').style.fontStyle='';
      
            },190);
            break;
         case 'b':
            appendToDisplay(Keys);
            document.getElementById('b').style.backgroundColor='blue';
            document.getElementById('b').style.color='white';
            document.getElementById('b').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('b').style.backgroundColor='';
            document.getElementById('b').style.color='';
            document.getElementById('b').style.fontStyle='';
      
            },190);
            break;
         case 'n':
            appendToDisplay(Keys);
            document.getElementById('n').style.backgroundColor='blue';
            document.getElementById('n').style.color='white';
            document.getElementById('n').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('n').style.backgroundColor='';
            document.getElementById('n').style.color='';
            document.getElementById('n').style.fontStyle='';
      
            },190);
            break;
         case 'm':
            appendToDisplay(Keys);
            document.getElementById('m').style.backgroundColor='blue';
            document.getElementById('m').style.color='white';
            document.getElementById('m').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('m').style.backgroundColor='';
            document.getElementById('m').style.color='';
            document.getElementById('m').style.fontStyle='';
      
            },190);
            break;
         case ',':
            appendToDisplay(Keys);
            document.getElementById('coma').style.backgroundColor='blue';
            document.getElementById('coma').style.color='white';
            document.getElementById('coma').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('coma').style.backgroundColor='';
            document.getElementById('coma').style.color='';
            document.getElementById('coma').style.fontStyle='';
      
            },190);
            break;
         case '.':
            appendToDisplay(Keys);
            document.getElementById('dot').style.backgroundColor='blue';
            document.getElementById('dot').style.color='white';
            document.getElementById('dot').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('dot').style.backgroundColor='';
            document.getElementById('dot').style.color='';
            document.getElementById('dot').style.fontStyle='';
      
            },190);
            break;
         case '/':
            appendToDisplay(Keys);
            document.getElementById('fwslh').style.backgroundColor='blue';
            document.getElementById('fwslh').style.color='white';
            document.getElementById('fwslh').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('fwslh').style.backgroundColor='';
            document.getElementById('fwslh').style.color='';
            document.getElementById('fwslh').style.fontStyle='';
      
            },190);
            break;
         case ' ':
            appendToDisplay(Keys);
            document.getElementById('space').style.backgroundColor='blue';
            document.getElementById('space').style.color='white';
            document.getElementById('space').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('space').style.backgroundColor='';
            document.getElementById('space').style.color='';
            document.getElementById('space').style.fontStyle='';
      
            },190);
            break;
       
        
         
    
    
    
    
        

    }

})
document.addEventListener('keydown',function(event){
 const backs=event.key;
 if(backs==='Backspace'){
    backspace();
    
            document.getElementById('backspace').style.backgroundColor='blue';
            document.getElementById('backspace').style.color='white';
            document.getElementById('backspace').style.fontStyle='bold';
            setTimeout(()=>{
                 document.getElementById('backspace').style.backgroundColor='';
            document.getElementById('backspace').style.color='';
            document.getElementById('backspace').style.fontStyle='';},190);

      

 }

})
// let isCapsLockOn=false;
// document.getElementById('capslock').addEventListener('keydown',()=>{
//     isCapsLockOn=!isCapsLockOn;
//     updatekeys()
// })
// function updatekeys(){
//     const letters=document.querySelectorAll('#tabandRow','#Capsandkeys','#Shiftandkeys');
//     letters.forEach(btn=>{
//         const inp=btn.textContent.trim();
//         if(inp.length===1 && /[a-zA-Z]/.test(inp)){
//             btn.textContent=isCapsLockOn?inp.toUpperCase() :inp.toLowerCase() ;
//         }    })
// }
// document.getElementById('capslock').addEventListener('keyup',()=>{
//     isCapsLockOn=!isCapsLockOn;
//     updatekeys()
// })
// function updatekeys(){
//     const letters=document.querySelectorAll('#tabandRow','#Capsandkeys','#Shiftandkeys');
//     letters.forEach(btn=>{
//         const inp=btn.textContent.trim();
//         if(inp.length===1 && /[a-zA-Z]/.test(inp)){
//             btn.textContent=isCapsLockOn?inp.toUpperCase() :inp.toLowerCase() ;
//         }    })
// // }
// display.addEventListener('keyup',function(event){
//     display.value=event.target;
//     const isCapsLockOn=event.getModifierState('CapsLock');
//     if(isCapsLockOn){
//         display.value=input.toUpperCase();
    
//     }else{
//          display.value=input.toLowerCase();

//     }
// })