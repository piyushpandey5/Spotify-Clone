console.log("Welcome to Spoitify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/01_SHRI_HANUMAN_CHALISA.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName : 'Hanuman_Chalisa', filePath:'songs/01_SHRI_HANUMAN_CHALISA.mp3', coverPath:"covers/11.jpg"},
    {songName : 'SANKAT_MOCHAN_HANUMAN', filePath:'songs/02_SANKAT_MOCHAN_HANUMAN.mp3', coverPath:"covers/2.jpg"},
    {songName : 'BAJRANG_BAAN', filePath:'songs/03_BAJRANG_BAAN.mp3', coverPath:"covers/3.jpg"},
    {songName : 'SHRI_HANUMAN_SATAWAN', filePath:'songs/04_SHRI_HANUMAN_SATAWAN.mp3', coverPath:"covers/4.jpg"},
    {songName : 'HEY_BAJRANG_BALI_HANUMAN', filePath:'songs/05_HEY_BAJRANG_BALI_HANUMAN.mp3', coverPath:"covers/5.jpg"},
    {songName : 'JAI_JAI_HANUMAN_GOSAI', filePath:'songs/06_JAI_JAI_HANUMAN_GOSAI.mp3', coverPath:"covers/6.jpg"},
    {songName : 'MANGAL_MURTI_MARUTI_NANDAN', filePath:'songs/07_MANGAL_MURTI_MARUTI_NANDAN.mp3', coverPath:"covers/7.jpg"},
    {songName : 'PAVAN_SUT_VINTI_BARAMBAAR', filePath:'songs/08_PAVAN_SUT_VINTI_BARAMBAAR.mp3', coverPath:"covers/8.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText = songs[i].songName;   
})

// audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeUpdate');
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    // console.log(progress);
    myProgressbar.value = progress;
})

myProgressbar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressbar.value*audioElement.duration/100;
})

const makeAllPlays =()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        //for changing song name
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

//For next button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>6){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    
    audioElement.src = `songs/${songIndex+1}.mp3`;
    //for changing song name
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

//For previous button
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 7;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    //for changing song name
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})