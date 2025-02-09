import assert from 'assert';
import ror from '../../quants/ror.js';

var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
var cat = ubique.cat;

ubique.ror(x);

ubique.ror([100,101,99,98,97,102,103,104],'cum');

ubique.ror(cat(0,x,y),'ret');

