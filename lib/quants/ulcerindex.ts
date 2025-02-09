/**
 * Risk metrics
 */
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = function ($u: any) {
  /**
   * @method ulcerindex
   * @summary Ulcer Index
   * @description Ulcer Index of Peter G. Martin (1987). The impact of long, deep drawdowns will have significant
   * impact because the underperformance since the last peak is squared.
   *
   * @param  {array|matrix} x asset/portfolio returns
   * @param  {string} mode drawdown calculation. 'return','geometric' (def: 'return')
   * @param  {number} dim dimension 0: row, 1: column (def: 0)
   * @return {number|array}
   *
   * @example
   * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
   * var xt = [[0.003,0.026],[0.015,-0.009],[0.014,0.024],[0.015,0.066],[-0.014,0.039]];
   * ubique.ulcerindex(x);
   * // 0.005263
   *
   * ubique.ulcerindex(xt,'return',1);
   * // [ [ 0.006261, 0.004025 ] ]
   */
  $u.ulcerindex = function (x: any, mode: any, dim: any) {
    if (arguments.length === 0) {
      throw new Error("not enough input arguments");
    }
    mode = mode == null ? "return" : mode;
    dim = dim == null ? 0 : dim;

    var _uidx = function (a: any, mode: any) {
      var dd = $u.drawdown(a, mode).dd;
      var n = a.length;
      return $u.sqrt($u.sum($u.power(dd, 2)) / n);
    };
    if ($u.isnumber(x)) {
      return NaN;
    }
    return $u.vectorfun(dim, x, _uidx, mode);
  };
};
