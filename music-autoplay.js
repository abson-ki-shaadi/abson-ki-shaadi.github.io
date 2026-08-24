/* #ABSON — START MUSIC WHEN THE MAIN PAGE OPENS */
(function(){
  function setupMusic(){
    const music=document.getElementById('weddingMusic');
    const musicBtn=document.getElementById('musicBtn');
    const enterBtn=document.getElementById('enterBtn');
    if(!music)return;

    music.loop=true;
    music.volume=0.8;

    function markPlaying(){
      if(musicBtn){
        musicBtn.textContent='♫ MUSIC ON';
        musicBtn.classList.add('playing');
      }
    }

    function markOff(){
      if(musicBtn){
        musicBtn.textContent='♪ MUSIC';
        musicBtn.classList.remove('playing');
      }
    }

    function startMusic(){
      const p=music.play();
      if(p&&typeof p.then==='function'){
        p.then(markPlaying).catch(()=>{});
      }else{
        markPlaying();
      }
    }

    /* Try immediately. Browsers may block audible autoplay. */
    startMusic();

    /* The opening-screen button is a real user gesture, so this reliably
       starts music on phones when the visitor enters the main page. */
    if(enterBtn){
      enterBtn.addEventListener('click',startMusic,{once:true});
    }

    /* Also start on the first normal user interaction if autoplay was blocked. */
    const unlock=()=>{
      startMusic();
      document.removeEventListener('pointerdown',unlock);
      document.removeEventListener('touchstart',unlock);
      document.removeEventListener('keydown',unlock);
    };
    document.addEventListener('pointerdown',unlock,{passive:true});
    document.addEventListener('touchstart',unlock,{passive:true});
    document.addEventListener('keydown',unlock,{passive:true});

    if(musicBtn){
      musicBtn.addEventListener('click',()=>{
        if(music.paused){
          startMusic();
        }else{
          music.pause();
          markOff();
        }
      });
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',setupMusic,{once:true});
  }else{
    setupMusic();
  }
})();
