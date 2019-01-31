"use strict";

/**
 * deviceOrientation
 * Revealing Module Pattern (s. S. 746 'JavaScript - Das umfassende Handbuch', Rheinwerk, Philip Ackermann)
 * Ziel: Variablen und Wertverändernde Funktionen aus dem globalen window Bereich entfernen, damit der
 *       Zugriff geschützt ist; Werte können nur noch über die Methoden von außerhalb verändert werden.
 *       Die ODER Notation erfordert die Verwendung von 'var' anstelle von 'let' und unterbindet
 *       weitere Instanzen - quasi ein Singleton Entwurfsmuster (s. S. 744)
 *
 *  Werte für DeviceOrientation führen mit entsprechendem Setter und Getter
 *
 * @type {{setValues, getValues}}
 */
var deviceOrientation = deviceOrientation || (function () {
  let alpha = 0, beta = 0, gamma = 0;

  function setValues(a, b, g) {
    alpha = a;
    beta = b;
    gamma = g;
  }

  function getValues() {
    return [['alpha', alpha], ['beta', beta], ['gamma', gamma]];
  }

  return {
    setValues: setValues,
    getValues: getValues
  }
})();

/**
 * canvas
 * Per Revealing Module Pattern soll hiermit canvas gehandhabt werden
 * @type {{clearFrame, getContext, draw}}
 */
var canvas = canvas || (function () {
  let
    cv = document.getElementById("myCanvas"),
    cn = cv.getContext("2d");
  // Höhe und Breite des canvas Elements wird per CSS auf die volle Größe des übergeordneten Elements gesetzt,
  // hier wird der Wert abgefragt und für die weitere Verarbeitung in JS gespeichert
  cv.width = window.innerWidth;
  cv.height = window.innerHeight;

  function clearFrame() {
    cn.clearRect(0,0, cv.width, cv.height);
  }

  function getContext() {
    return cn;
  }

  function draw() {
    let vals = deviceOrientation.getValues();
    let alpha = vals[0][1], beta = vals[1][1];

    cn.fillStyle="#FF7777";
    cn.font="14px Verdana";
    cn.fillText("Alpha:" + Math.round(alpha) ,10,20);
    cn.beginPath();
    cn.moveTo(180, 75);
    cn.lineTo(210, 75);
    cn.stroke();
    cn.arc(180,75,60,0, alpha * Math.PI / 180);
    cn.fill();

    cn.fillStyle="#FF6600";
    cn.fillText("Beta:" + Math.round(beta),10,140);
    cn.beginPath();
    cn.fillRect(180, 150, beta, 90);
  }

  function drawCircle(labelTxt=0, labelX=0, labelY=0, circX=0, circY=0, circRad=0, startAng=0, endAng=0, value=0, color="#FF6600") {
    cn.fillStyle = color;
    cn.font="14px Verdana";
    cn.fillText(labelTxt + Math.round(value), labelX, labelY);
    cn.beginPath();
    cn.moveTo(circX, circY);
    cn.stroke();
    cn.arc(circX, circY, circRad, startAng, endAng);
    cn.fill();
  }

  function drawRect(labelTxt=0, labelX=0, labelY=0, rectX=0, rectY=0, rectW=0, rectH=0, value=0, color="#FF6600") {
    cn.fillStyle = color;
    cn.fillText(labelTxt + Math.round(value), labelX, labelY);
    cn.beginPath();
    cn.fillRect(rectX, rectY, rectW, rectH);
  }

  return {
    clearFrame: clearFrame,
    getContext: getContext,
    draw: draw,
    drawRect: drawRect,
    drawCircle: drawCircle
  }
})();

/**
 * mobileAndTabletcheck
 *
 * Prüft ob Anzeige über ein mobiles Gerät (Phone, Tablet) --> true, oder über Desktop --> false
 * Ziel: canvas Anzeige der DeviceOrientation Daten soll nur über ein mobiles Gerät angezeigt werden.
 *
 * @returns {boolean}
 */
function mobileAndTabletcheck() {
  // pruefen, ob desktop oder mobile
  // https://stackoverflow.com/a/11381730/6628517
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

/**
 * toggleButton
 * Button, welcher die Anzeige zwischen Infotext und Canvas Anzeige schaltet
 */
function toggleButton() {
  let cntnt_txt = document.getElementById("content_text");
  let cntnt_act = document.getElementById("content_action");
  let button = document.getElementById("btn_toggleButton");

  // beim ersten Aufruf bekommt das Element den Style vom CSS, anschließend wird direkt im Element getoggelt...
  let el = document.getElementById('content_text');
  let style = window.getComputedStyle(el);
  let top = style.getPropertyValue('display');

  if (cntnt_txt.style.display === "none" || top != "block") {
    button.classList.remove('fa-arrow-circle-left');
    button.classList.add('fa-arrow-circle-right');
    cntnt_txt.style.display = "block";
    cntnt_act.style.display = "none";
  } else {
    button.classList.remove('fa-arrow-circle-right');
    button.classList.add('fa-arrow-circle-left');
    cntnt_txt.style.display = "none";
    cntnt_act.style.display = "block";
    requestAnimationFrame(drawDeviceOrientation);
  }
}

/**
 * deviceOrientationListener
 * @param event
 */
function deviceOrientationListener(event) {
  deviceOrientation.setValues(event.alpha, event.beta, event.gamma);
}

/**
 * drawDeviceOrientation
 * zeichnet die Werte auf dem canvas Element
 */
function drawDeviceOrientation() {
  let vals = deviceOrientation.getValues();
  let alpha = vals[0][1];
  let beta = vals[1][1];
  let gamma = vals[2][1];

  canvas.clearFrame();
  canvas.drawCircle("Alpha2: ", 10, 20, 180, 75, 60, 0, alpha * Math.PI / 180, alpha, "#FF7777");
  canvas.drawRect("Beta2: ", 10, 140, 180, 150, beta, 90, beta, "#FF6600");
  canvas.drawRect("Gamma2: ", 10, 270, 90, 340, 180, gamma, gamma, "#FF0000");

  if (document.getElementById("content_action").style.display === "block"){
    requestAnimationFrame(drawDeviceOrientation);
  }
}

/**
 * EventListener hinzufügen
 * ... nachdem das DOM geladen wurde ()
 */
addEventListener("DOMContentLoaded", function(){
  //    ---> click <---
  // BESSER: addEventListener anstelle von onClick im HTML
  // https://stackoverflow.com/a/41077586
  // https://www.w3schools.com/js/js_htmldom_eventlistener.asp
  // https://developer.mozilla.org/de/docs/Web/API/EventTarget/addEventListener
  // https://www.mediaevent.de/javascript/event-listener.html
  let btnEl = document.getElementById("btn_toggleButton");
  // in case of QUnit Test, Element 'btn_toggleButton' is not available - therefore is no EventListener necessary (no Button, no click)
  if (btnEl != null)
    btnEl.addEventListener("click", toggleButton);

  //    ---> DeviceOrientation <---
  // if (window.DeviceOrientationEvent) {
  if (window.DeviceOrientationEvent && window.mobileAndTabletcheck()) {
    window.addEventListener("deviceorientation", deviceOrientationListener, false);
  }
  else {
    if (!window.mobileAndTabletcheck()){
      document.getElementById("doeSupported").innerHTML = "<p><strong>Note</strong>: DeviceOrientation Data presentation is only available for mobile devices.</p>";
    } else {
      document.getElementById("doeSupported").innerHTML = "<p><strong>Note</strong>: DeviceOrientation will not be supported by your browser!</p>";
    }
    document.getElementById("myCanvas").hidden = true;
  }
});
