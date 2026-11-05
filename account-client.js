/* Cuentas opcionales: credenciales y resultados nunca se guardan en localStorage. */
(() => {
'use strict';
let user=null;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function request(path,data){
 let response;
 try {response=await fetch('/api/'+path,{method:data===undefined?'GET':'POST',credentials:'same-origin',cache:'no-store',headers:data===undefined?{}:{'Content-Type':'application/json','X-Voto-Request':'1'},body:data===undefined?undefined:JSON.stringify(data)});} catch {throw new Error('No se puede conectar con el servidor. Inténtalo de nuevo.');}
 let result;try{result=await response.json()}catch{throw new Error('Las cuentas necesitan el servidor de Voto Claro activo.');}
 if(!response.ok){if(response.status===401)setUser(null);throw new Error(result.error||'No se pudo completar la solicitud.');}
 return result;
}
function setUser(value){user=value;const nav=document.getElementById('account-nav');if(nav)nav.textContent=user?'Mi cuenta':'Iniciar sesión';window.dispatchEvent(new Event('accountchange'));}
function login(register=false){return new Promise(resolve=>{
 const dialog=document.createElement('dialog');dialog.className='account-dialog';
 dialog.innerHTML=`<form class="account-form"><button type="button" class="quiet dialog-close" aria-label="Cerrar">×</button><h2>${register?'Crear cuenta':'Iniciar sesión'}</h2><p>${register?'Elige un usuario y una contraseña. No necesitas indicar tu nombre ni correo.':'Accede para guardar y consultar tus resultados personales.'}</p><label>Usuario<input name="username" autocomplete="username" required minlength="3" maxlength="32" pattern="[a-zA-Z0-9_.-]+" autocapitalize="none" spellcheck="false"></label><label>Contraseña<input type="password" name="password" autocomplete="${register?'new-password':'current-password'}" required minlength="${register?12:1}" maxlength="128"></label><p class="note">${register?"Mínimo 12 caracteres. ":""}Conserva tu contraseña: no hay recuperación por correo.</p>${register?'<p class="note">Solo se guardan los resultados que elijas. Contienen tus respuestas políticas; podrás eliminarlos desde tu cuenta.</p>':''}<p role="status" class="account-message"></p><button class="primary" type="submit">${register?'Crear cuenta':'Entrar'}</button><button class="quiet account-switch" type="button">${register?'Ya tengo cuenta':'Crear una cuenta'}</button></form>`;
 document.body.append(dialog);const form=dialog.querySelector('form');let completed=false;
 dialog.addEventListener('close',()=>{dialog.remove();if(!completed)resolve(null)});
 dialog.querySelector('.dialog-close').onclick=()=>dialog.close();
 dialog.querySelector('.account-switch').onclick=()=>{completed=true;dialog.close();resolve(login(!register))};
 form.onsubmit=async e=>{e.preventDefault();const button=form.querySelector('[type="submit"]');button.disabled=true;const message=form.querySelector('[role="status"]');message.textContent='Conectando…';
 try{const result=await request(register?'register':'login',{username:form.elements.username.value,password:form.elements.password.value});form.elements.password.value='';setUser(result.user);completed=true;dialog.close();resolve(result.user)}catch(error){message.textContent=error.message;button.disabled=false}};
 dialog.showModal();
});}
window.Account={get user(){return user},request,login,escape,async logout(){await request('logout',{});setUser(null)}};
window.Account.ready=request('session').then(data=>setUser(data.user)).catch(()=>setUser(null));
})();
