/* #ABSON CAMERA ROLL RUNTIME FIX */
(function(){
  var ORIGINAL='script-core.js';
  var started=false;
  function runFix(){
    if(started)return;
    started=true;
    var style=document.createElement('style');
    style.textContent='@media(max-width:700px){#guest-wall .guest-wall-grid{width:100%!important;max-width:100%!important}#guest-wall .guest-wall-card{width:100%!important;min-width:100%!important;box-sizing:border-box!important}#guest-wall .guest-wall-open{display:block!important;width:100%!important;min-width:100%!important;box-sizing:border-box!important;padding:0!important;margin:0!important}#guest-wall .guest-wall-media img{display:block!important;width:100%!important;height:auto!important;max-width:100%!important}}';
    document.head.appendChild(style);
    var cache={};
    function eager(img){
      if(!img||!img.src)return;
      img.loading='eager';
      img.removeAttribute('loading');
      img.decoding='async';
      var url=img.currentSrc||img.src;
      if(cache[url])return;
      cache[url]=true;
      var p=new Image();
      p.decoding='async';
      p.src=url;
    }
    function scan(){
      var grid=document.getElementById('guestWallGrid');
      if(!grid)return;
      grid.querySelectorAll('img.guest-wall-media, .guest-wall-media img').forEach(eager);
      grid.querySelectorAll('.guest-wall-card img').forEach(eager);
    }
    var obs=new MutationObserver(function(){scan()});
    function start(){
      var grid=document.getElementById('guestWallGrid');
      if(grid){obs.observe(grid,{childList:true,subtree:true,attributes:true,attributeFilter:['src','loading']});scan();return true}
      return false;
    }
    if(!start()){
      var bodyObs=new MutationObserver(function(){if(start())bodyObs.disconnect()});
      bodyObs.observe(document.body,{childList:true,subtree:true});
    }
    setTimeout(scan,100);
    setTimeout(scan,500);
    setTimeout(scan,1500);
  }
  function loadOriginal(){
    var s=document.createElement('script');
    s.src=ORIGINAL;
    s.onload=runFix;
    s.onerror=function(){console.error('#ABSON: unable to load core script')};
    document.head.appendChild(s);
  }
  if(document.readyState==='loading'){
    loadOriginal();
  }else{
    var originalAdd=document.addEventListener.bind(document);
    document.addEventListener=function(type,listener,options){
      if(type==='DOMContentLoaded'&&typeof listener==='function'){
        queueMicrotask(function(){listener(new Event('DOMContentLoaded'))});
        return;
      }
      return originalAdd(type,listener,options);
    };
    loadOriginal();
  }
})();