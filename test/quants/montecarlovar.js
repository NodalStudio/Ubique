import assert from 'assert';
import { montecarlovar } from '../../quants/montecarlovar.js';

var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];

ubique.montecarlovar(x,0.95,1,0,1,10000);

ubique.montecarlovar(ubique.std(x),0.99,10,0,100000);

