/* #ABSON — MUSIC AUTOPLAY + PLAY/PAUSE CONTROL */
(function(){
  function setupMusic(){
    const music=document.getElementById('weddingMusic');
    const musicBtn=document.getElementById('musicBtn');
    const enterBtn=document.getElementById('enterBtn');
    if(!music)return;

    /* Use the newly uploaded song in the repository. */
    music.src='Din%20Shagna%20Da%20Phillauri%20320%20Kbps%20%28mp3cut.net%29.mp3';
    music.load();
    music.loop=true;
    music.volume=0.8;

    function markPlaying(){
      if(musicBtn){
        musicBtn.textContent='⏸ PAUSE';
        musicBtn.classList.add('playing');
        musicBtn.setAttribute('aria-label','Pause music');
        musicBtn.setAttribute('title','Pause music');
      }
    }

    function markOff(){
      if(musicBtn){
        musicBtn.textContent='♪ MUSIC';
        musicBtn.classList.remove('playing');
        musicBtn.setAttribute('aria-label','Play music');
        musicBtn.setAttribute('title','Play music');
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

    startMusic();

    if(enterBtn){
      enterBtn.addEventListener('click',startMusic,{once:true});
    }

    const unlock=()=>{
      if(music.paused)startMusic();
      document.removeEventListener('pointerdown',unlock);
      document.removeEventListener('touchstart',unlock);
      document.removeEventListener('keydown',unlock);
    };

    document.addEventListener('pointerdown',unlock,{passive:true});
    document.addEventListener('touchstart',unlock,{passive:true});
    document.addEventListener('keydown',unlock,{passive:true});

    if(musicBtn){
      musicBtn.addEventListener('click',(event)=>{
        event.preventDefault();
        event.stopPropagation();

        if(music.paused){
          startMusic();
        }else{
          music.pause();
          markOff();
        }
      });
    }

    music.addEventListener('play',markPlaying);
    music.addEventListener('pause',markOff);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',setupMusic,{once:true});
  }else{
    setupMusic();
  }
})();
