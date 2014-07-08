
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 30);
          };
})();

(function animloop(){
  requestAnimFrame(animloop);
  render();
  calculate_degredation();
})();


// Create mission
/*
function create_mission() {

    var c = 0;
    document.addEvent('second', function() {
        ++c;
        if(c == 5) {

            if(system.shields.online == true) {
                console.log('you won');
            }else{
                console.log('you failed');
            }

        }
    });

    // create a timer that runs a function on call back
}
*/
