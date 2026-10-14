// Runnable API examples use the real browser bundle, loaded only on demand.
function mountExamples() {
  const main = document.querySelector('main');
  if (!main || main.querySelector('.doc-example')) return;
  const path = decodeURIComponent(location.pathname);
  const kind = path.endsWith('/matmul.html') ? 'matmul'
    : path.endsWith('/DenseMatrix.html') ? 'DenseMatrix'
    : path.endsWith('/factorize.html') ? 'factorize' : null;
  if (!kind) return;
  const solve = kind === 'factorize';
  const panel = document.createElement('section');
  panel.className = 'doc-example';
  panel.setAttribute('aria-label', 'Runnable ' + kind + ' example');
  panel.innerHTML = `<h2>Run this example</h2><p>Edit the inputs. This calls <code>${kind}</code> from the same library used by the benchmark.</p>
    <pre class="example-code"></pre>
    <label>Matrix A<textarea data-input="a" spellcheck="false">${solve ? '[[3,1],[1,2]]' : '[[1,2],[3,4]]'}</textarea></label>
    <label>${solve ? 'Right-hand side b' : 'Matrix B'}<textarea data-input="b" spellcheck="false">${solve ? '[9,8]' : '[[5,6],[7,8]]'}</textarea></label>
    <div class="example-controls"><button type="button">Run example</button>${kind === 'matmul' ? '<label>Backend <select><option>auto</option><option>js</option><option>wasm</option></select></label>' : ''}<span>Up to 32 × 32 finite values</span></div>
    <output role="status" aria-live="polite">Ready.</output>`;
  const sample = main.querySelector('pre');
  (sample || main.lastElementChild || main).after(panel);
  if (!main.contains(panel)) main.append(panel);
  const inputs = [...panel.querySelectorAll('textarea')];
  const code = panel.querySelector('.example-code');
  const update = () => {
    const call = kind === 'matmul' ? `matmul(A, B, "${panel.querySelector('select').value}")`
      : solve ? 'factorize(A).solve(b)' : 'try {\n  a.multiplyInto(b, out);\n  console.log(out.toArray());\n} finally {\n  a.dispose(); b.dispose(); out.dispose();\n}';
    code.textContent = `import { ${kind} } from "ubique";\n\nconst A = ${inputs[0].value};\nconst ${solve ? "b" : "B"} = ${inputs[1].value};\n\n${kind === 'DenseMatrix' ? 'const a = DenseMatrix.from(A);\nconst b = DenseMatrix.from(B);\nconst out = new DenseMatrix(A.length, B[0].length);\n' : ''}${call}`;
  };
  panel.querySelector('select')?.addEventListener('change', update);
  inputs.forEach(input => input.addEventListener('input', update));
  update();
  const matrix = value => Array.isArray(value) && value.length > 0 && value.length <= 32 && value.every(row => Array.isArray(row) && row.length > 0 && row.length <= 32 && row.length === value[0].length && row.every(Number.isFinite));
  panel.querySelector('button').addEventListener('click', async event => {
    const button = event.currentTarget, output = panel.querySelector('output');
    button.disabled = true;
    try {
      const [a,b] = inputs.map(input => JSON.parse(input.value));
      if (!matrix(a) || !(solve ? Array.isArray(b) && b.length <= 32 && b.every(Number.isFinite) : matrix(b))) throw new Error('Use nonempty rectangular matrices (at most 32 × 32), and finite numbers.');
      const u = await import(new URL('./ubique.js', import.meta.url).href);
      let result;
      if (kind === 'matmul') result = u.matmul(a,b,panel.querySelector('select').value);
      else if (solve) result = u.factorize(a).solve(b);
      else {
        const buffers=[];
        try {
          const aa=u.DenseMatrix.from(a);buffers.push(aa);
          const bb=u.DenseMatrix.from(b);buffers.push(bb);
          const out=new u.DenseMatrix(a.length,b[0].length);buffers.push(out);
          aa.multiplyInto(bb,out);result=out.toArray();
        } finally { buffers.forEach(buffer=>buffer.dispose()); }
      }
      output.textContent=JSON.stringify(result);
    } catch(error) { output.textContent=error.message; }
    finally { button.disabled=false; }
  });
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mountExamples);
else mountExamples();
const links=[...document.querySelectorAll('.docs-sidebar a')];
if(links.length && 'IntersectionObserver' in globalThis){
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries) if(entry.isIntersecting){
      links.forEach(a=>a.removeAttribute('aria-current'));
      links.find(a=>a.hash==='#'+entry.target.id)?.setAttribute('aria-current','location');
    }
  },{rootMargin:'-10% 0px -65% 0px'});
  links.forEach(a=>{const el=document.getElementById(a.hash.slice(1));if(el)observer.observe(el);});
}
