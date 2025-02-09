import assert from 'assert';
import paramvar from '../../quants/paramvar.js';

var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];

ubique.paramvar(0,1);

ubique.paramvar([0,0,0],[1,2,3]);
[ 1.644854, 3.289707, 4.934561 ];

ubique.paramvar(ubique.mean(x),ubique.std(x));

ubique.paramvar(ubique.mean(ubique.cat(0,x,y)),ubique.std(ubique.cat(0,x,y)));

ubique.paramvar(ubique.mean(ubique.cat(0,x,y)),ubique.std(ubique.cat(0,x,y)),0.99,100000,10);

