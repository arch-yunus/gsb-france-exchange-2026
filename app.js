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

// 2. TAB NAVIGATION
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const tabId = `tab-${btn.dataset.tab}`;
    const target = document.getElementById(tabId);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
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

// 4. WEB AUDIO SYNTH HELPER (For subtle UI sounds)
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

// ==========================================================================
// 5. QUOTES & APHORISMS DATABASE & ENGINE
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
    quoteTr: "Kendi bahçemizi yetiştirmeliyiz (Çalışmalı ve üretmeliyiz).",
    author: "Voltaire",
    work: "Candide (1759)"
  },
  {
    category: "french",
    quoteFr: "La beauté sauvera le monde... mais aimer, c'est agir.",
    quoteTr: "Güzellik dünyayı kurtaracak... fakat sevmek, eylemde bulunmaktır.",
    author: "Victor Hugo",
    work: "Les Misérables (1862)"
  },
  {
    category: "french",
    quoteFr: "L'existence précède l'essence.",
    quoteTr: "Varoluş özden önce gelir.",
    author: "Jean-Paul Sartre",
    work: "L'existentialisme est un humanisme (1946)"
  },
  {
    category: "french",
    quoteFr: "Au milieu de l'hiver, j'apprenais enfin qu'il y avait en moi un été invincible.",
    quoteTr: "Kışın ortasında, içimde yenilmez bir yaz olduğunu nihayet öğrendim.",
    author: "Albert Camus",
    work: "Retour à Tipasa (1952)"
  },
  {
    category: "french",
    quoteFr: "On ne naît pas femme : on le devient.",
    quoteTr: "Kadın doğulmaz, kadın olunur.",
    author: "Simone de Beauvoir",
    work: "Le Deuxième Sexe (1949)"
  },
  {
    category: "french",
    quoteFr: "La musique commence là où s'arrête le pouvoir des mots.",
    quoteTr: "Müzik, kelimelerin gücünün bittiği yerde başlar.",
    author: "Claude Debussy",
    work: "Müzik Yazıları"
  },
  {
    category: "french",
    quoteFr: "Le cœur a ses raisons que la raison ne connaît point.",
    quoteTr: "Kalbin, aklın hiç bilmediği gerekçeleri vardır.",
    author: "Blaise Pascal",
    work: "Pensées (1670)"
  },
  {
    category: "turkish",
    quoteFr: "La culture française a été pour nous la première et la plus large fenêtre ouverte sur l'Occident.",
    quoteTr: "Fransız kültürü bizim için Batı'ya açılan ilk ve en geniş pencere olmuştur. Tanzimat'tan bu yana edebiyatımız bu etkileşimle yoğrulmuştur.",
    author: "Cemil Meriç",
    work: "Mağaradakiler (1978)"
  },
  {
    category: "turkish",
    quoteFr: "J'ai cherché la synthèse de la raison française et de l'âme turque.",
    quoteTr: "Ben Paris'te Sorbonne sıralarında Fransız aklıyla Türk ruhunun terkibini aradım.",
    author: "Yahya Kemal Beyatlı",
    work: "Kendi Gök Kubbemiz"
  },
  {
    category: "turkish",
    quoteFr: "Le poète n'est pas un traducteur de la réalité, mais un créateur d'harmonies cachées.",
    quoteTr: "Şiir, nesre çevrilmesi kabil olmayan bir lisan-ı haldir; sembollerin musikisidir.",
    author: "Ahmet Haşim",
    work: "Piyâle Önsözü: Şiir Hakkında Bazı Mülahazalar"
  },
  {
    category: "turkish",
    quoteFr: "Paris était pour moi un cours magistral d'art et de mélancolie.",
    quoteTr: "O mahur beste çalar, Müjgan'la ben ağlaşırız... Paris benim için hem aşkın hem de sürgünün başkentiydi.",
    author: "Attilâ İlhan",
    work: "Hangi Batı & Ben Sana Mecburum"
  },
  {
    category: "turkish",
    quoteFr: "La poésie française a sculpté la modernité de notre langue.",
    quoteTr: "Baudelaire ve Mallarmé'yi anlamadan Türk şiirinin modernleşme macerasını kavrayamazsınız.",
    author: "Hilmi Yavuz",
    work: "Edebiyat ve Sanat Yazıları"
  },
  {
    category: "world",
    quoteFr: "Si vous avez la chance d'avoir vécu à Paris lorsque vous étiez jeune, alors Paris reste avec vous pour le reste de votre vie, car Paris est une fête.",
    quoteTr: "Eğer gençliğinde Paris'te yaşama şansına erişmişsen, nereye gidersen git o seninle kalır; çünkü Paris taşınabilir bir şölendir.",
    author: "Ernest Hemingway",
    work: "A Moveable Feast (1964)"
  },
  {
    category: "world",
    quoteFr: "Ajoutez deux lettres à Paris : c'est le paradis.",
    quoteTr: "Paris'e iki harf ekleyin: cennet (paradis) olur.",
    author: "Jules Renard",
    work: "Journal (1925)"
  },
  {
    category: "world",
    quoteFr: "Respirer Paris, cela conserve l'âme.",
    quoteTr: "Paris'in havasını solumak, ruhu diri tutar.",
    author: "Victor Hugo",
    work: "Les Misérables"
  },
  {
    category: "diplomacy",
    quoteFr: "Liberté, Égalité, Fraternité.",
    quoteTr: "Özgürlük, Eşitlik, Kardeşlik.",
    author: "Fransız Cumhuriyeti Şiarı",
    work: "1789 Devrimi & Anayasa"
  },
  {
    category: "diplomacy",
    quoteFr: "La jeunesse n'est pas une période de la vie, elle est un état d'esprit.",
    quoteTr: "Gençlik hayatın bir dönemi değil, bir zihin durumudur; cesaret ve geleceğe inançtır.",
    author: "Gençlik Diplomasisi İlkesi",
    work: "GSB 2026 Vizyon Belgesi"
  }
];

function renderQuotes(list) {
  const container = document.getElementById('quotesContainer');
  if (!container) return;
  container.innerHTML = list.map((q, idx) => `
    <div class="quote-card">
      <span class="quote-badge">${getQuoteCategoryLabel(q.category)}</span>
      <p class="quote-text">"${q.quoteFr}"</p>
      <p class="quote-translation">${q.quoteTr}</p>
      <div class="quote-footer">
        <div>
          <span class="quote-author">${q.author}</span>
          <span class="quote-work">${q.work}</span>
        </div>
        <button class="btn-copy" onclick="copyQuote('${q.quoteFr.replace(/'/g, "\\'")}', '${q.author}')">Kopyala 📋</button>
      </div>
    </div>
  `).join('');
}

function getQuoteCategoryLabel(cat) {
  switch (cat) {
    case 'french': return '🇫🇷 Fransız Felsefesi';
    case 'turkish': return '🇹🇷 Türk Aydınları';
    case 'world': return '🌍 Dünya Edebiyatı & Paris';
    case 'diplomacy': return '🤝 Diplomasi & Özgürlük';
    default: return 'Alıntı';
  }
}

function copyQuote(text, author) {
  const formatted = `"${text}" — ${author}`;
  navigator.clipboard.writeText(formatted).then(() => {
    playTone(600, 'sine', 0.1);
    showToast(`Alıntı kopyalandı: ${author} ✨`);
  });
}

function filterQuotes(category) {
  document.querySelectorAll('#tab-quotes .filter-chips .chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
  const term = document.getElementById('quoteSearch')?.value.toLowerCase() || '';
  let filtered = quotesData;
  if (category !== 'all') {
    filtered = filtered.filter(q => q.category === category);
  }
  if (term) {
    filtered = filtered.filter(q =>
      q.quoteFr.toLowerCase().includes(term) ||
      q.quoteTr.toLowerCase().includes(term) ||
      q.author.toLowerCase().includes(term)
    );
  }
  renderQuotes(filtered);
}

document.getElementById('quoteSearch')?.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const activeChip = document.querySelector('#tab-quotes .filter-chips .chip.active');
  const cat = activeChip ? activeChip.getAttribute('onclick').replace("filterQuotes('", "").replace("')", "") : 'all';
  let filtered = quotesData;
  if (cat !== 'all') {
    filtered = filtered.filter(q => q.category === cat);
  }
  if (term) {
    filtered = filtered.filter(q =>
      q.quoteFr.toLowerCase().includes(term) ||
      q.quoteTr.toLowerCase().includes(term) ||
      q.author.toLowerCase().includes(term)
    );
  }
  renderQuotes(filtered);
});

// ==========================================================================
// 6. BILINGUAL POETRY READER & SPEECH SYNTHESIS
// ==========================================================================
const poemsDatabase = {
  albatros: {
    titleFr: "L'Albatros",
    authorFr: "Charles Baudelaire, Les Fleurs du mal (1857)",
    titleTr: "Albatros",
    authorTr: "Çeviri: Ahmet Muhip Dıranas / Orhan Veli Kanık geleneği",
    bodyFr: `Souvent, pour s'amuser, les hommes d'équipage
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
Ses ailes de géant l'empêchent de marcher.`,
    bodyTr: `Eğlenmek için sık sık gemi tayfaları
Yakalar albatrosları, o koca deniz kuşlarını;
Onlar ki acı uçurumlar üstünde süzülen gemiyi
Ağır ve kayıtsız yol arkadaşları gibi izlerler.

Güverteye bırakır bırakmaz onları tayfalar,
Bu göklerin kralları, mahcup ve acemi,
Büyük beyaz kanatlarını acınası şekilde
Kürekler gibi yanlarında sürüklemeye başlar.

Bu kanatlı yolcu, nasıl da hantal ve zavallı!
Az önce ne kadar güzeldi, şimdi ne komik ve çirkin!
Kimi lülesiyle gagasına dokunup kızdırır onu,
Kimi topallayarak taklit eder uçan bu sakatı!

Şair de tıpkı bu bulutlar prensine benzer:
Fırtınalarda dolaşır, okçulara meydan okur;
Fakat yuhalamalar arasında yeryüzüne sürgün edilince,
O dev kanatları yürümesine engel olur.`
  },
  voyelles: {
    titleFr: "Voyelles",
    authorFr: "Arthur Rimbaud, Poésies (1871)",
    titleTr: "Sesliler",
    authorTr: "Sembolizmin ve Ses-Renk Eşduyumunun (Synesthésie) Zirvesi",
    bodyFr: `A noir, E blanc, I rouge, U vert, O bleu : voyelles,
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
— O l'Oméga, rayon violet de Ses Yeux !`,
    bodyTr: `A kara, E ak, I al, U yeşil, O mavi: ey sesliler,
Gizli doğumlarınızı anlatacağım bir gün:
A, o amansız kokular çevresinde vızıldayan
Işıl ışıl sineklerin kara tüylü korsesi,

Gölge koyları; E, çadırların ve buharların saflığı,
Gururlu buzulların mızrakları, beyaz krallar, çiçek ürpertileri;
I, erguvanlar, tükürülmüş kan, güzel dudakların gülüşü
Öfkede ya da tövbekar sarhoşluklarda;

U, döngüler, yeşil denizlerin ilahi titreşimleri,
Hayvanlarla dolu otlakların huzuru, simyanın
Büyük ve çalışkan alınlara kazıdığı kırışıkların barışı;

O, tuhaf çığlıklarla dolu yüce Borazan,
Dünyaların ve Meleklerin içinden geçtiği sessizlikler:
— O, Omega, O'nun Gözlerinin mor ışını!`
  },
  chanson: {
    titleFr: "Chanson d'automne",
    authorFr: "Paul Verlaine, Poèmes saturniens (1866)",
    titleTr: "Sonbahar Şarkısı",
    authorTr: "Müzikalite ve 1944 Normandiya Çıkarması Şifresi",
    bodyFr: `Les sanglots longs
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
Feuille morte.`,
    bodyTr: `Sonbahar
Kemanlarının
Uzun hıçkırıkları
Yaralar kalbimi
Tekdüze bir
Baygınlıkla.

Boğulur gibi
Ve sapsarı, vakit
Gelip çatınca,
Hatırlarım
Eski günleri
Ve ağlarım.

Ve çeker giderim
Beni oradan oraya
Sürükleyen
O uğursuz rüzgarda,
Tıpkı savrulan
Kuru bir yaprak gibi.`
  },
  mirabeau: {
    titleFr: "Le Pont Mirabeau",
    authorFr: "Guillaume Apollinaire, Alcools (1913)",
    titleTr: "Mirabeau Köprüsü",
    authorTr: "Zamanın ve Aşkın Akışı Üzerine Şiirsel Melodi",
    bodyFr: `Sous le pont Mirabeau coule la Seine
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
Les jours s'en vont je demeure`,
    bodyTr: `Mirabeau köprüsünün altından akar Seine
Ve bizim aşklarımız
Hatırlamam şart mı bilmem
Acıların ardından gelirdi sevinç her dem

Gece insin, vursun saatler
Günler akıp gider, ben kalırım

El ele tutuşup yüz yüze duralım
Kollarımızın köprüsü
Altından akıp geçerken
Sonsuz bakışların o yorgun dalgası

Gece insin, vursun saatler
Günler akıp gider, ben kalırım`
  },
  liberte: {
    titleFr: "Liberté",
    authorFr: "Paul Éluard, Poésie et Vérité (1942)",
    titleTr: "Hürriyet",
    authorTr: "İkinci Dünya Savaşı Direniş Hareketi Başyapıtı",
    bodyFr: `Sur mes cahiers d'écolier
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

Liberté.`,
    bodyTr: `Okul defterlerimin üstüne
Sırama ve ağaçlara
Kumlara, karların üstüne
Yazarım senin adını

Okunmuş bütün sayfalara
Bembeyaz bomboş sayfalara
Taşa, kana, kâğıda veya küle
Yazarım senin adını

Ve tek bir kelimenin gücüyle
Yeniden başlarım hayatıma
Seni tanımak için doğdum ben
Seni haykırmak için:

Hürriyet.`
  },
  feuilles: {
    titleFr: "Les Feuilles mortes",
    authorFr: "Jacques Prévert, Paroles (1946)",
    titleTr: "Dökülen Yapraklar",
    authorTr: "Édith Piaf ve Yves Montand Tarafından Ölümsüzleştirilen Şiir",
    bodyFr: `C'est une chanson qui nous ressemble.
Toi, tu m'aimais et je t'aimais,
Et nous vivions tous deux ensemble,
Toi qui m'aimais, moi qui t'aimais.

Mais la vie sépare ceux qui s'aiment,
Tout doucement, sans faire de bruit.
Et la mer efface sur le sable
Les pas des amants désunis.

Les feuilles mortes se ramassent à la pelle,
Les souvenirs et les regrets aussi.
Et le vent du nord les emporte
Dans la nuit froide de l'oubli.`,
    bodyTr: `Bize benzeyen bir şarkıdır bu.
Sen beni severdin, ben seni severdim,
Ve ikimiz bir arada yaşardık,
Sen beni seven, ben seni seven.

Fakat hayat ayırır sevenleri,
Pek usulca, hiç gürültü yapmadan.
Ve deniz siler kumsaldan
Ayrılan sevgililerin ayak izlerini.

Dökülen yapraklar kürek kürek toplanır,
Tıpkı hatıralar ve pişmanlıklar gibi.
Ve kuzey rüzgarı alır götürür onları
Unutuşun soğuk gecesine.`
  }
};

function loadPoem(key) {
  const p = poemsDatabase[key];
  if (!p) return;
  document.getElementById('poemTitleFr').innerText = p.titleFr;
  document.getElementById('poemAuthorFr').innerHTML = p.authorFr;
  document.getElementById('poemBodyFr').innerText = p.bodyFr;

  document.getElementById('poemTitleTr').innerText = p.titleTr;
  document.getElementById('poemAuthorTr').innerText = p.authorTr;
  document.getElementById('poemBodyTr').innerText = p.bodyTr;
}

function speakPoemFrench() {
  const poemKey = document.getElementById('poemSelect')?.value || 'albatros';
  const poem = poemsDatabase[poemKey];
  if (!poem) return;

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(poem.bodyFr);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
    showToast(`Fransızca şiir seslendiriliyor: ${poem.titleFr} 🔊`);
  } else {
    showToast("Tarayıcınız ses sentezini desteklemiyor.");
  }
}

// ==========================================
// 7. REGIONS DATA & RENDERING
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
    desc: "Akdeniz'in dağlık adası, Napoléon Bonaparte'ın doğum yeri, kendine özgü Korsika dili ve zengin biyo-çeşitlilik.",
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
  document.querySelectorAll('#tab-regions .filter-chips .chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
  const term = document.getElementById('regionSearch')?.value.toLowerCase() || '';
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
  const activeChip = document.querySelector('#tab-regions .filter-chips .chip.active');
  const cat = activeChip ? activeChip.innerText : 'Tümü (13 Bölge)';
  let filtered = regionsData;
  if (term) {
    filtered = filtered.filter(r => r.name.toLowerCase().includes(term) || r.capital.toLowerCase().includes(term) || r.desc.toLowerCase().includes(term));
  }
  renderRegions(filtered);
});

// ==========================================================================
// 8. GASTRONOMY & CHEESE DATABASE
// ==========================================================================
const cheeseData = [
  {
    name: "Comté AOP",
    region: "Bourgogne-Franche-Comté (Jura)",
    milk: "inek",
    age: "12-36 Ay Olgunlaşma",
    desc: "Fransa'nın en çok tüketilen AOP peyniri. Fındık, tereyağı ve kuru meyve aromalarıyla zengin bir lezzet profili.",
    pairing: "Jura Vin Jaune veya hafif meyvemsi beyaz şaraplar."
  },
  {
    name: "Roquefort AOP",
    region: "Occitanie (Aveyron)",
    milk: "koyun",
    age: "Combalou Doğal Mağaralarında 3 Ay",
    desc: "'Peynirlerin Kralı'. Penicillium roqueforti küfüyle mayalanan, keskin, kremamsı ve tuzlu mavi peynir.",
    pairing: "Sauternes tatlı şarabı veya cevizli ekmek."
  },
  {
    name: "Camembert de Normandie AOP",
    region: "Normandie",
    milk: "inek",
    age: "Ahşap Kutuda 4 Hafta",
    desc: "Marie Harel tarafından 1791'de yaratılan, beyaz kadifemsi kabuklu, akışkan ve mantar aromalı yumuşak peynir.",
    pairing: "Normandiya Elma Likörü (Cidre) ve taze çıtır baget."
  },
  {
    name: "Reblochon de Savoie AOP",
    region: "Auvergne-Rhône-Alpes (Alpler)",
    milk: "inek",
    age: "Dağ Evlerinde 4-6 Hafta",
    desc: "Alp çobanlarının ikinci sağım sütünden yapılan kremamsı peynir. Meşhur 'Tartiflette' fırın yemeğinin kalbi.",
    pairing: "Savoie beyaz şarabı ve fırınlanmış patates."
  },
  {
    name: "Sainte-Maure de Touraine AOP",
    region: "Centre-Val de Loire",
    milk: "keci",
    age: "Kül Kaplı Silindir 10-30 Gün",
    desc: "Ortasından çavdar samanı geçen, külle kaplı silindirik keçi peyniri. Fındık ve narenciye notaları taşır.",
    pairing: "Sauvignon Blanc (Sancerre / Pouilly-Fumé)."
  },
  {
    name: "Brie de Meaux AOP",
    region: "Île-de-France (Meaux)",
    milk: "inek",
    age: "4-8 Hafta",
    desc: "1815 Viyana Kongresi'nde 'Kralların Peyniri' ilan edilen, kremamsı ve tereyağlı tarihi lezzet.",
    pairing: "Pinot Noir veya Şampanya."
  }
];

function renderCheeses(list) {
  const container = document.getElementById('cheeseContainer');
  if (!container) return;
  container.innerHTML = list.map(c => `
    <div class="cheese-card">
      <div class="cheese-header">
        <h3>${c.name}</h3>
        <span class="cheese-badge aop">AOP Sertifikalı</span>
      </div>
      <div class="cheese-meta">
        <span>📍 ${c.region}</span>
        <span>🥛 ${getMilkLabel(c.milk)}</span>
      </div>
      <p class="cheese-desc">${c.desc}</p>
      <div class="cheese-pairing">
        <strong>Eşleşme & Sunum:</strong> ${c.pairing}
      </div>
    </div>
  `).join('');
}

function getMilkLabel(milk) {
  switch (milk) {
    case 'inek': return 'Çiğ İnek Sütü';
    case 'koyun': return 'Çiğ Koyun Sütü';
    case 'keci': return 'Çiğ Keçi Sütü';
    default: return 'Süt';
  }
}

function filterCheeses(milkType) {
  document.querySelectorAll('#tab-gastronomy .filter-chips .chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
  const term = document.getElementById('cheeseSearch')?.value.toLowerCase() || '';
  let filtered = cheeseData;
  if (milkType !== 'all') {
    filtered = filtered.filter(c => c.milk === milkType);
  }
  if (term) {
    filtered = filtered.filter(c => c.name.toLowerCase().includes(term) || c.region.toLowerCase().includes(term) || c.desc.toLowerCase().includes(term));
  }
  renderCheeses(filtered);
}

document.getElementById('cheeseSearch')?.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const activeChip = document.querySelector('#tab-gastronomy .filter-chips .chip.active');
  const milkType = activeChip ? activeChip.getAttribute('onclick').replace("filterCheeses('", "").replace("')", "") : 'all';
  let filtered = cheeseData;
  if (milkType !== 'all') {
    filtered = filtered.filter(c => c.milk === milkType);
  }
  if (term) {
    filtered = filtered.filter(c => c.name.toLowerCase().includes(term) || c.region.toLowerCase().includes(term) || c.desc.toLowerCase().includes(term));
  }
  renderCheeses(filtered);
});

// ==========================================================================
// 9. VOCABULARY & FLASHCARDS
// ==========================================================================
const vocabData = [
  { fr: "La diplomatie publique", pronun: "/la di.plɔ.ma.si py.blik/", tr: "Kamu diplomasisi", cat: "diplomacy", ex: "Renforcer la diplomatie publique par la jeunesse." },
  { fr: "L'engagement citoyen", pronun: "/lɑ̃.ɡaʒ.mɑ̃ si.twa.jɛ̃/", tr: "Yurttaşlık katılımı / Gönüllülük", cat: "diplomacy", ex: "Favoriser l'engagement citoyen des jeunes." },
  { fr: "Le développement durable", pronun: "/lə de.vlɔp.mɑ̃ dy.ʁabl/", tr: "Sürdürülebilir kalkınma", cat: "diplomacy", ex: "Les objectifs de développement durable (ODD)." },
  { fr: "La table ronde", pronun: "/la tabl ʁɔ̃d/", tr: "Yuvarlak masa toplantısı", cat: "diplomacy", ex: "Participer à une table ronde bilatérale." },
  { fr: "Le compte-rendu", pronun: "/lə kɔ̃t ʁɑ̃.dy/", tr: "Toplantı tutanağı / Rapor", cat: "diplomacy", ex: "Rédiger le compte-rendu de l'atelier." },
  { fr: "La feuille de route", pronun: "/la fœj də ʁut/", tr: "Yol haritası", cat: "diplomacy", ex: "Adopter la feuille de route 2026-2027." },
  { fr: "Bonjour / Bonsoir", pronun: "/bɔ̃.ʒuʁ / bɔ̃.swaʁ/", tr: "İyi günler / İyi akşamlar", cat: "daily", ex: "Bonjour Monsieur, comment allez-vous ?" },
  { fr: "S'il vous plaît", pronun: "/sil vu plɛ/", tr: "Lütfen (Resmi)", cat: "daily", ex: "Un café et l'addition, s'il vous plaît." },
  { fr: "Je vous en prie", pronun: "/ʒə vu zɑ̃ pʁi/", tr: "Rica ederim", cat: "daily", ex: "Merci beaucoup ! - Je vous en prie." },
  { fr: "Où se trouve la gare ?", pronun: "/u sə tʁuv la ɡaʁ/", tr: "Gar nerede bulunuyor?", cat: "daily", ex: "Excusez-moi, où se trouve la gare ?" },
  { fr: "L'art de vivre", pronun: "/laʁ də vivʁ/", tr: "Yaşama sanatı", cat: "daily", ex: "Apprécier l'art de vivre à la française." },
  { fr: "Le boulot / Le taf", pronun: "/lə bu.lo / lə taf/", tr: "İş, mesai (Argot)", cat: "argot", ex: "Je vais au boulot à 9 heures." },
  { fr: "Un pote / Une pote", pronun: "/œ̃ pɔt/", tr: "Kanka, yakın arkadaş (Argot)", cat: "argot", ex: "Je voyage avec mes potes de délégation." },
  { fr: "C'est un truc de ouf !", pronun: "/sɛ tœ̃ tʁyk də uf/", tr: "Çılgınca / İnanılmaz bir şey! (Verlan)", cat: "argot", ex: "Ce musée est un truc de ouf !" },
  { fr: "La meuf / Le keum", pronun: "/la mœf / lə kœm/", tr: "Kadın / Erkek (Verlan)", cat: "argot", ex: "C'est une meuf super sympa." },
  { fr: "Cimer / Zarbi", pronun: "/si.mɛʁ / zaʁ.bi/", tr: "Sağol / Tuhaf, acayip (Verlan)", cat: "argot", ex: "Cimer pour le café !" },
  { fr: "Avoir le coup de foudre", pronun: "/a.vwaʁ lə ku də fudʁ/", tr: "İlk görüşte aşık olmak / Vurulmak", cat: "idioms", ex: "J'ai eu le coup de foudre pour Paris." },
  { fr: "Poser un lapin", pronun: "/po.ze œ̃ la.pɛ̃/", tr: "Buluşmaya gelmemek, ekmek", cat: "idioms", ex: "Il m'a posé un lapin hier soir." },
  { fr: "Avoir le cafard", pronun: "/a.vwaʁ lə ka.faʁ/", tr: "Hüznü olmak, içi kararmak", cat: "idioms", ex: "Quand il pleut, j'ai le cafard." },
  { fr: "C'est la fin des haricots", pronun: "/sɛ la fɛ̃ de a.ʁi.ko/", tr: "Her şey bitti, umut kalmadı", cat: "idioms", ex: "Pas de panique, ce n'est pas la fin des haricots." },
  { fr: "En premier lieu", pronun: "/ɑ̃ pʁə.mje ljø/", tr: "İlk olarak, her şeyden önce", cat: "connectors", ex: "En premier lieu, examinons les faits." },
  { fr: "Par conséquent", pronun: "/paʁ kɔ̃.se.kɑ̃/", tr: "Sonuç olarak, binaenaleyh", cat: "connectors", ex: "Par conséquent, nous devons agir ensemble." },
  { fr: "Néanmoins / Toutefois", pronun: "/ne.ɑ̃.mwɛ̃ / tut.fwa/", tr: "Bununla birlikte, yine de", cat: "connectors", ex: "Néanmoins, des défis subsistent." },
  { fr: "D'une part... d'autre part", pronun: "/dyn paʁ... dotʁ paʁ/", tr: "Bir yandan... diğer yandan", cat: "connectors", ex: "D'une part la jeunesse, d'autre part l'expérience." },
  { fr: "En guise de conclusion", pronun: "/ɑ̃ ɡiz də kɔ̃.kly.zjɔ̃/", tr: "Sonuç olarak, özetle", cat: "connectors", ex: "En guise de conclusion, nous remercions la délégation." }
];

let currentCardIndex = 0;

function updateFlashcard() {
  const card = vocabData[currentCardIndex];
  if (!card) return;
  document.getElementById('fcCategory').innerText = getVocabCategoryLabel(card.cat);
  document.getElementById('fcFrench').innerText = card.fr;
  document.getElementById('fcPronun').innerText = card.pronun;
  document.getElementById('fcTurkish').innerText = card.tr;
  document.getElementById('fcExample').innerText = `"${card.ex}"`;
  document.getElementById('fcCounter').innerText = `${currentCardIndex + 1} / ${vocabData.length}`;
  document.getElementById('flashcard').classList.remove('flipped');
}

function flipCard() {
  playTone(520, 'sine', 0.08);
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

function speakCurrentFlashcard() {
  const card = vocabData[currentCardIndex];
  if (!card) return;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(card.fr);
    u.lang = 'fr-FR';
    window.speechSynthesis.speak(u);
  }
}

function getVocabCategoryLabel(cat) {
  switch (cat) {
    case 'diplomacy': return 'Diplomasi';
    case 'daily': return 'Günlük & Seyahat';
    case 'argot': return 'Argot & Verlan';
    case 'idioms': return 'Deyimler';
    case 'connectors': return 'Münazara Bağlaçları';
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
      <td><span class="badge-tag tag-${v.cat}">${getVocabCategoryLabel(v.cat)}</span></td>
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

// Keyboard shortcut for flashcards (Space to flip, Arrow keys to navigate)
window.addEventListener('keydown', (e) => {
  const vocabTab = document.getElementById('tab-vocabulary');
  if (vocabTab && vocabTab.classList.contains('active')) {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
      e.preventDefault();
      flipCard();
    } else if (e.code === 'ArrowRight') {
      nextCard();
    } else if (e.code === 'ArrowLeft') {
      prevCard();
    }
  }
});

// ==========================================================================
// 10. PARIS FLANEUR ROUTES DATABASE
// ==========================================================================
const flaneurRoutesData = [
  {
    title: "1. Saint-Germain & Varoluşçu Kafe Hattı",
    time: "2.5 Saat (~4.5 km)",
    theme: "Varoluşçuluk, Caz & Felsefi Münazaralar",
    stops: [
      "Café de Flore (Sartre & Beauvoir'ın yazı masaları)",
      "Les Deux Magots (Hemingway & Camus buluşma noktası)",
      "Église Saint-Germain-des-Prés (Paris'in en eski kilisesi & Descartes'ın mezarı)",
      "Jardin du Luxembourg (Rilke ve Gide'in yürüyüş patikaları)"
    ],
    secret: "Le Procope: 1686'da açılan ve Voltaire'in günde 40 fincan kahve içtiği, Diderot'nun Ansiklopedi'yi tartıştığı ilk kafe."
  },
  {
    title: "2. Quartier Latin & Entelektüel Panteon",
    time: "2 Saat (~3.8 km)",
    theme: "Akademi, Aydınlanma & Edebi Sahaf Loncası",
    stops: [
      "Sorbonne Üniversitesi (1253'ten bu yana felsefenin kalbi)",
      "Shakespeare and Company Sahafı (Kayıp Kuşak yazarları)",
      "Panthéon (Voltaire, Rousseau, Victor Hugo ve Zola'nın ebedi istirahatgâhı)",
      "Collège de France (Foucault ve Barthes'ın ders amfileri)"
    ],
    secret: "Rue Mouffetard: Roma döneminden kalma, Hemingway'in Paris Bir Şölendir'de anlattığı canlı pazar sokağı."
  },
  {
    title: "3. Seine Bouquinistes & Köprüler Şiiri",
    time: "3 Saat (~5 km)",
    theme: "UNESCO Nehir Mirası, Sahaf Kutuları & Empresyonizm",
    stops: [
      "Pont Mirabeau (Apollinaire'in akıp giden zamana yazdığı köprü)",
      "Pont des Arts (Louvre'a bağlanan ahşap sanatçılar köprüsü)",
      "Seine Bouquinistes (900 yeşil kutuda 300.000 tarihi kitap & gravür)",
      "Île de la Cité & Notre-Dame Katedrali (Victor Hugo'nun Quasimodo esini)"
    ],
    secret: "Pont Neuf: Adı 'Yeni Köprü' olmasına rağmen Paris'in en eski ayakta kalan taş köprüsüdür (1607)."
  },
  {
    title: "4. Montmartre Bohem Sanatçı Tepesi",
    time: "2.5 Saat (~4 km)",
    theme: "Bateau-Lavoir, Kübizm & Kabare Kültürü",
    stops: [
      "Le Bateau-Lavoir (Picasso'nun Avignonlu Kızlar'ı boyadığı efsanevi atölye)",
      "Place du Tertre (Açık hava ressamlar meydanı)",
      "Au Lapin Agile (Tarihi sanatçı kabaresi)",
      "Sacré-Cœur Bazilikası (Paris'e tepeden bakan beyaz kubbe)"
    ],
    secret: "Vigne de Montmartre: Paris'in göbeğinde 12. yüzyıldan beri üzüm hasadı yapılan son tarihi bağ alanı."
  },
  {
    title: "5. Marais & Tarihi Pasajlar (*Les Passages Couverts*)",
    time: "3.5 Saat (~5.5 km)",
    theme: "Walter Benjamin'in Pasajlar Projesi & 19. Yüzyıl Kent Morfolojisi",
    stops: [
      "Passage des Panoramas (1799 tarihli ilk cam tavanlı gaz lambalı pasaj)",
      "Galerie Vivienne (Mozaik zeminli lüks neoklasik pasaj)",
      "Place des Vosges (Victor Hugo'nun yaşadığı ve Sefiller'i yazdığı kırmızı tuğlalı meydan)",
      "Musée Carnavalet (Paris Tarihi Müzesi)"
    ],
    secret: "Pasajlar, 19. yüzyılda flâneur'lerin yağmurdan kaçarak vitrinleri izlediği modern alışveriş merkezlerinin atasıdır."
  }
];

function renderFlaneurRoutes() {
  const container = document.getElementById('flaneurRoutesContainer');
  if (!container) return;
  container.innerHTML = flaneurRoutesData.map(r => `
    <div class="flaneur-route-card">
      <div class="route-header">
        <h3>${r.title}</h3>
        <span class="route-time-badge">⏱️ ${r.time}</span>
      </div>
      <div class="route-theme">🎭 ${r.theme}</div>
      <ul class="route-stops-list">
        ${r.stops.map(s => `<li>${s}</li>`).join('')}
      </ul>
      <div class="route-secret">
        <strong>💡 Flâneur Gizemi:</strong> ${r.secret}
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// 11. COMPREHENSIVE 20-QUESTION QUIZ ENGINE
// ==========================================================================
const quizQuestions = [
  {
    cat: "Coğrafya & Semboller",
    q: "1. Fransa anakarası, 6 köşeli geometrik yapısından ötürü halk arasında hangi isimle anılır?",
    opts: ["Le Pentagone", "L'Hexagone (Altıgen)", "Le Triangle", "L'Octogone"],
    correct: 1,
    exp: "Fransa, 3 deniz ve 3 kara sınırına sahip 6 köşeli yapısı sebebiyle 'L'Hexagone' (Altıgen) olarak anılır."
  },
  {
    cat: "Anayasa & Hukuk",
    q: "2. Fransa'da kilise ile devlet işlerini kesin olarak ayıran 'Laïcité' yasası hangi yılda kabul edilmiştir?",
    opts: ["1789", "1848", "1905", "1958"],
    correct: 2,
    exp: "9 Aralık 1905 tarihli yasa, Fransız tipi laikliğin kurucu anayasal temelidir."
  },
  {
    cat: "Edebiyat & Felsefe",
    q: "3. Marcel Proust'un 'Kayıp Zamanın İzinde' eserinde istemsiz belleği (mémoire involontaire) tetikleyen ünlü yiyecek nedir?",
    opts: ["Kruvasan", "Madlen Keki (Madeleine)", "Makaron", "Baget Ekmeği"],
    correct: 1,
    exp: "Ihlamur çayına batırılan madlen keki (La madeleine de Proust), çocukluk anılarını birdenbire canlandırır."
  },
  {
    cat: "Bilim & Enerji",
    q: "4. Fransa elektriğinin yaklaşık %70'ini üreten nükleer dönüşüm hamlesi hangi planla başlatılmıştır?",
    opts: ["Monnet Planı", "Messmer Planı (1973)", "De Gaulle Doktrini", "Yeşil Mutabakat"],
    correct: 1,
    exp: "1973 petrol krizinin ardından Başbakan Pierre Messmer tarafından 'Tout-nucléaire' planı başlatılmıştır."
  },
  {
    cat: "Yedinci Sanat (Sinema)",
    q: "5. 1950'lerin sonunda Godard ve Truffaut öncülüğünde sinema kalıplarını yıkan Fransız akımı hangisidir?",
    opts: ["Nouvelle Vague (Yeni Dalga)", "Realizm", "Dadaizm", "Ekspresyonizm"],
    correct: 0,
    exp: "Nouvelle Vague, stüdyolardan sokağa taşan hafif kameralı auteur sinema akımıdır."
  },
  {
    cat: "Dil & Sosyoloji",
    q: "6. Fransız argosunda hecelerin yer değiştirmesiyle türetilen dil sistemine ne ad verilir?",
    opts: ["Argon", "Verlan (L'envers)", "Patois", "Esperanto"],
    correct: 1,
    exp: "Verlan (l'envers = tersine), fou->ouf, femme->meuf gibi heceleri ters yüz eden bir sistemdir."
  },
  {
    cat: "Teknoloji & Girişimcilik",
    q: "7. Dünyanın tek çatı altındaki en büyük girişimcilik ve kuluçka kampüsü Paris'teki hangi merkezdir?",
    opts: ["Station F", "Silicon Sentier", "Campus Tech", "Inria Lab"],
    correct: 0,
    exp: "Station F, 34.000 m² alanında 1000'den fazla startupa ev sahipliği yapan devasa kuluçka merkezidir."
  },
  {
    cat: "Diplomasi Tarihi",
    q: "8. Osmanlı-Fransız diplomatik ittifakının ilk resmi temeli 1536'da hangi iki lider arasında atılmıştır?",
    opts: ["Fatih Sultan Mehmet & XI. Louis", "Kanuni Sultan Süleyman & I. François", "Yavuz Sultan Selim & XIV. Louis", "II. Abdülhamid & Napoléon"],
    correct: 1,
    exp: "1536 yılında Kanuni Sultan Süleyman ve Fransa Kralı I. François stratejik bir ittifak tesis etmiştir."
  },
  {
    cat: "Gastronomi",
    q: "9. Fransa'nın gastronomi başkenti ve tarihi ipek dokuma merkezi kabul edilen şehir hangisidir?",
    opts: ["Bordeaux", "Marseille", "Lyon", "Strasbourg"],
    correct: 2,
    exp: "Lyon, 'Bouchon' lokantaları, Paul Bocuse mirası ve tarihi Canuts ipekçileriyle gastronominin başkentidir."
  },
  {
    cat: "Gençlik Politikaları",
    q: "10. Fransa'da 16-25 yaş arası gençlerin kamu yararına gönüllü çalışmasını sağlayan ulusal programın adı nedir?",
    opts: ["Erasmus+", "Service Civique", "Corps Européen", "MJC Jeunesse"],
    correct: 1,
    exp: "Service Civique, gençlerin 6-12 ay süreyle sivil kurumlarda kamu yararına görev almasını sağlar."
  },
  {
    cat: "Şehir & Şiir",
    q: "11. 'Kötülük Çiçekleri'nde kenti aylak bir gözlemci gibi adımlayan 'Flâneur' kavramını edebiyata kazandıran şair kimdir?",
    opts: ["Arthur Rimbaud", "Charles Baudelaire", "Paul Verlaine", "Stéphane Mallarmé"],
    correct: 1,
    exp: "Charles Baudelaire, modernitenin ve Paris sokaklarının avare gözlemcisini (Flâneur) estetikleştirmiştir."
  },
  {
    cat: "Müzik Mirası",
    q: "12. 1990'larda Daft Punk, Justice ve Air öncülüğünde doğan Fransız elektronik müzik akımı nasıl adlandırılır?",
    opts: ["French Touch", "Electro Chanson", "Paris Beat", "Wave Pop"],
    correct: 0,
    exp: "French Touch, disko sample'ları ve synthesizer'larla küresel dans müziğini yeniden tanımlamıştır."
  },
  {
    cat: "Kültür Kurumları",
    q: "13. Türkiye'de 1868 yılında Sultan Abdülaziz döneminde kurulan Fransızca tedrisatlı köklü eğitim kurumu hangisidir?",
    opts: ["Robert Kolej", "Galatasaray Mekteb-i Sultanîsi", "Saint Joseph", "Notre Dame de Sion"],
    correct: 1,
    exp: "Galatasaray Lisesi (Mekteb-i Sultanî), iki ülke arasındaki en köklü eğitim ve kültür köprüsüdür."
  },
  {
    cat: "Edebiyat & Felsefe",
    q: "14. 'Düşünüyorum, öyleyse varım' (Cogito ergo sum) rasyonalizmini ortaya koyan Fransız düşünür kimdir?",
    opts: ["Montaigne", "René Descartes", "Blaise Pascal", "Denis Diderot"],
    correct: 1,
    exp: "René Descartes, 1637 tarihli 'Yöntem Üzerine Konuşma' eserinde Kartezyen rasyonalizmin temelini atmıştır."
  },
  {
    cat: "Gastronomi & Terroir",
    q: "15. Mağaralarda olgunlaştırılan ve 'Peynirlerin Kralı' olarak anılan ünlü Fransız mavi peyniri hangisidir?",
    opts: ["Camembert", "Comté", "Roquefort", "Brie"],
    correct: 2,
    exp: "Roquefort, Combalou doğal kireçtaşı mağaralarında olgunlaştırılan eşsiz bir AOP koyun peyniridir."
  },
  {
    cat: "Havacılık & Sanayi",
    q: "16. Avrupa'nın ticari havacılık devi Airbus'ın genel merkezi ve nihai montaj hatları hangi Fransız şehrindedir?",
    opts: ["Nantes", "Lille", "Toulouse", "Nice"],
    correct: 2,
    exp: "Toulouse, Airbus ve Fransız Uzay Ajansı'nın (CNES) bulunduğu Avrupa havacılık başkentidir."
  },
  {
    cat: "Tiyatro & Absürd",
    q: "17. 'Godot'yu Beklerken' ve 'Kel Şarkıcı' ile temsil edilen 20. yüzyıl Paris tiyatro akımı hangisidir?",
    opts: ["Klasik Trajedi", "Absürd Tiyatro (Théâtre de l'Absurde)", "Bulvar Tiyatrosu", "Epik Tiyatro"],
    correct: 1,
    exp: "Samuel Beckett ve Eugène Ionesco, Paris sahnelerinde Absürd Tiyatro'nun başyapıtlarını vermiştir."
  },
  {
    cat: "Diplomatik Gelenek",
    q: "18. Osmanlı'da Lale Devri ıslahatlarına ilham veren 1720 tarihli Paris Sefâretnâmesi'nin yazarı kimdir?",
    opts: ["Evliya Çelebi", "Yirmisekiz Mehmed Çelebi", "Katip Çelebi", "Ebûbekir Râtıb Efendi"],
    correct: 1,
    exp: "Yirmisekiz Mehmed Çelebi'nin Paris Sefareti, ilk Türk matbaasının kurulmasına ve batılılaşmaya zemin hazırlamıştır."
  },
  {
    cat: "Kültürel Kutlamalar",
    q: "19. Her yıl 21 Haziran'da Fransa sokaklarında tüm müzisyenlerin ücretsiz çaldığı halk bayramının adı nedir?",
    opts: ["Fête de la Bastille", "Fête de la Musique", "Nuit Blanche", "Fête des Lumières"],
    correct: 1,
    exp: "1982'de başlatılan Fête de la Musique (Müzik Bayramı), bugün 120'den fazla ülkede kutlanmaktadır."
  },
  {
    cat: "Çevre & Şehircilik",
    q: "20. Paris'in kentsel dönüşümünde her ihtiyaca yürüyerek veya bisikletle 15 dakikada ulaşmayı hedefleyen vizyon nedir?",
    opts: ["La Ville du quart d'heure (15 Dakikalık Şehir)", "Green Metropolis", "Eco-Paris 2030", "Smart City"],
    correct: 0,
    exp: "Carlos Moreno tarafından geliştirilen '15 Dakikalık Şehir' modeli, sürdürülebilir kent yaşamının öncüsüdür."
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
  const progressPercent = ((currentQuizIndex + 1) / quizQuestions.length) * 100;
  document.getElementById('quizBarFill').style.width = `${progressPercent}%`;
  document.getElementById('quizScore').innerText = `Skor: ${userScore} Puan`;
  document.getElementById('quizCatTag').innerText = `Kategori: ${qData.cat}`;
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
    userScore += 5; // 20 questions * 5 = 100 max points
    playTone(700, 'triangle', 0.15);
    buttons[selectedIndex].classList.add('correct');
    feedback.className = 'quiz-feedback show correct-fb';
    feedback.innerHTML = `<strong>Tebrikler, Doğru! 🎉</strong> ${qData.exp}`;
  } else {
    playTone(220, 'sawtooth', 0.2);
    buttons[selectedIndex].classList.add('wrong');
    buttons[qData.correct].classList.add('correct');
    feedback.className = 'quiz-feedback show wrong-fb';
    feedback.innerHTML = `<strong>Yanlış Cevap. 💡</strong> ${qData.exp}`;
  }

  document.getElementById('quizScore').innerText = `Skor: ${userScore} Puan`;
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

  let badge = "";
  let message = "";

  if (userScore >= 90) {
    badge = "🎖️ Grand Diplomate & Membre d'Honneur";
    message = "Muazzam bir başarı! Fransız tarihi, felsefesi, diplomasisi ve kültürüne tam anlamıyla hâkimsiniz. Gençlik delegasyonunun onur üyesisiniz! 🇫🇷🇹🇷";
  } else if (userScore >= 70) {
    badge = "🎨 Flâneur de Paris & Philosophe";
    message = "Harika skor! İki ülke arasındaki kültürel ve entelektüel bağları çok iyi biliyorsunuz. Tebrikler! 📚";
  } else if (userScore >= 50) {
    badge = "🥖 Curieux Voyageur (Meraklı Gezgin)";
    message = "Güzel bir temel! Atlas dosyalarını ve edebiyat bölümlerini inceleyerek skorunuzu zirveye taşıyabilirsiniz. ✨";
  } else {
    badge = "🌱 Découvreur Débutant (Genç Kâşif)";
    message = "Araştırma atlasındaki zengin belgeleri okuyup testi tekrar çözerek bilginizi hızla geliştirebilirsiniz! 🚀";
  }

  resultDiv.innerHTML = `
    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🏆</div>
    <div style="font-size: 1.1rem; font-weight:800; color:var(--accent); text-transform:uppercase; margin-bottom:0.5rem;">${badge}</div>
    <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem;">Test Tamamlandı!</h3>
    <p style="font-size: 2.8rem; font-weight:800; color:var(--primary); margin: 1rem 0;">${userScore} / 100 Puan</p>
    <p style="font-size: 1.05rem; color:var(--text-muted); max-width: 600px; margin: 0 auto 2rem auto;">${message}</p>
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

// ==========================================================================
// 12. ATLAS MODAL CONTENT
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
        <li><strong>Empresyonizm:</strong> Claude Monet ışığı, Manet ve Degas'nın modern kent resimleri.</li>
      </ul>
      <p><small>Detaylı dosya: <code>france-atlas/arts-literature.md</code></small></p>
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
      <p><small>Detaylı dosya: <code>france-atlas/science-industry.md</code></small></p>
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
      <p><small>Detaylı dosya: <code>france-atlas/everyday-culture.md</code></small></p>
    `
  },
  diplomacy: {
    badge: "İkili İlişkiler (500 Yıl)",
    title: "Türkiye - Fransa Tarihi Bağı ve 2026 Vizyonu",
    content: `
      <p>1536'dan bu yana süregelen ittifaklar, kültürel etkileşimler ve gençlik diplomasisi köprüleri.</p>
      <h4>İlişkilerin Omurgası:</h4>
      <ul>
        <li><strong>Tarihsel İttifak:</strong> Kanuni Sultan Süleyman ve I. François'nın başlattığı diplomatik temaslar.</li>
        <li><strong>Yirmisekiz Mehmed Çelebi:</strong> 1720 Paris Sefareti ve Lale Devri yenilikleri.</li>
        <li><strong>Tanzimat & Edebiyat:</strong> Şinasi, Namık Kemal, Tevfik Fikret ve Yahya Kemal'in Paris yılları.</li>
        <li><strong>Galatasaray Geleneği:</strong> 1868'den bu yana Türkiye'deki köklü Frankofon eğitim köprüsü.</li>
      </ul>
      <p><small>Detaylı dosya: <code>france-atlas/franco-turkish-relations.md</code></small></p>
    `
  },
  poetry: {
    badge: "Şiir & Lirizm",
    title: "Büyük Fransız Şiiri Antolojisi",
    content: `
      <p>Baudelaire'in melankolisinden Rimbaud'nun renklerine ve Paul Éluard'ın Direniş marşına Fransız şiiri.</p>
      <h4>Öne Çıkan Şairler & Şiirler:</h4>
      <ul>
        <li><strong>Charles Baudelaire:</strong> <em>L'Albatros</em> ve <em>L'Invitation au voyage</em>.</li>
        <li><strong>Arthur Rimbaud:</strong> <em>Voyelles</em> ve <em>Le Bateau ivre</em>.</li>
        <li><strong>Paul Verlaine:</strong> <em>Chanson d'automne</em> ve saf müzikalite.</li>
        <li><strong>Paul Éluard:</strong> Nazi işgaline karşı gökten atılan <em>Liberté</em> marşı.</li>
        <li><strong>Jacques Prévert:</strong> <em>Les Feuilles mortes</em> ve sokakların lirik dili.</li>
      </ul>
      <p><small>Detaylı dosya: <code>france-atlas/french-poetry-anthology.md</code></small></p>
    `
  },
  gastronomy: {
    badge: "Gastronomi & Terroir",
    title: "Fransız Mutfağı, Peynirler ve Bağcılık",
    content: `
      <p>UNESCO Somut Olmayan Mirası Fransız Gastronomi Yemeği ve terroir felsefesi.</p>
      <h4>Mutfak Mirası:</h4>
      <ul>
        <li><strong>1200+ Peynir:</strong> Comté AOP, Roquefort, Camembert, Reblochon ve Sainte-Maure.</li>
        <li><strong>Şarap Bölgeleri:</strong> Bordeaux, Bourgogne (Climats), Champagne ve Rhône.</li>
        <li><strong>Boulangerie:</strong> Katkısız geleneksel Fransız bageti ve çıtır kruvasanlar.</li>
        <li><strong>Paul Bocuse & Michelin:</strong> Lyon gastronomi başkenti ve Bocuse d'Or yarışması.</li>
      </ul>
      <p><small>Detaylı dosya: <code>france-atlas/gastronomy-terroir-guide.md</code></small></p>
    `
  },
  cinema: {
    badge: "Sinema & Tiyatro",
    title: "Yedinci Sanat, Tiyatro ve Absürd",
    content: `
      <p>Lumière kardeşlerden Nouvelle Vague auteur sinemasına ve modern festivallere.</p>
      <h4>Sanat Dalları:</h4>
      <ul>
        <li><strong>Sinema (Nouvelle Vague):</strong> Jean-Luc Godard, François Truffaut ve Agnès Varda.</li>
        <li><strong>Tiyatro:</strong> Comédie-Française ve Samuel Beckett / Eugène Ionesco'nun Absürd Tiyatrosu.</li>
        <li><strong>Cannes Film Festivali:</strong> Dünya sinemasının en prestijli buluşması (Palme d'Or).</li>
        <li><strong>Avignon Festivali:</strong> Her yaz Papalar Sarayı'nda dünyanın en büyük tiyatro buluşması.</li>
      </ul>
      <p><small>Detaylı dosya: <code>france-atlas/cinema-theatre-music.md</code></small></p>
    `
  },
  music: {
    badge: "Müzik Mirası",
    title: "Barok'tan Chanson ve French Touch'a",
    content: `
      <p>Versailles operalarından Debussy'nin empresyonizmine ve Daft Punk'a Fransız tınıları.</p>
      <h4>Müzikal Evreler:</h4>
      <ul>
        <li><strong>Barok & Klasik:</strong> Jean-Baptiste Lully, Jean-Philippe Rameau ve Hector Berlioz.</li>
        <li><strong>Empresyonizm:</strong> Claude Debussy (<em>Clair de lune</em>) ve Maurice Ravel (<em>Boléro</em>).</li>
        <li><strong>La Chanson Française:</strong> Édith Piaf, Jacques Brel, Georges Brassens ve Charles Aznavour.</li>
        <li><strong>French Touch:</strong> Daft Punk, Justice, Air ve küresel elektronik dans müziği.</li>
      </ul>
      <p><small>Detaylı dosya: <code>france-atlas/music-sound-traditions.md</code></small></p>
    `
  },
  flaneur: {
    badge: "Şehir Felsefesi",
    title: "Paris'te Flâneur Olmak ve Edebi Rotalar",
    content: `
      <p>Baudelaire ve Walter Benjamin'in aylak kent gözlemcisi (Flâneur) felsefesi.</p>
      <h4>Edebi Duraklar:</h4>
      <ul>
        <li><strong>Saint-Germain-des-Prés:</strong> Café de Flore, Les Deux Magots ve Sartre-Beauvoir masaları.</li>
        <li><strong>Quartier Latin & Panthéon:</strong> Sorbonne, Shakespeare & Company ve Fransız aydınları panteonu.</li>
        <li><strong>Montmartre:</strong> Picasso'nun Bateau-Lavoir atölyesi ve bohem sanatçı kabareleri.</li>
        <li><strong>Seine Bouquinistes:</strong> 16. yüzyıldan bu yana nehir kenarındaki tarihi yeşil sahaf kutuları.</li>
      </ul>
      <p><small>Detaylı dosya: <code>france-atlas/paris-flaneur-guide.md</code></small></p>
    `
  },
  actionplan: {
    badge: "Ortak Politika Belgesi",
    title: "2026-2027 İkili Gençlik Eylem Planı",
    content: `
      <p>Türkiye ve Fransa gençlik heyetlerinin ortaklaşa hazırladığı 5 maddelik stratejik yol haritası.</p>
      <h4>Eylem Planı Maddeleri:</h4>
      <ul>
        <li><strong>Kardeş Gençlik Merkezleri:</strong> Türkiye'deki GSB Gençlik Merkezleri ile Fransa'daki MJC'ler arasında eşleştirme.</li>
        <li><strong>İklim ve Yeşil İnovasyon Hackathonları:</strong> Sürdürülebilir kentler için genç yazılımcı ve tasarımcı buluşmaları.</li>
        <li><strong>Çift Dilli Gençlik Medyası:</strong> Türk ve Fransız gençlerin hazırlayacağı kültürel podcast ve video serileri.</li>
        <li><strong>Karşılıklı Gönüllülük Stajları:</strong> GSB Genç Gönüllüler ile Fransa Service Civique arasında kontenjan değişimi.</li>
      </ul>
      <p><small>Detaylı dosya: <code>presentations/youth-action-plan-2026.md</code></small></p>
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
  playTone(480, 'sine', 0.08);
}

function closeAtlasModal(e) {
  document.getElementById('atlasModal').classList.remove('active');
}

// ==========================================================================
// 13. INITIAL INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderQuotes(quotesData);
  loadPoem('albatros');
  renderRegions(regionsData);
  renderCheeses(cheeseData);
  updateFlashcard();
  renderVocabTable(vocabData);
  renderFlaneurRoutes();
  renderQuizQuestion();
});
