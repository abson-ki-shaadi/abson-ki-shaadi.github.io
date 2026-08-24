document.addEventListener('DOMContentLoaded',function(){
  /* Camera Roll / Evidence section intentionally removed from the page. */
  const section=document.getElementById('guest-photos');
  if(section) section.remove();

  /* Remove the navigation item that points to the removed section. */
  document.querySelectorAll('a[href="#guest-photos"]').forEach(function(link){
    const navItem=link.closest('li');
    if(navItem) navItem.remove();
    else link.remove();
  });
});