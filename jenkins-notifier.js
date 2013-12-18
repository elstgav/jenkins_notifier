/*!
 * Jenkins Notifier v0.0
 *
 * @authors: Alex Ross, Gavin Elster
 *
 * Released under the MIT license
 */

var fg = new Array();
fg[0] = "http://files.myopera.com/pvishness/blog/running.gif"
fg[1]= "http://www.picgifs.com/smileys/smileys-and-emoticons/car-driving/smileys-car-driving-120054.gif";
fg[2]= "http://www.cleanupflorida.com/sitebuildercontent/sitebuilderpictures/FloridaCrooks.gif";
fg[3]= "http://r11.imgfast.net/users/1117/26/76/98/smiles/589189497.gif";
fg[4]= "http://img.mcf.li/icons/nyancat.gif";

var cpp = new Array();

cpp[0] = "http://www.pixeljoint.com/files/icons/dino_run.gif";
cpp[1] = "http://startropics.com/images/enemies/boulder.gif";
cpp[2] = "http://www.mokkaownersclub.co.uk/forum/uploads/36/police_car_by_pjuk-d337lxr.gif";
cpp[3] = "http://startropics.com/images/enemies/fire.gif";
cpp[4] = "http://bbsimg.ngfiles.com/2/9234000/ngbbs4495f5817f956.gif";

var bad_gif = "http://images.wikia.com/callofduty/images/archive/a/a9/20091224031717!Tactical_Nuke_inventory_icon_MW2.gif";
var good_gif = "http://fc08.deviantart.net/fs70/f/2011/326/0/9/spinning_awesome_smiley_by_hyperhippy92-d4gzhs9.gif";


var fc = document.getElementsBySelector("img[title='In progress']")[0];
fc.style.left = "0px";
fc.style.bottom = "0px";
fc.style.position = "fixed";
fc.setAttribute("height","50");
fc.setAttribute("width","50");


var cp = document.createElement("img");
cp.setAttribute("src",cpp[Math.floor(Math.random()*(cpp.length))]);
cp.setAttribute("height","70");
cp.setAttribute("width","70");
cp.style.bottom = "-7px";
cp.style.position = "fixed";

document.body.appendChild(cp);

var ipos = 0;
var cpos = 0;

var runi=setInterval(function(){

  if((cpos-80) > ipos || ipos>window.innerWidth){

    ipos = 0;
    cp.setAttribute("src",cpp[Math.floor(Math.random()*(cpp.length))]);
    cpos = 0;
    fc.setAttribute("src",fg[Math.floor(Math.random()*(fg.length))]);
  }
  fc.style.left = ipos+"px";
  cp.style.left = (cpos-100)+"px";
  ipos+= Math.random()*6;
  cpos+= Math.random()*6;
},100);


var havePermission=window.webkitNotifications.checkPermission();if(havePermission!=0){window.webkitNotifications.requestPermission();}

function get_message(text){
  var errMsg = text.match(/\d+\) (Failure|Error):\n\s*?([A-z0-9\_\-]+)\S\([A-z]+\)/);

  if(errMsg.length == 4){
    return errMsg[1], errMsg[2]+" -- "+errMsg[3];
  }else{
    return "Error", "Error in "+document.title;
  }

}

function setSmiley(){
  fc.setAttribute("src",good_gif);
  //clearInterval(runi);
}

function setBad(){
  fc.setAttribute("src",bad_gif);
}

function dispatch_msg_jenk(title,mes_1,mes_2){
  var mes=window.webkitNotifications.createNotification(title,mes_1,mes_2);
  mes.show();
  setTimeout(function(){mes.cancel()},5000);
}

function screen_response(text){
  console.log("screened");
  console.log(text);
  if(text.indexOf("Error:")!=-1||text.indexOf("Failure:")!=-1||text.indexOf("ERROR ")!=-1){
    console.log("Base exception found in");
    console.log(text);
    var processed = get_message(text);
    dispatch_msg_jenk("JENKERR", processed[0], processed[1]);
    setBad();
  }
  if(text.indexOf("SUCCESS")!=-1){
    dispatch_msg_jenk("JENKSUCC", "Jenkins Passed", "With flying Colors!!!");
    setSmiley();
  }
}

fc.setAttribute("src",fg[Math.floor(Math.random()*(fg.length))]);



Ajax.Responders.register({
    onComplete: function(a,b,c) {
      var count =  Ajax.activeRequestCount--;
      if(b.responseText != ""){
        screen_response(b.responseText);
      }
    }
});

console.log("whiny loaded");