import assert from 'assert';
import { pdist } from '../../stats/pdist.js';

var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];

ubique.pdist(x,y,'euclidean');

ubique.pdist(x,y,'manhattan');

ubique.pdist(x,y,'chebychev');

ubique.pdist(x,y,'hamming');

