import assert from 'assert';
import histc from '../../stats/histc.js';

var A = [87,27,45,62,3,52,20,43,74,61];
var B = [12,34,57,43,88,75,89,2,27,29];

ubique.histc(A,[0,20,40,60,80,100]);

ubique.histc(ubique.cat(0,A,B),[0,50,100]);

