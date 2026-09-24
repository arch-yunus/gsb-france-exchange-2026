// ==========================================================================
// GSB TÜRKİYE - FRANSA GENÇLİK DEĞİŞİMİ 2026 | UYGULAMA MOTORU (app.js)
// ==========================================================================

// 1. THEME TOGGLE (Dark / Light Mode with localStorage)
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');

function initTheme() {
  const savedTheme = localStorage.getItem('gsb-france-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
  if (themeIcon) {
    themeIcon.innerText = theme === 'dark' ? '☀️' : '🌙';
  }
}

themeToggleBtn?.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('gsb-france-theme', newTheme);
  updateThemeIcon(newTheme);
});

// 2. TAB NAVIGATION WITH URL HASH ROUTING
function switchTab(tabKey) {
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tabKey);
  });
  document.querySelectorAll('.tab-content').forEach(c => {
    c.classList.toggle('active', c.id === `tab-${tabKey}`);
  });
  window.location.hash = tabKey;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.dataset.tab);
  });
});

window.addEventListener('hashchange', () => {
  const tabKey = window.location.hash.replace('#', '');
  if (tabKey && document.getElementById(`tab-${tabKey}`)) {
    switchTab(tabKey);
  }
});

// 3. TOAST NOTIFICATION HELPER
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// 4. WEB AUDIO SYNTH HELPER
function playTone(freq = 440, type = 'sine', duration = 0.1) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore audio context restrictions
  }
}

// 5. TEXT-TO-SPEECH (TTS) FOR FRENCH
function speakText(text, lang = 'fr-FR') {
  if (!('speechSynthesis' in window)) {
    showToast('Tarayıcınız ses sentezini desteklemiyor.');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

// ==========================================================================
// 6. QUOTES & APHORISMS DATABASE & ENGINE
// ==========================================================================
const quotesData = [
  {
    category: "french",
    quoteFr: "Le véritable voyage de découverte ne consiste pas à chercher de nouveaux paysages, mais à avoir de nouveaux yeux.",
    quoteTr: "Gerçek keşif yolculuğu yeni manzaralar aramak değil, yeni gözlere sahip olmaktır.",
    author: "Marcel Proust",
    work: "À la recherche du temps perdu (1913-1927)"
  },
  {
    category: "french",
    quoteFr: "Je pense, donc je suis.",
    quoteTr: "Düşünüyorum, öyleyse varım.",
    author: "René Descartes",
    work: "Discours de la méthode (1637)"
  },
  {
    category: "french",
    quoteFr: "L'homme est né libre, et partout il est dans les fers.",
    quoteTr: "İnsan özgür doğar, oysa her yerde zincire vurulmuştur.",
    author: "Jean-Jacques Rousseau",
    work: "Du contrat social (1762)"
  },
  {
    category: "french",
    quoteFr: "Il faut cultiver notre jardin.",
    quoteTr: "Kendi bahçemizi yetiştirmeliyiz.",
    author: "Voltaire",
    work: "Candide ou l'Optimisme (1759)"
  },
  {
    category: "french",
    quoteFr: "Aimer, ce n'est pas se regarder l'un l'autre, c'est regarder ensemble dans la même direction.",
    quoteTr: "Sevmek birbirine bakmak değil, birlikte aynı yöne bakmaktır.",
    author: "Antoine de Saint-Exupéry",
    work: "Terre des hommes (1939)"
  },
  {
    category: "french",
    quoteFr: "L'albatros est pareil au prince des nuées / Qui hante la tempête et se rit de l'archer.",
    quoteTr: "Şair de bulutların bu prensine benzer / Fırtınayla dost yaşar, okçulara gülüp geçer.",
    author: "Charles Baudelaire",
    work: "Les Fleurs du mal (1857)"
  },
  {
    category: "french",
    quoteFr: "La beauté sauvera le monde.",
    quoteTr: "Dünyayı güzellik kurtaracak.",
    author: "Albert Camus (uyarlama)",
    work: "L'Été (1954)"
  },
  {
    category: "french",
    quoteFr: "On ne naît pas femme : on le devient.",
    quoteTr: "Kadın doğulmaz, kadın olunur.",
    author: "Simone de Beauvoir",
    work: "Le Deuxième Sexe (1949)"
  },
  {
    category: "turkish",
    quoteFr: "Les mots sont la mémoire d'une nation. Apprendre le français, c'est entrer dans le laboratoire de pensée de l'Europe.",
    quoteTr: "Kelimeler, bir milletin hafızasıdır. Fransızcayı öğrenmek, Avrupa'nın düşünce laboratuvarına girmektir.",
    author: "Cemil Meriç",
    work: "Bu Ülke & Kırk Ambar"
  },
  {
    category: "turkish",
    quoteFr: "J'ai appris à Paris ce qu'était la poésie pure et la philosophie de l'histoire.",
    quoteTr: "Fransa'da şiirin ne olduğunu ve tarihin felsefesini Albert Sorel'in kürsüsünde ve Paris sokaklarında öğrendim.",
    author: "Yahya Kemal Beyatlı",
    work: "Kendi Gök Kubbemiz & Paris Hatıraları"
  },
  {
    category: "turkish",
    quoteFr: "Hak bildiğin yolda yalnız kalacaksın; fakat yürüyeceksin.",
    quoteTr: "Hak bildiğin yolda yalnız da olsan yürüyeceksin.",
    author: "Tevfik Fikret",
    work: "Halûk'un Âmentüsü (1911)"
  },
  {
    category: "turkish",
    quoteFr: "Biz Batı'yı Fransız edebiyatının ve felsefesinin penceresinden seyrederek modernleştik.",
    quoteTr: "Biz Batı'yı Fransız edebiyatının ve felsefesinin penceresinden seyrederek modernleştik.",
    author: "Ahmet Hamdi Tanpınar",
    work: "19. Asır Türk Edebiyatı Tarihi"
  },
  {
    category: "world",
    quoteFr: "Si vous avez la chance d'avoir vécu à Paris quand vous étiez jeune, alors Paris est une fête qui vous accompagne toute votre vie.",
    quoteTr: "Gençliğinizde Paris'te yaşama şansına erişmişseniz, Paris hayatınızın geri kalanında gittiğiniz her yere sizinle gelen taşınabilir bir şölendir.",
    author: "Ernest Hemingway",
    work: "A Moveable Feast (1964)"
  },
  {
    category: "diplomacy",
    quoteFr: "La diplomatie est l'art de faire durer les carreaux tant qu'on n'a pas trouvé de quoi les remplacer.",
    quoteTr: "Diplomasi, barış ve diyalog zeminini ne pahasına olursa olsun ayakta tutma sanatıdır.",
    author: "Charles-Maurice de Talleyrand",
    work: "Diplomatik Aforizmalar"
  },
  {
    category: "diplomacy",
    quoteFr: "La jeunesse est le printemps de l'humanité et le pont le plus solide entre les peuples.",
    quoteTr: "Gençlik, insanlığın ilkbaharı ve halklar arasındaki en sarsılmaz barış köprüsüdür.",
    author: "GSB & Fransız Gençlik Bildirisi",
    work: "2026 Ortak Eylem Deklarasyonu"
  }
];

function renderQuotes(list) {
  const container = document.getElementById('quotesContainer');
  if (!container) return;
  container.innerHTML = list.map((q, idx) => `
    <div class="quote-card">
      <span class="quote-tag">${getQuoteCategoryLabel(q.category)}</span>
      <div class="quote-fr">
        "${q.quoteFr}"
        <button class="btn-voice-mini" onclick="speakText('${q.quoteFr.replace(/'/g, "\\'")}')" title="Seslendir">🔊</button>
      </div>
      <div class="quote-tr">"${q.quoteTr}"</div>
      <div class="quote-author">— ${q.author}</div>
      <div class="quote-work">${q.work}</div>
      <button class="btn-quote-copy" onclick="copyQuote('${q.quoteFr.replace(/'/g, "\\'")}', '${q.author}')">📋 Alıntıyı Kopyala</button>
    </div>
  `).join('');
}

function getQuoteCategoryLabel(cat) {
  switch (cat) {
    case 'french': return '🇫🇷 Fransız Düşüncesi';
    case 'turkish': return '🇹🇷 Türk Aydınları';
    case 'world': return '🌍 Dünya Yazarları';
    case 'diplomacy': return '🌐 Diplomasi';
    default: return 'Genel';
  }
}

function copyQuote(text, author) {
  navigator.clipboard.writeText(`"${text}" — ${author}`);
  showToast('Alıntı panoya kopyalandı! ✨');
  playTone(520, 'sine', 0.1);
}

function filterQuotes(category) {
  document.querySelectorAll('#tab-quotes .chip').forEach(c => c.classList.remove('active'));
  event?.target?.classList.add('active');
  const searchVal = document.getElementById('quoteSearch')?.value.toLowerCase() || '';

  const filtered = quotesData.filter(q => {
    const matchCat = category === 'all' || q.category === category;
    const matchSearch = q.author.toLowerCase().includes(searchVal) ||
                        q.quoteFr.toLowerCase().includes(searchVal) ||
                        q.quoteTr.toLowerCase().includes(searchVal) ||
                        q.work.toLowerCase().includes(searchVal);
    return matchCat && matchSearch;
  });
  renderQuotes(filtered);
}

document.getElementById('quoteSearch')?.addEventListener('input', (e) => {
  const searchVal = e.target.value.toLowerCase();
  const filtered = quotesData.filter(q =>
    q.author.toLowerCase().includes(searchVal) ||
    q.quoteFr.toLowerCase().includes(searchVal) ||
    q.quoteTr.toLowerCase().includes(searchVal) ||
    q.work.toLowerCase().includes(searchVal)
  );
  renderQuotes(filtered);
});

// ==========================================================================
// 7. FIGURES & BIOGRAPHIES DATABASE & ENGINE
// ==========================================================================
const figuresData = [
  {
    id: "kanuni",
    category: "leaders",
    name: "Kanuni Sultan Süleyman",
    role: "10. Osmanlı Padişahı (1494–1566)",
    era: "16. Yüzyıl (Klasik Diplomasi)",
    avatar: "👑",
    desc: "1526'da esir Fransa Kralı I. François'ya yazdığı tarihi fermanla yardıma koşmuş, 1536'da ilk Osmanlı-Fransız Ahitnamesi'ni (Kapitülasyonlar) imzalamıştır.",
    impact: "500 yıllık Türk-Fransız diplomatik ittifakının kurucu mimarıdır.",
    quoteFr: "Moi qui suis le sultan des sultans... toi qui es François, roi du pays de France.",
    quoteTr: "Ben ki sultanlar sultanı... Sen ki Françe vilayetinin kralı Françesko'sun."
  },
  {
    id: "francois",
    category: "leaders",
    name: "I. François",
    role: "Fransa Kralı (1494–1547)",
    era: "16. Yüzyıl (Rönesans & Diplomasi)",
    avatar: "⚜️",
    desc: "Collège de France'ı kurarak Doğu dilleri ve Türkçe kürsüsünü açtırmış, Osmanlı ile Akdeniz'de stratejik iş birliğini başlatmıştır.",
    impact: "Fransız Rönesansı'nın hamisi ve Doğubilim çalışmalarının öncüsüdür.",
    quoteFr: "Tout est perdu, fors l'honneur.",
    quoteTr: "Onurumuz dışında her şey kaybedildi."
  },
  {
    id: "celebi",
    category: "turkish",
    name: "Yirmisekiz Çelebi Mehmed",
    role: "Osmanlı Elçisi & Devlet Adamı (1670–1732)",
    era: "18. Yüzyıl (Lâle Devri Aydınlanması)",
    avatar: "📜",
    desc: "1720-1721 Paris sefaretinde Fransız matbaasını, rasathanesini ve bahçe mimarisini inceleyip Fransa Sefaretnamesi'ni kaleme almıştır.",
    impact: "Matbaanın ve modern kütüphaneciliğin Osmanlı'ya girişine zemin hazırlamıştır.",
    quoteFr: "Une ambassade historique entre Istanbul et Paris.",
    quoteTr: "Fransa'nın fen ve sanatlarını temaşa eyleyip memlekete getirdik."
  },
  {
    id: "degaulle",
    category: "leaders",
    name: "General Charles de Gaulle",
    role: "Fransa Cumhurbaşkanı (1890–1970)",
    era: "20. Yüzyıl (5. Cumhuriyet)",
    avatar: "🎖️",
    desc: "1968'de Türkiye'ye resmî ziyarette bulunmuş, Anıtkabir'i ziyaret etmiş ve Galatasaray Lisesi'nin 100. yıl kutlamalarına katılmıştır.",
    impact: "Bağımsız Türk dış politikasına ve Atatürk ilkelerine derin saygı duymuştur.",
    quoteFr: "La France et la Turquie sont deux grandes nations indépendantes.",
    quoteTr: "Fransa ve Türkiye, bağımsızlık tutkusunu paylaşan iki kadim millettir."
  },
  {
    id: "descartes",
    category: "french",
    name: "René Descartes",
    role: "Modern Felsefenin Babası (1596–1650)",
    era: "17. Yüzyıl (Rasyonalizm)",
    avatar: "📐",
    desc: "Kartezyen felsefe ve analitik geometrinin kurucusu; aklın rehberliğini metodik şüphe ile temellendirmiştir.",
    impact: "Tanzimat ve Cumhuriyet Türk aydınlarının akılcılık anlayışını şekillendirmiştir.",
    quoteFr: "Je pense, donc je suis.",
    quoteTr: "Düşünüyorum, öyleyse varım."
  },
  {
    id: "voltaire",
    category: "french",
    name: "Voltaire",
    role: "Aydınlanma Filozofu (1694–1778)",
    era: "18. Yüzyıl (Aydınlanma Çağı)",
    avatar: "🕯️",
    desc: "Hoşgörü, ifade özgürlüğü ve rasyonalizmin yılmaz savunucusu; engizisyona ve dogmatizme karşı mücadele etmiştir.",
    impact: "Tanzimat aydınlarının (Şinasi, Namık Kemal) adalet ve hürriyet fikirlerini beslemiştir.",
    quoteFr: "Il faut cultiver notre jardin.",
    quoteTr: "Kendi bahçemizi yetiştirmeliyiz."
  },
  {
    id: "rousseau",
    category: "french",
    name: "Jean-Jacques Rousseau",
    role: "Toplum Sözleşmesi Filozofu (1712–1778)",
    era: "18. Yüzyıl (Aydınlanma)",
    avatar: "🌿",
    desc: "Halk egemenliği ve genel irade kavramlarını geliştirmiştir. İnsan hakları ve modern demokrasi teorisinin kurucusudur.",
    impact: "Mustafa Kemal Atatürk'ün TBMM egemenlik anlayışında en çok etkilendiği filozoftur.",
    quoteFr: "L'homme est né libre, et partout il est dans les fers.",
    quoteTr: "İnsan özgür doğar, oysa her yerde zincire vurulmuştur."
  },
  {
    id: "sinasi",
    category: "turkish",
    name: "İbrahim Şinasi",
    role: "Tanzimat Edebiyatının Kurucusu (1826–1871)",
    era: "19. Yüzyıl (Tanzimat)",
    avatar: "📰",
    desc: "Paris'te öğrenim görmüş; Fransız şiirini Türkçeye tercüme etmiş, ilk özel gazeteyi ve ilk Türkçe tiyatro oyununu yazmıştır.",
    impact: "Türk basınının ve Batılı edebi türlerin öncüsüdür.",
    quoteFr: "Le père du renouveau littéraire ottoman.",
    quoteTr: "Milletin aklı gazete ile aydınlanır."
  },
  {
    id: "namikkemal",
    category: "turkish",
    name: "Namık Kemal",
    role: "Vatan ve Hürriyet Şairi (1840–1888)",
    era: "19. Yüzyıl (Jön Türkler)",
    avatar: "🚩",
    desc: "Paris'te Victor Hugo ve Rousseau'yu incelemiş; hürriyet ve vatan kavramlarını modern manada Türk edebiyatına kazandırmıştır.",
    impact: "Genç Osmanlıların hürriyet ve meşrutiyet ateşini yakmıştır.",
    quoteFr: "Ne gam pür-ateş-i hevl olsa da gavga-yı hürriyet.",
    quoteTr: "Hürriyet kavgası ne kadar ateşli ve korkunç olsa da gam çekmeyiz."
  },
  {
    id: "ahmetriza",
    category: "turkish",
    name: "Ahmet Rıza Bey",
    role: "Jön Türk Lideri & Meclis Başkanı (1858–1930)",
    era: "19-20. Yüzyıl (Pozitivizm & Meşrutiyet)",
    avatar: "🎓",
    desc: "Paris'te Auguste Comte pozitivizmini benimsemiş; Meşveret gazetesini yayımlayarak 1908 devriminin fikri zeminini Fransa'da hazırlamıştır.",
    impact: "Pozitivist bilimi ve parlamenter sistemi savunan Türk siyaset adamıdır.",
    quoteFr: "Ordre et Progrès (İntizam ve Terakki).",
    quoteTr: "Nizam ve terakki aydınlanmanın esasıdır."
  },
  {
    id: "fikret",
    category: "turkish",
    name: "Tevfik Fikret",
    role: "Servet-i Fünûn Şairi & Eğitimci (1867–1915)",
    era: "19-20. Yüzyıl (Parnasizm & Hümanizm)",
    avatar: "🖋️",
    desc: "Galatasaray Lisesi müdürlüğü yapmış; Fransız parnasyen şairlerinden esinlenerek Türk şiirine yepyeni bir ahenk ve hümanist derinlik getirmiştir.",
    impact: "Yeni nesillere vicdan hürriyeti ve fikri hürriyet meşalesini aşılamıştır.",
    quoteFr: "Fikri hür, irfanı hür, vicdanı hür bir şair.",
    quoteTr: "Kimseden ümmîd-i feyz etmem, dilenmem perr-ü-bâl."
  },
  {
    id: "yahyakemal",
    category: "turkish",
    name: "Yahya Kemal Beyatlı",
    role: "Şair, Mütefekkir & Diplomat (1884–1958)",
    era: "20. Yüzyıl (Neoklasizm)",
    avatar: "🏛️",
    desc: "Paris'te Sorbonne'da tarih ve sembolizm eğitimi almış; Fransız saf şiirini Türk divan ve halk estetiğiyle harmanlamıştır.",
    impact: "Modern Türk edebiyatının anıt şairi ve kültür diplomasisinin büyük ismidir.",
    quoteFr: "Ne harabiyim ne harabatiyim / Kökü mazide olan atiyim.",
    quoteTr: "Kökü mazide olan atiyiz."
  },
  {
    id: "cemilmeric",
    category: "turkish",
    name: "Cemil Meriç",
    role: "Düşünür, Sosyolog & Çevirmen (1916–1987)",
    era: "20. Yüzyıl (Doğu-Batı Sentezi)",
    avatar: "📚",
    desc: "Fransızcadan Balzac, Hugo, Saint-Simon ve Proudhon'u çevirmiş; Batı düşüncesini Fransız metinleri üzerinden tahlil etmiştir.",
    impact: "Türk entelektüel hayatına kavramlar ve derin tercümeler kazandırmıştır.",
    quoteFr: "La culture, c'est le dialogue des âmes.",
    quoteTr: "Kelimeler bir milletin hafızasıdır; tercüme iki dünya arasındaki köprüdür."
  },
  {
    id: "victorhugo",
    category: "french",
    name: "Victor Hugo",
    role: "Fransız Edebiyatının Dev İsmi (1802–1885)",
    era: "19. Yüzyıl (Romantizm & Özgürlük)",
    avatar: "📖",
    desc: "Sefiller ve Notre-Dame'ın yazarı; sosyal adaletsizliğe karşı halkın ve yoksulların sesi olmuştur.",
    impact: "Dünya edebiyatında hümanizmin ve vicdanın simgesidir.",
    quoteFr: "Rien n'est plus puissant qu'une idée dont le temps est venu.",
    quoteTr: "Zamanı gelmiş bir fikirden daha güçlü hiçbir şey yoktur."
  },
  {
    id: "baudelaire",
    category: "french",
    name: "Charles Baudelaire",
    role: "Modern Şiirin & Flâneur'ün Kurucusu (1821–1867)",
    era: "19. Yüzyıl (Sembolizm)",
    avatar: "🥀",
    desc: "Kötülük Çiçekleri (Les Fleurs du mal) ile modern metropol insanının yalnızlığını ve estetiğini dizelere dökmüştür.",
    impact: "Ahmet Haşim'den Cahit Sıtkı'ya Türk şairlerini derinden etkilemiştir.",
    quoteFr: "Le ciel est un couvercle noir où brûlent les étoiles.",
    quoteTr: "Şair fırtınalarla dost yaşayan albatros kuşudur."
  },
  {
    id: "pierreloti",
    category: "french",
    name: "Pierre Loti",
    role: "Yazar & Türk Dostu Deniz Subayı (1850–1923)",
    era: "19-20. Yüzyıl (Oryantalizm & Dostluk)",
    avatar: "⚓",
    desc: "İstanbul'a duyduğu hayranlıkla Aziyadé romanını yazmış; Milli Mücadele döneminde Türk davasını Fransa'da savunmuştur.",
    impact: "Türk-Fransız halkları arasındaki gönül köprüsünün simgesidir.",
    quoteFr: "Istanbul, la ville de mes rêves et de mon cœur.",
    quoteTr: "İstanbul ruhumun ve kalbimin ebedi sığınağıdır."
  },
  {
    id: "beauvoir",
    category: "french",
    name: "Simone de Beauvoir",
    role: "Varoluşçu Filozof & Yazar (1908–1986)",
    era: "20. Yüzyıl (Varoluşçuluk & Feminizm)",
    avatar: "⚖️",
    desc: "İkinci Cinsiyet eseriyle modern kadın hakları teorisini kurmuş; Jean-Paul Sartre ile birlikte varoluşçu felsefeyi savunmuştur.",
    impact: "Evrensel eşitlik ve özgürleşme mücadelesinin öncüsüdür.",
    quoteFr: "On ne naît pas femme : on le devient.",
    quoteTr: "Kadın doğulmaz, kadın olunur."
  },
  {
    id: "camus",
    category: "french",
    name: "Albert Camus",
    role: "Nobel Edebiyat Ödüllü Yazar (1913–1960)",
    era: "20. Yüzyıl (Absürdizm)",
    avatar: "☀️",
    desc: "Yabancı, Veba ve Sisifos Söyleni yazarı; absürde karşı insanın ahlaki dayanışması ve başkaldırısını savunmuştur.",
    impact: "Akdeniz kültürünün ve varoluşçu etiğin büyük ustasıdır.",
    quoteFr: "Au milieu de l'hiver, j'apprenais enfin qu'il y avait en moi un été invincible.",
    quoteTr: "Kışın tam ortasında, içimde yenilmez bir yaz olduğunu öğrendim."
  }
];

function renderFigures(list) {
  const container = document.getElementById('figuresContainer');
  if (!container) return;
  container.innerHTML = list.map(f => `
    <div class="figure-card">
      <div class="fig-header">
        <div class="fig-avatar">${f.avatar}</div>
        <div class="fig-meta">
          <h3>${f.name}</h3>
          <p>${f.role}</p>
        </div>
      </div>
      <span class="fig-era">${f.era}</span>
      <p class="fig-desc">${f.desc}</p>
      <div class="fig-impact"><strong>Önemi:</strong> ${f.impact}</div>
      <div class="fig-quote">
        <span>"${f.quoteFr}"</span>
        <button class="btn-voice-mini" onclick="speakText('${f.quoteFr.replace(/'/g, "\\'")}')" title="Seslendir">🔊</button>
      </div>
    </div>
  `).join('');
}

function filterFigures(category) {
  document.querySelectorAll('#tab-figures .chip').forEach(c => c.classList.remove('active'));
  event?.target?.classList.add('active');
  const searchVal = document.getElementById('figureSearch')?.value.toLowerCase() || '';

  const filtered = figuresData.filter(f => {
    const matchCat = category === 'all' || f.category === category;
    const matchSearch = f.name.toLowerCase().includes(searchVal) ||
                        f.role.toLowerCase().includes(searchVal) ||
                        f.desc.toLowerCase().includes(searchVal);
    return matchCat && matchSearch;
  });
  renderFigures(filtered);
}

document.getElementById('figureSearch')?.addEventListener('input', (e) => {
  const searchVal = e.target.value.toLowerCase();
  const filtered = figuresData.filter(f =>
    f.name.toLowerCase().includes(searchVal) ||
    f.role.toLowerCase().includes(searchVal) ||
    f.desc.toLowerCase().includes(searchVal)
  );
  renderFigures(filtered);
});

// ==========================================================================
// 8. VERBS & CONJUGATION ENGINE
// ==========================================================================
const verbsData = {
  etre: {
    infinitive: "ÊTRE",
    meaningTr: "Olmak (Yardımcı Fiil)",
    present: [
      { p: "je", f: "suis" }, { p: "tu", f: "es" }, { p: "il / elle", f: "est" },
      { p: "nous", f: "sommes" }, { p: "vous", f: "êtes" }, { p: "ils / elles", f: "sont" }
    ],
    passeCompose: [
      { p: "j'", f: "ai été" }, { p: "tu", f: "as été" }, { p: "il / elle", f: "a été" },
      { p: "nous", f: "avons été" }, { p: "vous", f: "avez été" }, { p: "ils / elles", f: "ont été" }
    ],
    imparfait: [
      { p: "j'", f: "étais" }, { p: "tu", f: "étais" }, { p: "il / elle", f: "était" },
      { p: "nous", f: "étions" }, { p: "vous", f: "étiez" }, { p: "ils / elles", f: "étaient" }
    ],
    futurSimple: [
      { p: "je", f: "serai" }, { p: "tu", f: "seras" }, { p: "il / elle", f: "sera" },
      { p: "nous", f: "serons" }, { p: "vous", f: "serez" }, { p: "ils / elles", f: "seront" }
    ],
    conditionnel: [
      { p: "je", f: "serais" }, { p: "tu", f: "serais" }, { p: "il / elle", f: "serait" },
      { p: "nous", f: "serions" }, { p: "vous", f: "seriez" }, { p: "ils / elles", f: "seraient" }
    ],
    subjonctif: [
      { p: "que je", f: "sois" }, { p: "que tu", f: "sois" }, { p: "qu'il / elle", f: "soit" },
      { p: "que nous", f: "soyons" }, { p: "que vous", f: "soyez" }, { p: "qu'ils / elles", f: "soient" }
    ]
  },
  avoir: {
    infinitive: "AVOIR",
    meaningTr: "Sahip Olmak (Yardımcı Fiil)",
    present: [
      { p: "j'", f: "ai" }, { p: "tu", f: "as" }, { p: "il / elle", f: "a" },
      { p: "nous", f: "avons" }, { p: "vous", f: "avez" }, { p: "ils / elles", f: "ont" }
    ],
    passeCompose: [
      { p: "j'", f: "ai eu" }, { p: "tu", f: "as eu" }, { p: "il / elle", f: "a eu" },
      { p: "nous", f: "avons eu" }, { p: "vous", f: "avez eu" }, { p: "ils / elles", f: "ont eu" }
    ],
    imparfait: [
      { p: "j'", f: "avais" }, { p: "tu", f: "avais" }, { p: "il / elle", f: "avait" },
      { p: "nous", f: "avions" }, { p: "vous", f: "aviez" }, { p: "ils / elles", f: "avaient" }
    ],
    futurSimple: [
      { p: "j'", f: "aurai" }, { p: "tu", f: "auras" }, { p: "il / elle", f: "aura" },
      { p: "nous", f: "aurons" }, { p: "vous", f: "aurez" }, { p: "ils / elles", f: "auront" }
    ],
    conditionnel: [
      { p: "j'", f: "aurais" }, { p: "tu", f: "aurais" }, { p: "il / elle", f: "aurait" },
      { p: "nous", f: "aurions" }, { p: "vous", f: "auriez" }, { p: "ils / elles", f: "auraient" }
    ],
    subjonctif: [
      { p: "que j'", f: "aie" }, { p: "que tu", f: "aies" }, { p: "qu'il / elle", f: "ait" },
      { p: "que nous", f: "ayons" }, { p: "que vous", f: "ayez" }, { p: "qu'ils / elles", f: "aient" }
    ]
  },
  aller: {
    infinitive: "ALLER",
    meaningTr: "Gitmek",
    present: [
      { p: "je", f: "vais" }, { p: "tu", f: "vas" }, { p: "il / elle", f: "va" },
      { p: "nous", f: "allons" }, { p: "vous", f: "allez" }, { p: "ils / elles", f: "vont" }
    ],
    passeCompose: [
      { p: "je", f: "suis allé(e)" }, { p: "tu", f: "es allé(e)" }, { p: "il / elle", f: "est allé(e)" },
      { p: "nous", f: "sommes allés" }, { p: "vous", f: "êtes allés" }, { p: "ils / elles", f: "sont allés" }
    ],
    imparfait: [
      { p: "j'", f: "allais" }, { p: "tu", f: "allais" }, { p: "il / elle", f: "allait" },
      { p: "nous", f: "allions" }, { p: "vous", f: "alliez" }, { p: "ils / elles", f: "allaient" }
    ],
    futurSimple: [
      { p: "j'", f: "irai" }, { p: "tu", f: "iras" }, { p: "il / elle", f: "ira" },
      { p: "nous", f: "irons" }, { p: "vous", f: "irez" }, { p: "ils / elles", f: "iront" }
    ],
    conditionnel: [
      { p: "j'", f: "irais" }, { p: "tu", f: "irais" }, { p: "il / elle", f: "irait" },
      { p: "nous", f: "irions" }, { p: "vous", f: "iriez" }, { p: "ils / elles", f: "iraient" }
    ],
    subjonctif: [
      { p: "que j'", f: "aille" }, { p: "que tu", f: "ailles" }, { p: "qu'il / elle", f: "aille" },
      { p: "que nous", f: "allions" }, { p: "que vous", f: "alliez" }, { p: "qu'ils / elles", f: "aillent" }
    ]
  },
  pouvoir: {
    infinitive: "POUVOIR",
    meaningTr: "-ebilmek / Gücü Yetmek",
    present: [
      { p: "je", f: "peux (puis)" }, { p: "tu", f: "peux" }, { p: "il / elle", f: "peut" },
      { p: "nous", f: "pouvons" }, { p: "vous", f: "pouvez" }, { p: "ils / elles", f: "peuvent" }
    ],
    passeCompose: [
      { p: "j'", f: "ai pu" }, { p: "tu", f: "as pu" }, { p: "il / elle", f: "a pu" },
      { p: "nous", f: "avons pu" }, { p: "vous", f: "avez pu" }, { p: "ils / elles", f: "ont pu" }
    ],
    imparfait: [
      { p: "je", f: "pouvais" }, { p: "tu", f: "pouvais" }, { p: "il / elle", f: "pouvait" },
      { p: "nous", f: "pouvions" }, { p: "vous", f: "pouviez" }, { p: "ils / elles", f: "pouvaient" }
    ],
    futurSimple: [
      { p: "je", f: "pourrai" }, { p: "tu", f: "pourras" }, { p: "il / elle", f: "pourra" },
      { p: "nous", f: "pourrons" }, { p: "vous", f: "pourrez" }, { p: "ils / elles", f: "pourront" }
    ],
    conditionnel: [
      { p: "je", f: "pourrais" }, { p: "tu", f: "pourrais" }, { p: "il / elle", f: "pourrait" },
      { p: "nous", f: "pourrions" }, { p: "vous", f: "pourriez" }, { p: "ils / elles", f: "pourraient" }
    ],
    subjonctif: [
      { p: "que je", f: "puisse" }, { p: "que tu", f: "puisses" }, { p: "qu'il / elle", f: "puisse" },
      { p: "que nous", f: "puissions" }, { p: "que vous", f: "puissiez" }, { p: "qu'ils / elles", f: "puissent" }
    ]
  },
  vouloir: {
    infinitive: "VOULOIR",
    meaningTr: "İstemek / Rica Etmek",
    present: [
      { p: "je", f: "veux" }, { p: "tu", f: "veux" }, { p: "il / elle", f: "veut" },
      { p: "nous", f: "voulons" }, { p: "vous", f: "voulez" }, { p: "ils / elles", f: "veulent" }
    ],
    passeCompose: [
      { p: "j'", f: "ai voulu" }, { p: "tu", f: "as voulu" }, { p: "il / elle", f: "a voulu" },
      { p: "nous", f: "avons voulu" }, { p: "vous", f: "avez voulu" }, { p: "ils / elles", f: "ont voulu" }
    ],
    imparfait: [
      { p: "je", f: "voulais" }, { p: "tu", f: "voulais" }, { p: "il / elle", f: "voulait" },
      { p: "nous", f: "voulions" }, { p: "vous", f: "vouliez" }, { p: "ils / elles", f: "voulaient" }
    ],
    futurSimple: [
      { p: "je", f: "voudrai" }, { p: "tu", f: "voudras" }, { p: "il / elle", f: "voudra" },
      { p: "nous", f: "voudrons" }, { p: "vous", f: "voudrez" }, { p: "ils / elles", f: "voudront" }
    ],
    conditionnel: [
      { p: "je", f: "voudrais (Rica)" }, { p: "tu", f: "voudrais" }, { p: "il / elle", f: "voudrait" },
      { p: "nous", f: "voudrions" }, { p: "vous", f: "voudriez" }, { p: "ils / elles", f: "voudraient" }
    ],
    subjonctif: [
      { p: "que je", f: "veuille" }, { p: "que tu", f: "veuilles" }, { p: "qu'il / elle", f: "veuille" },
      { p: "que nous", f: "voulions" }, { p: "que vous", f: "vouliez" }, { p: "qu'ils / elles", f: "veuillent" }
    ]
  },
  faire: {
    infinitive: "FAIRE",
    meaningTr: "Yapmak / Etmek",
    present: [
      { p: "je", f: "fais" }, { p: "tu", f: "fais" }, { p: "il / elle", f: "fait" },
      { p: "nous", f: "faisons" }, { p: "vous", f: "faites" }, { p: "ils / elles", f: "font" }
    ],
    passeCompose: [
      { p: "j'", f: "ai fait" }, { p: "tu", f: "as fait" }, { p: "il / elle", f: "a fait" },
      { p: "nous", f: "avons fait" }, { p: "vous", f: "avez fait" }, { p: "ils / elles", f: "ont fait" }
    ],
    imparfait: [
      { p: "je", f: "faisais" }, { p: "tu", f: "faisais" }, { p: "il / elle", f: "faisait" },
      { p: "nous", f: "faisions" }, { p: "vous", f: "faisiez" }, { p: "ils / elles", f: "faisaient" }
    ],
    futurSimple: [
      { p: "je", f: "ferai" }, { p: "tu", f: "feras" }, { p: "il / elle", f: "fera" },
      { p: "nous", f: "ferons" }, { p: "vous", f: "ferez" }, { p: "ils / elles", f: "feront" }
    ],
    conditionnel: [
      { p: "je", f: "ferais" }, { p: "tu", f: "ferais" }, { p: "il / elle", f: "ferait" },
      { p: "nous", f: "ferions" }, { p: "vous", f: "feriez" }, { p: "ils / elles", f: "feraient" }
    ],
    subjonctif: [
      { p: "que je", f: "fasse" }, { p: "que tu", f: "fasses" }, { p: "qu'il / elle", f: "fasse" },
      { p: "que nous", f: "fassions" }, { p: "que vous", f: "fassiez" }, { p: "qu'ils / elles", f: "fassent" }
    ]
  },
  negocier: {
    infinitive: "NÉGOCIER",
    meaningTr: "Müzakere Etmek (Diplomasi)",
    present: [
      { p: "je", f: "négocie" }, { p: "tu", f: "négocies" }, { p: "il / elle", f: "négocie" },
      { p: "nous", f: "négocions" }, { p: "vous", f: "négociez" }, { p: "ils / elles", f: "négocient" }
    ],
    passeCompose: [
      { p: "j'", f: "ai négocié" }, { p: "tu", f: "as négocié" }, { p: "il / elle", f: "a négocié" },
      { p: "nous", f: "avons négocié" }, { p: "vous", f: "avez négocié" }, { p: "ils / elles", f: "ont négocié" }
    ],
    imparfait: [
      { p: "je", f: "négociais" }, { p: "tu", f: "négociais" }, { p: "il / elle", f: "négociait" },
      { p: "nous", f: "négociions" }, { p: "vous", f: "négociiez" }, { p: "ils / elles", f: "négociaient" }
    ],
    futurSimple: [
      { p: "je", f: "négocierai" }, { p: "tu", f: "négocieras" }, { p: "il / elle", f: "négociera" },
      { p: "nous", f: "négocierons" }, { p: "vous", f: "négocierez" }, { p: "ils / elles", f: "négocieront" }
    ],
    conditionnel: [
      { p: "je", f: "négocierais" }, { p: "tu", f: "négocierais" }, { p: "il / elle", f: "négocierait" },
      { p: "nous", f: "négocierions" }, { p: "vous", f: "négocieriez" }, { p: "ils / elles", f: "négocieraient" }
    ],
    subjonctif: [
      { p: "que je", f: "négocie" }, { p: "que tu", f: "négocies" }, { p: "qu'il / elle", f: "négocie" },
      { p: "que nous", f: "négociions" }, { p: "que vous", f: "négociiez" }, { p: "qu'ils / elles", f: "négocient" }
    ]
  },
  echanger: {
    infinitive: "ÉCHANGER",
    meaningTr: "Fikir/Deneyim Paylaşmak, Değişmek",
    present: [
      { p: "j'", f: "échange" }, { p: "tu", f: "échanges" }, { p: "il / elle", f: "échange" },
      { p: "nous", f: "échangeons" }, { p: "vous", f: "échangez" }, { p: "ils / elles", f: "échangent" }
    ],
    passeCompose: [
      { p: "j'", f: "ai échangé" }, { p: "tu", f: "as échangé" }, { p: "il / elle", f: "a皇changé" },
      { p: "nous", f: "avons échangé" }, { p: "vous", f: "avez échangé" }, { p: "ils / elles", f: "ont échangé" }
    ],
    imparfait: [
      { p: "j'", f: "échangeais" }, { p: "tu", f: "échangeais" }, { p: "il / elle", f: "échangeait" },
      { p: "nous", f: "échangions" }, { p: "vous", f: "échangiez" }, { p: "ils / elles", f: "échangeaient" }
    ],
    futurSimple: [
      { p: "j'", f: "échangerai" }, { p: "tu", f: "échangeras" }, { p: "il / elle", f: "échangera" },
      { p: "nous", f: "échangerons" }, { p: "vous", f: "échangerez" }, { p: "ils / elles", f: "échangeront" }
    ],
    conditionnel: [
      { p: "j'", f: "échangerais" }, { p: "tu", f: "échangerais" }, { p: "il / elle", f: "échangerait" },
      { p: "nous", f: "échangerions" }, { p: "vous", f: "échangeriez" }, { p: "ils / elles", f: "échangeraient" }
    ],
    subjonctif: [
      { p: "que j'", f: "échange" }, { p: "que tu", f: "échanges" }, { p: "qu'il / elle", f: "échange" },
      { p: "que nous", f: "échangions" }, { p: "que vous", f: "échangiez" }, { p: "qu'ils / elles", f: "échangent" }
    ]
  }
};

let currentVerbTenseFilter = 'all';

function initVerbSelector() {
  const select = document.getElementById('verbSelect');
  if (!select) return;
  select.innerHTML = Object.keys(verbsData).map(k => `
    <option value="${k}">${verbsData[k].infinitive} — ${verbsData[k].meaningTr}</option>
  `).join('');
  renderVerbConjugation('etre');
}

function setVerbTense(tense) {
  currentVerbTenseFilter = tense;
  document.querySelectorAll('.verb-tense-chips .chip').forEach(c => c.classList.remove('active'));
  event?.target?.classList.add('active');
  const verbKey = document.getElementById('verbSelect')?.value || 'etre';
  renderVerbConjugation(verbKey);
}

function renderVerbConjugation(verbKey) {
  const v = verbsData[verbKey];
  const container = document.getElementById('verbConjugationContainer');
  if (!v || !container) return;

  const tenses = [
    { key: 'present', label: 'Présent (Şimdiki / Geniş Zaman)' },
    { key: 'passeCompose', label: 'Passé Composé (Geçmiş Zaman)' },
    { key: 'imparfait', label: 'Imparfait (Geçmişte Süreklilik)' },
    { key: 'futurSimple', label: 'Futur Simple (Gelecek Zaman)' },
    { key: 'conditionnel', label: 'Conditionnel Présent (Nezaket / Koşul)' },
    { key: 'subjonctif', label: 'Subjonctif Présent (İstek / Gereklilik)' }
  ];

  const filteredTenses = currentVerbTenseFilter === 'all'
    ? tenses
    : tenses.filter(t => t.key === currentVerbTenseFilter);

  container.innerHTML = filteredTenses.map(t => `
    <div class="verb-tense-card">
      <h4>
        <span>${t.label}</span>
        <button class="btn-voice-mini" onclick="speakConjugation('${verbKey}', '${t.key}')" title="Tüm Çekimi Dinle">🔊</button>
      </h4>
      <div class="verb-rows">
        ${(v[t.key] || []).map(row => `
          <div class="verb-row" onclick="speakText('${row.p} ${row.f}')">
            <span class="verb-pronoun">${row.p}</span>
            <span class="verb-form">${row.f}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function speakConjugation(verbKey, tenseKey) {
  const v = verbsData[verbKey];
  if (!v || !v[tenseKey]) return;
  const fullText = v[tenseKey].map(r => `${r.p} ${r.f}`).join(', ');
  speakText(fullText);
}

// ==========================================================================
// 9. DIALOGUE & ROLEPLAY SIMULATOR ENGINE
// ==========================================================================
const dialogueScenarios = {
  bistro: {
    title: "1. Paris Bistrosu & Kafe Kültürü",
    desc: "Saint-Germain'de bir kafede doğru nezaketle sipariş verme ve hesap ödeme pratiği.",
    tip: "💡 <strong>Kültürel İpucu:</strong> Garsona asla 'Garçon!' diye seslenmeyiniz. Göz teması kurup 'Monsieur / Madame, s'il vous plaît' demek yeterlidir.",
    steps: [
      {
        botSpeaker: "Garçon (Serveur)",
        botFr: "Bonjour ! Vous êtes combien ? Vous désirez vous installer en terrasse ou à l'intérieur ?",
        botTr: "Merhaba! Kaç kişisiniz? Terasa mı yoksa içeriye mi oturmak istersiniz?",
        choices: [
          {
            textFr: "Bonjour ! Nous sommes deux. On aimerait s'installer en terrasse, s'il vous plaît.",
            textTr: "Merhaba! İki kişiyiz. Terasta oturmak istiyoruz lütfen.",
            score: 20,
            feedback: "Mükemmel! Zarif bir selamlaşma ve net oturma tercihi.",
            nextStep: 1
          },
          {
            textFr: "Donne-moi une table dehors.",
            textTr: "Bana dışarıda bir masa ver.",
            score: -10,
            feedback: "Çok kaba! 'Donne-moi' yerine 'Je voudrais' veya 'On aimerait' kalıbı kullanılmalıdır.",
            nextStep: 1
          }
        ]
      },
      {
        botSpeaker: "Garçon (Serveur)",
        botFr: "Très bien, suivez-moi. Voici la carte. Qu'est-ce qui vous ferait plaisir ?",
        botTr: "Çok iyi, beni takip edin. İşte menü. Ne arzu edersiniz?",
        choices: [
          {
            textFr: "Je voudrais un café allongé et un croissant, et une carafe d'eau, s'il vous plaît.",
            textTr: "Bir filtre kahve (allongé), bir kruvasan ve bir sürahi su rica ediyorum lütfen.",
            score: 20,
            feedback: "Harika! 'Carafe d'eau' diyerek ücretsiz musluk suyu isteme kodunu doğru kullandınız.",
            nextStep: 2
          },
          {
            textFr: "Je veux un thé et de l'eau minérale chère.",
            textTr: "Bir çay ve pahalı maden suyu istiyorum.",
            score: 5,
            feedback: "'Je veux' doğrudan emir kipidir, yerine 'Je voudrais' tercih ediniz.",
            nextStep: 2
          }
        ]
      },
      {
        botSpeaker: "Garçon (Serveur)",
        botFr: "C'est noté ! *(Servis yapılır)* Tout se passe bien pour vous ?",
        botTr: "Kaydettim! *(Servis getirilir)* Her şey yolunda mı?",
        choices: [
          {
            textFr: "C'est délicieux, merci ! L'addition s'il vous plaît, je peux payer par carte ?",
            textTr: "Çok lezzetli, teşekkürler! Hesap lütfen, kartla ödeyebilir miyim?",
            score: 20,
            feedback: "Kusursuz! Teşekkür, hesap isteme ve ödeme yöntemi bir arada.",
            nextStep: 'finish'
          }
        ]
      }
    ]
  },
  official: {
    title: "2. Fransız Gençlik Bakanlığı Resmî Karşılama",
    desc: "Paris'te bakanlık yetkililerine Türk gençlik delegasyonunu resmiyetle tanıtma.",
    tip: "💡 <strong>Kültürel İpucu:</strong> Diplomatik görüşmelerde 'Vouvoiement' (sizli-bizli hitap) ve unvan kullanımı esastır.",
    steps: [
      {
        botSpeaker: "Représentant Officiel (Bakanlık Yetkilisi)",
        botFr: "Bienvenue à Paris, chers délégués de Türkiye ! C'est un grand honneur de vous accueillir.",
        botTr: "Paris'e hoş geldiniz saygıdeğer Türkiye delegeleri! Sizi ağırlamaktan büyük onur duyuyoruz.",
        choices: [
          {
            textFr: "Merci infiniment Monsieur le Directeur. Au nom de la délégation de Türkiye, nous sommes ravis d'être parmi vous.",
            textTr: "Çok teşekkür ederiz Sayın Direktör. Türkiye delegasyonu adına aranızda bulunmaktan kıvanç duyuyoruz.",
            score: 20,
            feedback: "Tam diplomatik protokol yanıtı!",
            nextStep: 1
          },
          {
            textFr: "Salut ! Merci pour l'invitation, Paris est cool.",
            textTr: "Selam! Davet için sağ ol, Paris havalı.",
            score: -10,
            feedback: "Resmî ortamda 'Salut' ve 'Cool' gibi gayriresmî kelimeler kullanılmaz.",
            nextStep: 1
          }
        ]
      },
      {
        botSpeaker: "Représentant Officiel",
        botFr: "Quelles sont les priorités majeures que votre délégation souhaite aborder lors de cette session ?",
        botTr: "Delegasyonunuzun bu oturumda ele almak istediği öncelikli konular nelerdir?",
        choices: [
          {
            textFr: "Nous souhaitons concentrer nos travaux sur la transition écologique, l'IA éthique et la mobilité des jeunes.",
            textTr: "Çalışmalarımızı yeşil dönüşüm, etik yapay zekâ ve gençlik hareketliliği üzerine odaklamak istiyoruz.",
            score: 20,
            feedback: "Çok net ve çalıştay hedeflerine uygun politika vurgusu.",
            nextStep: 'finish'
          }
        ]
      }
    ]
  },
  stationf: {
    title: "3. Station F Girişimcilik Fikir Sunumu (Pitch)",
    desc: "Paris 13'te dünyanın en büyük startup kampüsünde iki dilli eko-inovasyon projesini sunma.",
    tip: "💡 <strong>Kültürel İpucu:</strong> Sunumda net veri ve Avrupa Yeşil Mutabakatı (Green Deal) ile uyum vurgulanmalıdır.",
    steps: [
      {
        botSpeaker: "Mentor / Investisseur",
        botFr: "Bonjour ! Vous avez 2 minutes pour nous présenter votre projet bilatéral.",
        botTr: "Merhaba! İkili projenizi bize tanıtmak için 2 dakikanız var.",
        choices: [
          {
            textFr: "Bonjour. Notre projet 'Pont Vert 2026' connecte les éco-entrepreneurs d'Ankara et de Paris pour réduire le gaspillage alimentaire.",
            textTr: "Merhaba. 'Yeşil Köprü 2026' projemiz, gıda israfını azaltmak için Ankara ve Paris'teki eko-girişimcileri birleştiriyor.",
            score: 25,
            feedback: "Harika asansör konuşması (elevator pitch)!",
            nextStep: 'finish'
          }
        ]
      }
    ]
  },
  metro: {
    title: "4. Paris Metrosu & Ulaşım Sorusu",
    desc: "Châtelet istasyonunda doğru hatta aktarma yapma ve Navigo kart sorma.",
    tip: "💡 <strong>Kültürel İpucu:</strong> Yürüyen merdivenlerde daima sağda durunuz; sol taraf acelesi olanlar içindir.",
    steps: [
      {
        botSpeaker: "Passant (Yoldan Geçen)",
        botFr: "Bonjour, vous cherchez votre chemin ?",
        botTr: "Merhaba, yolunuzu mu arıyorsunuz?",
        choices: [
          {
            textFr: "Pardon Monsieur, pour aller à la Tour Eiffel, quelle ligne dois-je prendre ?",
            textTr: "Affedersiniz Beyefendi, Eyfel Kulesi'ne gitmek için hangi metro hattına binmeliyim?",
            score: 20,
            feedback: "Nezaketli ve net yol tarifi sorusu!",
            nextStep: 'finish'
          }
        ]
      }
    ]
  },
  pharmacy: {
    title: "5. Eczane & Acil Sağlık İhtiyacı",
    desc: "Paris'te bir eczanede soğuk algınlığı semptomlarını anlatma ve ilaç temini.",
    tip: "💡 <strong>Kültürel İpucu:</strong> Fransa'da acil tıbbi yardım için SAMU (15) veya Avrupa acil hattı (112) aranır.",
    steps: [
      {
        botSpeaker: "Pharmacien (Eczacı)",
        botFr: "Bonjour Madame/Monsieur, que puis-je faire pour vous ?",
        botTr: "Merhaba, sizin için ne yapabilirim?",
        choices: [
          {
            textFr: "Bonjour, j'ai mal à la gorge et un peu de fièvre depuis ce matin. Avez-vous du paracétamol ?",
            textTr: "Merhaba, bu sabahtan beri boğazım ağrıyor ve biraz ateşim var. Parasetamol var mı?",
            score: 20,
            feedback: "Semptomları ve talep edilen ilacı doğru tarif ettiniz.",
            nextStep: 'finish'
          }
        ]
      }
    ]
  }
};

let currentDialogueKey = 'bistro';
let currentDialogueStep = 0;
let dialogueScore = 100;

function loadDialogueScenario(key) {
  currentDialogueKey = key;
  currentDialogueStep = 0;
  dialogueScore = 100;

  document.querySelectorAll('.dialogue-selector-bar .dia-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick')?.includes(`'${key}'`));
  });

  const sc = dialogueScenarios[key];
  if (!sc) return;

  document.getElementById('diaScenarioTitle').innerText = sc.title;
  document.getElementById('diaScenarioDesc').innerText = sc.desc;
  document.getElementById('diaEtiquetteTip').innerHTML = sc.tip;
  document.getElementById('diaScore').innerText = `${dialogueScore} / 100`;

  renderDialogueCurrentStep();
}

function renderDialogueCurrentStep() {
  const sc = dialogueScenarios[currentDialogueKey];
  const chatBox = document.getElementById('diaChatBox');
  const actionsBox = document.getElementById('diaActionsBox');
  if (!sc || !chatBox || !actionsBox) return;

  const step = sc.steps[currentDialogueStep];
  if (!step) return;

  // Render Bot Message
  chatBox.innerHTML = `
    <div class="dia-msg dia-msg-bot">
      <span class="dia-speaker">${step.botSpeaker}</span>
      <div class="dia-bubble">
        <div class="dia-bubble-fr">
          ${step.botFr}
          <button class="dia-audio-inline" onclick="speakText('${step.botFr.replace(/'/g, "\\'")}')" title="Dinle">🔊</button>
        </div>
        <div class="dia-bubble-tr">${step.botTr}</div>
      </div>
    </div>
  `;

  // Render Choice Buttons
  actionsBox.innerHTML = step.choices.map((c, idx) => `
    <button class="dia-choice-btn" onclick="handleDialogueChoice(${idx})">
      <strong>🇫🇷 ${c.textFr}</strong><br>
      <small>🇹🇷 ${c.textTr}</small>
    </button>
  `).join('');
}

function handleDialogueChoice(choiceIndex) {
  const sc = dialogueScenarios[currentDialogueKey];
  const step = sc.steps[currentDialogueStep];
  const choice = step.choices[choiceIndex];
  if (!choice) return;

  dialogueScore = Math.max(0, Math.min(100, dialogueScore + choice.score));
  document.getElementById('diaScore').innerText = `${dialogueScore} / 100`;

  // Play audio
  speakText(choice.textFr);
  if (choice.score >= 15) playTone(600, 'triangle', 0.15);
  else playTone(280, 'square', 0.2);

  showToast(choice.feedback);

  const chatBox = document.getElementById('diaChatBox');
  chatBox.innerHTML += `
    <div class="dia-msg dia-msg-user">
      <span class="dia-speaker">Delegasyon Üyesi (Siz)</span>
      <div class="dia-bubble">
        <div class="dia-bubble-fr">${choice.textFr}</div>
        <div class="dia-bubble-tr">${choice.textTr}</div>
      </div>
    </div>
  `;

  if (choice.nextStep === 'finish' || !sc.steps[choice.nextStep]) {
    document.getElementById('diaActionsBox').innerHTML = `
      <div style="padding:1rem; text-align:center; background:rgba(16,185,129,0.15); border-radius:12px; color:#10b981; font-weight:700;">
        🎉 Senaryo başarıyla tamamlandı! Skorunuz: ${dialogueScore} Puan
        <button class="btn-primary" style="margin-top:0.75rem; display:block; margin-left:auto; margin-right:auto;" onclick="loadDialogueScenario('${currentDialogueKey}')">Tekrar Dene ↻</button>
      </div>
    `;
  } else {
    currentDialogueStep = choice.nextStep;
    setTimeout(() => {
      renderDialogueCurrentStep();
    }, 1200);
  }
}

// ==========================================================================
// 10. BILATERAL YOUTH RESOLUTION STUDIO ENGINE
// ==========================================================================
function updateResolutionPreview() {
  const clauses = [
    { id: 'res_1_1', textFr: "1.1 Déploiement des modèles de 'Ville du quart d'heure' axés sur les Maisons de Jeunes.", textTr: "1.1 15 Dakikalık Şehir modellerinin gençlik merkezleri odaklı yaygınlaştırılması." },
    { id: 'res_1_2', textFr: "1.2 Création du Réseau Jeunesse Zéro Gaspillage Alimentaire intégrant la Loi Garot.", textTr: "1.2 Sıfır Gıda İsrafı Gençlik Ağı ve Loi Garot mevzuat entegrasyonu." },
    { id: 'res_1_3', textFr: "1.3 Organisation annuelle des Camps de Reboisement 'Forêt Mémorielle Franco-Turque'.", textTr: "1.3 Ortak 'Türk-Fransız Gençlik Hatıra Ormanı' ağaçlandırma kamplarının düzenlenmesi." },
    { id: 'res_2_1', textFr: "2.1 Lancement du Pont Technologique Jeunesse entre Station F et les technoparcs de Türkiye.", textTr: "2.1 Station F ile Türk teknoparkları arasında Genç Teknoloji Köprüsü inkübasyon programı." },
    { id: 'res_2_2', textFr: "2.2 Hackathons conjoints sur l'IA open-source et la préservation du patrimoine culturel.", textTr: "2.2 Açık kaynak yapay zekâ ve kültürel mirası koruma ortak hackathonları." },
    { id: 'res_3_1', textFr: "3.1 Simplification des procédures de mobilité et de stages pour les délégations de jeunes.", textTr: "3.1 Gençlik delegasyonları ve stajlar için hareketlilik süreçlerinin kolaylaştırılması." },
    { id: 'res_3_2', textFr: "3.2 Jumelage institutionnel entre le réseau des MJC et les Centres de Jeunesse du GSB.", textTr: "3.2 MJC Ağı ile GSB Gençlik Merkezleri arasında 'Kardeş Gençlik Evi' protokolü." },
    { id: 'res_4_1', textFr: "4.1 Reconnaissance mutuelle des crédits d'engagement entre le Service Civique et le GSB.", textTr: "4.1 Fransız Service Civique ile Türk Ulusal Gönüllülük Sistemi arasında kredi denkliği." },
    { id: 'res_4_2', textFr: "4.2 Exercices conjoints de réponse aux crises humanitaires et secours d'urgence jeunesse.", textTr: "4.2 Afet müdahalesi ve insani yardımlaşma gençlik tatbikatları." }
  ];

  const selected = clauses.filter(c => document.getElementById(c.id)?.checked);

  const doc = `==============================================================================
DÉCLARATION COMMUNE DE LA JEUNESSE FRANCO-TURQUE 2026-2030
TÜRKİYE - FRANSA ORTAK GENÇLİK DEKLARASYONU (2026-2030)
==============================================================================
Date / Tarih: Septembre 2026 / Eylül 2026
Lieu / Yer: Paris & Ankara
Délégations / Heyetler:
- T.C. Gençlik ve Spor Bakanlığı Delegasyonu
- Ministère des Sports, de la Jeunesse et de la Vie Associative de France

PRÉAMBULE / GİRİŞ VE VİZYON:
Forts de 500 ans de relations diplomatiques et culturelles ininterrompues (1536-2026),
les délégations de jeunes de France et de Türkiye réaffirment leur engagement indéfectible
pour un avenir durable, solidaire et innovant.

500 yıllık kesintisiz dostluk ve diplomasi birikiminden güç alan iki ülke gençliği,
yeşil dönüşüm, dijital egemenlik ve sivil katılım alanlarında ortak eylemi taahhüt eder.

ARTICLES ADOPTÉS / KABUL EDİLEN EYLEM MADDELERİ:
${selected.map(s => `\n* 🇫🇷 ${s.textFr}\n  🇹🇷 ${s.textTr}`).join('\n')}

SIGNATAIRES / İMZA SAHİPLERİ:
Pour la Jeunesse de Türkiye: T.C. GSB Delegasyonu
Pour la Jeunesse de France: Délégation de la Jeunesse Française
`;

  const previewEl = document.getElementById('resDocumentContent');
  if (previewEl) previewEl.innerText = doc;
}

function copyResolutionText() {
  const content = document.getElementById('resDocumentContent')?.innerText;
  if (!content) return;
  navigator.clipboard.writeText(content);
  showToast('Resmî deklarasyon panoya kopyalandı! 📋');
  playTone(580, 'sine', 0.12);
}

function downloadResolutionMarkdown() {
  const content = document.getElementById('resDocumentContent')?.innerText;
  if (!content) return;
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'GSB-France-2026-Bilateral-Youth-Resolution.md';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Bildiri Markdown dosyası indirildi! 💾');
}

// ==========================================================================
// 11. GLOBAL OMNI-SEARCH SPOTLIGHT ENGINE (Ctrl + K)
// ==========================================================================
function openSearchModal() {
  const modal = document.getElementById('searchModal');
  if (!modal) return;
  modal.classList.add('active');
  const input = document.getElementById('globalSearchInput');
  if (input) {
    input.value = '';
    input.focus();
  }
  handleGlobalSearch('');
}

function closeSearchModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('modal-close')) return;
  document.getElementById('searchModal')?.classList.remove('active');
}

function openShortcutsModal() {
  document.getElementById('shortcutsModal')?.classList.add('active');
}

function closeShortcutsModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('modal-close')) return;
  document.getElementById('shortcutsModal')?.classList.remove('active');
}

function handleGlobalSearch(query) {
  const q = query.trim().toLowerCase();
  const container = document.getElementById('globalSearchResults');
  if (!container) return;

  if (!q) {
    container.innerHTML = '<div class="search-hint">Kelime, şahsiyet, şehir, peynir veya diplomatik kavram yazarak anında bulun...</div>';
    return;
  }

  const results = [];

  // Search Figures
  figuresData.forEach(f => {
    if (f.name.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q) || f.role.toLowerCase().includes(q)) {
      results.push({
        title: `${f.avatar} ${f.name}`,
        desc: `${f.role} — ${f.era}`,
        badge: "Fikir Önderi",
        tab: "figures"
      });
    }
  });

  // Search Quotes
  quotesData.forEach(item => {
    if (item.author.toLowerCase().includes(q) || item.quoteFr.toLowerCase().includes(q) || item.quoteTr.toLowerCase().includes(q)) {
      results.push({
        title: item.author,
        desc: `"${item.quoteFr}" (${item.quoteTr})`,
        badge: "Alıntı",
        tab: "quotes"
      });
    }
  });

  // Search Timeline
  timelineData.forEach(t => {
    if (t.year.includes(q) || t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)) {
      results.push({
        title: `${t.year} — ${t.title}`,
        desc: t.desc,
        badge: "Diplomasi Tarihi",
        tab: "timeline"
      });
    }
  });

  // Search Regions
  regionsData.forEach(r => {
    if (r.name.toLowerCase().includes(q) || r.capital.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q)) {
      results.push({
        title: `${r.name} (Merkez: ${r.capital})`,
        desc: r.desc,
        badge: "Bölge Atlası",
        tab: "regions"
      });
    }
  });

  // Search Vocabulary
  vocabData.forEach(v => {
    if (v.fr.toLowerCase().includes(q) || v.tr.toLowerCase().includes(q)) {
      results.push({
        title: `${v.fr} — ${v.tr}`,
        desc: `IPA: ${v.ipa}`,
        badge: "Sözlük",
        tab: "vocabulary"
      });
    }
  });

  // Search Atlas Dossiers
  Object.keys(atlasModalData).forEach(k => {
    const d = atlasModalData[k];
    if (d.title.toLowerCase().includes(q) || d.badge.toLowerCase().includes(q)) {
      results.push({
        title: `🏛️ ${d.title}`,
        desc: d.badge,
        badge: "Atlas Dosyası",
        tab: "atlas",
        modalKey: k
      });
    }
  });

  if (results.length === 0) {
    container.innerHTML = '<div class="search-hint">Eşleşen sonuç bulunamadı. Lütfen başka bir arama terimi deneyin.</div>';
    return;
  }

  container.innerHTML = results.slice(0, 10).map((res, idx) => `
    <div class="search-result-item" onclick="jumpToSearchResult('${res.tab}', '${res.modalKey || ''}')">
      <div class="search-res-info">
        <span class="search-res-title">${res.title}</span>
        <span class="search-res-desc">${res.desc}</span>
      </div>
      <span class="search-res-badge">${res.badge}</span>
    </div>
  `).join('');
}

function jumpToSearchResult(tabKey, modalKey) {
  closeSearchModal();
  switchTab(tabKey);
  if (modalKey) {
    setTimeout(() => {
      openAtlasModal(modalKey);
    }, 200);
  }
}

// Global Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openSearchModal();
  } else if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    e.preventDefault();
    openShortcutsModal();
  } else if (e.key === 'Escape') {
    closeSearchModal();
    closeShortcutsModal();
    closeAtlasModal();
  }
});

// ==========================================================================
// 12. POEMS DATABASE & ENGINE
// ==========================================================================
const poemsDatabase = {
  albatros: {
    titleFr: "L'Albatros",
    authorFr: "Charles Baudelaire, Les Fleurs du mal (1857)",
    titleTr: "Albatros",
    authorTr: "Çeviri: Ahmet Muhip Dıranas / Orhan Veli Ekolü",
    bodyFr: `
Souvent, pour s'amuser, les hommes d'équipage
Prennent des albatros, vastes oiseaux des mers,
Qui suivent, indolents compagnons de voyage,
Le navire glissant sur les gouffres amers.

À peine les ont-ils déposés sur les planches,
Que ces rois de l'azur, maladroits et honteux,
Laissent piteusement leurs grandes ailes blanches
Comme des avirons traîner à côté d'eux.

Ce voyageur ailé, comme il est gauche et veule !
Lui, naguère si beau, qu'il est comique et laid !
L'un agace son bec avec un brûle-gueule,
L'autre mime, en boitant, l'infirme qui volait !

Le Poète est semblable au prince des nuées
Qui hante la tempête et se rit de l'archer ;
Exilé sur le sol au milieu des huées,
Ses ailes de géant l'empêchent de marcher.
    `,
    bodyTr: `
Kimi zaman eğlenmek için gemiciler
Yakalar albatrosları, o engin deniz kuşlarını;
Uyuşuk yol arkadaşları gibi onlar
Süzülen geminin ardından takip eder derin suları.

Tahtaların üstüne bırakıldıkları an,
Bu göklerin kralları, acemi ve mahcup,
Bırakırlar o koca beyaz kanatlarını
Bir çift kürek gibi yanlarında çaresiz sürüyüp.

Bu kanatlı yolcu ne kadar hantal ve pısırık!
Az önce ne kadar güzeldi, şimdi ne kadar çirkin ve komik!
Kimi piposunun ucuyla gagasına vurur,
Kimi taklit eder topallayarak o uçan sakatı!

Şair de bulutların bu prensine benzer işte,
Fırtınayla dost yaşar, okçulara gülüp geçer;
Fakat yeryüzüne sürülüp yuhalandığı vakit,
Yürümesine engel olur o devasa kanatları.
    `
  },
  voyelles: {
    titleFr: "Voyelles",
    authorFr: "Arthur Rimbaud, Poésies (1871)",
    titleTr: "Sesliler (Seslerin Renkleri)",
    authorTr: "Çeviri & Sembolizm Çözümlemesi",
    bodyFr: `
A noir, E blanc, I rouge, U vert, O bleu : voyelles,
Je dirai quelque jour vos naissances latentes :
A, noir corset velu des mouches éclatantes
Qui bombinent autour des puanteurs cruelles,

Golfes d'ombre ; E, candeurs des vapeurs et des tentes,
Lances des glaciers fiers, rois blancs, frissons d'ombelles ;
I, pourpres, sang craché, rire des lèvres belles
Dans la colère ou les ivresses pénitentes ;

U, cycles, vibrements divins des mers virides,
Paix des pâtis semés d'animaux, paix des rides
Que l'alchimie imprime aux grands fronts studieux ;

O, suprême Clairon plein des strideurs étranges,
Silences traversés des Mondes et des Anges :
— O l'Oméga, rayon violet de Ses Yeux !
    `,
    bodyTr: `
A kara, E ak, I al, U yeşil, O mavi: sesliler,
Bir gün anlatacağım gizil doğumlarınızı:
A, o amansız kokular çevresinde vızıldayan
Işıl ışıl sineklerin kara tüylü korsesi,

Gölge koyları; E, çadırların ve buğuların saflığı,
Gururlu buzulların mızrakları, beyaz krallar;
I, erguvanlar, tükürülen kan, güzel dudakların gülüşü
Öfkede ya da tövbekâr sarhoşluklarda;

U, döngüler, yeşil denizlerin tanrısal titreşimi,
Hayvanlarla bezeli otlakların huzuru,
Simyanın derin bilgin alınlara kazıdığı kırışıkların barışı;

O, tuhaf çığlıklarla dolu yüce Borazan,
Dünyaların ve Meleklerin yardığı sessizlikler:
— O, Omega, O'nun Gözlerinin mor ışını!
    `
  },
  chanson: {
    titleFr: "Chanson d'automne",
    authorFr: "Paul Verlaine, Poèmes saturniens (1866)",
    titleTr: "Sonbahar Şarkısı",
    authorTr: "Çeviri: Melih Cevdet Anday",
    bodyFr: `
Les sanglots longs
Des violons
De l'automne
Blessent mon cœur
D'une langueur
Monotone.

Tout suffocant
Et blême, quand
Sonne l'heure,
Je me souviens
Des jours anciens
Et je pleure

Et je m'en vais
Au vent mauvais
Qui m'emporte
Deçà, delà,
Pareil à la
Feuille morte.
    `,
    bodyTr: `
Sonbahar
Kemanlarının
Uzun hıçkırıkları
Yaralar kalbimi
Monoton bir
Gevşeklikle.

Nefesim tıkanır,
Sararır yüzüm
Saat çaldığında;
Hatırlarım
Eski günleri
Ve ağlarım.

Ve çeker giderim
Beni oradan oraya
Sürükleyen
Uğursuz rüzgârda,
Tıpkı bir
Kuru yaprak gibi.
    `
  },
  mirabeau: {
    titleFr: "Le Pont Mirabeau",
    authorFr: "Guillaume Apollinaire, Alcools (1913)",
    titleTr: "Mirabeau Köprüsü",
    authorTr: "Çeviri & Notlar",
    bodyFr: `
Sous le pont Mirabeau coule la Seine
Et nos amours
Faut-il qu'il m'en souvienne
La joie venait toujours après la peine

Vienne la nuit sonne l'heure
Les jours s'en vont je demeure

Les mains dans les mains restons face à face
Tandis que sous
Le pont de nos bras passe
Des éternels regards l'onde si lasse

Vienne la nuit sonne l'heure
Les jours s'en vont je demeure
    `,
    bodyTr: `
Mirabeau Köprüsü'nün altından akar Seine
Ve aşklarımız
Hatırlamak mı gerek şimdi
Acının ardından gelirdi daima neşe

Gece gelsin, saat çalsın
Günler geçer, ben kalırım

Ellerimiz ellerimizde, yüz yüze duralım
Kollarımızın köprüsünün
Altından akıp giderken
Sonsuz bakışların yorgun dalgası

Gece gelsin, saat çalsın
Günler geçer, ben kalırım
    `
  },
  liberte: {
    titleFr: "Liberté",
    authorFr: "Paul Éluard, Poésie et Vérité (1942)",
    titleTr: "Hürriyet",
    authorTr: "Çeviri: Melih Cevdet Anday / Orhan Veli",
    bodyFr: `
Sur mes cahiers d'écolier
Sur mon pupitre et les arbres
Sur le sable sur la neige
J'écris ton nom

Sur toutes les pages lues
Sur toutes les pages blanches
Pierre sang papier ou cendre
J'écris ton nom

Et par le pouvoir d'un mot
Je recommence ma vie
Je suis né pour te connaître
Pour te nommer

Liberté.
    `,
    bodyTr: `
Okul defterlerimin üstüne
Sıramın ve ağaçların üstüne
Kuma ve karın üstüne
Yazarım senin adını

Okunmuş tüm sayfaların üstüne
Tüm bembeyaz sayfaların üstüne
Taşa, kana, kâğıda ya da küle
Yazarım senin adını

Ve bir tek kelimenin kudretiyle
Yeniden başlarım hayatıma
Seni tanımak için doğdum ben
Seni adlandırmak için

Hürriyet.
    `
  },
  feuilles: {
    titleFr: "Les Feuilles mortes",
    authorFr: "Jacques Prévert, Paroles (1946)",
    titleTr: "Dökülen Yapraklar",
    authorTr: "Çeviri: Sabahattin Eyüboğlu Ekolü",
    bodyFr: `
Oh ! je voudrais tant que tu te souviennes
Des jours heureux où nous étions amis.
En ce temps-là la vie était plus belle,
Et le soleil plus brûlant qu'aujourd'hui.

Les feuilles mortes se ramassent à la pelle.
Tu vois, je n'ai pas oublié...
Les feuilles mortes se ramassent à la pelle,
Les souvenirs et les regrets aussi.

Et le vent du nord les emporte
Dans la nuit froide de l'oubli.
Tu vois, je n'ai pas oublié
La chanson que tu me chantais.
    `,
    bodyTr: `
Ah! Ne çok isterdim hatırlamanı
Dost olduğumuz o mutlu günleri.
O vakitler hayat çok daha güzeldi,
Ve güneş bugünkünden daha sıcaktı.

Dökülen yapraklar kürek kürek toplanıyor.
Görüyorsun işte, unutmadım...
Dökülen yapraklar kürek kürek toplanıyor,
Hatıralar ve pişmanlıklar da öyle.

Ve kuzey rüzgârı alıp götürüyor hepsini
Unutuşun o soğuk gecesine.
Görüyorsun ya, unutmadım
Bana söylediğin o şarkıyı.
    `
  }
};

function loadPoem(key) {
  const poem = poemsDatabase[key];
  if (!poem) return;

  document.getElementById('poemTitleFr').innerText = poem.titleFr;
  document.getElementById('poemAuthorFr').innerText = poem.authorFr;
  document.getElementById('poemBodyFr').innerText = poem.bodyFr.trim();

  document.getElementById('poemTitleTr').innerText = poem.titleTr;
  document.getElementById('poemAuthorTr').innerText = poem.authorTr;
  document.getElementById('poemBodyTr').innerText = poem.bodyTr.trim();
}

function speakPoemFrench() {
  const poemKey = document.getElementById('poemSelect')?.value || 'albatros';
  const poem = poemsDatabase[poemKey];
  if (!poem) return;
  speakText(poem.bodyFr);
}

// ==========================================================================
// 13. REGIONS ATLAS DATABASE & ENGINE
// ==========================================================================
const regionsData = [
  {
    name: "Île-de-France",
    capital: "Paris",
    zone: "kuzey",
    pop: "12.3 Milyon",
    desc: "Fransa'nın siyasi, entelektüel ve ekonomik kalbi. Station F, Sorbonne, UNESCO ve Fransız Gençlik Bakanlığı buradadır.",
    specialties: "Brie de Meaux, Kültürel Miras, Mistral AI, Haute Couture"
  },
  {
    name: "Auvergne-Rhône-Alpes",
    capital: "Lyon",
    zone: "dogu",
    pop: "8.1 Milyon",
    desc: "Gastronominin dünya başkenti (Paul Bocuse), biyoteknoloji, Alpler ve nükleer enerji Ar-Ge merkezi.",
    specialties: "Saint-Nectaire, Bleu d'Auvergne, İpekçilik, TGV Hatları"
  },
  {
    name: "Provence-Alpes-Côte d'Azur",
    capital: "Marseille / Nice",
    zone: "guney",
    pop: "5.1 Milyon",
    desc: "Akdeniz ticaret kapısı, Marsilya limanı, lavanta tarlaları ve Cannes Film Festivali.",
    specialties: "Banon peyniri, Bouillabaisse, Zeytinyağı, Havacılık"
  },
  {
    name: "Nouvelle-Aquitaine",
    capital: "Bordeaux",
    zone: "bati",
    pop: "6.0 Milyon",
    desc: "Fransa'nın en geniş yüzölçümlü bölgesi. Dünya şarapçılık başkenti, havacılık ve ormancılık.",
    specialties: "Ossau-Iraty, Canelé, Bordeaux Bağları, Lazer Sanayisi"
  },
  {
    name: "Occitanie",
    capital: "Toulouse",
    zone: "guney",
    pop: "6.0 Milyon",
    desc: "Avrupa'nın havacılık ve uzay üssü (Airbus merkezi), Pirene dağları ve zengin Akdeniz kültürü.",
    specialties: "Roquefort (AOP), Cassoulet, Airbus A350, Uzay Ajansı"
  },
  {
    name: "Grand Est",
    capital: "Strasbourg",
    zone: "dogu",
    pop: "5.5 Milyon",
    desc: "Avrupa Parlamentosu ve Avrupa İnsan Hakları Mahkemesi'ne (AİHM) ev sahipliği yapan Avrupa başkenti.",
    specialties: "Munster peyniri, Şampanya (Champagne), Alsace Mimarisi"
  },
  {
    name: "Hauts-de-France",
    capital: "Lille",
    zone: "kuzey",
    pop: "6.0 Milyon",
    desc: "Kuzey Avrupa lojistik merkezi, elektrikli araç batarya vadisi ve zengin madencilik mirası.",
    specialties: "Maroilles peyniri, Batarya Fabrikaları, Dunkerque Limanı"
  },
  {
    name: "Bretagne",
    capital: "Rennes",
    zone: "bati",
    pop: "3.4 Milyon",
    desc: "Kelt mirası, Atlantik okyanus kıyıları, siber güvenlik kümelenmesi ve denizcilik kültürü.",
    specialties: "Krep ve Galette, Deniz Ürünleri, Yelken Sporları"
  },
  {
    name: "Normandie",
    capital: "Rouen",
    zone: "bati",
    pop: "3.3 Milyon",
    desc: "Mont-Saint-Michel, 1944 Çıkarması sahilleri, zengin süt ürünleri ve empresyonist ressamların beşiği.",
    specialties: "Camembert de Normandie, Livarot, Elma Suyu (Cidre)"
  },
  {
    name: "Bourgogne-Franche-Comté",
    capital: "Dijon",
    zone: "dogu",
    pop: "2.8 Milyon",
    desc: "Tarihi dükalık mirası, saatçilik mikro-mekaniği, dünya mirası bağ terroirları ve Comté peyniri.",
    specialties: "Comté (Fransa'nın 1 numarası), Dijon Hardalı, Bağlar"
  },
  {
    name: "Pays de la Loire",
    capital: "Nantes",
    zone: "bati",
    pop: "3.8 Milyon",
    desc: "Loire Nehri deltası, gemi inşa sanayisi (Saint-Nazaire) ve dijital yaratıcı endüstriler.",
    specialties: "Curé Nantais, Muscadet, Yeşil Şehirler"
  },
  {
    name: "Centre-Val de Loire",
    capital: "Orléans",
    zone: "kuzey",
    pop: "2.6 Milyon",
    desc: "UNESCO mirası Loire Şatoları (Chambord, Chenonceau), tarım ve nükleer enerji merkezleri.",
    specialties: "Sainte-Maure de Touraine (Keçi), Şatolar, Kozmetik Vadisi"
  },
  {
    name: "Corse (Korsika Adası)",
    capital: "Ajaccio",
    zone: "guney",
    pop: "350 Bin",
    desc: "Napoléon Bonaparte'ın doğum yeri, Akdeniz biyolojik çeşitliliği ve özgün dağ kültürü.",
    specialties: "Brocciu peyniri, Şarküteri, Doğal Parklar"
  }
];

function renderRegions(list) {
  const container = document.getElementById('regionsContainer');
  if (!container) return;
  container.innerHTML = list.map(r => `
    <div class="region-card">
      <div class="reg-header">
        <h3>${r.name}</h3>
        <span class="reg-pop">👥 ${r.pop}</span>
      </div>
      <div class="reg-capital">🏛️ <strong>Merkez:</strong> ${r.capital}</div>
      <p class="reg-desc">${r.desc}</p>
      <div class="reg-specialties">
        <strong>Öne Çıkanlar:</strong> ${r.specialties}
      </div>
    </div>
  `).join('');
}

function filterRegions(category) {
  document.querySelectorAll('#tab-regions .chip').forEach(c => c.classList.remove('active'));
  event?.target?.classList.add('active');
  const searchVal = document.getElementById('regionSearch')?.value.toLowerCase() || '';

  const filtered = regionsData.filter(r => {
    const matchCat = category === 'all' || r.zone === category;
    const matchSearch = r.name.toLowerCase().includes(searchVal) ||
                        r.capital.toLowerCase().includes(searchVal) ||
                        r.desc.toLowerCase().includes(searchVal);
    return matchCat && matchSearch;
  });
  renderRegions(filtered);
}

document.getElementById('regionSearch')?.addEventListener('input', (e) => {
  const searchVal = e.target.value.toLowerCase();
  const filtered = regionsData.filter(r =>
    r.name.toLowerCase().includes(searchVal) ||
    r.capital.toLowerCase().includes(searchVal) ||
    r.desc.toLowerCase().includes(searchVal)
  );
  renderRegions(filtered);
});

// ==========================================================================
// 14. CHEESES & TERROIR DATABASE & ENGINE
// ==========================================================================
const cheeseData = [
  {
    name: "Comté",
    region: "Bourgogne-Franche-Comté (Jura)",
    milk: "inek",
    desc: "Fransa'nın en çok tüketilen ve üretilen 1 numaralı AOP peyniri. 4 ila 24 ay arası dinlendirilir, fındıksı aromaya sahiptir.",
    pairing: "Ceviz, kuru incir, Jura şarapları"
  },
  {
    name: "Roquefort",
    region: "Occitanie (Aveyron)",
    milk: "koyun",
    desc: "Dünyanın en ünlü mavi küflü peyniri. Combalou doğal mağaralarında Penicillium roqueforti küfüyle olgunlaşır.",
    pairing: "Bal, çavdar ekmeği, ceviz"
  },
  {
    name: "Camembert de Normandie",
    region: "Normandie",
    milk: "inek",
    desc: "1791'de Marie Harel tarafından geliştirilen, beyaz çiçeksi kabuklu, kremsi yumuşak ikonik Fransız peyniri.",
    pairing: "Geleneksel baget, elma suyu (cidre)"
  },
  {
    name: "Brie de Meaux",
    region: "Île-de-France",
    milk: "inek",
    desc: "1814 Viyana Kongresi'nde diplomatlar tarafından 'Peynirlerin Kralı' ilan edilen tarihi saray peyniri.",
    pairing: "Taze üzüm, baget ekmeği"
  },
  {
    name: "Reblochon de Savoie",
    region: "Auvergne-Rhône-Alpes (Alpler)",
    milk: "inek",
    desc: "Geleneksel 'Tartiflette' patates yemeğinin ana malzemesi. Fındık aromalı, yıkanmış kabuklu peynir.",
    pairing: "Patates, kuru et, Savoie şarabı"
  },
  {
    name: "Sainte-Maure de Touraine",
    region: "Centre-Val de Loire",
    milk: "keci",
    desc: "Ortasından çavdar çubuğu geçen, odun külüyle kaplanmış silindirik meşhur keçi peyniri.",
    pairing: "Kızarmış ekmek, bal, Loire beyazı"
  },
  {
    name: "Ossau-Iraty",
    region: "Nouvelle-Aquitaine (Bask & Pirene)",
    milk: "koyun",
    desc: "Pirene Dağları'nda serbest otlayan koyun sütünden yapılan 3000 yıllık Bask-Gaskonya mirası.",
    pairing: "Siyah kiraz reçeli (İtxassou)"
  },
  {
    name: "Maroilles",
    region: "Hauts-de-France (Kuzey)",
    milk: "inek",
    desc: "Kuzey Fransa manastır geleneği. Yoğun kokulu ancak damakta yumuşak ve tatlımsı karakterli.",
    pairing: "Kuzey birası, çıtır baget"
  },
  {
    name: "Bleu d'Auvergne",
    region: "Auvergne-Rhône-Alpes",
    milk: "inek",
    desc: "Volkanik Auvergne dağlarında üretilen, tereyağlı ve dengeli acılığı olan mavi peynir.",
    pairing: "Armut, ceviz, esmer ekmek"
  },
  {
    name: "Brocciu",
    region: "Corse (Korsika)",
    milk: "koyun",
    desc: "Korsika'nın milli peyniri. Taze peynir altı suyundan yapılan son derece hafif peynir.",
    pairing: "Omlet, nane, Korsika tatlıları"
  }
];

function renderCheeses(list) {
  const container = document.getElementById('cheeseContainer');
  if (!container) return;
  container.innerHTML = list.map(c => `
    <div class="cheese-card">
      <div class="cheese-header">
        <h3>${c.name}</h3>
        <span class="cheese-milk-tag">${getMilkLabel(c.milk)}</span>
      </div>
      <div class="cheese-region">📍 ${c.region}</div>
      <p class="cheese-desc">${c.desc}</p>
      <div class="cheese-pairing">
        <strong>Eşleşme:</strong> ${c.pairing}
      </div>
    </div>
  `).join('');
}

function getMilkLabel(milk) {
  switch (milk) {
    case 'inek': return '🐄 İnek Sütü';
    case 'koyun': return '🐑 Koyun Sütü';
    case 'keci': return '🐐 Keçi Sütü';
    default: return milk;
  }
}

function filterCheeses(milkType) {
  document.querySelectorAll('#tab-gastronomy .chip').forEach(c => c.classList.remove('active'));
  event?.target?.classList.add('active');
  const searchVal = document.getElementById('cheeseSearch')?.value.toLowerCase() || '';

  const filtered = cheeseData.filter(c => {
    const matchMilk = milkType === 'all' || c.milk === milkType;
    const matchSearch = c.name.toLowerCase().includes(searchVal) ||
                        c.region.toLowerCase().includes(searchVal) ||
                        c.desc.toLowerCase().includes(searchVal);
    return matchMilk && matchSearch;
  });
  renderCheeses(filtered);
}

document.getElementById('cheeseSearch')?.addEventListener('input', (e) => {
  const searchVal = e.target.value.toLowerCase();
  const filtered = cheeseData.filter(c =>
    c.name.toLowerCase().includes(searchVal) ||
    c.region.toLowerCase().includes(searchVal) ||
    c.desc.toLowerCase().includes(searchVal)
  );
  renderCheeses(filtered);
});

// ==========================================================================
// 15. VOCABULARY & FLASHCARDS DATABASE & ENGINE
// ==========================================================================
const vocabData = [
  { fr: "La diplomatie publique", ipa: "/la di.plɔ.ma.si py.blik/", tr: "Kamu Diplomasisi", cat: "diplomacy", ex: "Renforcer la diplomatie publique par la jeunesse." },
  { fr: "L'engagement citoyen", ipa: "/lɑ̃.ɡaʒ.mɑ̃ si.twa.jɛ̃/", tr: "Vatandaşlık & Sivil Katılım", cat: "diplomacy", ex: "Promouvoir l'engagement citoyen des jeunes." },
  { fr: "Le développement durable", ipa: "/lə de.vlɔp.mɑ̃ dy.ʁabl/", tr: "Sürdürülebilir Kalkınma", cat: "diplomacy", ex: "Objectifs de développement durable 2030." },
  { fr: "La transition écologique", ipa: "/la tʁɑ̃.zi.sjɔ̃ e.kɔ.lɔ.ʒik/", tr: "Yeşil / Ekolojik Dönüşüm", cat: "diplomacy", ex: "Financer la transition écologique urbaine." },
  { fr: "Le plaidoyer", ipa: "/lə plɛ.dwa.je/", tr: "Savunuculuk (Advocacy)", cat: "diplomacy", ex: "Faire le plaidoyer des droits des jeunes." },
  { fr: "Le consensus", ipa: "/lə kɔ̃.sɑ̃.sys/", tr: "Uzlaşı / Mutabakat", cat: "diplomacy", ex: "Parvenir à un consensus lors des débats." },
  { fr: "Une carafe d'eau", ipa: "/yn ka.ʁaf do/", tr: "Bir sürahi musluk suyu (ücretsiz)", cat: "daily", ex: "Une carafe d'eau s'il vous plaît !" },
  { fr: "L'addition, s'il vous plaît", ipa: "/la.di.sjɔ̃ sil vu plɛ/", tr: "Hesap lütfen", cat: "daily", ex: "Monsieur, l'addition s'il vous plaît." },
  { fr: "Je vous en prie", ipa: "/ʒə vu.zɑ̃ pʁi/", tr: "Rica ederim (Resmî/Kibar)", cat: "daily", ex: "Merci beaucoup ! — Je vous en prie." },
  { fr: "Enchanté(e)", ipa: "/ɑ̃.ʃɑ̃.te/", tr: "Tanıştığıma memnun oldum", cat: "daily", ex: "Enchanté de faire votre connaissance." },
  { fr: "C'est ouf !", ipa: "/sɛ uf/", tr: "İnanılmaz / Çılgınca! (Fou -> Ouf verlan)", cat: "argot", ex: "Ce projet de jeunesse est complètement ouf !" },
  { fr: "Un pote / Une pote", ipa: "/œ̃ pɔt/", tr: "Kanka / Yakın arkadaş", cat: "argot", ex: "Je voyage avec mes potes de la délégation." },
  { fr: "Avoir le seum", ipa: "/a.vwaʁ lə sœm/", tr: "Gıcık olmak / Morali bozulmak", cat: "argot", ex: "J'ai trop le seum d'avoir raté le train." },
  { fr: "Poser un lapin", ipa: "/po.ze œ̃ la.pɛ̃/", tr: "Randevuya gelmemek / Ekip gitmek", cat: "idioms", ex: "Il m'a posé un lapin au café." },
  { fr: "Avoir le coup de foudre", ipa: "/a.vwaʁ lə ku d(ə) fudʁ/", tr: "İlk görüşte aşık olmak / Çarpılmak", cat: "idioms", ex: "J'ai eu un coup de foudre pour cette ville." },
  { fr: "C'est la fin des haricots", ipa: "/sɛ la fɛ̃ de za.ʁi.ko/", tr: "Her şey bitti / İş bitti", cat: "idioms", ex: "Pas de panique, ce n'est pas la fin des haricots !" },
  { fr: "En revanche", ipa: "/ɑ̃ ʁə.vɑ̃ʃ/", tr: "Buna karşılık / Öte yandan", cat: "connectors", ex: "Le défi est grand ; en revanche la volonté existe." },
  { fr: "Toutefois", ipa: "/tut.fwa/", tr: "Bununla birlikte / Yine de", cat: "connectors", ex: "Toutefois, nous devons rester vigilants." },
  { fr: "Par conséquent", ipa: "/paʁ kɔ̃.se.kɑ̃/", tr: "Sonuç olarak / Dolayısıyla", cat: "connectors", ex: "Par conséquent, nous adoptons la résolution." },
  { fr: "Bien que (+ Subjonctif)", ipa: "/bjɛ̃ kə/", tr: "-e rağmen / Olmasına karşın", cat: "connectors", ex: "Bien qu'il soit tard, nous continuons." }
];

let currentCardIndex = 0;
let isFlipped = false;

function updateFlashcard() {
  const item = vocabData[currentCardIndex];
  if (!item) return;

  document.getElementById('fcCategory').innerText = getVocabCategoryLabel(item.cat);
  document.getElementById('fcFrench').innerText = item.fr;
  document.getElementById('fcPronun').innerText = item.ipa;
  document.getElementById('fcTurkish').innerText = item.tr;
  document.getElementById('fcExample').innerText = `"${item.ex}"`;
  document.getElementById('fcCounter').innerText = `${currentCardIndex + 1} / ${vocabData.length}`;

  const card = document.getElementById('flashcard');
  if (card && isFlipped) {
    card.classList.remove('flipped');
    isFlipped = false;
  }
}

function flipCard() {
  const card = document.getElementById('flashcard');
  if (!card) return;
  card.classList.toggle('flipped');
  isFlipped = !isFlipped;
  playTone(480, 'sine', 0.05);
}

function nextCard() {
  currentCardIndex = (currentCardIndex + 1) % vocabData.length;
  updateFlashcard();
  playTone(550, 'triangle', 0.05);
}

function prevCard() {
  currentCardIndex = (currentCardIndex - 1 + vocabData.length) % vocabData.length;
  updateFlashcard();
  playTone(400, 'triangle', 0.05);
}

function speakCurrentFlashcard() {
  const item = vocabData[currentCardIndex];
  if (item) speakText(item.fr);
}

function getVocabCategoryLabel(cat) {
  switch (cat) {
    case 'diplomacy': return '🌐 Gençlik Diplomasisi';
    case 'daily': return '🥐 Günlük & Seyahat';
    case 'argot': return '⚡ Argot & Verlan';
    case 'idioms': return '💡 Deyimler';
    case 'connectors': return '🔗 Münazara Bağlaçları';
    default: return cat;
  }
}

function renderVocabTable(list) {
  const tbody = document.getElementById('vocabTableBody');
  if (!tbody) return;
  tbody.innerHTML = list.map(v => `
    <tr>
      <td>
        <strong>${v.fr}</strong>
        <button class="btn-voice-mini" onclick="speakText('${v.fr.replace(/'/g, "\\'")}')" title="Telaffuz">🔊</button>
      </td>
      <td><code>${v.ipa}</code></td>
      <td>${v.tr}</td>
      <td><span class="table-tag">${getVocabCategoryLabel(v.cat)}</span></td>
    </tr>
  `).join('');
}

function filterVocab() {
  const searchVal = document.getElementById('vocabSearch')?.value.toLowerCase() || '';
  const filterCat = document.getElementById('vocabFilter')?.value || 'all';

  const filtered = vocabData.filter(v => {
    const matchCat = filterCat === 'all' || v.cat === filterCat;
    const matchSearch = v.fr.toLowerCase().includes(searchVal) ||
                        v.tr.toLowerCase().includes(searchVal) ||
                        v.ipa.toLowerCase().includes(searchVal);
    return matchCat && matchSearch;
  });
  renderVocabTable(filtered);
}

document.getElementById('vocabSearch')?.addEventListener('input', filterVocab);
document.getElementById('vocabFilter')?.addEventListener('change', filterVocab);

// ==========================================================================
// 16. PARIS FLÂNEUR ROUTES
// ==========================================================================
const flaneurRoutesData = [
  {
    title: "1. Latin Mahallesi & Felsefe Yolu",
    area: "5. & 6. Arrondissement",
    stops: "Panthéon → Sorbonne Üniversitesi → Jardin du Luxembourg → Saint-Germain-des-Prés",
    desc: "Descartes, Rousseau ve Voltaire'in anıt mezarları, Albert Sorel'in Yahya Kemal'e ders verdiği Sorbonne amfileri ve Sartre-Beauvoir'ın varoluşçu kafeleri (Café de Flore, Les Deux Magots)."
  },
  {
    title: "2. Seine Kıyısı & Kitapçı Tezgâhları (Bouquinistes)",
    area: "Pont Neuf → Pont des Arts → Pont Mirabeau",
    stops: "Île de la Cité → Notre-Dame → Bouquinistes → Louvre Avlusu",
    desc: "UNESCO somut olmayan mirası 450 yıllık yeşil sahaf kutuları, Apollinaire'in şiirine konu olan Mirabeau Köprüsü ve Baudelaire'in flânerie adımları."
  },
  {
    title: "3. Montmartre & Bohem Sanat Tepesi",
    area: "18. Arrondissement",
    stops: "Sacré-Cœur → Place du Tertre → Bateau-Lavoir → Le Mur des Je t'aime",
    desc: "Picasso, Modigliani ve empresyonistlerin atölyeleri, dik merdivenler ve Paris panoraması."
  },
  {
    title: "4. Le Marais, Pasajlar & Aydınlanma",
    area: "3. & 4. Arrondissement",
    stops: "Place des Vosges (Victor Hugo'nun Evi) → Passage des Panoramas → Galerie Vivienne",
    desc: "Walter Benjamin'in 'Pasajlar' felsefesine konu olan 19. yüzyıl cam tavanlı pasajları ve Victor Hugo'nun çalışma masası."
  },
  {
    title: "5. İnovasyon & Dönüşüm Ekseni: Station F & BnF",
    area: "13. Arrondissement",
    stops: "Station F (Halle Freyssinet) → BnF François Mitterrand → Parc de Bercy",
    desc: "Eski demiryolu deposundan dönüştürülen dünyanın en büyük startup kampüsü ve modern Fransa'nın bilgi mabedi."
  }
];

function renderFlaneurRoutes() {
  const container = document.getElementById('flaneurRoutesContainer');
  if (!container) return;
  container.innerHTML = flaneurRoutesData.map((r, idx) => `
    <div class="flaneur-card">
      <div class="fl-header">
        <h3>🚶 Rota ${idx + 1}: ${r.title}</h3>
        <span class="fl-area">${r.area}</span>
      </div>
      <div class="fl-stops"><strong>Güzergah:</strong> ${r.stops}</div>
      <p class="fl-desc">${r.desc}</p>
    </div>
  `).join('');
}

// ==========================================================================
// 17. 20-QUESTION QUIZ ENGINE
// ==========================================================================
const quizQuestions = [
  {
    category: "Diplomasi Tarihi",
    question: "Osmanlı İmparatorluğu ile Fransa arasındaki ilk resmî dostluk ve ticaret ahitnamesi (Kapitülasyonlar) hangi yıl imzalanmıştır?",
    options: ["1453", "1536", "1789", "1923"],
    correct: 1,
    explanation: "1536 yılında Kanuni Sultan Süleyman ile I. François arasında ilk resmî dostluk ve ticaret antlaşması imzalanmıştır."
  },
  {
    category: "Edebiyat & Şiir",
    question: "Charles Baudelaire'in ünlü 'L'Albatros' şiirinde şair hangi varlığa benzetilmiştir?",
    options: ["Kartal", "Albatros Kuşu", "Gemi Kaptanı", "Fırtına"],
    correct: 1,
    explanation: "Baudelaire şairi göklerde özgürce uçan ancak yeryüzünde hantal kalan devasa albatros kuşuna benzetir."
  },
  {
    category: "Felsefe & Düşünce",
    question: "'Düşünüyorum, öyleyse varım' (Je pense, donc je suis) sözü hangi Fransız düşünüre aittir?",
    options: ["Jean-Jacques Rousseau", "Voltaire", "René Descartes", "Albert Camus"],
    correct: 2,
    explanation: "Kartezyen rasyonalizmin kurucusu René Descartes, 1637 tarihli 'Yöntem Üzerine Konuşma' eserinde bu ilkeyi ortaya koymuştur."
  },
  {
    category: "Gastronomi & Terroir",
    question: "Fransa'nın Jura dağlarında üretilen ve en çok tüketilen 1 numaralı AOP tescilli sert peyniri hangisidir?",
    options: ["Roquefort", "Camembert", "Comté", "Brie de Meaux"],
    correct: 2,
    explanation: "Comté peyniri Fransa'nın yıllık üretim miktarıyla açık ara 1 numaralı AOP tescilli peyniridir."
  },
  {
    category: "Şehir & Flâneur",
    question: "Paris'te Victor Hugo'nun 16 yıl yaşadığı ve Sefiller'in bir bölümünü yazdığı tarihi meydan hangisidir?",
    options: ["Place de la Concorde", "Place des Vosges", "Place de la Bastille", "Place Vendôme"],
    correct: 1,
    explanation: "Place des Vosges 6 numaralı ev günümüzde Maison de Victor Hugo müzesidir."
  },
  {
    category: "Sanayi & French Tech",
    question: "Paris 13. bölgede bulunan ve eski bir tren ambarından dönüştürülen dünyanın en büyük girişimcilik kampüsü hangisidir?",
    options: ["Station F", "Silicon Sentier", "Bercy Tech", "Sorbonne Lab"],
    correct: 0,
    explanation: "Halle Freyssinet binasında yer alan Station F, 1000'den fazla startupa ev sahipliği yapar."
  },
  {
    category: "Dil & Fonetik",
    question: "Fransızcadaki 'Actuellement' kelimesinin Türkçe doğru karşılığı nedir? (Faux Ami)",
    options: ["Aslında / Gerçekte", "Şu anda / Günümüzde", "Aktif olarak", "Geçmişte"],
    correct: 1,
    explanation: "'Actuellement' şu anda / günümüzde demektir. 'Aslında' için Fransızca 'en réalité' veya 'en fait' kullanılır."
  },
  {
    category: "Türk-Fransız Kültürü",
    question: "1720 yılında Paris'e elçi olarak gidip meşhur 'Fransa Sefaretnamesi'ni yazan Osmanlı devlet adamı kimdir?",
    options: ["Evliya Çelebi", "Yirmisekiz Çelebi Mehmed Efendi", "Kâtip Çelebi", "Ahmet Resmi Efendi"],
    correct: 1,
    explanation: "Yirmisekiz Çelebi Mehmed Efendi'nin 1720-1721 Paris sefareti, Lâle Devri reformlarına ilham vermiştir."
  },
  {
    category: "Anayasal Düzen",
    question: "Fransa'da din ile devlet işlerinin ayrılmasını ve inanç tarafsızlığını düzenleyen tarihi Laiklik Kanunu hangi yılda kabul edilmiştir?",
    options: ["1789", "1848", "1905", "1958"],
    correct: 2,
    explanation: "9 Aralık 1905 tarihli kanun, Fransız Cumhuriyeti'nin Laïcité ilkesinin yasal temelidir."
  },
  {
    category: "Gençlik & Sosyal Hayat",
    question: "Fransa'da tabandan örgütlenen, gençlerin kültür, sanat ve spor faaliyetlerini yürüttüğü gençlik merkezleri ağına ne ad verilir?",
    options: ["MJC (Maison des Jeunes et de la Culture)", "Service Civique", "Crous", "Erasmus House"],
    correct: 0,
    explanation: "MJC'ler (Maisons des Jeunes et de la Culture) Fransa genelinde gençlik katılımının kalbidir."
  }
];

let currentQuizIndex = 0;
let quizScore = 0;

function renderQuizQuestion() {
  const q = quizQuestions[currentQuizIndex];
  if (!q) return;

  document.getElementById('quizProgress').innerText = `Soru ${currentQuizIndex + 1} / ${quizQuestions.length}`;
  document.getElementById('quizBarFill').style.width = `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%`;
  document.getElementById('quizCatTag').innerText = `Kategori: ${q.category}`;
  document.getElementById('quizQuestion').innerText = q.question;

  const optionsContainer = document.getElementById('quizOptions');
  optionsContainer.innerHTML = q.options.map((opt, idx) => `
    <button class="quiz-option-btn" onclick="selectQuizAnswer(${idx})">
      <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
      <span class="opt-text">${opt}</span>
    </button>
  `).join('');

  document.getElementById('quizFeedback').style.display = 'none';
  document.getElementById('quizNextBtn').style.display = 'none';
}

function selectQuizAnswer(selectedIndex) {
  const q = quizQuestions[currentQuizIndex];
  const buttons = document.querySelectorAll('.quiz-option-btn');
  buttons.forEach(b => b.disabled = true);

  const feedback = document.getElementById('quizFeedback');
  feedback.style.display = 'block';

  if (selectedIndex === q.correct) {
    buttons[selectedIndex].classList.add('correct');
    quizScore += 10;
    document.getElementById('quizScore').innerText = `Skor: ${quizScore} Puan`;
    feedback.className = 'quiz-feedback correct-box';
    feedback.innerHTML = `✅ <strong>Tebrikler, Doğru!</strong><br>${q.explanation}`;
    playTone(660, 'sine', 0.15);
  } else {
    buttons[selectedIndex].classList.add('wrong');
    buttons[q.correct].classList.add('correct');
    feedback.className = 'quiz-feedback wrong-box';
    feedback.innerHTML = `❌ <strong>Yanlış Cevap!</strong> Doğru seçenek: <strong>${q.options[q.correct]}</strong><br>${q.explanation}`;
    playTone(220, 'square', 0.2);
  }

  document.getElementById('quizNextBtn').style.display = 'inline-block';
}

function nextQuizQuestion() {
  currentQuizIndex++;
  if (currentQuizIndex < quizQuestions.length) {
    renderQuizQuestion();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  document.getElementById('quizContainer').style.display = 'none';
  const resultDiv = document.getElementById('quizResult');
  resultDiv.style.display = 'block';

  let badge = "🥈 Başarılı Delege";
  let message = "Fransa ve diplomasi konularında güçlü bir temel bilginiz var!";

  if (quizScore >= 90) {
    badge = "🏆 Kültürel Diplomasi Büyükelçisi";
    message = "Muazzam başarı! Türkiye-Fransa ilişkileri ve Fransız kültüründe tam bir uzmansınız!";
  } else if (quizScore < 60) {
    badge = "📚 Araştırmacı Delege";
    message = "Portaldaki dosyaları ve sözlüğü inceleyerek bilginizi daha da pekiştirebilirsiniz.";
  }

  resultDiv.innerHTML = `
    <div class="result-badge">${badge}</div>
    <h3>Bilgi Testi Tamamlandı!</h3>
    <p class="result-score">Toplam Skorunuz: <strong>${quizScore} / ${quizQuestions.length * 10} Puan</strong></p>
    <p class="result-msg">${message}</p>
    <button class="btn-primary" onclick="restartQuiz()">Testi Yeniden Başlat ↻</button>
  `;
  playTone(880, 'sine', 0.3);
}

function restartQuiz() {
  currentQuizIndex = 0;
  quizScore = 0;
  document.getElementById('quizScore').innerText = 'Skor: 0 Puan';
  document.getElementById('quizContainer').style.display = 'block';
  document.getElementById('quizResult').style.display = 'none';
  renderQuizQuestion();
}

// ==========================================================================
// 18. ATLAS MODAL CONTENT
// ==========================================================================
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
        <li><strong>1789 İhtilali:</strong> İnsan ve Yurttaş Hakları Bildirisi ile evrenselleşen özgürlük ve eşitlik ilkeleri.</li>
        <li><strong>Varoluşçuluk (Sartre & Camus):</strong> 2. Dünya Savaşı sonrası varoluşun özden önce gelmesi ve etik başkaldırı.</li>
        <li><strong>Mayıs 1968:</strong> Geleneksel otoriteyi sarsan gençlik ve işçi genel grevi devrimi.</li>
      </ul>
      <p><small>Detaylı dosya: <code>france-atlas/history-thought.md</code></small></p>
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
      <p><small>Detaylı dosya: <code>france-atlas/institutions-state.md</code></small></p>
    `
  },
  biographies: {
    badge: "Biyografi Atlası",
    title: "18 Düşünce ve Diplomasi Önderi",
    content: `
      <p>1536'dan günümüze iki ülkenin fikri, siyasi ve sanatsal köprülerini kuran büyük şahsiyetler.</p>
      <h4>Öne Çıkan İsimler:</h4>
      <ul>
        <li><strong>Liderler:</strong> Kanuni Sultan Süleyman, I. François, Charles de Gaulle.</li>
        <li><strong>Aydınlar & Mütercimler:</strong> Şinasi, Namık Kemal, Yahya Kemal, Cemil Meriç, Ahmet Rıza.</li>
        <li><strong>Filozoflar:</strong> Descartes, Voltaire, Rousseau, Simone de Beauvoir, Albert Camus.</li>
        <li><strong>Edebiyatçılar:</strong> Victor Hugo, Charles Baudelaire, Pierre Loti.</li>
      </ul>
      <p><small>Detaylı dosya: <code>france-atlas/franco-turkish-biographies.md</code></small></p>
    `
  },
  arts: {
    badge: "Sanat & Estetik",
    title: "Edebiyat, Sinema, Flânerie ve Empresyonizm",
    content: `
      <p>Molière'den Marcel Proust'a, Louvre salonlarından Nouvelle Vague sokaklarına Fransız estetik geleneği.</p>
      <ul>
        <li><strong>Büyük Roman:</strong> Victor Hugo, Honoré de Balzac, Gustave Flaubert ve Marcel Proust.</li>
        <li><strong>Görsel Sanatlar:</strong> Empresyonizm (Monet, Renoir) ve Paris Ekolü.</li>
        <li><strong>Sinema Sanatı:</strong> Lumière Kardeşler'in icadı, Truffaut ve Godard'ın Yeni Dalgası.</li>
      </ul>
      <p><small>Detaylı dosya: <code>france-atlas/arts-literature.md</code></small></p>
    `
  },
  science: {
    badge: "Sanayi & Teknoloji",
    title: "Messmer Planı, Havacılık ve French Tech",
    content: `
      <p>Fransa'nın nükleer enerjiden Airbus havacılığına, TGV yüksek hızlı tren ağından yapay zekâya uzanan teknolojik atılımları.</p>
      <ul>
        <li><strong>Nükleer Enerji:</strong> Messmer Planı ile elektriğin %70'ini sıfır karbonlu nükleer santrallerden sağlama.</li>
        <li><strong>Havacılık ve Uzay:</strong> Toulouse merkezli Airbus konsorsiyumu ve Ariane roketleri.</li>
        <li><strong>Yapay Zekâ ve İnovasyon:</strong> Mistral AI açık kaynak modelleri ve Station F ekosistemi.</li>
      </ul>
      <p><small>Detaylı dosya: <code>france-atlas/science-industry.md</code></small></p>
    `
  },
  culture: {
    badge: "Gündelik Kültür",
    title: "L'Art de Vivre, Argot, Verlan ve Nezaket",
    content: `
      <p>Fransız yaşam sanatı, kafe terasları, argo (Argot), hece takas dili (Verlan) ve sosyal etkileşim kuralları.</p>
      <ul>
        <li><strong>Kafe Kültürü:</strong> Saatlerce oturulup kitap okunan ve tartışılan kamusal alanlar.</li>
        <li><strong>Verlan:</strong> Kelimelerin hecelerini ters çevirerek konuşma biçimi (Fou -> Ouf, Femme -> Meuf).</li>
        <li><strong>Görgü Kodları:</strong> 'Bonjour' demeden söze başlamama ve 'Vous' nezaket kalıbı.</li>
      </ul>
      <p><small>Detaylı dosya: <code>france-atlas/everyday-culture.md</code></small></p>
    `
  },
  diplomacy: {
    badge: "İkili İlişkiler",
    title: "500 Yıllık Türkiye - Fransa İlişkileri",
    content: `
      <p>1536 Kapitülasyon ahitnamesinden Tanzimat aydınlanmasına, Galatasaray Lisesi'nden modern gençlik diplomasisine.</p>
      <ul>
        <li><strong>İttifakın Doğuşu:</strong> Pavia esareti sonrası Kanuni'nin I. François'ya desteği ve Toulon üssü.</li>
        <li><strong>Tanzimat ve Galatasaray:</strong> 1868 Mekteb-i Sultani ile Fransızca eğitim geleneği.</li>
        <li><strong>2026 Gençlik Köprüsü:</strong> Yeşil dönüşüm, inovasyon ve kültürlerarası diyalog eylemleri.</li>
      </ul>
      <p><small>Detaylı dosya: <code>france-atlas/franco-turkish-relations.md</code></small></p>
    `
  },
  chronology: {
    badge: "Diplomasi Kronolojisi",
    title: "1536-2026 Zaman Çizelgesi",
    content: `
      <p>Yarım binyıllık diplomatik sefaretnameler, Lozan ve Hatay antlaşmaları ve gençlik delegasyonu programları.</p>
      <p><small>Detaylı dosya: <code>france-atlas/diplomacy-chronology-1536-2026.md</code></small></p>
    `
  },
  phonetics: {
    badge: "Fonetik & Sesbilim",
    title: "Burun Ünlüleri, Boğaz R'si ve Faux Amis",
    content: `
      <p>Fransızca telaffuz kuralları, burun ünlüleri (/ɑ̃/, /ɛ̃/, /ɔ̃/), boğaz R'si (/ʁ/) ve Türkçe ile ortak kelimeler.</p>
      <p><small>Detaylı dosya: <code>france-atlas/phonetics-linguistics-guide.md</code></small></p>
    `
  },
  verbs: {
    badge: "Fiil & Gramer",
    title: "Fiil Çekimleri ve Diplomatik Nezaket Kipi",
    content: `
      <p>Kritik düzensiz fiiller (être, avoir, aller, faire, vouloir, pouvoir) ve Conditionnel de politesse kuralları.</p>
      <p><small>Detaylı dosya: <code>france-atlas/french-verbs-grammar-guide.md</code></small></p>
    `
  },
  dialogues: {
    badge: "Saha Diyalogları",
    title: "5 Durumsal Rol Yapma Senaryosu",
    content: `
      <p>Restoran siparişi, resmî bakanlık heyeti tanışması, Station F pitch sunumu, metro ve eczane diyalogları.</p>
      <p><small>Detaylı dosya: <code>france-atlas/youth-dialogue-scenarios.md</code></small></p>
    `
  },
  etiquette: {
    badge: "Sosyolojik Nezaket",
    title: "Fransız Görgü ve Sosyal Kodları",
    content: `
      <p>La Bise öpüşme kuralları, masa adabı, ekmek/su isteme kodu ve tartışma kültürü rehberi.</p>
      <p><small>Detaylı dosya: <code>france-atlas/franco-turkish-etiquette-guide.md</code></small></p>
    `
  },
  poetry: {
    badge: "Şiir Antolojisi",
    title: "Büyük Fransız Şairleri",
    content: `
      <p>Baudelaire, Rimbaud, Verlaine, Apollinaire ve Paul Éluard'ın başyapıtları çift dilli metinlerle.</p>
      <p><small>Detaylı dosya: <code>france-atlas/french-poetry-anthology.md</code></small></p>
    `
  },
  gastronomy: {
    badge: "Gastronomi Mirası",
    title: "Terroir ve 1200+ Peynir Mirası",
    content: `
      <p>UNESCO Mutfak Mirası, AOP coğrafi işaretleri, peynir çeşitleri ve geleneksel baget fırıncılığı.</p>
      <p><small>Detaylı dosya: <code>france-atlas/gastronomy-terroir-guide.md</code></small></p>
    `
  },
  resolutions: {
    badge: "İkili Bildiri",
    title: "Türkiye - Fransa Gençlik Eylem Bildirisi",
    content: `
      <p>Yeşil dönüşüm, dijital egemenlik, öğrenci hareketliliği ve gönüllülük denkliği stratejileri.</p>
      <p><small>Detaylı dosya: <code>france-atlas/bilateral-resolution-framework.md</code></small></p>
    `
  },
  budget: {
    badge: "Seyahat & Bütçe",
    title: "Fransa Pratik Yaşam & Bütçe Kılavuzu",
    content: `
      <p>Navigo ulaşım kartı, Euro/TL göstergeleri, bahşiş kuralları, priz tipleri ve acil numaralar.</p>
      <p><small>Detaylı dosya: <code>france-atlas/everyday-culture.md</code></small></p>
    `
  }
};

function openAtlasModal(key) {
  const data = atlasModalData[key];
  if (!data) return;
  document.getElementById('modalBadge').innerText = data.badge;
  document.getElementById('modalTitle').innerText = data.title;
  document.getElementById('modalBody').innerHTML = data.content;
  document.getElementById('atlasModal')?.classList.add('active');
  playTone(500, 'sine', 0.08);
}

function closeAtlasModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('modal-close')) return;
  document.getElementById('atlasModal')?.classList.remove('active');
}

// ==========================================================================
// 19. TIMELINE DATABASE & ENGINE
// ==========================================================================
const timelineData = [
  {
    year: "1526",
    era: "era1",
    title: "Kanuni'nin I. François'ya Tarihi Mektubu",
    desc: "Pavia Muharebesi'nde esir düşen Fransa Kralı I. François'ya yardım teminatı veren mektup gönderildi."
  },
  {
    year: "1536",
    era: "era1",
    title: "İlk Osmanlı - Fransız Ahitnamesi (Kapitülasyonlar)",
    desc: "Veziriazam Pargalı İbrahim Paşa ile Jean de La Forêt arasında imzalanan ticaret ve dostluk antlaşması."
  },
  {
    year: "1720",
    era: "era1",
    title: "Yirmisekiz Çelebi Mehmed Efendi Paris Sefareti",
    desc: "Osmanlı elçisi Paris'i ziyaret etti; gözlemlerini aktardığı Fransa Sefaretnamesi Lâle Devri reformlarına ilham verdi."
  },
  {
    year: "1797",
    era: "era2",
    title: "İlk Daimi Osmanlı Elçiliği Paris'te Kuruldu",
    desc: "Seyyid Ali Efendi Paris'e ilk daimi Osmanlı büyükelçisi olarak atandı."
  },
  {
    year: "1867",
    era: "era2",
    title: "Sultan Abdülaziz'in Paris Ziyareti",
    desc: "III. Napoléon'un davetiyle Paris Uluslararası Sergisi'ni ziyaret eden ilk Osmanlı Padişahı oldu."
  },
  {
    year: "1868",
    era: "era2",
    title: "Mekteb-i Sultani (Galatasaray Lisesi) Açıldı",
    desc: "Fransa ve Osmanlı iş birliğiyle Batılı müfredatla Fransızca eğitim veren seçkin lise kuruldu."
  },
  {
    year: "1921",
    era: "era3",
    title: "Ankara Antlaşması (TBMM - Fransa)",
    desc: "Fransa, TBMM Hükümeti'ni tanıyan ilk İtilaf Devleti oldu ve Güney Cephesi kapandı."
  },
  {
    year: "1939",
    era: "era3",
    title: "Hatay'ın Türkiye'ye Katılması",
    desc: "Fransa ile imzalanan antlaşma neticesinde Hatay Devleti plebisitle Türkiye Cumhuriyeti'ne katıldı."
  },
  {
    year: "1968",
    era: "era3",
    title: "General Charles de Gaulle'ün Türkiye Ziyareti",
    desc: "Fransa Cumhurbaşkanı De Gaulle Anıtkabir'i ve Galatasaray Lisesi'nin 100. yıl törenlerini ziyaret etti."
  },
  {
    year: "1992",
    era: "era3",
    title: "Galatasaray Üniversitesi Kuruldu",
    desc: "Cumhurbaşkanları Turgut Özal ve François Mitterrand tarafından imzalanan uluslararası anlaşmayla kuruldu."
  },
  {
    year: "2026",
    era: "era4",
    title: "GSB Türkiye - Fransa Gençlik Değişimi Programı",
    desc: "500 yıllık diplomasi mirası zemininde Ankara, İstanbul, Paris ve Lyon'da gençlik diplomasisi zirvesi."
  }
];

function renderTimeline(items) {
  const container = document.getElementById('timelineContainer');
  if (!container) return;
  container.innerHTML = items.map(item => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-date">${item.year}</div>
      <div class="timeline-content">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    </div>
  `).join('');
}

function filterTimeline(era) {
  document.querySelectorAll('#tab-timeline .chip').forEach(c => c.classList.remove('active'));
  event?.target?.classList.add('active');
  const searchVal = document.getElementById('timelineSearch')?.value.toLowerCase() || '';

  const filtered = timelineData.filter(item => {
    const matchEra = era === 'all' || item.era === era;
    const matchSearch = item.year.includes(searchVal) ||
                        item.title.toLowerCase().includes(searchVal) ||
                        item.desc.toLowerCase().includes(searchVal);
    return matchEra && matchSearch;
  });
  renderTimeline(filtered);
}

document.getElementById('timelineSearch')?.addEventListener('input', (e) => {
  const searchVal = e.target.value.toLowerCase();
  const filtered = timelineData.filter(item =>
    item.year.includes(searchVal) ||
    item.title.toLowerCase().includes(searchVal) ||
    item.desc.toLowerCase().includes(searchVal)
  );
  renderTimeline(filtered);
});

// ==========================================================================
// 20. FAUX AMIS DATABASE & ENGINE
// ==========================================================================
const fauxAmisData = [
  { fr: "Actuellement", trap: "Aslında değil!", correct: "Şu anda / Günümüzde", trEx: "Şu anda Paris'te bulunuyoruz.", frEx: "Nous sommes actuellement à Paris." },
  { fr: "Éventuellement", trap: "Nihayetinde değil!", correct: "Gerekirse / İhtimal dahilinde", trEx: "Gerekirse yarın toplanabiliriz.", frEx: "Nous pouvons éventuellement nous réunir demain." },
  { fr: "Formidable", trap: "Korkunç değil!", correct: "Harika / Muazzam", trEx: "Bu proje gerçekten harika!", frEx: "Ce projet est formidable !" },
  { fr: "Sympathique (Sympa)", trap: "Sempatizan değil!", correct: "Cana yakın / Sevimli", trEx: "Çok cana yakın bir ekip.", frEx: "Une équipe très sympathique." },
  { fr: "Prétendre", trap: "Rol yapmak değil!", correct: "İddia etmek / İleri sürmek", trEx: "Haklı olduğunu iddia ediyor.", frEx: "Il prétend avoir raison." },
  { fr: "Sensible", trap: "Mantıklı (sensible) değil!", correct: "Duyarlı / Hassas", trEx: "Bu konuda çok hassas.", frEx: "Il est très sensible à ce sujet." }
];

function renderFauxAmis() {
  const container = document.getElementById('fauxAmisContainer');
  if (!container) return;
  container.innerHTML = fauxAmisData.map(item => `
    <div class="faux-ami-card">
      <div class="fa-fr">
        ${item.fr}
        <button class="btn-voice-mini" onclick="speakText('${item.fr}')" title="Dinle">🔊</button>
      </div>
      <div class="fa-trap">❌ Tuzak Anlam: ${item.trap}</div>
      <div class="fa-correct">✅ Doğru Anlamı: <strong>${item.correct}</strong></div>
      <div class="fa-example"><em>"${item.frEx}"</em><br><small>${item.trEx}</small></div>
    </div>
  `).join('');
}

// ==========================================================================
// 21. PACKING CHECKLIST ENGINE
// ==========================================================================
const checklistItemsData = [
  { text: "Geçerli Pasaport & Vize Belgeleri (Min. 6 ay geçerlilik)" },
  { text: "T.C. GSB Delegasyon Görev Belgesi & Davet Mektupları" },
  { text: "Uluslararası Seyahat Sağlık Sigortası Poliçesi" },
  { text: "Tip C / E Priz Adaptörü (Fransa standart fişleriyle tam uyumludur)" },
  { text: "Resmî Toplantılar İçin Takım Elbise / Delegasyon Kıyafeti" },
  { text: "Paris Yürüyüş Rotaları İçin Rahat Spor Ayakkabı" },
  { text: "Kişisel İlaçlar, Reçeteler ve Temel Seyahat Kiti" },
  { text: "Fransız Delegasyonuna Sunulacak Kurumsal Kültürel Hediyeler" },
  { text: "Navigo Ulaşım Kartı veya Dijital RATP / IDF Mobilités Uygulaması" },
  { text: "Powerbank (Taşınabilir Şarj Cihazı) & Şarj Kabloları" }
];

function initChecklist() {
  const container = document.getElementById('checklistItems');
  if (!container) return;

  const savedState = JSON.parse(localStorage.getItem('gsb-france-checklist') || '[]');

  container.innerHTML = checklistItemsData.map((item, idx) => {
    const isChecked = savedState.includes(idx);
    return `
      <label class="cl-item ${isChecked ? 'checked' : ''}" id="cl-item-${idx}">
        <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleChecklistItem(${idx})">
        <span>${item.text}</span>
      </label>
    `;
  }).join('');

  updateChecklistProgress(savedState.length, checklistItemsData.length);
}

function toggleChecklistItem(index) {
  let savedState = JSON.parse(localStorage.getItem('gsb-france-checklist') || '[]');
  const itemEl = document.getElementById(`cl-item-${index}`);

  if (savedState.includes(index)) {
    savedState = savedState.filter(i => i !== index);
    itemEl?.classList.remove('checked');
    playTone(350, 'sine', 0.05);
  } else {
    savedState.push(index);
    itemEl?.classList.add('checked');
    playTone(600, 'triangle', 0.08);
  }

  localStorage.setItem('gsb-france-checklist', JSON.stringify(savedState));
  updateChecklistProgress(savedState.length, checklistItemsData.length);
}

function updateChecklistProgress(checkedCount, total) {
  const pct = Math.round((checkedCount / total) * 100);
  const bar = document.getElementById('clBarFill');
  const label = document.getElementById('clProgress');
  if (bar) bar.style.width = `${pct}%`;
  if (label) label.innerText = `${pct}% Tamamlandı (${checkedCount}/${total})`;
}

// ==========================================================================
// 22. WORD MATCH MINI-GAME ENGINE
// ==========================================================================
const matchWordPairsMaster = [
  { fr: "La liberté", tr: "Özgürlük" },
  { fr: "La fraternité", tr: "Kardeşlik" },
  { fr: "L'égalité", tr: "Eşitlik" },
  { fr: "Le terroir", tr: "Yöre / Toprak Mirası" },
  { fr: "Le flâneur", tr: "Avare Şehir Gezgini" },
  { fr: "Le bénévole", tr: "Gönüllü Kişi" },
  { fr: "Le plaidoyer", tr: "Savunuculuk" },
  { fr: "La laïcité", tr: "Devlet Laikliği" },
  { fr: "L'addition", tr: "Hesap Faturası" },
  { fr: "L'accord", tr: "Mutabakat / Antlaşma" }
];

let matchGameTimer = null;
let matchTimeLeft = 45;
let matchScore = 0;
let matchActiveCards = [];
let matchSelectedCards = [];
let matchPairsMatched = 0;

function switchGameMode(mode) {
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  if (mode === 'quiz') {
    document.getElementById('btnModeQuiz')?.classList.add('active');
    document.getElementById('modeQuizContainer').style.display = 'block';
    document.getElementById('modeMatchContainer').style.display = 'none';
  } else {
    document.getElementById('btnModeMatch')?.classList.add('active');
    document.getElementById('modeQuizContainer').style.display = 'none';
    document.getElementById('modeMatchContainer').style.display = 'block';
    initMatchGame();
  }
}

function initMatchGame() {
  clearInterval(matchGameTimer);
  matchTimeLeft = 45;
  matchScore = 0;
  matchPairsMatched = 0;
  matchSelectedCards = [];

  document.getElementById('matchTimer').innerText = matchTimeLeft;
  document.getElementById('matchScore').innerText = matchScore;
  document.getElementById('matchPairs').innerText = '0 / 6';
  document.getElementById('matchWinMsg').style.display = 'none';

  const shuffledMaster = [...matchWordPairsMaster].sort(() => 0.5 - Math.random()).slice(0, 6);
  const cardDeck = [];

  shuffledMaster.forEach((pair, idx) => {
    cardDeck.push({ pairId: idx, text: pair.fr, type: 'fr', matched: false });
    cardDeck.push({ pairId: idx, text: pair.tr, type: 'tr', matched: false });
  });

  matchActiveCards = cardDeck.sort(() => 0.5 - Math.random());
  renderMatchGrid();

  matchGameTimer = setInterval(() => {
    matchTimeLeft--;
    document.getElementById('matchTimer').innerText = matchTimeLeft;
    if (matchTimeLeft <= 0) {
      clearInterval(matchGameTimer);
      showToast('Süre doldu! Skorunuz: ' + matchScore);
      playTone(200, 'sawtooth', 0.2);
    }
  }, 1000);
}

function renderMatchGrid() {
  const grid = document.getElementById('matchGrid');
  if (!grid) return;
  grid.innerHTML = matchActiveCards.map((card, idx) => `
    <div class="match-card ${card.matched ? 'matched' : ''}" id="mcard-${idx}" onclick="handleMatchCardClick(${idx})">
      ${card.text}
    </div>
  `).join('');
}

function handleMatchCardClick(index) {
  const card = matchActiveCards[index];
  if (!card || card.matched || matchSelectedCards.some(c => c.index === index)) return;

  const el = document.getElementById(`mcard-${index}`);
  el.classList.add('selected');
  matchSelectedCards.push({ index, card, el });

  playTone(400, 'sine', 0.05);

  if (matchSelectedCards.length === 2) {
    const [first, second] = matchSelectedCards;
    if (first.card.pairId === second.card.pairId && first.card.type !== second.card.type) {
      first.card.matched = true;
      second.card.matched = true;
      first.el.classList.add('matched');
      second.el.classList.add('matched');
      first.el.classList.remove('selected');
      second.el.classList.remove('selected');
      matchPairsMatched++;
      matchScore += 20 + Math.round(matchTimeLeft / 2);
      document.getElementById('matchScore').innerText = matchScore;
      document.getElementById('matchPairs').innerText = `${matchPairsMatched} / 6`;
      playTone(680, 'triangle', 0.15);

      if (first.card.type === 'fr') speakText(first.card.text);
      else speakText(second.card.text);

      matchSelectedCards = [];

      if (matchPairsMatched === 6) {
        clearInterval(matchGameTimer);
        document.getElementById('matchWinMsg').style.display = 'block';
        playTone(800, 'sine', 0.3);
      }
    } else {
      playTone(240, 'square', 0.15);
      setTimeout(() => {
        first.el.classList.remove('selected');
        second.el.classList.remove('selected');
        matchSelectedCards = [];
      }, 500);
    }
  }
}

// ==========================================================================
// 23. INITIALIZATION ON DOM LOAD
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderQuotes(quotesData);
  renderFigures(figuresData);
  loadPoem('albatros');
  renderRegions(regionsData);
  renderCheeses(cheeseData);
  updateFlashcard();
  renderVocabTable(vocabData);
  initVerbSelector();
  loadDialogueScenario('bistro');
  updateResolutionPreview();
  renderFlaneurRoutes();
  renderQuizQuestion();
  renderTimeline(timelineData);
  renderFauxAmis();
  initChecklist();

  // Check initial hash routing
  if (window.location.hash) {
    const tabKey = window.location.hash.replace('#', '');
    if (document.getElementById(`tab-${tabKey}`)) {
      switchTab(tabKey);
    }
  }
});
