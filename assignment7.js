function initFormValidation(){
  const form=document.getElementById('register-form'); if(!form) return;
  const createErrorElement=m=>{const e=document.createElement('div');e.className='error-message';e.style.cssText='color:#e74c3c;font-size:13px;margin-top:5px;display:block';e.textContent=m;return e};
  const clearErrors=()=>{document.querySelectorAll('.error-message').forEach(el=>el.remove());document.querySelectorAll('.is-invalid').forEach(el=>{el.classList.remove('is-invalid');el.style.borderColor=''})};
  const showError=(input,m)=>{input.style.borderColor='#e74c3c';input.classList.add('is-invalid');input.parentElement.appendChild(createErrorElement(m))};
  const validateEmail=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePhone=p=>/^[\d\s+\-()]+$/.test(p)&&p.replace(/\D/g,'').length>=10;
  const validatePassword=p=>p.length>=8;

  form.addEventListener('submit',e=>{
    e.preventDefault(); clearErrors();
    const username=document.getElementById('username');
    const phone=document.getElementById('phone');
    const email=document.getElementById('email');
    const password=document.getElementById('password');
    const confirmPassword=document.getElementById('confirm-password');
    let ok=true;
    if(!username.value.trim()) {showError(username,'Full name is required');ok=false}
    else if(username.value.trim().length<2){showError(username,'Name must be at least 2 characters');ok=false}
    if(!phone.value.trim()){showError(phone,'Phone number is required');ok=false}
    else if(!validatePhone(phone.value)){showError(phone,'Please enter a valid phone number');ok=false}
    if(!email.value.trim()){showError(email,'Email is required');ok=false}
    else if(!validateEmail(email.value)){showError(email,'Please enter a valid email address');ok=false}
    if(!password.value){showError(password,'Password is required');ok=false}
    else if(!validatePassword(password.value)){showError(password,'Password must be at least 8 characters long');ok=false}
    if(!confirmPassword.value){showError(confirmPassword,'Please confirm your password');ok=false}
    else if(password.value!==confirmPassword.value){showError(confirmPassword,'Passwords do not match');ok=false}

    if(ok){
      const user={username:username.value.trim(),phone:phone.value.trim(),email:email.value.trim(),password:password.value,avatar:null,friends:[],registeredAt:new Date().toISOString()};
      localStorage.setItem('user',JSON.stringify(user));
      const msg=document.createElement('div');
      msg.style.cssText='background:#2ecc71;color:#fff;padding:15px;border-radius:10px;margin:20px 0;text-align:center;font-weight:bold';
      msg.textContent='✓ Registration successful! Redirecting...';
      form.insertBefore(msg,form.firstChild);
      setTimeout(()=>{window.location.href='profile.html'},1500);
    }
  });

  ['username','phone','email','password','confirm-password'].forEach(id=>{
    const input=document.getElementById(id);
    if(input){
      input.addEventListener('blur',()=>{
        input.parentElement.querySelectorAll('.error-message').forEach(e=>e.remove());
        input.style.borderColor=''; input.classList.remove('is-invalid');
      });
    }
  });
}

function initAccordion(){
  const faqHeadingExists = Array.from(document.querySelectorAll('h1,h2,h3,h4'))
    .some(h => /^\s*Frequently Asked Questions\s*$/i.test(h.textContent));
  if (faqHeadingExists || document.querySelector('.faq-section')) return;

  const html=`
    <div class="faq-section" data-faq="true" style="max-width:800px;margin:40px auto;padding:20px">
      <h2 style="text-align:center;margin-bottom:30px;color:var(--text-color)">Frequently Asked Questions</h2>
      <div class="accordion">
        ${[
          ['What is Play Beat?','Play Beat is your personal music streaming platform where you can listen to millions of songs, create playlists, and discover new music from around the world.'],
          ['How do I create a playlist?','Simply browse songs, click the "+" button next to any track you like, and it will be automatically added to your personal playlist. You can manage your playlist from the "My Playlist" page.'],
          ['Is Play Beat free to use?','Yes! Play Beat offers a free tier with unlimited music streaming. We also offer premium features for an enhanced experience without ads and with offline downloads.'],
          ['Can I use Play Beat on multiple devices?','Absolutely! Your account syncs across all your devices - phone, tablet, and computer. Your playlists and preferences are always available wherever you log in.'],
          ['How do I change my theme?','Click the "Toggle Theme" button in the navigation menu to switch between light and dark modes. Your preference will be saved automatically.']
        ].map(([q,a])=>`
          <div class="accordion-item">
            <button class="accordion-header"><span>${q}</span><span class="accordion-icon">+</span></button>
            <div class="accordion-content"><p>${a}</p></div>
          </div>`).join('')}
      </div>
    </div>
    <style>
      .accordion-item{background:var(--bg1-color);margin-bottom:15px;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);transition:.3s}
      .accordion-item:hover{box-shadow:0 4px 12px rgba(0,0,0,.15);transform:translateY(-2px)}
      .accordion-header{width:100%;padding:20px 25px;background:transparent;border:none;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:18px;font-weight:600;color:var(--text-color);text-align:left;transition:.3s}
      .accordion-header:hover{background:var(--accent-color);color:var(--bg-color)}
      .accordion-icon{font-size:24px;font-weight:700;transition:transform .3s;color:var(--accent-color)}
      .accordion-header:hover .accordion-icon{color:var(--bg-color)}
      .accordion-item.active .accordion-icon{transform:rotate(45deg)}
      .accordion-content{max-height:0;overflow:hidden;transition:max-height .4s ease,padding .4s ease;background:var(--bg-color)}
      .accordion-item.active .accordion-content{max-height:500px;padding:20px 25px}
      .accordion-content p{margin:0;line-height:1.6;color:var(--text-color);font-size:15px}
    </style>`;

  const points=[document.querySelector('.container.my-5'),document.querySelector('main'),document.querySelector('.container')];
  const target=points.find(Boolean);
  if(target){
    const wrap=document.createElement('div'); wrap.innerHTML=html; target.appendChild(wrap);

    document.querySelectorAll('.accordion-header').forEach(h=>h.addEventListener('click',()=>{
      const item=h.parentElement; const active=item.classList.contains('active');
      document.querySelectorAll('.accordion-item').forEach(i=>{if(i!==item)i.classList.remove('active')});
      item.classList.toggle('active',!active);
    }));
  }
}


function initPopupForm(){
  const html=`
    <div id="subscription-popup" class="popup-overlay" style="display:none">
      <div class="popup-content">
        <button class="popup-close" aria-label="Close popup">&times;</button>
        <h2 style="color:var(--accent-color);margin-bottom:10px">Subscribe to Play Beat</h2>
        <p style="margin-bottom:25px;opacity:.8">Get the latest music news and exclusive updates!</p>
        <form id="subscription-form" class="popup-form">
          <div class="form-group"><label for="sub-name">Your Name</label><input type="text" id="sub-name" placeholder="Enter your name" required></div>
          <div class="form-group"><label for="sub-email">Email Address</label><input type="email" id="sub-email" placeholder="your@email.com" required></div>
          <div class="form-group" style="text-align:left">
            <label style="display:flex;align-items:center;cursor:pointer">
              <input type="checkbox" id="sub-newsletter" style="width:auto;margin-right:10px"><span>I want to receive weekly newsletter</span>
            </label>
          </div>
          <button type="submit" class="popup-submit-btn">Subscribe Now</button>
        </form>
      </div>
    </div>
    <style>
      .popup-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;justify-content:center;align-items:center;z-index:9999;opacity:0;visibility:hidden;transition:.3s}
      .popup-overlay.show{opacity:1;visibility:visible}
      .popup-content{background:var(--bg1-color);padding:40px 35px;border-radius:20px;max-width:450px;width:90%;position:relative;box-shadow:0 10px 40px rgba(0,0,0,.3);transform:scale(.9);transition:.3s}
      .popup-overlay.show .popup-content{transform:scale(1)}
      .popup-close{position:absolute;top:15px;right:15px;background:#e74c3c;color:#fff;border:none;width:35px;height:35px;border-radius:50%;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.3s}
      .popup-close:hover{background:#c0392b;transform:rotate(90deg)}
      .popup-form{display:flex;flex-direction:column;gap:20px}
      .popup-form .form-group{display:flex;flex-direction:column;gap:8px;text-align:left}
      .popup-form label{font-weight:600;color:var(--text-color);font-size:14px}
      .popup-form input[type="text"],.popup-form input[type="email"]{padding:12px 15px;border:2px solid transparent;border-radius:10px;background:var(--bg-color);color:var(--text-color);font-size:15px;transition:.3s}
      .popup-form input:focus{border-color:var(--accent-color);outline:none;transform:translateY(-2px)}
      .popup-submit-btn{background:var(--accent-color);color:var(--bg-color);border:none;padding:14px;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;transition:.3s;margin-top:10px}
      .popup-submit-btn:hover{opacity:.9;transform:translateY(-2px);box-shadow:0 5px 15px rgba(0,0,0,.2)}
    </style>`;
  document.body.insertAdjacentHTML('beforeend',html);
  const popup=document.getElementById('subscription-popup');
  const closeBtn=popup.querySelector('.popup-close');
  const form=document.getElementById('subscription-form');

  const addSubscribeButton=()=>{
    const nodes=document.querySelectorAll('.footer, footer, .container');
    const tgt=[...nodes].find(f=>f.textContent.includes('2025')||f.textContent.includes('Eagles'));
    if(tgt&&!document.getElementById('open-subscription-popup')){
      const btn=document.createElement('button');
      btn.id='open-subscription-popup'; btn.textContent='📼 Subscribe to Newsletter';
      btn.style.cssText='background:var(--accent-color);color:var(--bg-color);border:none;padding:12px 25px;border-radius:25px;font-weight:700;cursor:pointer;margin:20px auto;display:block;font-size:16px;transition:.3s';
      btn.onmouseover=()=>btn.style.transform='translateY(-2px)'; btn.onmouseout=()=>btn.style.transform='translateY(0)';
      tgt.insertBefore(btn,tgt.firstChild);
      btn.addEventListener('click',()=>{popup.style.display='flex';setTimeout(()=>popup.classList.add('show'),10)});
    }
  };
  addSubscribeButton();

  const closePopup=()=>{popup.classList.remove('show');setTimeout(()=>popup.style.display='none',300)};
  closeBtn.addEventListener('click',closePopup);
  popup.addEventListener('click',e=>{if(e.target===popup) closePopup()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&popup.classList.contains('show')) closePopup()});

  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('sub-name').value;
    const email=document.getElementById('sub-email').value;
    const newsletter=document.getElementById('sub-newsletter').checked;
    const subscriber={name,email,newsletter,subscribedAt:new Date().toISOString()};
    const arr=JSON.parse(localStorage.getItem('subscribers')||'[]'); arr.push(subscriber);
    localStorage.setItem('subscribers',JSON.stringify(arr));
    alert(`✓ Thank you for subscribing, ${name}!\nWe'll send updates to ${email}`);
    form.reset(); closePopup();
  });
}

function initDateTimeDisplay(){
  const html=`
    <div id="datetime-display" style="position:fixed;top:120px;right:20px;background:var(--bg1-color);border-radius:15px;z-index:999;text-align:center;font-family:'Segoe UI',sans-serif;min-width:250px">
      <div style="font-size:12px;color:var(--text-color);opacity:.7;margin-bottom:5px">Current Date & Time</div>
      <div id="current-date" style="font-size:15px;font-weight:600;color:var(--accent-color);margin-bottom:5px"></div>
      <div id="current-time" style="font-size:22px;font-weight:700;color:var(--text-color);font-family:'Courier New',monospace"></div>
      <div id="current-day" style="font-size:13px;color:var(--text-color);opacity:.8;margin-top:5px"></div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend',html);

  const box = document.getElementById('datetime-display');

  // постоянная тень, без зависимостей от мыши
  box.style.boxShadow = '0 16px 38px rgba(0,0,0,.28), 0 6px 14px rgba(0,0,0,.16)';
  box.style.transform = 'translateY(0)';

  // --- дальше всё без изменений ---
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  function update(){
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');
    const ampm = h>=12 ? 'PM' : 'AM';
    h = h%12 || 12;
    document.getElementById('current-date').textContent = dateStr;
    document.getElementById('current-time').textContent = `${h}:${m}:${s} ${ampm}`;
    document.getElementById('current-day').textContent = days[now.getDay()];
  }
  update();
  setInterval(update, 1000);
}


document.addEventListener('DOMContentLoaded',()=>{
  initFormValidation();
  initAccordion();
  initPopupForm();
  initDateTimeDisplay();
});

document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]');
  if(a){e.preventDefault();const t=document.querySelector(a.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth',block:'start'})}
});

window.addEventListener('load',()=>{
  document.body.style.opacity='0';
  setTimeout(()=>{document.body.style.transition='opacity .5s ease';document.body.style.opacity='1'},100);
});

const musicPlayer={
  songs:[
    {title:'Thunder',artist:'Imagine Dragons',duration:210},
    {title:'Believer',artist:'Imagine Dragons',duration:190},
    {title:'Counting Stars',artist:'OneRepublic',duration:200},
  ],
  currentSongIndex:0,
  play(){const s=this.songs[this.currentSongIndex];console.log(`🎵 Now playing: ${s.title} by ${s.artist}`)},
  next(){this.currentSongIndex=(this.currentSongIndex+1)%this.songs.length;this.play()},
  totalDuration(){return this.songs.reduce((a,s)=>a+s.duration,0)}
};

function displayPlaylist(){
  const box=document.createElement('div');
  box.className='playlist-box';
  box.style.cssText='max-width:500px;margin:50px auto;background:var(--bg1-color);padding:20px;border-radius:15px;box-shadow:0 4px 15px rgba(0,0,0,.2)';
  const title=document.createElement('h3'); title.textContent='🎧 My Favorite Playlist'; title.style.textAlign='center'; box.appendChild(title);
  const ul=document.createElement('ul'); ul.style.listStyle='none'; ul.style.padding='0';
  for(const s of musicPlayer.songs){const li=document.createElement('li'); li.innerHTML=`<strong>${s.title}</strong> – ${s.artist} (${s.duration}s)`; li.style.padding='8px 0'; li.style.borderBottom='1px solid rgba(255,255,255,0.1)'; ul.appendChild(li)}
  box.appendChild(ul); document.body.appendChild(box);
}
displayPlaylist();

const longSongs=musicPlayer.songs.filter(s=>s.duration>195).map(s=>s.title);
console.log('🎶 Songs longer than 195s:',longSongs);

function initClickSound(){
  const audio=new Audio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg');
  document.addEventListener('click',e=>{if(e.target.tagName==='BUTTON'){audio.currentTime=0;audio.play().catch(()=>{})}});
}
initClickSound();

function displayGreetingByTime(){
  const hour=new Date().getHours();
  let g=hour<12?'☀️ Good Morning!':hour<18?'🌤️ Good Afternoon!':hour<22?'🌙 Good Evening!':'🌌 Good Night!';
  const box=document.createElement('div'); box.textContent=g; box.style.cssText='text-align:center;font-size:20px;color:var(--accent-color);margin-top:20px'; document.body.prepend(box);
}
displayGreetingByTime();

function animatePlaylist(){
  const box=document.querySelector('.playlist-box'); if(!box) return;
  box.style.opacity='0'; box.style.transform='translateY(20px)'; box.style.transition='opacity 1s ease, transform 1s ease';
  setTimeout(()=>{box.style.opacity='1';box.style.transform='translateY(0)'},200);
}
animatePlaylist();

function initRatingAndFeedback(){
  const c=document.createElement('div');
  c.className='rating-feedback-container';
  c.style.cssText='max-width:600px;margin:60px auto;padding:25px;background:var(--bg1-color);border-radius:20px;box-shadow:0 4px 15px rgba(0,0,0,.2);text-align:center';
  c.innerHTML=`
    <h2 style="color:var(--accent-color);margin-bottom:15px">⭐ Rate Your Experience</h2>
    <div id="star-rating" style="font-size:35px;cursor:pointer;margin-bottom:25px"><span data-value="1">☆</span><span data-value="2">☆</span><span data-value="3">☆</span><span data-value="4">☆</span><span data-value="5">☆</span></div>
    <textarea id="feedback-text" placeholder="Leave your feedback here..." rows="4" style="width:100%;padding:12px 15px;border-radius:10px;border:2px solid transparent;background:var(--bg-color);color:var(--text-color);font-size:15px;resize:none;outline:none;transition:.3s"></textarea>
    <button id="submit-feedback" style="margin-top:20px;background:var(--accent-color);color:var(--bg-color);border:none;padding:12px 25px;border-radius:25px;font-weight:700;cursor:pointer;font-size:16px;transition:.3s">Send Feedback</button>
    <p id="feedback-msg" style="margin-top:15px;font-weight:600;color:var(--accent-color);display:none">Thank you for your feedback!</p>`;
  document.body.appendChild(c);

  const stars=c.querySelectorAll('#star-rating span'); let rating=parseInt(localStorage.getItem('userRating')||'0');
  const paint=r=>{stars.forEach((s,i)=>{s.textContent=i<r?'★':'☆'; s.style.color=i<r?'#FFD700':'var(--text-color)'})};
  paint(rating);
  stars.forEach(s=>s.addEventListener('click',()=>{rating=parseInt(s.dataset.value);localStorage.setItem('userRating',rating);paint(rating)}));

  const btn=c.querySelector('#submit-feedback'); const ta=c.querySelector('#feedback-text'); const msg=c.querySelector('#feedback-msg');
  btn.addEventListener('click',()=>{
    const text=ta.value.trim(); if(text.length<3){alert('⚠️ Please write a bit more feedback.');return}
    const data={rating,text,date:new Date().toLocaleString()};
    const all=JSON.parse(localStorage.getItem('userFeedback')||'[]'); all.push(data); localStorage.setItem('userFeedback',JSON.stringify(all));
    ta.value=''; msg.style.display='block'; setTimeout(()=>msg.style.display='none',3000);
  });
}
document.addEventListener('DOMContentLoaded',initRatingAndFeedback);

(function loadjQuery(){
  if(window.jQuery){initJQueryFeatures();return}
  const s=document.createElement('script'); s.src='https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';
  s.onload=initJQueryFeatures; s.onerror=()=>console.error('Failed to load jQuery'); document.head.appendChild(s);
})();

function initJQueryFeatures(){
  setTimeout(()=>{
    const $=window.jQuery;
    createJQuerySections();
    setTimeout(()=>{addMyCustomSongs($); bindAllFeatures($)},300);
  },500);
}

function addMyCustomSongs($){
  const my=[
    {title:'Mockingbird',artist:'Eminem',album:'Encore',duration:'4:11'},
    {title:'Lose Yourself',artist:'Eminem',album:'8 Mile',duration:'5:26'},
    {title:'Bohemian Rhapsody',artist:'Queen',album:'A Night at the Opera',duration:'5:55'}
  ];
  const $list=$('#jquery-music-list'); if(!$list.length) return;
  my.forEach(song=>{
    $list.append(`
      <li class="jquery-music-item" data-artist="${song.artist}" data-album="${song.album}" style="background:var(--bg-color);padding:18px 20px;margin-bottom:12px;border-radius:12px;transition:.3s;border:1px solid transparent;cursor:pointer">
        <div style="display:flex;align-items:center;gap:15px">
          <span style="font-size:24px">🎵</span>
          <div style="flex:1">
            <div class="jquery-song-title" style="font-weight:600;font-size:16px;color:var(--text-color)">${song.title}</div>
            <div style="font-size:13px;opacity:.7;margin-top:3px">${song.artist} • ${song.album}</div>
          </div>
          <span style="opacity:.5">${song.duration}</span>
        </div>
      </li>`);
  });
}

function createJQuerySections(){
  const root=document.querySelector('.rating-feedback-container');
  if(!root){setTimeout(createJQuerySections,500);return}
  const wrap=document.createElement('div'); wrap.id='jquery-features-wrapper';
  wrap.innerHTML=`
    <div class="jquery-section" style="background:linear-gradient(135deg,var(--bg1-color) 0%,var(--bg-color) 100%);border-radius:20px;padding:35px;margin:50px auto;max-width:900px;box-shadow:0 10px 40px rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.1)">
      <h2 style="color:var(--accent-color);margin:0 0 25px;font-size:28px;text-align:center;text-shadow:0 2px 10px rgba(255,60,172,.3)">jQuery Search Features</h2>
      <div style="position:relative;margin-bottom:20px">
        <input id="jquery-search" type="text" placeholder="🎵 Search songs, artists, albums..." autocomplete="off" style="width:100%;padding:15px 20px 15px 50px;border:2px solid transparent;border-radius:15px;background:var(--bg-color);color:var(--text-color);font-size:16px;transition:.3s;box-shadow:0 4px 15px rgba(0,0,0,.2)">
        <span style="position:absolute;left:18px;top:50%;transform:translateY(-50%);font-size:20px">🔍</span>
        <ul id="jquery-suggestions" style="display:none;position:absolute;top:100%;left:0;right:0;margin-top:10px;padding:0;list-style:none;background:var(--bg1-color);border-radius:15px;box-shadow:0 10px 30px rgba(0,0,0,.4);max-height:300px;overflow-y:auto;z-index:1000;border:1px solid rgba(255,255,255,.1)"></ul>
      </div>
      <ul id="jquery-music-list" style="list-style:none;padding:0;margin:0 0 25px 0">
        ${[
          ['Thunder','Imagine Dragons','Evolve','3:30'],
          ['Believer','Imagine Dragons','Evolve','3:10'],
          ['Counting Stars','OneRepublic','Native','4:20'],
          ['Blinding Lights','The Weeknd','After Hours','3:50'],
          ['Shape of You','Ed Sheeran','Divide','4:15'],
        ].map(([t,a,al,d])=>`
          <li class="jquery-music-item" data-artist="${a}" data-album="${al}" style="background:var(--bg-color);padding:18px 20px;margin-bottom:12px;border-radius:12px;transition:.3s;border:1px solid transparent;cursor:pointer">
            <div style="display:flex;align-items:center;gap:15px">
              <span style="font-size:24px">🎵</span>
              <div style="flex:1">
                <div class="jquery-song-title" style="font-weight:600;font-size:16px;color:var(--text-color)">${t}</div>
                <div style="font-size:13px;opacity:.7;margin-top:3px">${a} • ${al}</div>
              </div>
              <span style="opacity:.5">${d}</span>
            </div>
          </li>`).join('')}
      </ul>
      <div id="jquery-highlight-area" style="background:var(--bg-color);padding:20px;border-radius:12px;border:2px dashed rgba(255,60,172,.3);text-align:center;line-height:1.8">
        <p id="jquery-highlight-text" style="margin:0;font-size:15px;color:var(--text-color)">
          Try searching for <strong>Thunder</strong>, <strong>Imagine</strong>, <strong>Stars</strong>, or <strong>Weeknd</strong>. Matching words will be <strong style="color:var(--accent-color)">highlighted</strong> here in real-time!
        </p>
      </div>
    </div>

    <div class="jquery-section" style="background:linear-gradient(135deg,var(--bg1-color) 0%,var(--bg-color) 100%);border-radius:20px;padding:35px;margin:30px auto;max-width:900px;box-shadow:0 10px 40px rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.1)">
      <h2 style="color:var(--accent-color);margin:0 0 30px;font-size:28px;text-align:center;text-shadow:0 2px 10px rgba(255,60,172,.3)">UX Engagement Elements</h2>
      <div class="jquery-stats" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:35px">
        ${[
          ['15847','Active Users','linear-gradient(135deg,#1d18b9 0%,#310882 100%)','rgba(138,92,246,.3)'],
          ['3456','Songs','linear-gradient(135deg,#5bb010 0%,#3b9d17 100%)','rgba(0,247,255,.3)'],
          ['892','Artists','linear-gradient(135deg,#ff3cac 0%,#d91a7c 100%)','rgba(255,60,172,.3)'],
        ].map(([c,l,b,shadow])=>`
          <div class="jquery-stat-card" style="background:${b};padding:25px;border-radius:15px;text-align:center;box-shadow:0 8px 20px ${shadow};transition:.3s">
            <div class="jquery-counter" data-count="${c}" style="font-size:36px;font-weight:800;color:#fff;margin-bottom:8px">0</div>
            <div style="color:rgba(255,255,255,.9);font-size:14px;font-weight:600">${l}</div>
          </div>`).join('')}
      </div>
      <form id="jquery-newsletter-form" style="background:var(--bg-color);padding:25px;border-radius:15px;box-shadow:0 4px 15px rgba(0,0,0,.2)">
        <h3 style="margin:0 0 20px;color:var(--text-color);font-size:20px;text-align:center">📼 Subscribe to Newsletter</h3>
        <div style="display:grid;gap:15px">
          <input type="email" placeholder="your@email.com" required style="padding:14px 18px;border:2px solid transparent;border-radius:12px;background:var(--bg1-color);color:var(--text-color);font-size:15px;transition:.3s">
          <button type="submit" id="jquery-subscribe-btn" style="background:linear-gradient(135deg,var(--accent-color) 0%,#d91a7c 100%);color:#fff;border:none;padding:14px 25px;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;transition:.3s;box-shadow:0 4px 15px rgba(255,60,172,.3)">Subscribe Now</button>
        </div>
      </form>
    </div>

    <div class="jquery-section" style="background:linear-gradient(135deg,var(--bg1-color) 0%,var(--bg-color) 100%);border-radius:20px;padding:35px;margin:30px auto;max-width:900px;box-shadow:0 10px 40px rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.1)">
      <h2 style="color:var(--accent-color);margin:0 0 30px;font-size:28px;text-align:center;text-shadow:0 2px 10px rgba(255,60,172,.3)">Web App Functionality</h2>
      <div style="display:flex;gap:15px;flex-wrap:wrap;justify-content:center;margin-bottom:30px">
        <button class="jquery-action-btn" data-action="favorite" style="background:linear-gradient(135deg,#1d18b9 0%,#310882 100%);color:#fff;border:none;padding:12px 24px;border-radius:25px;font-weight:600;cursor:pointer;transition:.3s;box-shadow:0 4px 15px rgba(138,92,246,.3)">⭐ Add to Favorites</button>
        <button class="jquery-action-btn" data-action="playlist" style="background:linear-gradient(135deg,#5bb010 0%,#3b9d17 100%);color:#fff;border:none;padding:12px 24px;border-radius:25px;font-weight:600;cursor:pointer;transition:.3s;box-shadow:0 4px 15px rgba(0,247,255,.3)">🎶 Add to Playlist</button>
        <button class="jquery-action-btn" data-action="share" style="background:linear-gradient(135deg,#ff3cac 0%,#d91a7c 100%);color:#fff;border:none;padding:12px 24px;border-radius:25px;font-weight:600;cursor:pointer;transition:.3s;box-shadow:0 4px 15px rgba(255,60,172,.3)">🔗 Share Song</button>
      </div>
      
      <h3 style="color:var(--text-color);margin:0 0 15px;font-size:18px">Featured Artists Gallery</h3>
      <div class="jquery-gallery" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px">
        ${[
          'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&h=400&fit=crop',
          'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=400&fit=crop',
          'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=400&fit=crop'
        ].map(src=>`
          <div class="jquery-gallery-item" style="position:relative;border-radius:12px;overflow:hidden;aspect-ratio:1;background:linear-gradient(135deg,#8a5cf6 0%,#6a3cc9 100%)">
            <img class="jquery-lazy-img" data-src="${src}" alt="Artist" style="width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .5s">
            <div class="jquery-img-loader" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;font-size:24px">🎵</div>
          </div>`).join('')}
      </div>
    </div>

    <div id="jquery-toast-container" style="position:fixed;bottom:30px;right:30px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none"></div>
    <div id="jquery-progress-bar" style="position:fixed;top:0;left:0;width:0%;height:4px;background:linear-gradient(90deg,#1d18b9 0%,#2f2fa2 50%,#ff3cac 100%);z-index:9999;transition:width .1s;box-shadow:0 0 15px rgba(255,60,172,.5)"></div>

    <style>
      .jquery-music-item:hover{transform:translateX(5px);border-color:var(--accent-color)!important;box-shadow:0 5px 20px rgba(255,60,172,.2)}
      .jquery-stat-card:hover{transform:translateY(-5px)!important}
      .jquery-action-btn:hover{transform:translateY(-2px);filter:brightness(1.1)}
      .jquery-copy-btn:hover{transform:scale(1.05);box-shadow:0 4px 12px rgba(255,60,172,.4)}
      #jquery-search:focus{border-color:var(--accent-color)!important;box-shadow:0 0 20px rgba(255,60,172,.3)!important;outline:none}
      #jquery-suggestions li{padding:12px 20px;cursor:pointer;transition:.2s;border-bottom:1px solid rgba(255,255,255,.05);color:var(--text-color)}
      #jquery-suggestions li:hover{background:rgba(255,60,172,.2);padding-left:25px}
      #jquery-suggestions li:last-child{border-bottom:none}
      .jquery-highlight{background:linear-gradient(90deg,rgba(255,60,172,.3),rgba(138,92,246,.3));padding:2px 4px;border-radius:4px;font-weight:600;color:var(--accent-color)}
      #jquery-suggestions::-webkit-scrollbar{width:8px}
      #jquery-suggestions::-webkit-scrollbar-track{background:var(--bg-color);border-radius:10px}
      #jquery-suggestions::-webkit-scrollbar-thumb{background:var(--accent-color);border-radius:10px}
      @keyframes jquery-spin{to{transform:rotate(360deg)}}
      .jquery-spinner{display:inline-block;width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:jquery-spin .6s linear infinite;margin-right:8px;vertical-align:middle}
      @keyframes jquery-slideIn{from{transform:translateX(400px);opacity:0}to{transform:translateX(0);opacity:1}}
      @keyframes jquery-slideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(400px);opacity:0}}
      .jquery-toast{animation:jquery-slideIn .3s}
      .jquery-toast.hide{animation:jquery-slideOut .3s}
    </style>`;
  root.insertAdjacentElement('afterend',wrap);
}

function bindAllFeatures($){
  const $search=$('#jquery-search'),$suggestions=$('#jquery-suggestions'),$highlightText=$('#jquery-highlight-text');
  const allSongs=[]; $('.jquery-music-item').each(function(){allSongs.push({title:$(this).find('.jquery-song-title').text().trim(),artist:$(this).data('artist')})});
  const original=$highlightText.text();

  $search.on('keyup',function(){
    const q=$(this).val().toLowerCase().trim();
    $('.jquery-music-item').each(function(){
      const $it=$(this), t=$it.find('.jquery-song-title').text().toLowerCase(), a=$it.data('artist').toString().toLowerCase(), al=$it.data('album').toString().toLowerCase();
      (q===''||t.includes(q)||a.includes(q)||al.includes(q))?$it.fadeIn(200):$it.fadeOut(200);
    });
    if(q.length){
      const m=allSongs.filter(s=>s.title.toLowerCase().includes(q)||s.artist.toLowerCase().includes(q)).slice(0,5);
      m.length?$suggestions.html(m.map(s=>`<li>${s.title} <span style="opacity:.6">- ${s.artist}</span></li>`).join('')).fadeIn(200):$suggestions.fadeOut(200);
      const esc=q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); const rx=new RegExp(`(${esc})`,'gi'); $highlightText.html(original.replace(rx,'<span class="jquery-highlight">$1</span>'));
    }else{$suggestions.fadeOut(200);$highlightText.html(original)}
  });

  $(document).on('click','#jquery-suggestions li',function(){
    const title=$(this).text().split(' - ')[0]; $search.val(title).trigger('keyup'); $suggestions.fadeOut(200);
  });
  $(document).on('click',e=>{if(!$(e.target).closest('#jquery-search,#jquery-suggestions').length)$suggestions.fadeOut(200)});

  const $bar=$('#jquery-progress-bar');
  $(window).on('scroll',()=>{const top=$(window).scrollTop(), h=$(document).height()-$(window).height(), p=(top/h)*100; $bar.css('width',p+'%')});

  const $counters=$('.jquery-counter[data-count]');
  function visible($el){const t=$el.offset().top,b=t+$el.outerHeight(),vt=$(window).scrollTop(),vb=vt+$(window).height(); return b>vt&&t<vb}
  function run($el){
    if($el.data('animated'))return;
    const target=parseInt($el.data('count')),duration=2000,steps=60,inc=target/steps; let cur=0;
    $el.data('animated',true);
    const timer=setInterval(()=>{cur+=inc; if(cur>=target){cur=target;clearInterval(timer)} $el.text(Math.floor(cur).toLocaleString())},duration/steps);
  }
  $(window).on('scroll load',()=>{$counters.each(function(){if(visible($(this))) run($(this))})});

  const $form=$('#jquery-newsletter-form'),$btn=$('#jquery-subscribe-btn');
  $form.on('submit',e=>{
    e.preventDefault();
    const orig=$btn.html(); $btn.prop('disabled',true).html('<span class="jquery-spinner"></span> Please wait...');
    setTimeout(()=>{$btn.prop('disabled',false).html(orig); showJQueryToast('✅ Successfully subscribed!'); $form[0].reset()},2000);
  });

  window.showJQueryToast=function(msg,type){
    type=type||'success';
    const bg={success:'linear-gradient(135deg,#2ecc71 0%,#27ae60 100%)',error:'linear-gradient(135deg,#e74c3c 0%,#c0392b 100%)',info:'linear-gradient(135deg,#3498db 0%,#2980b9 100%)'}[type];
    const $t=$('<div class="jquery-toast">').text(msg).css({background:bg,color:'#fff',padding:'15px 20px',borderRadius:'12px',boxShadow:'0 4px 15px rgba(0,0,0,.3)',marginBottom:'10px',minWidth:'250px',fontWeight:'600',cursor:'pointer',pointerEvents:'all'});
    $('#jquery-toast-container').append($t);
    setTimeout(()=>{$t.addClass('hide'); setTimeout(()=>{$t.remove()},300)},3000);
    $t.on('click',function(){$(this).addClass('hide'); setTimeout(()=>{$t.remove()},300)});
  };

  $('.jquery-action-btn').on('click',function(){
    const a=$(this).data('action'), map={favorite:'⭐ Added to favorites!',playlist:'🎶 Added to playlist!',share:'🔗 Link copied to clipboard!'}; showJQueryToast(map[a]);
  });

  $(document).on('click','.jquery-copy-btn',function(){
    const $b=$(this), target=$b.data('target'), text=$(target).text(), orig=$b.html();
    if(navigator.clipboard?.writeText){
      navigator.clipboard.writeText(text).then(()=>{$b.html('✓ Copied!');showJQueryToast('✅ Copied to clipboard!');setTimeout(()=>{$b.html(orig)},2000)});
    }else{
      const $t=$('<textarea>').val(text).css({position:'absolute',left:'-9999px'}).appendTo('body');
      $t[0].select(); try{document.execCommand('copy');$b.html('✓ Copied!');showJQueryToast('✅ Copied to clipboard!');setTimeout(()=>{$b.html(orig)},2000)}catch(e){console.error('Copy failed:',e)} $t.remove();
    }
  });

  const $imgs=$('.jquery-lazy-img');
  function load($img){
    if($img.data('loaded'))return;
    const src=$img.data('src'); if(!src) return;
    const t=new Image();
    t.onload=()=>{$img.attr('src',src).css('opacity','1');$img.siblings('.jquery-img-loader').fadeOut(300);$img.data('loaded',true)};
    t.onerror=()=>{$img.siblings('.jquery-img-loader').html('❌')}; t.src=src;
  }
  function check(){
    const top=$(window).scrollTop(), bot=top+$(window).height();
    $imgs.each(function(){
      const $i=$(this); if($i.data('loaded')) return;
      const it=$i.offset().top, ib=it+$i.height();
      if(ib>top-200&&it<bot+200) load($i);
    });
  }
  $(window).on('scroll resize',check); check();
}

