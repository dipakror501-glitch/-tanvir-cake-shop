const cart=[];const $=id=>document.getElementById(id);const money=n=>'₹'+n.toLocaleString('en-IN');
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2100)}
function render(){ $('bagCount').textContent=cart.reduce((n,x)=>n+x.qty,0);$('subtotal').textContent=money(cart.reduce((n,x)=>n+x.price*x.qty,0));$('items').innerHTML=cart.length?cart.map((x,i)=>`<div class="lineitem"><span>${x.name} × ${x.qty}</span><span>${money(x.price*x.qty)} <button data-remove="${i}">Remove</button></span></div>`).join(''):'<p class="empty">Your bag is empty. Add a little sweetness.</p>'}
document.querySelectorAll('.add').forEach(b=>b.addEventListener('click',()=>{let x=cart.find(v=>v.name===b.dataset.name);x?x.qty++:cart.push({name:b.dataset.name,price:+b.dataset.price,qty:1});render();toast('Added to your bag')}));
$('items').addEventListener('click',e=>{if(e.target.dataset.remove!==undefined){cart.splice(+e.target.dataset.remove,1);render()}});
function drawer(v){$('drawer').classList.toggle('open',v);$('shade').classList.toggle('open',v)}
$('bagBtn').onclick=()=>drawer(true);$('closeBag').onclick=()=>drawer(false);$('shade').onclick=()=>drawer(false);
$('checkout').onclick=()=>toast('Customer login and checkout will be added in a later step.');
$('searchBtn').onclick=()=>$('searchbar').classList.toggle('show');$('hamb').onclick=()=>$('nav').classList.toggle('open');
$('searchInput').addEventListener('input',e=>{let q=e.target.value.toLowerCase();document.querySelectorAll('.product').forEach(p=>p.style.display=p.textContent.toLowerCase().includes(q)?'':'none')});
