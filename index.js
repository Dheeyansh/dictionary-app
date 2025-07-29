const form=document.querySelector('form')
const resultDiv=document.querySelector('.result');





form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo= async (word)=>{
    resultDiv.style.display="block";
    try{
        resultDiv.innerHTML=`<div class="loader"></div>`
        const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        const data= await response.json();
        const definitionData = data[0].meanings[0].definitions[0];
     
        resultDiv.innerHTML = `
          <h2><strong>Word:</strong> ${data[0].word}</h2>
          <p class="Part"> ${data[0].meanings[0].partOfSpeech}</p>
          <p><strong>Meaning:</strong> ${definitionData.definition===undefined?"Not Found":definitionData.definition}</p>
     
          <p><strong>Example:</strong> ${definitionData.example ===undefined?"Not Found":definitionData.example }</p>
          <p><strong>Antonyms:</strong></p>
        `;
        
        if(definitionData.antonyms.length === 0){
         resultDiv.innerHTML+=`<span>Not Found</span>`
        }
        else{
          for(let i=0;i<definitionData.antonyms.length;i++){
             resultDiv.innerHTML+=`<li>${definitionData.antonyms[i]}</li>`
        }
        }
     
     // audio
     const audioUrl = data[0].phonetics.find(p => p.audio)?.audio;
     
     if (audioUrl) {
         resultDiv.innerHTML += `
          <div class="audio">
          <p><strong>Pronunciation:</strong></p>
          <p >
          <audio controls class="audio-player">
            <source src="${audioUrl}" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </p>
          </div>
         
         `;
       } else {
         resultDiv.innerHTML += `<p><strong>Pronunciation:</strong> Not available</p>`;
       }
     //    Adding read more button
     resultDiv.innerHTML += `<div>
     <p><a href="${data[0].sourceUrls[0]}" target="_blank">🔗 Read More</a></p>
     
     </div>`;
     form.elements[0].value='';
     
     //audio
     
    }
    catch(error){
            resultDiv.innerHTML=`<p>Sorry,the word could not be found</p>
            `
            console.log(error);
    }
   


  
  



}