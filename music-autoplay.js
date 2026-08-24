/* #ABSON — MUSIC AUTOPLAY + RELIABLE PLAY/PAUSE CONTROL */
(function(){
  function setupMusic(){
    const music=document.getElementById('weddingMusic');
    const musicBtn=document.getElementById('musicBtn');
    const enterBtn=document.getElementById('enterBtn');
    if(!music)return;

    /* Use the newly uploaded song in the repository. */
    music.src='Din%20Shagna%20Da%20Phillauri%20320%20Kbps%20%28mp3cut.net%29.mp3';
    music.loop=true;
    music.volume=0.8;
    music.load();

    function markPlaying(){
      if(!musicBtn)return;
      musicBtn.textContent='⏸ PAUSE';
      musicBtn.classList.add('playing');
      musicBtn.setAttribute('aria-label','Pause music');
      musicBtn.setAttribute('title','Pause music');
    }

    function markOff(){
      if(!musicBtn)return;
      musicBtn.textContent='♪ MUSIC';
      musicBtn.classList.remove('playing');
      musicBtn.setAttribute('aria-label','Play music');
      musicBtn.setAttribute('title','Play music');
    }

    function startMusic(){
      const p=music.play();
      if(p&&typeof p.then==='function'){
        p.then(markPlaying).catch(()=>{});
      }
    }

    function toggleMusic(event){
      if(event){
        event.preventDefault();
        event.stopPropagation();
        if(event.stopImmediatePropagation)event.stopImmediatePropagation();
      }

      if(music.paused){
        startMusic();
      }else{
        music.pause();
        markOff();
      }
    }

    /* Try autoplay. Browsers may block audible autoplay until interaction. */
    startMusic();

    /* The existing entrance button is an allowed user gesture. */
    if(enterBtn){
      enterBtn.addEventListener('click',startMusic,{once:true});
    }

    /* Unlock autoplay on the first user interaction, but NEVER interfere
       with the Music button itself. */
    const unlock=(event)=>{
      if(musicBtn && event && event.target && event.target.closest && event.target.closest('#musicBtn')){
        return;
      }
      if(music.paused)startMusic();
      document.removeEventListener('pointerdown',unlock,true);
      document.removeEventListener('touchstart',unlock,true);
      document.removeEventListener('keydown',unlock,true);
    };

    document.addEventListener('pointerdown',unlock,true);
    document.addEventListener('touchstart',unlock,true);
    document.addEventListener('keydown',unlock,true);

    if(musicBtn){
      /* Capture phase ensures this toggle wins over other page handlers. */
      musicBtn.addEventListener('click',toggleMusic,true);
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