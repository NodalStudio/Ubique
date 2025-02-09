/**
 * Descriptive Statistic
 */
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = function ($u: any) {
  /**
   * @method mode
   * @summary Most frequent value in an array of elements
   * @description Most frequent value in an array of elements (Unimodal)
   *
   * @param  {array|matrix} x array of values
   * @param  {number} dim dimension 0: row, 1: column (def: 0)
   * @return {number|array}
   *
   * @example
   * ubique.mode([5,6,3]);
   * // 3
   *
   * ubique.mode([[5,6,5],[7,8,-1]]);
   * // [ [ 5 ], [ -1 ] ]
   *
   * ubique.mode([[5,6,5],[7,8,-1]],1);
   * // [ [ 5, 6, -1 ] ]
   */
  $u.mode = function (x: any, dim: any) {
    if (arguments.length === 0) {
      throw new Error("not enough input arguments");
    }
    dim = dim == null ? 0 : dim;

    var _mode = function (a: any) {
      var counter = {};
      var mode = [];
      var max = 0;
      var _a = $u.sort(a);
      for (var i = 0; i < x.length; i++) {
        if (!(_a[i] in counter)) {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          counter[_a[i]] = 0;
        } else {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          counter[_a[i]]++;
        }
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (counter[_a[i]] === max) {
          mode.push(_a[i]);
        } // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        else if (counter[_a[i]] > max) {
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          max = counter[_a[i]];
          mode = [_a[i]];
        }
      }
      return mode[0];
    };
    if ($u.isnumber(x)) {
      return x;
    }
    return $u.vectorfun(dim, x, _mode);
  };
};
