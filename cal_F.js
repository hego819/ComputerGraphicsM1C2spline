"use strict";

var EPSILON = 1e-15;

function distance(p0, p1) {
  return ((p0[0] - p1[0]) ** 2 + (p0[1] - p1[1]) ** 2) ** (1 / 2);
}

function sub(p0, p1, a, b) {
  //console.log(p0, p1, a, b, a * p0[0] - b * p1[0], a * p0[1] - b * p1[1]);
  return [a * p0[0] - b * p1[0], a * p0[1] - b * p1[1]];
}

function Bezier_cal(a, b, c, d) {
  var l = 0;
  var r = 1;
  while (1) {
    if (x3(a, b, c, d, (l + r) / 2) > EPSILON) {
      r = (l + r) / 2;
    } else if (x3(a, b, c, d, (l + r) / 2) < -EPSILON) {
      l = (l + r) / 2;
    } else {
      return (l + r) / 2;
    }
  }
}

//Bezier
function p_Bezier(p0, p1, p2) {
  var a = distance(p0, p2) ** 2;
  var b =
    3 *
    (sub(p2, p0, 1, 1)[0] * sub(p0, p1, 1, 1)[0] +
      sub(p2, p0, 1, 1)[1] * sub(p0, p1, 1, 1)[1]);
  var c1 = sub(sub(p0, p1, 3, 2), p2, 1, 1);
  var c2 = sub(p0, p1);
  var c = c1[0] * c2[0] + c1[1] * c2[1];
  var d = distance(p0, p1) ** 2; //tiを求める三次方程式

  var ti = Bezier_cal(a, b, c, d);

  var pb = [0, 0];
  pb[0] = p1[0] - (1 - ti) ** 2 * p0[0] - ti ** 2 * p2[0];
  pb[0] = pb[0] / (2 * (1 - ti) * ti);
  pb[1] = p1[1] - (1 - ti) ** 2 * p0[1] - ti ** 2 * p2[1];
  pb[1] = pb[1] / (2 * (1 - ti) * ti);
  
  return [[p0, pb, p2], ti];
}

function x3(a, b, c, d, x) {
  return a * x ** 3 + b * x ** 2 + c * x + d;
}