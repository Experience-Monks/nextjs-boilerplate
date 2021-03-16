/**
 * Lock and unlock body scroll within page
 */

 const root = document.documentElement;

 function lockBodyScroll() {
   root.style.setProperty('--body-scroll', 'hidden');
 }
 
 function unlockBodyScroll() {
   root.style.setProperty('--body-scroll', 'auto');
 }
 
 export { lockBodyScroll, unlockBodyScroll };