document.addEventListener('DOMContentLoaded',function(){
  const style=document.createElement('style');
  style.id='abson-guest-wall-final-fix';
  style.textContent=`
    #guest-wall{position:relative!important;overflow:hidden!important}
    #guest-wall .guest-wall-toolbar{width:min(1240px,92vw)!important;margin:28px auto 14px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:20px!important}
    #guest-wall .guest-wall-label{display:inline-flex!important;align-items:center!important;font-size:11px!important;font-weight:900!important;letter-spacing:.16em!important;text-transform:uppercase!important;color:#171717!important}
    #guest-wall .guest-wall-label:before{content:''!important;display:inline-block!important;width:11px!important;height:11px!important;background:#d71920!important;border-radius:50%!important;margin-right:9px!important}
    #guestWallViewport{width:min(1240px,92vw)!important;margin:0 auto!important;overflow:hidden!important}
    #guestWallGrid{display:flex!important;flex-wrap:nowrap!important;gap:0!important;width:100%!important;overflow:visible!important;transition:transform .38s cubic-bezier(.2,.8,.2,1)!important;align-items:stretch!important}
    #guestWallGrid .guest-wall-card{display:flex!important;flex:0 0 100%!important;width:100%!important;min-width:100%!important;max-width:100%!important;box-sizing:border-box!important;flex-direction:column!important;background:#fff!important;border:2px solid #171717!important;box-shadow:7px 7px 0 #171717!important;overflow:hidden!important}
    #guestWallGrid .guest-wall-open{display:block!important;width:100%!important;padding:0!important;margin:0!important;border:0!important;background:#f4f4f4!important;cursor:pointer!important;line-height:0!important}
    #guestWallGrid .guest-wall-media{display:flex!important;width:100%!important;min-height:260px!important;max-height:68vh!important;align-items:center!important;justify-content:center!important;background:#f4f4f4!important;overflow:hidden!important}
    #guestWallGrid .guest-wall-media img,#guestWallGrid .guest-wall-media video{display:block!important;width:100%!important;height:auto!important;max-width:100%!important;max-height:68vh!important;object-fit:contain!important;background:#f4f4f4!important}
    #guestWallGrid .guest-wall-meta{display:flex!important;align-items:flex-end!important;justify-content:space-between!important;gap:20px!important;padding:18px 20px 16px!important;background:#fff!important;border-top:1px solid #ddd!important}
    #guestWallGrid .guest-wall-meta strong{font-size:14px!important;font-weight:900!important;letter-spacing:.08em!important;text-transform:uppercase!important}
    #guestWallGrid .guest-wall-meta span{font-size:10px!important;color:#777!important;letter-spacing:.12em!important;text-transform:uppercase!important}
    #guestWallControls{width:min(1240px,92vw)!important;margin:20px auto 0!important;display:grid!important;grid-template-columns:52px 1fr 52px!important;gap:10px!important;align-items:center!important}
    #guestWallControls button{height:52px!important;border:2px solid #171717!important;background:#ffd447!important;color:#171717!important;box-shadow:4px 4px 0 #171717!important;font:700 28px/1 Arial,sans-serif!important;cursor:pointer!important}
    #guestWallCounter{text-align:center!important;font:700 11px 'DM Sans',sans-serif!important;letter-spacing:.2em!important}
    #guestWallDots{display:flex!important;justify-content:center!important;gap:7px!important;margin-top:12px!important}
    #guestWallDots button{width:7px!important;height:7px!important;min-width:7px!important;padding:0!important;border:0!important;border-radius:50%!important;background:#bbb!important;box-shadow:none!important}
    #guestWallDots button.active{background:#171717!important;transform:scale(1.3)!important}
    #guest-wall .guest-wall-empty{display:flex!important;grid-column:auto!important;width:min(1240px,92vw)!important;min-height:190px!important;margin:0 auto!important;box-sizing:border-box!important;flex:0 0 100%!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;text-align:center!important;background:#ffd447!important;border:2px dashed #171717!important;padding:30px!important;font:clamp(28px,5vw,52px)/.95 'Bebas Neue',sans-serif!important}
    #guest-wall .guest-wall-empty span{display:block!important;margin-top:15px!important;font:16px/1.5 'DM Sans',sans-serif!important}
    @media(max-width:700px){
      #guest-wall .guest-wall-toolbar{width:90vw!important;margin:22px auto 14px!important;display:block!important}
      #guest-wall .guest-wall-label{font-size:10px!important}
      #guestWallViewport{width:90vw!important}
      #guestWallGrid .guest-wall-card{box-shadow:5px 5px 0 #171717!important}
      #guestWallGrid .guest-wall-media{min-height:220px!important;max-height:none!important}
      #guestWallGrid .guest-wall-media img,#guestWallGrid .guest-wall-media video{max-height:none!important;width:100%!important;height:auto!important;object-fit:contain!important}
      #guestWallGrid .guest-wall-meta{padding:14px 14px 13px!important;display:block!important}
      #guestWallGrid .guest-wall-meta strong{display:block!important;font-size:13px!important}
      #guestWallGrid .guest-wall-meta span{display:block!important;margin-top:6px!important;font-size:9px!important}
      #guestWallControls{width:90vw!important;grid-template-columns:44px 1fr 44px!important;gap:8px!important;margin-top:16px!important}
      #guestWallControls button{height:46px!important;font-size:25px!important}
      #guest-wall .guest-wall-empty{width:90vw!important;min-height:170px!important;padding:24px!important;font-size:34px!important}
      #guest-wall .guest-wall-empty span{font-size:13px!important;max-width:290px!important}
    }
  `;
  document.head.appendChild(style);
});