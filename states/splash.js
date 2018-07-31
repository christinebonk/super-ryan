splash.prototype = {
loadScripts: function(){

}, 
loadBgm: function() {

},
loadImages: function(){

},
loadFonts: function(){
    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadBgm();
}
};