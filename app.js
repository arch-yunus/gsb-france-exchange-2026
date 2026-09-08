// Tab Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const tabId = `tab-${btn.dataset.tab}`;
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');
  });
});

// ==========================================
// 1. REGIONS DATA & RENDERING
// ==========================================
const regionsData = [
  {
    name: "Île-de-France",
    capital: "Paris",
    category: "kuzey",
    pop: "12.4 Milyon",
    desc: "Fransa'nın siyasi, ekonomik ve entelektüel kalbi. Küresel diplomasi, Louvre Müzesi, Sorbonne Üniversitesi, Station F ve La Défense.",
    highlights: "Paris, Versailles, Saint-Denis | GSYİH'nin %31'i"
  },
  {
    name: "Auvergne-Rhône-Alpes",
    capital: "Lyon",
    category: "dogu",
    pop: "8.1 Milyon",
    desc: "İkinci büyük ekonomik bölge. Fransız gastronomisinin başkenti Lyon, Mont Blanc (4808 m), mikroelektronik devi Grenoble ve nükleer enerji santralleri.",
    highlights: "Lyon, Grenoble, Annecy | İpek Mirası & Alpler"
  },
  {
    name: "Provence-Alpes-Côte d'Azur (PACA)",
    capital: "Marseille",
    category: "guney",
    pop: "5.1 Milyon",
    desc: "Akdeniz havzası, Fransa'nın en büyük ticaret limanı Marseille, Fransız Rivierası (Nice, Cannes) ve antik Greko-Romen kalıntıları.",
    highlights: "Marseille, Nice, Aix-en-Provence | Akdeniz Limanı"
  },
  {
    name: "Occitanie",
    capital: "Toulouse",
    category: "guney",
    pop: "6.0 Milyon",
    desc: "Avrupa'nın havacılık ve uzay üssü (Airbus, CNES). Tarihi Oksitan kültürü, Orta Çağ kalesi Carcassonne ve üniversite şehri Montpellier.",
    highlights: "Toulouse, Montpellier, Nîmes | Airbus & CNES"
  },
  {
    name: "Nouvelle-Aquitaine",
    capital: "Bordeaux",
    category: "bati",
    pop: "6.0 Milyon",
    desc: "Yüzölçümü bakımından en büyük bölge. Dünya şarap başkenti Bordeaux, Atlantik kıyıları, Dassault havacılık kümelenmesi ve Bask kültürü.",
    highlights: "Bordeaux, Poitiers, Limoges | Atlantik Kıyısı"
  },
  {
    name: "Grand Est",
    capital: "Strasbourg",
    category: "dogu",
    pop: "5.5 Milyon",
    desc: "Avrupa Parlamentosu ve AİHM'e ev sahipliği yapan Strasbourg. Fransız-Alman tarihsel barışının sembolü ve Şampanya bağları (Reims).",
    highlights: "Strasbourg, Reims, Metz | Avrupa Kurumları"
  },
  {
    name: "Hauts-de-France",
    capital: "Lille",
    category: "kuzey",
    pop: "6.0 Milyon",
    desc: "İngiltere'ye açılan Manş Tüneli kapısı. Tarihi maden ve sanayi mirasının elektrikli araç batarya vadisine (Battery Valley) dönüşümü.",
    highlights: "Lille, Amiens, Dunkerque | Sanayi Dönüşümü"
  },
  {
    name: "Normandie",
    capital: "Rouen",
    category: "kuzey",
    pop: "3.3 Milyon",
    desc: "1944 D-Day Müttefik Çıkarma Sahilleri, Empresyonizmin doğum yeri (Monet), Mont-Saint-Michel manastır adası ve Le Havre limanı.",
    highlights: "Rouen, Caen, Le Havre | D-Day & Empresyonizm"
  },
  {
    name: "Bretagne",
    capital: "Rennes",
    category: "bati",
    pop: "3.4 Milyon",
    desc: "Güçlü Kelt kültürel kimliği ve Breton dili. Fransız Atlantik Donanma Üssü (Brest), deniz fenerleri ve siber güvenlik merkezi.",
    highlights: "Rennes, Brest, Saint-Malo | Kelt Mirası"
  },
  {
    name: "Pays de la Loire",
    capital: "Nantes",
    category: "bati",
    pop: "3.8 Milyon",
    desc: "Dünyanın en büyük yolcu gemilerinin inşa edildiği tersaneler (Saint-Nazaire), Jules Verne'in doğum yeri Nantes ve dinamik teknoloji sektörü.",
    highlights: "Nantes, Angers, Le Mans | Gemi İnşası & Otomotiv"
  },
  {
    name: "Bourgogne-Franche-Comté",
    capital: "Dijon",
    category: "dogu",
    pop: "2.8 Milyon",
    desc: "Burgonya dükleri tarihi, dünya çapında gastronomi ve şaraplar, Besançon ince mekanik ve saatçilik sanayisi, TGV montaj fabrikaları.",
    highlights: "Dijon, Besançon, Belfort | TGV Fabrikaları & Gastronomi"
  },
  {
    name: "Centre-Val de Loire",
    capital: "Orléans",
    category: "kuzey",
    pop: "2.6 Milyon",
    desc: "Krallar Vadisi: UNESCO Dünya Mirası Loire Şatoları (Chambord, Chenonceau), tarım ve dünya kozmetik vadisi (Cosmetic Valley).",
    highlights: "Orléans, Tours, Chartres | Loire Şatoları"
  },
  {
    name: "Corse (Korsika)",
    capital: "Ajaccio",
    category: "guney",
    pop: "350.000",
    desc: "Akdeniz'in dağlık adası, Napoléon Bonaparte'ın doğum yeri, kendine özgü Korsika dili ve zengin bio-çeşitlilik.",
    highlights: "Ajaccio, Bastia | Akdeniz Mirası"
  }
];

function renderRegions(list) {
  const container = document.getElementById('regionsContainer');
  if (!container) return;
  container.innerHTML = list.map(r => `
    <div class="region-card">
      <div class="region-header">
        <h3>${r.name}</h3>
        <span class="region-badge">${r.capital}</span>
      </div>
      <div class="region-meta">
        <span>👥 ${r.pop}</span>
        <span>📍 ${r.highlights.split('|')[1] || ''}</span>
      </div>
      <p class="region-desc">${r.desc}</p>
      <div class="region-highlights">
        <strong>Önemli Merkezler:</strong> ${r.highlights.split('|')[0]}
      </div>
    </div>
  `).join('');
}

function filterRegions(category) {
  document.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
  const term = document.getElementById('regionSearch').value.toLowerCase();
  let filtered = regionsData;
  if (category !== 'all') {
    filtered = filtered.filter(r => r.category === category);
  }
  if (term) {
    filtered = filtered.filter(r => r.name.toLowerCase().includes(term) || r.capital.toLowerCase().includes(term) || r.desc.toLowerCase().includes(term));
  }
  renderRegions(filtered);
}

document.getElementById('regionSearch')?.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const activeChip = document.querySelector('.filter-chips .chip.active');
  const cat = activeChip ? activeChip.innerText : 'Tümü';
  let filtered = regionsData;
  if (term) {
    filtered = filtered.filter(r => r.name.toLowerCase().includes(term) || r.capital.toLowerCase().includes(term) || r.desc.toLowerCase().includes(term));
  }
  renderRegions(filtered);
});

// ==========================================
// 2. VOCABULARY & FLASHCARDS
// ==========================================
const vocabData = [
  { fr: "La diplomatie publique", pronun: "/la di.plɔ.ma.si py.blik/", tr: "Kamu diplomasisi", cat: "diplomacy", ex: "Renforcer la diplomatie publique par la jeunesse." },
  { fr: "L'engagement citoyen", pronun: "/lɑ̃.ɡaʒ.mɑ̃ si.twa.jɛ̃/", tr: "Yurttaşlık katılımı / Gönüllülük", cat: "diplomacy", ex: "Favoriser l'engagement citoyen des jeunes." },
  { fr: "Le développement durable", pronun: "/lə de.vlɔp.mɑ̃ dy.ʁabl/", tr: "Sürdürülebilir kalkınma", cat: "diplomacy", ex: "Les objectifs de développement durable (ODD)." },
  { fr: "La table ronde", pronun: "/la tabl ʁɔ̃d/", tr: "Yuvarlak masa toplantısı", cat: "diplomacy", ex: "Participer à une table ronde bilatérale." },
  { fr: "Le compte-rendu", pronun: "/lə kɔ̃t ʁɑ̃.dy/", tr: "Toplantı tutanağı / Rapor", cat: "diplomacy", ex: "Rédiger le compte-rendu de l'atelier." },
  { fr: "Bonjour / Bonsoir", pronun: "/bɔ̃.ʒuʁ / bɔ̃.swaʁ/", tr: "İyi günler / İyi akşamlar", cat: "daily", ex: "Bonjour Monsieur, comment allez-vous ?" },
  { fr: "S'il vous plaît", pronun: "/sil vu plɛ/", tr: "Lütfen (Resmi)", cat: "daily", ex: "Un café et l'addition, s'il vous plaît." },
  { fr: "Je vous en prie", pronun: "/ʒə vu zɑ̃ pʁi/", tr: "Rica ederim", cat: "daily", ex: "Merci beaucoup ! - Je vous en prie." },
  { fr: "Où se trouve la gare ?", pronun: "/u sə tʁuv la ɡaʁ/", tr: "Gar nerede bulunuyor?", cat: "daily", ex: "Excusez-moi, où se trouve la gare ?" },
  { fr: "Le boulot / Le taf", pronun: "/lə bu.lo / lə taf/", tr: "İş, mesai (Argot)", cat: "argot", ex: "Je vais au boulot à 9 heures." },
  { fr: "Un pote / Une pote", pronun: "/œ̃ pɔt/", tr: "Kanka, yakın arkadaş (Argot)", cat: "argot", ex: "Je voyage avec mes potes de délégation." },
  { fr: "C'est un truc de ouf !", pronun: "/sɛ tœ̃ tʁyk də uf/", tr: "Çılgınca / İnanılmaz bir şey! (Verlan)", cat: "argot", ex: "Ce musée est un truc de ouf !" },
  { fr: "La meuf / Le keum", pronun: "/la mœf / lə kœm/", tr: "Kadın / Erkek (Verlan)", cat: "argot", ex: "C'est une meuf super sympa." },
  { fr: "Avoir le coup de foudre", pronun: "/a.vwaʁ lə ku də fudʁ/", tr: "İlk görüşte aşık olmak / Vurulmak", cat: "idioms", ex: "J'ai eu le coup de foudre pour Paris." },
  { fr: "Poser un lapin", pronun: "/po.ze œ̃ la.pɛ̃/", tr: "Buluşmaya gelmemek, ekmek", cat: "idioms", ex: "Il m'a posé un lapin hier soir." }
];

let currentCardIndex = 0;

function updateFlashcard() {
  const card = vocabData[currentCardIndex];
  if (!card) return;
  document.getElementById('fcCategory').innerText = getCategoryLabel(card.cat);
  document.getElementById('fcFrench').innerText = card.fr;
  document.getElementById('fcPronun').innerText = card.pronun;
  document.getElementById('fcTurkish').innerText = card.tr;
  document.getElementById('fcExample').innerText = `"${card.ex}"`;
  document.getElementById('fcCounter').innerText = `${currentCardIndex + 1} / ${vocabData.length}`;
  document.getElementById('flashcard').classList.remove('flipped');
}

function flipCard() {
  document.getElementById('flashcard').classList.toggle('flipped');
}

function nextCard() {
  currentCardIndex = (currentCardIndex + 1) % vocabData.length;
  updateFlashcard();
}

function prevCard() {
  currentCardIndex = (currentCardIndex - 1 + vocabData.length) % vocabData.length;
  updateFlashcard();
}

function getCategoryLabel(cat) {
  switch (cat) {
    case 'diplomacy': return 'Diplomasi';
    case 'daily': return 'Günlük & Seyahat';
    case 'argot': return 'Argot & Verlan';
    case 'idioms': return 'Deyimler';
    default: return 'Genel';
  }
}

function renderVocabTable(list) {
  const tbody = document.getElementById('vocabTableBody');
  if (!tbody) return;
  tbody.innerHTML = list.map(v => `
    <tr>
      <td><strong>${v.fr}</strong></td>
      <td><code>${v.pronun}</code></td>
      <td>${v.tr}</td>
      <td><span class="badge-tag tag-${v.cat}">${getCategoryLabel(v.cat)}</span></td>
    </tr>
  `).join('');
}

function filterVocab() {
  const term = document.getElementById('vocabSearch')?.value.toLowerCase() || '';
  const cat = document.getElementById('vocabFilter')?.value || 'all';
  let filtered = vocabData;
  if (cat !== 'all') {
    filtered = filtered.filter(v => v.cat === cat);
  }
  if (term) {
    filtered = filtered.filter(v => v.fr.toLowerCase().includes(term) || v.tr.toLowerCase().includes(term));
  }
  renderVocabTable(filtered);
}

document.getElementById('vocabSearch')?.addEventListener('input', filterVocab);
document.getElementById('vocabFilter')?.addEventListener('change', filterVocab);

// ==========================================
// 3. QUIZ DATA & ENGINE
// ==========================================
const quizQuestions = [
  {
    q: "Fransa anakarası, geometrik şeklinden ötürü halk arasında hangi isimle anılır?",
    opts: ["Le Pentagone", "L'Hexagone (Altıgen)", "Le Triangle", "L'Octogone"],
    correct: 1,
    exp: "Fransa, 3 deniz ve 3 kara sınırına sahip 6 köşeli yapısı sebebiyle 'L'Hexagone' olarak anılır."
  },
  {
    q: "Fransa'da kilise ile devlet işlerini kesin olarak ayıran 'Laïcité' yasası hangi yılda kabul edilmiştir?",
    opts: ["1789", "1848", "1905", "1958"],
    correct: 2,
    exp: "9 Aralık 1905 tarihli yasa, Fransız tipi laikliğin kurucu anayasal temelidir."
  },
  {
    q: "Marcel Proust'un 'Kayıp Zamanın İzinde' eserinde istemsiz belleği (mémoire involontaire) tetikleyen ünlü yiyecek nedir?",
    opts: ["Kruvasan", "Madlen Keki (Madeleine)", "Makaron", "Baget Ekmeği"],
    correct: 1,
    exp: "Çaya batırılan madlen keki (La madeleine de Proust), çocukluk anılarını birdenbire canlandırır."
  },
  {
    q: "Fransa elektriğinin yaklaşık %70'ini üreten nükleer dönüşüm hamlesi hangi planla başlatılmıştır?",
    opts: ["Monnet Planı", "Messmer Planı (1973)", "De Gaulle Doktrini", "Yeşil Mutabakat"],
    correct: 1,
    exp: "1973 petrol krizinin ardından Başbakan Pierre Messmer tarafından 'Tout-nucléaire' planı başlatılmıştır."
  },
  {
    q: "1950'lerin sonunda Godard ve Truffaut öncülüğünde sinema kalıplarını yıkan Fransız sinema akımı hangisidir?",
    opts: ["Nouvelle Vague (Yeni Dalga)", "Realizm", "Dadaizm", "Ekspresyonizm"],
    correct: 0,
    exp: "Nouvelle Vague, stüdyolardan sokağa taşan hafif kameralı auteur sinema akımıdır."
  },
  {
    q: "Fransız argosunda hecelerin yer değiştirmesiyle türetilen dil sistemine ne ad verilir?",
    opts: ["Argon", "Verlan (L'envers)", "Patois", "Esperanto"],
    correct: 1,
    exp: "Verlan (l'envers = tersine), fou->ouf, femme->meuf gibi heceleri ters yüz eden bir sistemdir."
  },
  {
    q: "Dünyanın tek çatı altındaki en büyük girişimcilik ve kuluçka kampüsü Paris'teki hangi merkezdir?",
    opts: ["Station F", "Silicon Sentier", "Campus Tech", "Inria Lab"],
    correct: 0,
    exp: "Station F, 34.000 m² alanında 1000'den fazla startupa ev sahipliği yapan devasa kuluçka merkezidir."
  },
  {
    q: "Osmanlı-Fransız diplomatik ittifakının ilk resmi temeli 1536'da hangi iki lider arasında atılmıştır?",
    opts: ["Fatih Sultan Mehmet & XI. Louis", "Kanuni Sultan Süleyman & I. François", "Yavuz Sultan Selim & XIV. Louis", "II. Abdülhamid & Napoléon"],
    correct: 1,
    exp: "1536 yılında Kanuni Sultan Süleyman ve Fransa Kralı I. François stratejik bir ittifak kurmuştur."
  },
  {
    q: "Fransa'nın gastronomi başkenti ve tarihi ipek dokuma merkezi kabul edilen şehir hangisidir?",
    opts: ["Bordeaux", "Marseille", "Lyon", "Strasbourg"],
    correct: 2,
    exp: "Lyon, 'Bouchon' lokantaları, Paul Bocuse mirası ve tarihi Canuts ipekçileriyle gastronominin başkentidir."
  },
  {
    q: "Fransa'da 16-25 yaş arası gençlerin kamu yararına gönüllü çalışmasını sağlayan ulusal programın adı nedir?",
    opts: ["Erasmus+", "Service Civique", "Corps Européen", "MJC Jeunesse"],
    correct: 1,
    exp: "Service Civique, gençlerin 6-12 ay süreyle sivil kurumlarda kamu yararına görev almasını sağlar."
  }
];

let currentQuizIndex = 0;
let userScore = 0;

function renderQuizQuestion() {
  const qData = quizQuestions[currentQuizIndex];
  if (!qData) {
    showQuizResult();
    return;
  }
  document.getElementById('quizProgress').innerText = `Soru ${currentQuizIndex + 1} / ${quizQuestions.length}`;
  document.getElementById('quizScore').innerText = `Skor: ${userScore}`;
  document.getElementById('quizQuestion').innerText = qData.q;
  
  const optionsDiv = document.getElementById('quizOptions');
  optionsDiv.innerHTML = qData.opts.map((opt, idx) => `
    <button class="quiz-opt-btn" onclick="selectQuizAnswer(${idx})">${opt}</button>
  `).join('');
  
  const feedback = document.getElementById('quizFeedback');
  feedback.className = 'quiz-feedback';
  feedback.style.display = 'none';
  document.getElementById('quizNextBtn').style.display = 'none';
}

function selectQuizAnswer(selectedIndex) {
  const qData = quizQuestions[currentQuizIndex];
  const buttons = document.querySelectorAll('.quiz-opt-btn');
  buttons.forEach(btn => btn.disabled = true);

  const feedback = document.getElementById('quizFeedback');
  feedback.style.display = 'block';

  if (selectedIndex === qData.correct) {
    userScore += 10;
    buttons[selectedIndex].classList.add('correct');
    feedback.className = 'quiz-feedback show correct-fb';
    feedback.innerHTML = `<strong>Tebrikler, Doğru! 🎉</strong> ${qData.exp}`;
  } else {
    buttons[selectedIndex].classList.add('wrong');
    buttons[qData.correct].classList.add('correct');
    feedback.className = 'quiz-feedback show wrong-fb';
    feedback.innerHTML = `<strong>Yanlış Cevap. 💡</strong> ${qData.exp}`;
  }

  document.getElementById('quizScore').innerText = `Skor: ${userScore}`;
  document.getElementById('quizNextBtn').style.display = 'inline-block';
}

function nextQuizQuestion() {
  currentQuizIndex++;
  renderQuizQuestion();
}

function showQuizResult() {
  document.getElementById('quizContainer').style.display = 'none';
  const resultDiv = document.getElementById('quizResult');
  resultDiv.style.display = 'block';
  let message = "";
  if (userScore >= 80) message = "Olağanüstü! Tam bir Fransız Kültür & Diplomasi Uzmanısınız! 🇫🇷🇹🇷";
  else if (userScore >= 50) message = "Tebrikler! İyi bir temeliniz var, atlas dosyalarını okuyarak puanınızı artırabilirsiniz. 📚";
  else message = "Fransa Atlası'nı inceleyerek bilginizi geliştirebilir ve testi tekrar deneyebilirsiniz! ✨";

  resultDiv.innerHTML = `
    <h3>Test Tamamlandı!</h3>
    <p style="font-size: 2.5rem; font-weight:800; color:var(--primary); margin: 1rem 0;">${userScore} / 100 Puan</p>
    <p style="font-size: 1.1rem; color:#334155; margin-bottom: 2rem;">${message}</p>
    <button class="btn-primary" onclick="restartQuiz()">Testi Yeniden Başlat ↻</button>
  `;
}

function restartQuiz() {
  currentQuizIndex = 0;
  userScore = 0;
  document.getElementById('quizContainer').style.display = 'block';
  document.getElementById('quizResult').style.display = 'none';
  renderQuizQuestion();
}

// ==========================================
// 4. ATLAS MODAL CONTENT
// ==========================================
const atlasModalData = {
  history: {
    badge: "Felsefe & Düşünce Tarihi",
    title: "Aydınlanma'dan Çağdaş Felsefeye",
    content: `
      <p>Fransa'nın fikir tarihi, modern dünyanın rasyonalizm, laiklik ve insan hakları algısının kurucu beşiğidir.</p>
      <h4>Önemli Dönemeçler:</h4>
      <ul>
        <li><strong>René Descartes:</strong> Kartezyen şüphe ve <em>"Düşünüyorum öyleyse varım"</em> rasyonalizmi.</li>
        <li><strong>Voltaire & Rousseau:</strong> Hoşgörü mücadelesi ve <em>Toplum Sözleşmesi</em> (halk egemenliği).</li>
        <li><strong>1789 İhtilali:</strong> İnsan ve Yurttaş Hakları Bildirisi ile evrenselleşen özgürlük ve eşitlik.</li>
        <li><strong>Varoluşçuluk (Sartre & Camus):</strong> 2. Dünya Savaşı sonrası varoluşun özden önce gelmesi ve etik başkaldırı.</li>
        <li><strong>Mayıs 1968:</strong> Geleneksel otoriteyi sarsan gençlik ve işçi genel grevi devrimi.</li>
      </ul>
      <p><small>Detaylı dosya için: <code>france-atlas/history-thought.md</code></small></p>
    `
  },
  institutions: {
    badge: "Anayasal Yapı & Hukuk",
    title: "5. Cumhuriyet, Laïcité ve Gençlik Kurumları",
    content: `
      <p>Fransız devlet mimarisi, güçlü yürütme ile bağımsız yüksek yargı organlarının dengesine dayanır.</p>
      <h4>Temel Yapılar:</h4>
      <ul>
        <li><strong>Yarı-Başkanlık Sistemi:</strong> Doğrudan halkoyuyla seçilen güçlü Cumhurbaşkanı (Élysée) ve Başbakan (Matignon).</li>
        <li><strong>Laïcité (1905 Yasası):</strong> Kamusal alanda devletin mutlak inanç tarafsızlığı ve vicdan özgürlüğü teminatı.</li>
        <li><strong>Conseil d'État & Conseil Constitutionnel:</strong> Yüksek idari yargı ve anayasa uygunluk denetimi.</li>
        <li><strong>MJC (Gençlik ve Kültür Evleri):</strong> Tabandan örgütlenen, katılımcı gençlik kulüpleri modeli.</li>
      </ul>
      <p><small>Detaylı dosya için: <code>france-atlas/institutions-state.md</code></small></p>
    `
  },
  arts: {
    badge: "Sanat & Estetik",
    title: "Edebiyat, Sinema, Flânerie ve Empresyonizm",
    content: `
      <p>Molière'den Marcel Proust'a, Louvre salonlarından Nouvelle Vague sokaklarına Fransız estetik geleneği.</p>
      <h4>Öne Çıkanlar:</h4>
      <ul>
        <li><strong>Klasisizm & Realizm:</strong> Molière komedyaları, Balzac'ın <em>İnsanlık Komedyası</em>, Victor Hugo'nun <em>Sefiller</em>'i.</li>
        <li><strong>Flâneur & Sembolizm:</strong> Charles Baudelaire'in <em>Kötülük Çiçekleri</em> ve kenti seyreden avare gözlemci kavramı.</li>
        <li><strong>Marcel Proust:</strong> <em>Kayıp Zamanın İzinde</em> ve istemsiz bellek kuramı.</li>
        <li><strong>Empresyonizm & Nouvelle Vague:</strong> Claude Monet ışığı ve Godard-Truffaut sinema devrimi.</li>
      </ul>
      <p><small>Detaylı dosya için: <code>france-atlas/arts-literature.md</code></small></p>
    `
  },
  science: {
    badge: "Sanayi & Teknoloji",
    title: "Nükleer Model, Airbus, TGV ve French Tech",
    content: `
      <p>Temel bilimlerdeki Fields madalyaları ve Nobel geleneğini ileri teknolojiyle birleştiren sanayi modeli.</p>
      <h4>Önemli Sektörler:</h4>
      <ul>
        <li><strong>Nükleer Enerji (Messmer Planı):</strong> Elektriğin %70'ini nükleerden sağlayan düşük karbonlu model.</li>
        <li><strong>Airbus & Ariane:</strong> Toulouse montaj hatları ve Avrupa'nın bağımsız uzay fırlatma araçları.</li>
        <li><strong>TGV (Alstom):</strong> 574,8 km/s hız rekoruna sahip yüksek hızlı demiryolu şebekesi.</li>
        <li><strong>Station F & Mistral AI:</strong> Avrupa'nın yapay zekâ ve teknoloji kuluçka üssü Paris.</li>
      </ul>
      <p><small>Detaylı dosya için: <code>france-atlas/science-industry.md</code></small></p>
    `
  },
  culture: {
    badge: "Sosyoloji & Yaşam",
    title: "L'art de vivre, UNESCO Gastronomi ve Verlan",
    content: `
      <p>Zamanı sohbetle zenginleştiren yaşama sanatı, kafe terasları ve yaşayan sokak dili.</p>
      <h4>Gündelik Kültür:</h4>
      <ul>
        <li><strong>L'art de vivre:</strong> Öğle yemeği ve akşam sofrası ritüelleri, kişisel alana saygı.</li>
        <li><strong>UNESCO Gastronomi Mirası:</strong> Terroir anlayışı, AOP peynirleri ve geleneksel baget geleneği.</li>
        <li><strong>Kafe Terası Kültürü:</strong> Sokağa bakan masalarda kitap okuma ve insanları izleme rutini.</li>
        <li><strong>Argot & Verlan:</strong> Hecelerin yerini değiştiren gençlik dili (meuf, ouf, zarbi, cimer).</li>
      </ul>
      <p><small>Detaylı dosya için: <code>france-atlas/everyday-culture.md</code></small></p>
    `
  },
  diplomacy: {
    badge: "İkili İlişkiler",
    title: "Türkiye - Fransa Tarihi Bağı ve 2026 Vizyonu",
    content: `
      <p>1536'dan bu yana süregelen ittifaklar, kültürel etkileşimler ve gençlik diplomasisi köprüleri.</p>
      <h4>İlişkilerin Omurgası:</h4>
      <ul>
        <li><strong>Tarihsel İttifak:</strong> Kanuni Sultan Süleyman ve I. François'nın başlattığı diplomatik temaslar.</li>
        <li><strong>Galatasaray Geleneği:</strong> 1868'den bu yana Türkiye'deki köklü Frankofon eğitim köprüsü.</li>
        <li><strong>Ortak 5000 Kelime:</strong> Türkçede yaşayan Fransızca kökenli zengin kelime hazinesi.</li>
        <li><strong>2026-2027 Eylem Planı:</strong> Kardeş Gençlik Merkezleri, İklim Hackathonları ve karşılıklı gönüllülük stajları.</li>
      </ul>
      <p><small>Detaylı dosya için: <code>workshops/youth-diplomacy.md</code></small></p>
    `
  }
};

function openAtlasModal(key) {
  const data = atlasModalData[key];
  if (!data) return;
  document.getElementById('modalBadge').innerText = data.badge;
  document.getElementById('modalTitle').innerText = data.title;
  document.getElementById('modalBody').innerHTML = data.content;
  document.getElementById('atlasModal').classList.add('active');
}

function closeAtlasModal(e) {
  document.getElementById('atlasModal').classList.remove('active');
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
  renderRegions(regionsData);
  updateFlashcard();
  renderVocabTable(vocabData);
  renderQuizQuestion();
});
