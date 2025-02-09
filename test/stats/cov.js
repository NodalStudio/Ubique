import assert from 'assert';
import cov from '../../stats/cov.js';

var c = [5,6,3];
var d = [0.5,-3,2.3];
var e = [[9, 5], [6, 1]];
var f = [[3, 2], [5, 2]];
var l = [[1,1,-1],[1,-2,3],[2,3,1]];

ubique.cov(c);

ubique.cov(c,d);

ubique.cov(c,d,0);

ubique.cov(e,f);

ubique.cov(l);

