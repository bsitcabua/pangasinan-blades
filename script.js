/* ============================================================
   HERO IMAGE SLIDESHOW — assets/images/header/
   ============================================================
   Put your hero images inside:  assets/images/header/
   Then list the filenames below (in the order you want them
   to appear). Any common web image format works (.jpg, .png,
   .webp, etc). Add or remove lines as needed — 2 or more images
   will crossfade automatically; 1 image just displays statically.
   ============================================================ */
const HERO_SLIDES = [
  {
    image: 'assets/images/header/regular_ginunting.png',
    name: 'Regular Ginunting',
    description: 'A traditional Filipino utility and fighting blade known for its balanced curved profile.'
  },
  {
    image: 'assets/images/header/tactical_ginunting.png',
    name: 'Tactical Ginunting',
    description: 'A modern interpretation of the classic Ginunting, built for outdoor, tactical, and field use.'
  },
  {
    image: 'assets/images/header/modern_andres_bolo.png',
    name: 'Modern Andres Bolo',
    description: 'A contemporary bolo designed for powerful cutting, bushcraft, and everyday utility.'
  },
  {
    image: 'assets/images/header/military_bolo.png',
    name: 'Military Bolo',
    description: 'Inspired by service blades used for survival, clearing vegetation, and field work.'
  },
  {
    image: 'assets/images/header/itak_tagalog.png',
    name: 'Itak Tagalog',
    description: 'A classic Tagalog blade valued for its versatility in farming, utility, and traditional use.'
  },
  {
    image: 'assets/images/header/itak_tinegre.png',
    name: 'Itak Tinegre',
    description: 'A robust Filipino blade featuring a distinctive profile for powerful chopping performance.'
  },
  {
    image: 'assets/images/header/garab.png',
    name: 'Garab',
    description: 'A traditional harvesting blade with a curved edge designed for efficient cutting.'
  },
  {
    image: 'assets/images/header/dahon_palay.png',
    name: 'Dahon Palay',
    description: 'Named after the shape of a rice leaf, featuring an elegant profile and excellent balance.'
  },
  {
    image: 'assets/images/header/gayang.png',
    name: 'Gayang',
    description: 'A long, graceful Filipino blade crafted for both traditional heritage and practical use.'
  },
  {
    image: 'assets/images/header/barong.png',
    name: 'Barong',
    description: 'A leaf-shaped blade traditionally associated with the Moro peoples of the southern Philippines.'
  }
];

const HERO_SLIDESHOW_INTERVAL = 6000;

(function initHeroSlideshow() {
  const container = document.getElementById('heroSlideshow');
  const bladeName = document.getElementById('heroBladeName');

  if (!container || !bladeName || !HERO_SLIDES.length) return;

  HERO_SLIDES.forEach((item, i) => {
    const slide = document.createElement('div');

    slide.className = 'hero-slide' + (i === 0 ? ' active' : '');
    slide.style.backgroundImage = `url('${item.image}')`;

    container.insertBefore(slide, bladeName);
  });

  const slides = container.querySelectorAll('.hero-slide');
  const bladeTitle = bladeName.querySelector('strong');
  const bladeDescription = document.getElementById('heroBladeDescription');

  function updateHeroSlideText(slide) {
    if (bladeTitle) bladeTitle.textContent = slide.name || '';

    if (!bladeDescription) return;
    const description = slide.description?.trim() || '';
    bladeDescription.textContent = description;
    bladeDescription.hidden = !description;
  }

  updateHeroSlideText(HERO_SLIDES[0]);

  if (slides.length < 2) return;

  let current = 0;

  setInterval(() => {
    const next = (current + 1) % slides.length;

    slides[current].classList.remove('active');
    slides[next].classList.add('active');

    bladeName.classList.add('changing');

    setTimeout(() => {
      updateHeroSlideText(HERO_SLIDES[next]);

      bladeName.classList.remove('changing');
    }, 250);

    current = next;
  }, HERO_SLIDESHOW_INTERVAL);
})();


const COMPLETE_COLLECTION = [
   {
      "id":1,
      "slug":"itak-tagalog",
      "image":"assets/images/collection/itak_series/itak_tagalog.png",
      "name":"Itak Tagalog",
      "category":"itak",
      "series":"Itak Series",
      "featured":true,
      "status":"ready-stock",
      "details":{
         "bladeLength":"16 in",
         "steel":"5160 Carbon Steel",
         "handle":"Kamagong",
         "sheath":"Mahogany",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":2,
      "slug":"pinuti",
      "image":"assets/images/collection/itak_series/pinuti.png",
      "name":"Pinuti",
      "category":"itak",
      "series":"Itak Series",
      "featured":true,
      "status":"made-to-order",
      "details":{
         "bladeLength":"14 in",
         "steel":"5160 Carbon Steel",
         "handle":"Kamagong",
         "sheath":"Mahogany",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":3,
      "slug":"itak-tinegre",
      "image":"assets/images/collection/itak_series/itak_tinegre.png",
      "name":"Itak Tinegre",
      "category":"itak",
      "series":"Itak Series",
      "featured":true,
      "status":"made-to-order",
      "details":{
         "bladeLength":"18 in",
         "steel":"5160 Carbon Steel",
         "handle":"Kamagong",
         "sheath":"Mahogany",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":4,
      "slug":"talunasan",
      "image":"assets/images/collection/itak_series/talunasan.png",
      "name":"Talunasan",
      "category":"itak",
      "series":"Itak Series",
      "featured":false,
      "status":"made-to-order",
      "details":{
         "bladeLength":"16 in",
         "steel":"5160 Carbon Steel",
         "handle":"Mahogany",
         "sheath":"Mahogany",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":5,
      "slug":"military-bolo",
      "image":"assets/images/collection/bolo_series/fulltang_military_bolo.png",
      "name":"Military Bolo",
      "category":"bolo",
      "series":"Bolo Series",
      "featured":true,
      "status":"ready-stock",
      "details":{
         "bladeLength":"18 in",
         "steel":"5160 Carbon Steel",
         "handle":"Kamagong",
         "sheath":"Leather Sheath",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":6,
      "slug":"modern-ab-bolo",
      "image":"assets/images/collection/bolo_series/modern_andres_bolo.png",
      "name":"Modern Andres Bolo",
      "category":"bolo",
      "series":"Bolo Series",
      "featured":true,
      "status":"made-to-order",
      "details":{
         "bladeLength":"18 in",
         "steel":"5160 Carbon Steel",
         "handle":"Mahogany",
         "sheath":"Mahogany",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":7,
      "slug":"ilocano-bolo",
      "image":"assets/images/collection/bolo_series/ilocano_bolo.png",
      "name":"Ilocano Bolo",
      "category":"bolo",
      "series":"Bolo Series",
      "featured":true,
      "status":"made-to-order",
      "details":{
         "bladeLength":"17 in",
         "steel":"5160 Carbon Steel",
         "handle":"Chico Wood",
         "sheath":"Mahogany",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":8,
      "slug":"dahon-palay",
      "image":"assets/images/collection/bolo_series/dahon_palay.png",
      "name":"Dahon Palay",
      "category":"bolo",
      "series":"Bolo Series",
      "featured":false,
      "status":"made-to-order",
      "details":{
         "bladeLength":"16 in",
         "steel":"5160 Carbon Steel",
         "handle":"Mahogany",
         "sheath":"Mahogany",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":9,
      "slug":"jungle-cleaver-bolo",
      "image":"assets/images/collection/bolo_series/jungle_cleaver_bolo.png",
      "name":"Jungle Cleaver Bolo",
      "category":"bolo",
      "series":"Bolo Series",
      "featured":false,
      "status":"made-to-order",
      "details":{
         "bladeLength":"14 in",
         "steel":"5160 Carbon Steel",
         "handle":"Kamagong",
         "sheath":"Leather Sheath",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":10,
      "slug":"cleaver-bolo",
      "image":"assets/images/collection/bolo_series/cleaver_bolo.png",
      "name":"Cleaver Bolo",
      "category":"bolo",
      "series":"Bolo Series",
      "featured":false,
      "status":"made-to-order",
      "details":{
         "bladeLength":"13 in",
         "steel":"5160 Carbon Steel",
         "handle":"Mahogany",
         "sheath":"Leather Sheath",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":11,
      "slug":"garab",
      "image":"assets/images/collection/bolo_series/garab.png",
      "name":"Garab",
      "category":"bolo",
      "series":"Bolo Series",
      "featured":false,
      "status":"made-to-order",
      "details":{
         "bladeLength":"15 in",
         "steel":"5160 Carbon Steel",
         "handle":"Chico Wood",
         "sheath":"Mahogany",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":12,
      "slug":"barung",
      "image":"assets/images/collection/moro_series/barung.png",
      "name":"Barung",
      "category":"moro",
      "series":"Moro Series",
      "featured":true,
      "status":"made-to-order",
      "details":{
         "bladeLength":"18 in",
         "steel":"5160 Carbon Steel",
         "handle":"Kamagong",
         "sheath":"Kamagong",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":13,
      "slug":"kris",
      "image":"assets/images/collection/moro_series/kris.png",
      "name":"Kris",
      "category":"moro",
      "series":"Moro Series",
      "featured":true,
      "status":"made-to-order",
      "details":{
         "bladeLength":"22 in",
         "steel":"5160 Carbon Steel",
         "handle":"Kamagong",
         "sheath":"Kamagong",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":14,
      "slug":"kampilan",
      "image":"assets/images/collection/moro_series/kampilan.png",
      "name":"Kampilan",
      "category":"moro",
      "series":"Moro Series",
      "featured":true,
      "status":"made-to-order",
      "details":{
         "bladeLength":"28 in",
         "steel":"5160 Carbon Steel",
         "handle":"Kamagong",
         "sheath":"Mahogany",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":15,
      "slug":"panabas",
      "image":"assets/images/collection/moro_series/panabas.png",
      "name":"Panabas",
      "category":"moro",
      "series":"Moro Series",
      "featured":false,
      "status":"made-to-order",
      "details":{
         "bladeLength":"24 in",
         "steel":"5160 Carbon Steel",
         "handle":"Kamagong",
         "sheath":"Kamagong",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":16,
      "slug":"traditional-panabas",
      "image":"assets/images/collection/moro_series/traditional_panabas.png",
      "name":"Traditional Panabas",
      "category":"moro",
      "series":"Moro Series",
      "featured":false,
      "status":"made-to-order",
      "details":{
         "bladeLength":"26 in",
         "steel":"5160 Carbon Steel",
         "handle":"Kamagong",
         "sheath":"Kamagong",
         "hardness":"57-60 HRC"
      }
   },
   {
      "id":17,
      "slug":"gayang",
      "image":"assets/images/collection/moro_series/gayang.png",
      "name":"Gayang",
      "category":"moro",
      "series":"Moro Series",
      "featured":false,
      "status":"made-to-order",
      "details":{
         "bladeLength":"16 in",
         "steel":"5160 Carbon Steel",
         "handle":"Kamagong",
         "sheath":"Leather Sheath",
         "hardness":"57-60 HRC"
      }
   },
{

  "id": 18,

  "slug": "regular-ginunting",

  "image": "assets/images/collection/combat_series/regular_ginunting.png",

  "name": "Regular Ginunting",

  "category": "combat",

  "series": "Combat Series",

  "featured": true,

  "status": "made-to-order",

  "details": {

    "bladeLength": "16 in",

    "steel": "5160 Carbon Steel",

    "handle": "Kamagong",

    "sheath": "Leather Sheath",

    "hardness": "57-60 HRC"

  }

},

{

  "id": 19,

  "slug": "modern-talibong",

  "image": "assets/images/collection/combat_series/modern_talibong.png",

  "name": "Modern Talibong",

  "category": "combat",

  "series": "Combat Series",

  "featured": false,

  "status": "made-to-order",

  "details": {

    "bladeLength": "18 in",

    "steel": "5160 Carbon Steel",

    "handle": "Kamagong",

    "sheath": "Leather Sheath",

    "hardness": "57-60 HRC"

  }

},

{

  "id": 20,

  "slug": "all-purpose-tactical-ginunting",

  "image": "assets/images/collection/combat_series/all_purpose_tactical_ginunting_blade_profile.png",

  "name": "All Purpose Tactical Ginunting",

  "category": "combat",

  "series": "Combat Series",

  "featured": false,

  "status": "made-to-order",

  "details": {

    "bladeLength": "15 in",

    "steel": "5160 Carbon Steel",

    "handle": "Chico Wood",

    "sheath": "Leather Sheath",

    "hardness": "57-60 HRC"

  }

},

{

  "id": 21,

  "slug": "tactical-ginunting",

  "image": "assets/images/collection/combat_series/tactical_ginunting.png",

  "name": "Tactical Ginunting",

  "category": "combat",

  "series": "Combat Series",

  "featured": true,

  "status": "made-to-order",

  "details": {

    "bladeLength": "16 in",

    "steel": "5160 Carbon Steel",

    "handle": "Kamagong",

    "sheath": "Leather Sheath",

    "hardness": "57-60 HRC"

  }

},

{

  "id": 22,

  "slug": "talibong",

  "image": "assets/images/collection/combat_series/talibong.png",

  "name": "Talibong",

  "category": "combat",

  "series": "Combat Series",

  "featured": true,

  "status": "made-to-order",

  "details": {

    "bladeLength": "19 in",

    "steel": "5160 Carbon Steel",

    "handle": "Kamagong",

    "sheath": "Leather Sheath",

    "hardness": "57-60 HRC"

  }

},

{ 

  "id":23,

  "slug":"bushcraft",

  "image":"assets/images/collection/outdoor_series/bushcraft.png",

  "name":"Bushcraft",

  "category":"outdoor",

  "series":"Outdoor Series",

  "featured":false,

  "status":"made-to-order",

  "details":{

    "bladeLength":"10 in",

    "steel":"5160 Carbon Steel",

    "handle":"Chico Wood",

    "sheath":"Leather Sheath",

    "hardness":"57-60 HRC"

  }

},

{

  "id":24,

  "slug":"hunting",

  "image":"assets/images/collection/outdoor_series/hunting_knife.png",

  "name":"Hunting",

  "category":"outdoor",

  "series":"Outdoor Series",

  "featured":false,

  "status":"made-to-order",

  "details":{

    "bladeLength":"12 in",

    "steel":"5160 Carbon Steel",

    "handle":"Kamagong",

    "sheath":"Leather Sheath",

    "hardness":"57-60 HRC"

  }

},

{

  "id":25,

  "slug":"karanto",

  "image":"assets/images/collection/outdoor_series/karanto.png",

  "name":"Karanto",

  "category":"outdoor",

  "series":"Outdoor Series",

  "featured":false,

  "status":"made-to-order",

  "details":{

    "bladeLength":"12 in",

    "steel":"5160 Carbon Steel",

    "handle":"Mahogany",

    "sheath":"Leather Sheath",

    "hardness":"57-60 HRC"

  }

},

{

  "id":26,

  "slug":"karambit-big",

  "image":"assets/images/collection/outdoor_series/karambit_big.png",

  "name":"Karambit Big",

  "category":"outdoor",

  "series":"Outdoor Series",

  "featured":false,

  "status":"made-to-order",

  "details":{

    "bladeLength":"8 in",

    "steel":"5160 Carbon Steel",

    "handle":"Kamagong",

    "sheath":"Leather Sheath",

    "hardness":"57-60 HRC"

  }

},

{

  "id":27,

  "slug":"karambit-small",

  "image":"assets/images/collection/outdoor_series/karambit_small.png",

  "name":"Karambit Small",

  "category":"outdoor",

  "series":"Outdoor Series",

  "featured":false,

  "status":"made-to-order",

  "details":{

    "bladeLength":"6 in",

    "steel":"5160 Carbon Steel",

    "handle":"Kamagong",

    "sheath":"Leather Sheath",

    "hardness":"57-60 HRC"

  }

},

{

  "id":28,

  "slug":"katana",

  "image":"assets/images/collection/international_series/katana.png",

  "name":"Katana",

  "category":"international",

  "series":"International Series",

  "featured":false,

  "status":"made-to-order",

  "details":{

    "bladeLength":"28 in",

    "steel":"5160 Carbon Steel",

    "handle":"Kamagong",

    "sheath":"Mahogany",

    "hardness":"57-60 HRC"

  }

},

{

  "id":29,

  "slug":"shirasaya",

  "image":"assets/images/collection/international_series/shirasaya_katana.png",

  "name":"Shirasaya",

  "category":"international",

  "series":"International Series",

  "featured":false,

  "status":"made-to-order",

  "details":{

    "bladeLength":"27 in",

    "steel":"5160 Carbon Steel",

    "handle":"Mahogany",

    "sheath":"Mahogany",

    "hardness":"57-60 HRC"

  }

},

{

  "id":30,

  "slug":"khukri",

  "image":"assets/images/collection/international_series/khukri.png",

  "name":"Khukri",

  "category":"international",

  "series":"International Series",

  "featured":false,

  "status":"made-to-order",

  "details":{

    "bladeLength":"12 in",

    "steel":"5160 Carbon Steel",

    "handle":"Kamagong",

    "sheath":"Leather Sheath",

    "hardness":"57-60 HRC"

  }

},

{

  "id":31,

  "slug":"gladius",

  "image":"assets/images/collection/international_series/gladius.png",

  "name":"Gladius",

  "category":"international",

  "series":"International Series",

  "featured":false,

  "status":"made-to-order",

  "details":{

    "bladeLength":"20 in",

    "steel":"5160 Carbon Steel",

    "handle":"Mahogany",

    "sheath":"Leather Sheath",

    "hardness":"57-60 HRC"

  }

},

{

  "id":32,

  "slug":"jambiya",

  "image":"assets/images/collection/international_series/jambiya.png",

  "name":"Jambiya",

  "category":"international",

  "series":"International Series",

  "featured":false,

  "status":"made-to-order",

  "details":{

    "bladeLength":"10 in",

    "steel":"5160 Carbon Steel",

    "handle":"Kamagong",

    "sheath":"Leather Sheath",

    "hardness":"57-60 HRC"

  }

},

{

  "id":33,

  "slug":"serbian-chefs-knife",

  "image":"assets/images/collection/kitchen_series/almazan.png",

  "name":"Serbian Chef Knife / Almazan",

  "category":"kitchen",

  "series":"Kitchen Series",

  "featured":true,

  "status":"made-to-order",

  "details":{

    "bladeLength":"8 in",

    "steel":"5160 Carbon Steel",

    "handle":"Mahogany",

    "sheath":"Leather Sheath",

    "hardness":"57-60 HRC"

  }

},

{

  "id":34,

  "slug":"standard-chefs-knife",

  "image":"assets/images/collection/kitchen_series/gyuto.png",

  "name":"Standard Chef Knife / Gyuto",

  "category":"kitchen",

  "series":"Kitchen Series",

  "featured":true,

  "status":"made-to-order",

  "details":{

    "bladeLength":"8 in",

    "steel":"304 Stainless Steel",

    "handle":"Mahogany",

    "sheath":"Leather Sheath",

    "hardness":"15-20 HRC (approximately 70-90 HRB)"

  }

},

{

  "id":35,

  "slug":"santoku",

  "image":"assets/images/collection/kitchen_series/santoku.png",

  "name":"Santoku / Bunka Hybrid",

  "category":"kitchen",

  "series":"Kitchen Series",

  "featured":false,

  "status":"made-to-order",

  "details":{

    "bladeLength":"7 in",

    "steel":"304 Stainless Steel",

    "handle":"Mahogany",

    "sheath":"Leather Sheath",

    "hardness":"15-20 HRC (approximately 70-90 HRB)"

  }

},

{

  "id":36,

  "slug":"sujihiki",

  "image":"assets/images/collection/kitchen_series/sujihiki.png",

  "name":"Sujihiki / Carving Knife",

  "category":"kitchen",

  "series":"Kitchen Series",

  "featured":false,

  "status":"made-to-order",

  "details":{

    "bladeLength":"10 in",

    "steel":"304 Stainless Steel",

    "handle":"Mahogany",

    "sheath":"Leather Sheath",

    "hardness":"15-20 HRC (approximately 70-90 HRB)"

  }

},

{

  "id":37,

  "slug":"yanagiba",

  "image":"assets/images/collection/kitchen_series/yanagiba.png",

  "name":"Yanagiba / Sashimi Knife",

  "category":"kitchen",

  "series":"Kitchen Series",

  "featured":true,

  "status":"made-to-order",

  "details":{

    "bladeLength":"10 in",

    "steel":"304 Stainless Steel",

    "handle":"Mahogany",

    "sheath":"Leather Sheath",

    "hardness":"15-20 HRC (approximately 70-90 HRB)"

  }

}
].map(makeCollectionBlade);

const CATALOG_PREVIEW = COMPLETE_COLLECTION.filter(blade => blade.featured);

function renderCatalogPreview() {
  const grid = document.getElementById('catalogGrid');
  const count = document.getElementById('filterCount');
  if (!grid) return;

  grid.innerHTML = '';
  CATALOG_PREVIEW.forEach((blade, index) => {
    const card = document.createElement('article');
    card.className = 'blade-card';
    card.setAttribute('data-category', blade.category);
    card.innerHTML = `
      <div class="blade-card-img">
        <div class="blade-card-img-inner">
          ${
            blade.image
              ? `<img src="${blade.image}" alt="${blade.name}" class="blade-card-image">`
              : `
                <div class="blade-svg-wrap">
                  <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
                    ${blade.svgPath}
                  </svg>
                </div>
              `
          }
        </div>
        <div class="blade-card-overlay">
          <button class="quick-btn" onclick="openQuickView('${blade.name}')">Quick View</button>
          <button class="quick-btn" onclick="scrollToContact('${blade.name}')">Inquire</button>
        </div>
      </div>
      <div class="blade-card-body">
        <span class="blade-badge">${blade.series}</span>
        <div class="product-status-row">${productStatusMarkup(blade)}</div>
        <h3 class="blade-name">${blade.name}</h3>
        <p class="blade-meta">${blade.length} · ${blade.material}</p>
        <div class="blade-footer">
          <span class="blade-price">Request a Quote</span>
          <div class="blade-arrow" aria-hidden="true">→</div>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  if (count) {
    count.textContent = `${CATALOG_PREVIEW.length} blades`;
  }
}

function makeCollectionBlade(product) {
  const { id, slug, image, name, category, series, featured, status, details } = product;
  return {
    id,
    slug,
    image,
    name,
    category,
    series,
    featured,
    material: details.steel,
    length: details.bladeLength,
    weight: 'Varies by final build',
    handle: details.handle,
    edge: 'Profile matched to intended use',
    hrc: details.hardness,
    sheath: details.sheath,
    price: 0,
    status,
    customizable: true,
    leadTime: status === 'ready-stock' ? 'Ships after availability is confirmed' : 'Lead time confirmed with your quote',
    badge: status === 'ready-stock' ? 'Ready Stock' : 'Made to Order',
    desc: `${name} is available as a made-to-order commission. Choose the materials, dimensions, and finishing details that best suit your intended use.`,
    bg: '#111111',
    gradColor: '#222222',
    svgPath: blankBladePlaceholder(name, series),
    details,
  };
}

function blankBladePlaceholder(name, series) {
  return `
    <rect width="300" height="200" fill="#111111"/>
    <radialGradient id="blank${name.replace(/[^a-z0-9]/gi, '')}" cx="50%" cy="48%" r="58%">
      <stop offset="0%" stop-color="#2E2E2E" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#080808" stop-opacity="0"/>
    </radialGradient>
    <rect width="300" height="200" fill="url(#blank${name.replace(/[^a-z0-9]/gi, '')})"/>
    <rect x="58" y="86" width="184" height="28" rx="14" fill="none" stroke="#7A5A22" stroke-width="1" opacity="0.75"/>
    <path d="M72 100 H228" stroke="#C8963C" stroke-width="1" opacity="0.5"/>
    <text x="150" y="132" text-anchor="middle" font-family="Georgia" font-size="13" fill="#F0EBE0" opacity="0.78">${name}</text>
    <text x="150" y="154" text-anchor="middle" font-family="Inter, Arial" font-size="8" fill="#C8963C" opacity="0.72" letter-spacing="2">${series.toUpperCase()}</text>`;
}

function formatBladePrice(blade) {
  return blade.price >= 1000 ? `₱${blade.price.toLocaleString()}` : 'Available Soon';
}

function productStatusMarkup(blade, className = 'product-status') {
  const ready = blade.status === 'ready-stock';
  return `<span class="${className} ${ready ? 'is-ready' : 'is-made'}"><i aria-hidden="true"></i>${ready ? 'Ready Stock' : 'Made to Order'}</span>${blade.customizable ? `<span class="${className} is-custom"><i aria-hidden="true"></i>Customizable</span>` : ''}`;
}

const BUILD_OPTIONS = {
  steel: ['5160 Carbon Steel', '304 Stainless Steel'],
  handle: ['Kamagong', 'Mahogany', 'Chico Wood', 'Carabao Horn', 'Buffalo Horn'],
  sheath: ['Mahogany', 'Chico Wood', 'Kamagong (Optional with additional cost)', 'Leather Sheath'],
};

const STEEL_HARDNESS = {
  '5160 Carbon Steel': '57-60 HRC',
  '304 Stainless Steel': '15-20 HRC (approximately 70-90 HRB)',
};

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getBladeDetails(blade) {
  return blade.details || {
    steel: blade.material,
    bladeLength: blade.length,
    hardness: blade.hrc,
    handle: blade.handle,
    sheath: blade.sheath,
  };
}

function buildOptionsMarkup(options, selectedValue) {
  const values = options.includes(selectedValue) ? options : [selectedValue, ...options];
  return values.map(value => `<option value="${escapeHtml(value)}"${value === selectedValue ? ' selected' : ''}>${escapeHtml(value)}</option>`).join('');
}

function quickBuildConfiguratorMarkup(blade) {
  const details = getBladeDetails(blade);
  const hardness = STEEL_HARDNESS[details.steel] || details.hardness;

  return `
    <div class="qd-configurator" data-blade-id="${blade.id}">
      <label class="qd-config-field">
        <span>Steel</span>
        <select class="qd-config-control" data-config-field="steel" onchange="updateQuickBuildHardness(${blade.id})">
          ${buildOptionsMarkup(BUILD_OPTIONS.steel, details.steel)}
        </select>
      </label>
      <label class="qd-config-field">
        <span>Blade Length</span>
        <input class="qd-config-control" data-config-field="bladeLength" type="text" value="${escapeHtml(details.bladeLength)}" placeholder="Example: 16 in">
      </label>
      <label class="qd-config-field">
        <span>Hardness</span>
        <output class="qd-config-control qd-config-output" data-config-field="hardness">${escapeHtml(hardness)}</output>
      </label>
      <label class="qd-config-field">
        <span>Handle</span>
        <select class="qd-config-control" data-config-field="handle">
          ${buildOptionsMarkup(BUILD_OPTIONS.handle, details.handle)}
        </select>
      </label>
      <label class="qd-config-field">
        <span>Sheath / Scabbard</span>
        <select class="qd-config-control" data-config-field="sheath">
          ${buildOptionsMarkup(BUILD_OPTIONS.sheath, details.sheath)}
        </select>
      </label>
      <div class="qd-quantity-field">
        <span>Quantity</span>
        <div class="qd-quantity-stepper">
          <button type="button" onclick="changeQuickBuildQuantity(${blade.id}, -1)" aria-label="Decrease quantity">-</button>
          <input class="qd-config-control" data-config-field="quantity" type="number" min="1" value="1" inputmode="numeric" onchange="setQuickBuildQuantity(${blade.id}, this.value)">
          <button type="button" onclick="changeQuickBuildQuantity(${blade.id}, 1)" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <p class="qd-config-note">Defaults are loaded from this blade. Change any field to request a custom build.</p>
    </div>`;
}

function setQuickBuildQuantity(bladeId, value) {
  const wrapper = document.querySelector(`.qd-configurator[data-blade-id="${bladeId}"]`);
  const quantityInput = wrapper?.querySelector('[data-config-field="quantity"]');
  if (!quantityInput) return;
  quantityInput.value = Math.max(1, Number(value) || 1);
}

function changeQuickBuildQuantity(bladeId, step) {
  const wrapper = document.querySelector(`.qd-configurator[data-blade-id="${bladeId}"]`);
  const quantityInput = wrapper?.querySelector('[data-config-field="quantity"]');
  if (!quantityInput) return;
  setQuickBuildQuantity(bladeId, (Number(quantityInput.value) || 1) + step);
}

function updateQuickBuildHardness(bladeId) {
  const wrapper = document.querySelector(`.qd-configurator[data-blade-id="${bladeId}"]`);
  if (!wrapper) return;

  const steel = wrapper.querySelector('[data-config-field="steel"]')?.value;
  const hardness = wrapper.querySelector('[data-config-field="hardness"]');
  if (hardness) hardness.textContent = STEEL_HARDNESS[steel] || 'Confirm with maker';
}

function getQuickBuildSelection(bladeId) {
  const wrapper = document.querySelector(`.qd-configurator[data-blade-id="${bladeId}"]`);
  if (!wrapper) return null;

  const readField = field => {
    const control = wrapper.querySelector(`[data-config-field="${field}"]`);
    return control ? control.value || control.textContent.trim() : '';
  };

  return {
    steel: readField('steel'),
    bladeLength: readField('bladeLength'),
    hardness: readField('hardness'),
    handle: readField('handle'),
    sheath: readField('sheath'),
    engraving: readField('engraving'),
    customization: readField('customization'),
    quantity: Math.max(1, Number(readField('quantity')) || 1),
  };
}

function inquireQuickBuild(bladeId) {
  const blade = COMPLETE_COLLECTION.find(b => String(b.id) === String(bladeId));
  const selection = getQuickBuildSelection(bladeId);
  const buildText = selection
    ? `Custom build request:\n${formatBuildDetails(selection, selection.quantity)}`
    : '';

  closeDrawer();
  closeFullCatalog();
  scrollToContact(blade?.name || '', buildText);
}

const INQUIRY_LIST_STORAGE_KEY = 'pangasinanBladesInquiryList';
let inquiryList = [];
let pendingDuplicateItem = null;
let pendingDuplicateIndex = -1;

function formatBuildDetails(selection, quantity) {
  return [
    `Blade Length: ${selection.bladeLength}`,
    `Blade Material: ${selection.steel}`,
    `Hardness: ${selection.hardness}`,
    `Handle: ${selection.handle}`,
    `Scabbard: ${selection.sheath}`,
    selection.engraving ? `Engraving: ${selection.engraving}` : '',
    selection.customization ? `Customization: ${selection.customization}` : '',
    quantity ? `Quantity: ${quantity}` : '',
  ].filter(Boolean).join('\n');
}

function getInquiryListCount() {
  return inquiryList.reduce((total, item) => total + (Number(item.quantity) || 1), 0);
}

function normalizeSpecValue(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').toLowerCase();
}

function createInquiryItemKey(item) {
  const selection = item.selection || {};
  const keyParts = {
    name: item.name,
    steel: selection.steel,
    bladeLength: selection.bladeLength,
    hardness: selection.hardness,
    handle: selection.handle,
    sheath: selection.sheath,
    engraving: selection.engraving,
    customization: selection.customization,
    status: item.status,
  };
  return Object.entries(keyParts)
    .map(([key, value]) => `${key}:${normalizeSpecValue(value)}`)
    .join('|');
}

function refreshInquiryItemKeys() {
  inquiryList = inquiryList.map(item => ({
    ...item,
    key: item.key || createInquiryItemKey(item),
  }));
}

function saveInquiryList() {
  try {
    refreshInquiryItemKeys();
    localStorage.setItem(INQUIRY_LIST_STORAGE_KEY, JSON.stringify(inquiryList));
  } catch (error) {
    console.warn('Unable to save inquiry list:', error);
  }
}

function loadInquiryList() {
  try {
    const saved = localStorage.getItem(INQUIRY_LIST_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    inquiryList = Array.isArray(parsed)
      ? parsed
          .filter(item => item && item.id && item.name && item.selection)
          .map(item => ({
            ...item,
            quantity: Math.max(1, Number(item.quantity) || 1),
            key: item.key || createInquiryItemKey(item),
          }))
      : [];
  } catch (error) {
    inquiryList = [];
    localStorage.removeItem(INQUIRY_LIST_STORAGE_KEY);
  }

  updateInquiryBadge();
}

function updateInquiryBadge() {
  const count = getInquiryListCount();
  const badge = document.getElementById('inquiryListCount');
  const mobileBadge = document.getElementById('mobileInquiryListCount');
  const label = count ? String(count) : '';

  if (badge) {
    badge.textContent = label;
    badge.hidden = count === 0;
  }

  if (mobileBadge) {
    mobileBadge.textContent = label;
    mobileBadge.hidden = count === 0;
  }
}

function addCurrentBuildToInquiryList(bladeId) {
  const blade = COMPLETE_COLLECTION.find(b => String(b.id) === String(bladeId));
  const selection = getQuickBuildSelection(bladeId);
  if (!blade || !selection) return;

  const quantity = Math.max(1, Number(selection.quantity) || 1);
  delete selection.quantity;
  const item = {
    id: blade.id,
    name: blade.name,
    image: blade.image,
    series: blade.series || blade.category,
    status: blade.status,
    selection,
    quantity,
  };
  addInquiryItem(item);
}

function addInquiryItem(item) {
  const keyedItem = {
    ...item,
    quantity: Math.max(1, Number(item.quantity) || 1),
    key: item.key || createInquiryItemKey(item),
  };
  const existingIndex = inquiryList.findIndex(entry => (entry.key || createInquiryItemKey(entry)) === keyedItem.key);

  if (existingIndex >= 0) {
    showDuplicateInquiryConfirmation(keyedItem, existingIndex);
    return;
  }

  inquiryList.push(keyedItem);
  saveInquiryList();
  updateInquiryBadge();
  closeDrawer();
  openInquiryListModal();
}

function addCustomOrderToInquiryList(customOrder) {
  const selection = {
    steel: customOrder.steel || '',
    bladeLength: customOrder.bladeLength || '',
    hardness: customOrder.hardness || '',
    handle: customOrder.handle || '',
    sheath: customOrder.sheath || customOrder.scabbard || '',
    engraving: customOrder.engraving || '',
    customization: customOrder.customization || customOrder.notes || '',
  };

  addInquiryItem({
    id: customOrder.id || `custom-${Date.now()}`,
    name: customOrder.name || customOrder.bladeName || 'Custom Blade Order',
    image: customOrder.image || '',
    series: customOrder.series || 'Custom Order',
    status: customOrder.status || 'custom-order',
    selection,
    quantity: Math.max(1, Number(customOrder.quantity) || 1),
  });
}

function confirmDuplicateInquiryItem() {
  if (!pendingDuplicateItem || pendingDuplicateIndex < 0) return;

  inquiryList[pendingDuplicateIndex] = {
    ...inquiryList[pendingDuplicateIndex],
    quantity: (Number(inquiryList[pendingDuplicateIndex].quantity) || 1) + (Number(pendingDuplicateItem.quantity) || 1),
  };
  pendingDuplicateItem = null;
  pendingDuplicateIndex = -1;
  closeDuplicateInquiryModal();
  saveInquiryList();
  updateInquiryBadge();
  renderInquiryListModal();
  closeDrawer();
  openInquiryListModal();
}

function cancelDuplicateInquiryItem() {
  pendingDuplicateItem = null;
  pendingDuplicateIndex = -1;
  closeDuplicateInquiryModal();
}

function showDuplicateInquiryConfirmation(item, existingIndex) {
  pendingDuplicateItem = item;
  pendingDuplicateIndex = existingIndex;
  const existing = inquiryList[existingIndex];
  const modal = document.getElementById('duplicateInquiryModal');
  const body = document.getElementById('duplicateInquiryBody');

  if (!modal || !body) {
    if (confirm('An item with the same specifications is already in your Inquiry List. Would you like to add the selected quantity to the existing item?')) {
      confirmDuplicateInquiryItem();
    }
    return;
  }

  body.innerHTML = `
    <strong>${escapeHtml(item.name)}</strong>
    <span>Existing quantity: ${Number(existing.quantity) || 1}</span>
    <span>Selected quantity: ${Number(item.quantity) || 1}</span>
    <span>Updated quantity after continue: ${(Number(existing.quantity) || 1) + (Number(item.quantity) || 1)}</span>
  `;
  modal.classList.add('open');
}

function closeDuplicateInquiryModal() {
  document.getElementById('duplicateInquiryModal')?.classList.remove('open');
}

function removeInquiryItem(itemKey) {
  itemKey = decodeURIComponent(itemKey);
  inquiryList = inquiryList.filter(item => item.key !== itemKey);
  saveInquiryList();
  updateInquiryBadge();
  renderInquiryListModal();
}

function setInquiryItemQuantity(itemKey, quantity) {
  itemKey = decodeURIComponent(itemKey);
  const item = inquiryList.find(entry => entry.key === itemKey);
  if (!item) return;

  item.quantity = Math.max(1, Number(quantity) || 1);
  saveInquiryList();
  updateInquiryBadge();
  renderInquiryListModal();
}

function clearInquiryList() {
  inquiryList = [];
  pendingDuplicateItem = null;
  pendingDuplicateIndex = -1;
  saveInquiryList();
  updateInquiryBadge();
  renderInquiryListModal();
}

function inquiryListMessage() {
  return `Inquiry List\n\n${inquiryList.map(item => `${item.name}
${formatBuildDetails(item.selection, item.quantity)}`).join('\n\n')}`;
}

function sendInquiryList() {
  if (!inquiryList.length) return;

  const total = getInquiryListCount();
  const label = total === 1 ? inquiryList[0].name : `${total} selected blades`;
  closeInquiryListModal();
  closeDrawer();
  closeFullCatalog();
  scrollToContact(label, inquiryListMessage());
}

function setInquiryListNotice(message, type = 'success') {
  const notice = document.getElementById('inquiryListNotice');
  if (!notice) return;
  notice.textContent = message;
  notice.className = `inquiry-list-notice ${type}`;
  notice.hidden = false;
  window.clearTimeout(setInquiryListNotice.timer);
  setInquiryListNotice.timer = window.setTimeout(() => {
    notice.hidden = true;
  }, 3000);
}

function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  return copied;
}

async function copyInquiryList() {
  if (!inquiryList.length) return;

  const text = inquiryListMessage();
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else if (!fallbackCopyText(text)) {
      throw new Error('Fallback copy command failed');
    }
    setInquiryListNotice('Inquiry list copied to clipboard.', 'success');
  } catch (error) {
    setInquiryListNotice('Copy failed. Please try again.', 'error');
  }
}

function renderInquiryListModal() {
  const body = document.getElementById('inquiryListBody');
  const count = document.getElementById('inquiryListModalCount');
  const sendButton = document.getElementById('sendInquiryListBtn');
  const clearButton = document.getElementById('clearInquiryListBtn');
  const copyButton = document.getElementById('copyInquiryListBtn');
  if (!body) return;

  const total = getInquiryListCount();
  if (count) count.textContent = `${total} blade${total === 1 ? '' : 's'}`;
  if (sendButton) sendButton.disabled = inquiryList.length === 0;
  if (clearButton) clearButton.disabled = inquiryList.length === 0;
  if (copyButton) copyButton.disabled = inquiryList.length === 0;

  if (!inquiryList.length) {
    body.innerHTML = `
      <div class="inquiry-list-empty">
        <strong>No blades added yet.</strong>
        <span>Open a Quick View and add blades to build one inquiry list.</span>
      </div>`;
    return;
  }

  body.innerHTML = inquiryList.map((item, index) => `
  <article class="inquiry-list-item">

    <div class="inquiry-list-thumb">
      ${
        item.image
          ? `
            <img 
              src="${item.image}" 
              alt="${escapeHtml(item.name)}"
              class="inquiry-list-img">
          `
          : `
            <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
              <rect width="300" height="200" fill="${item.bg || '#111'}"/>
              <defs>
                <radialGradient id="inq${item.id}" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="${item.gradColor || '#777'}" stop-opacity=".8"/>
                  <stop offset="100%" stop-color="${item.bg || '#111'}"/>
                </radialGradient>
              </defs>

              <rect width="300" height="200" fill="url(#inq${item.id})"/>

              ${item.svgPath || ''}
            </svg>
          `
      }
    </div>


    <div class="inquiry-list-info">
      <span class="inquiry-list-series">
        ${escapeHtml(item.series)}
      </span>

      <h3>${escapeHtml(item.name)}</h3>

      <p>
        ${escapeHtml(formatBuildDetails(item.selection, item.quantity)).replace(/\n/g, '<br>')}
      </p>
      <label class="inquiry-list-qty">
        <span>Quantity</span>
        <input type="number" min="1" value="${item.quantity || 1}" onchange="setInquiryItemQuantity('${encodeURIComponent(item.key)}', this.value)">
      </label>
    </div>

    <button 
      type="button" 
      class="inquiry-list-remove"
      onclick="removeInquiryItem('${encodeURIComponent(item.key)}')">
      Remove
    </button>
  </article>
  ${index < inquiryList.length - 1 ? '<hr class="inquiry-list-divider">' : ''}
`).join('');
}

function openInquiryListModal() {
  renderInquiryListModal();
  const modal = document.getElementById('inquiryListModal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeInquiryListModal() {
  const modal = document.getElementById('inquiryListModal');
  if (!modal) return;
  modal.classList.remove('open');
  if (!isFullCatalogOpen() && document.getElementById('quickDrawer')?.style.transform !== 'translateX(0%)') {
    document.body.style.overflow = '';
  }
}

// A zero price is intentionally shown as a quote request, never as unavailable.
function formatBladePrice(blade) {
  return blade.price >= 1000 ? `PHP ${blade.price.toLocaleString()}` : 'Request a Quote';
}

/* ============================================================
   FULL CATALOG ENGINE
   ============================================================ */
let fcActiveFilter = 'all';
let fcActiveSort   = 'default';
let fcVisibleData  = [...COMPLETE_COLLECTION];

const FC_CATEGORIES = [
  { key:'all',    label:'All Series' },
  { key:'itak',   label:'Itak Series' },
  { key:'bolo',   label:'Bolo Series' },
  { key:'moro',   label:'Moro Series' },
  { key:'combat', label:'Combat Series' },
  { key:'outdoor', label:'Outdoor Series' },
  { key:'international', label:'International Series' },
  { key:'kitchen', label:'Kitchen Series' },
];

function buildFCFilters() {
  const bar = document.getElementById('fcFilters');
  bar.innerHTML = '';
  FC_CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className  = 'filter-pill' + (cat.key === fcActiveFilter ? ' active' : '');
    btn.textContent = cat.label;
    btn.onclick = () => { fcActiveFilter = cat.key; applyFCFilter(); };
    bar.appendChild(btn);
  });
}

function applyFCFilter() {
  buildFCFilters();
  fcVisibleData = fcActiveFilter === 'all'
    ? [...COMPLETE_COLLECTION]
    : COMPLETE_COLLECTION.filter(b => b.category === fcActiveFilter);
  applyFCSort(true);
}

function applyFCSort(skipRead) {
  if (!skipRead) fcActiveSort = document.getElementById('fcSort').value;
  const sorted = [...fcVisibleData];
  if (fcActiveSort === 'price-asc')  sorted.sort((a,b) => a.price - b.price);
  if (fcActiveSort === 'price-desc') sorted.sort((a,b) => b.price - a.price);
  if (fcActiveSort === 'name')       sorted.sort((a,b) => a.name.localeCompare(b.name));
  renderFCGrid(sorted);
}

function renderFCGrid(blades) {
  const grid  = document.getElementById('fcGrid');
  const empty = document.getElementById('fcEmpty');
  const count = document.getElementById('fcCount');
  const label = document.getElementById('fcCountLabel');

  grid.innerHTML = '';

  if (!blades.length) {
    empty.style.display = 'block';
    count.textContent   = '0 blades';
    label.textContent   = '0 blades';
    return;
  }
  empty.style.display = 'none';
  count.textContent   = `Showing ${blades.length} of ${COMPLETE_COLLECTION.length} blades`;
  label.textContent   = `${blades.length} blade${blades.length!==1?'s':''}`;

  blades.forEach((blade, idx) => {
    const card = document.createElement('div');
    card.className = 'fc-card';
    card.style.animationDelay = `${idx * 30}ms`;
    card.innerHTML = `
      <div class="fc-card-img">
        ${
          blade.image
            ? `<img src="${blade.image}" alt="${blade.name}" class="fc-card-image">`
            : `
              <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="200" fill="${blade.bg}"/>
                <defs>
                  <radialGradient id="fcg${blade.id}" cx="50%" cy="50%" r="48%">
                    <stop offset="0%" stop-color="${blade.gradColor}" stop-opacity=".7"/>
                    <stop offset="100%" stop-color="${blade.bg}"/>
                  </radialGradient>
                </defs>
                <rect width="300" height="200" fill="url(#fcg${blade.id})"/>
                ${blade.svgPath}
              </svg>
            `
        }
        <div class="fc-card-overlay">
          <button class="fc-qbtn" onclick="event.stopPropagation();openDrawer('${blade.id}')">Quick View</button>
          <button class="fc-qbtn" onclick="event.stopPropagation();closeFullCatalog();scrollToContact('${blade.name}')">Inquire</button>
        </div>
      </div>
      <div class="fc-card-body">
        <div class="product-status-row">${productStatusMarkup(blade, 'fc-status')}</div>
        <span class="fc-badge">${blade.series}</span>
        <h3 class="fc-name">${blade.name}</h3>
        <p class="fc-meta">${blade.material} · ${blade.length}</p>
        <div class="fc-foot">
          <span class="fc-price">${formatBladePrice(blade)}</span>
          <div class="fc-arr">→</div>
        </div>
      </div>`;
    card.addEventListener('click', () => openDrawer(blade.id));
    grid.appendChild(card);
  });
}

let isClosingFullCatalogFromHistory = false;

function isFullCatalogOpen() {
  const modal = document.getElementById('fullCatalogModal');
  return modal && modal.style.display === 'block';
}

function openFullCatalog() {
  const modal = document.getElementById('fullCatalogModal');
  if (!modal) return;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  fcActiveFilter = 'all';
  fcActiveSort   = 'default';
  buildFCFilters();
  renderFCGrid(COMPLETE_COLLECTION);
  modal.scrollTop = 0;
  document.getElementById('fcSort').value = 'default';
  // Focus for accessibility
  document.getElementById('fcTitle').focus();
  document.getElementById('fcTitle').setAttribute('tabindex','-1');

  if (!history.state || history.state.modal !== 'fullCatalog') {
    history.pushState({ modal: 'fullCatalog' }, '', '#full-collection');
  }
}

function openFullCatalogFromHash() {
  if (window.location.hash !== '#full-collection') return;
  openFullCatalog();
}

function closeFullCatalog() {
  if (isFullCatalogOpen() && history.state && history.state.modal === 'fullCatalog' && !isClosingFullCatalogFromHistory) {
    history.back();
    return;
  }

  document.getElementById('fullCatalogModal').style.display = 'none';
  document.body.style.overflow = '';
}

window.addEventListener('popstate', () => {
  if (window.location.hash === '#full-collection') {
    openFullCatalog();
    return;
  }

  if (!isFullCatalogOpen()) return;

  isClosingFullCatalogFromHistory = true;
  closeFullCatalog();
  isClosingFullCatalogFromHistory = false;
});

window.addEventListener('hashchange', openFullCatalogFromHash);

/* Close on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('quickDrawer').style.transform === 'translateX(0px)'
        || document.getElementById('quickDrawer').style.transform === 'translateX(0%)') {
      closeDrawer();
    } else {
      closeFullCatalog();
    }
  }
});

/* ============================================================
   QUICK VIEW DRAWER
   ============================================================ */
function openDrawer(id) {
  const blade = COMPLETE_COLLECTION.find(b => String(b.id) === String(id));
  if (!blade) return;
  const details = getBladeDetails(blade);

  document.getElementById('qdBody').innerHTML = `
    <div class="qd-blade-img">
      ${
        blade.image
          ? `<img src="${blade.image}" alt="${blade.name}" class="qd-blade-image">`
          : `
            <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
              <rect width="400" height="300" fill="${blade.bg}"/>
              <defs>
                <radialGradient id="qdg${blade.id}" cx="50%" cy="50%" r="52%">
                  <stop offset="0%" stop-color="${blade.gradColor}" stop-opacity=".8"/>
                  <stop offset="100%" stop-color="${blade.bg}"/>
                </radialGradient>
              </defs>
              <rect width="400" height="300" fill="url(#qdg${blade.id})"/>
              <g transform="scale(1.35) translate(10,25)">
                ${blade.svgPath}
              </g>
            </svg>
          `
      }
    </div>
    <span style="display:inline-flex;align-items:center;gap:4px;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;">
      ✦ ${blade.badge}
    </span>
    <h2 class="qd-title" id="qdTitle">${blade.name}</h2>
    <p class="qd-meta">${blade.category.charAt(0).toUpperCase()+blade.category.slice(1)} · ${blade.material} · ${blade.length}</p>
    <p class="qd-desc">${blade.desc}</p>
    <p class="qd-order-note">${blade.status === 'ready-stock' ? 'Ready stock is limited. Please confirm availability before purchase.' : 'Made after your order is confirmed.'} ${blade.customizable ? 'Custom length, steel, handle, scabbard, finish, and engraving are available on request.' : ''}</p>
    <details class="qd-spec-details" open>
      <summary>Custom build details</summary>
      ${quickBuildConfiguratorMarkup(blade)}
      <table class="qd-specs qd-specs-compact">
        <tr><td>Default Edge Grind</td><td>${details.edge || blade.edge}</td></tr>
      </table>
    </details>
    <p class="qd-lead-time"><strong>Ordering:</strong> ${blade.leadTime}</p>
    <div class="qd-price">${formatBladePrice(blade)}</div>
    <div class="qd-ctas">
      <button class="btn-primary" onclick="addCurrentBuildToInquiryList(${blade.id})">
        Add to Inquiry List
      </button>
      <button class="btn-ghost" onclick="inquireQuickBuild(${blade.id})">Send Inquiry Now</button>
      <button class="btn-ghost" onclick="closeDrawer()">Continue Browsing</button>
    </div>`;

  const drawer   = document.getElementById('quickDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  backdrop.style.display = 'block';
  // Force reflow then animate
  requestAnimationFrame(() => {
    drawer.style.transform  = 'translateX(0%)';
  });
}

function closeDrawer() {
  document.getElementById('quickDrawer').style.transform  = 'translateX(100%)';
  document.getElementById('drawerBackdrop').style.display = 'none';
}

(function() {
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = W * 0.4 + (Math.random() - 0.5) * W * 0.3;
      this.y = H * 0.6 + Math.random() * H * 0.2;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = -Math.random() * 2.5 - 0.5;
      this.life = 1;
      this.decay = 0.006 + Math.random() * 0.010;
      this.size = Math.random() * 2.5 + 0.8;
      const hot = Math.random();
      if (hot > 0.7) {
        this.r = 255; this.g = 210 + Math.random()*45; this.b = 60;
      } else if (hot > 0.4) {
        this.r = 240; this.g = 140 + Math.random()*60; this.b = 20;
      } else {
        this.r = 200; this.g = 80 + Math.random()*60; this.b = 10;
      }
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy -= 0.015;
      this.vx *= 0.99;
      this.life -= this.decay;
      this.size *= 0.995;
      if (this.life <= 0) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life * 0.55);
      ctx.shadowColor = `rgba(${this.r},${this.g},${this.b},0.5)`;
      ctx.shadowBlur = 8;
      ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Ember class for slower drifting coals
  class Ember {
    constructor() { this.reset(); }
    reset() {
      this.x = W * 0.3 + Math.random() * W * 0.4;
      this.y = H * 0.55 + Math.random() * H * 0.15;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -Math.random() * 0.8 - 0.2;
      this.life = 1;
      this.decay = 0.003 + Math.random() * 0.005;
      this.size = Math.random() * 1.5 + 0.5;
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx + Math.sin(this.pulse) * 0.2;
      this.y += this.vy;
      this.pulse += 0.05;
      this.life -= this.decay;
      if (this.life <= 0 || this.y < 0) this.reset();
    }
    draw() {
      const alpha = Math.max(0, this.life * 0.4) * (0.7 + 0.3 * Math.sin(this.pulse));
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgb(200, 100, 20)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < 80; i++) {
      const p = new Particle();
      p.life = Math.random();
      particles.push(p);
    }
    for (let i = 0; i < 40; i++) {
      const e = new Ember();
      e.life = Math.random();
      particles.push(e);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Forge glow — orange pool at bottom center
    const grd = ctx.createRadialGradient(W * 0.4, H * 0.72, 0, W * 0.4, H * 0.65, W * 0.3);
    grd.addColorStop(0, 'rgba(180, 80, 10, 0.22)');
    grd.addColorStop(0.5, 'rgba(130, 40, 5, 0.08)');
    grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    // Ambient dark vignette to deepen corners
    const vig = ctx.createRadialGradient(W/2, H/2, H * 0.2, W/2, H/2, H * 0.8);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();

  window.addEventListener('resize', () => { resize(); init(); });

  // Pause when not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else draw();
  });
})();

document.addEventListener('DOMContentLoaded', function() {
  loadInquiryList();
  openFullCatalogFromHash();

  /* --- HERO ENTRANCE --- */
  setTimeout(() => {
    document.getElementById('heroRule').classList.add('animate');
    document.getElementById('heroEyebrow').classList.add('animate');
  }, 200);
  setTimeout(() => { document.getElementById('heroHeadline').classList.add('animate'); }, 500);
  setTimeout(() => { document.getElementById('heroSub').classList.add('animate'); }, 700);
  setTimeout(() => {
    document.getElementById('heroCtas').classList.add('animate');
    document.getElementById('heroScroll').classList.add('animate');
  }, 1000);

  /* --- STICKY NAV --- */
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 60);

    /* Back to top visibility */
    document.getElementById('backTop').classList.toggle('visible', window.scrollY > 700);
  }, { passive: true });

  /* --- ACTIVE NAV LINK (IntersectionObserver) --- */
  const sections = document.querySelectorAll('section[id], div[id]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));

  /* --- SCROLL REVEAL --- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -80px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* --- STAT COUNTER ANIMATION --- */
  const statObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        let start = 0;
        const duration = 1800;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
          start = Math.min(start + step, target);
          el.textContent = start + suffix;
          if (start >= target) clearInterval(timer);
        }, 16);
        statObs.unobserve(el);
      }
    });
  }, { rootMargin: '0px 0px -100px 0px' });
  document.querySelectorAll('.stat-number[data-count]').forEach(el => statObs.observe(el));

  /* --- MOBILE NAV --- */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* --- FILTER PILLS (CATALOG) --- */
  renderCatalogPreview();
  const filterPills = document.querySelectorAll('.filter-bar .filter-pill');
  const bladeCards = document.querySelectorAll('.blade-card');
  const filterCount = document.getElementById('filterCount');

  bladeCards.forEach(card => {
    const image = card.querySelector('.blade-card-img');
    const arrow = card.querySelector('.blade-arrow');
    const bladeName = card.querySelector('.blade-name')?.textContent.trim();
    if (!bladeName) return;

    const openCardQuickView = e => {
      if (e.target.closest('button, a')) return;
      openQuickView(bladeName);
    };

    image?.addEventListener('click', openCardQuickView);
    arrow?.addEventListener('click', openCardQuickView);
  });

  filterPills.forEach(pill => {
    pill.addEventListener('click', function() {
      filterPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      if (!filter) return;
      let visible = 0;
      bladeCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      filterCount.textContent = `${visible} blade${visible !== 1 ? 's' : ''}`;
    });
  });

  /* --- FAQ ACCORDION --- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if was closed
      if (!isOpen) {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* --- TESTIMONIALS CAROUSEL --- */
  const track = document.getElementById('testiTrack');
  const dots = document.querySelectorAll('.testi-dot');
  const cards = document.querySelectorAll('.testi-card');
  let currentSlide = 0;
  const totalSlides = 3;

  function goToSlide(n) {
    currentSlide = ((n % totalSlides) + totalSlides) % totalSlides;
    const cardW = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${currentSlide * cardW}px)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentSlide);
      d.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
    });
    cards.forEach((c, i) => c.classList.toggle('active', i === currentSlide));
  }

  document.getElementById('testiPrev').addEventListener('click', () => goToSlide(currentSlide - 1));
  document.getElementById('testiNext').addEventListener('click', () => goToSlide(currentSlide + 1));
  dots.forEach(d => d.addEventListener('click', () => goToSlide(+d.getAttribute('data-index'))));

  // Auto-advance
  let autoPlay = setInterval(() => goToSlide(currentSlide + 1), 6000);
  track.addEventListener('mouseenter', () => clearInterval(autoPlay));
  track.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => goToSlide(currentSlide + 1), 6000);
  });

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
  });

  /* --- GALLERY FILTER PILLS --- */
  const galleryPills = document.querySelectorAll('.gallery-filters .filter-pill');
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryItems = document.querySelectorAll('.gallery-item[data-gallery-category]');
  const galleryLightbox = document.getElementById('galleryLightbox');
  const galleryLightboxImage = document.getElementById('galleryLightboxImage');
  const galleryLightboxTitle = document.getElementById('galleryLightboxTitle');
  const galleryLightboxCount = document.getElementById('galleryLightboxCount');
  const galleryLightboxClose = document.getElementById('galleryLightboxClose');
  const galleryLightboxPrev = document.getElementById('galleryLightboxPrev');
  const galleryLightboxNext = document.getElementById('galleryLightboxNext');
  let galleryActiveIndex = 0;

  function getVisibleGalleryItems() {
    return Array.from(galleryItems).filter(item => !item.classList.contains('is-hidden'));
  }

  function renderGalleryLightbox() {
    const visibleItems = getVisibleGalleryItems();
    const activeItem = visibleItems[galleryActiveIndex];
    if (!activeItem || !galleryLightboxImage) return;

    const svg = activeItem.querySelector('svg');
    const title = svg ? svg.getAttribute('aria-label') || 'Gallery image' : 'Gallery image';
    galleryLightboxImage.innerHTML = '';
    if (svg) {
      const fullImage = svg.cloneNode(true);
      fullImage.removeAttribute('style');
      galleryLightboxImage.appendChild(fullImage);
    }
    galleryLightboxTitle.textContent = title;
    galleryLightboxCount.textContent = `${galleryActiveIndex + 1} / ${visibleItems.length}`;
  }

  function openGalleryLightbox(item) {
    const visibleItems = getVisibleGalleryItems();
    galleryActiveIndex = Math.max(0, visibleItems.indexOf(item));
    renderGalleryLightbox();
    galleryLightbox.classList.add('open');
    galleryLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeGalleryLightbox() {
    galleryLightbox.classList.remove('open');
    galleryLightbox.setAttribute('aria-hidden', 'true');
    galleryLightboxImage.innerHTML = '';
    document.body.style.overflow = '';
  }

  function moveGalleryLightbox(direction) {
    const visibleItems = getVisibleGalleryItems();
    if (!visibleItems.length) return;
    galleryActiveIndex = (galleryActiveIndex + direction + visibleItems.length) % visibleItems.length;
    renderGalleryLightbox();
  }

  galleryPills.forEach(pill => {
    pill.addEventListener('click', function() {
      galleryPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-gallery-filter') || 'all';

      if (galleryGrid) {
        galleryGrid.classList.toggle('is-filtered', filter !== 'all');
      }

      galleryItems.forEach(item => {
        const categories = (item.getAttribute('data-gallery-category') || '').split(/\s+/);
        const show = filter === 'all' || categories.includes(filter);
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => openGalleryLightbox(item));
  });

  if (galleryLightbox) {
    galleryLightbox.addEventListener('click', e => {
      if (e.target === galleryLightbox) closeGalleryLightbox();
    });
    galleryLightboxClose.addEventListener('click', closeGalleryLightbox);
    galleryLightboxPrev.addEventListener('click', () => moveGalleryLightbox(-1));
    galleryLightboxNext.addEventListener('click', () => moveGalleryLightbox(1));
    document.addEventListener('keydown', e => {
      if (!galleryLightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeGalleryLightbox();
      if (e.key === 'ArrowLeft') moveGalleryLightbox(-1);
      if (e.key === 'ArrowRight') moveGalleryLightbox(1);
    });
  }

});

/* --- UTILITY FUNCTIONS --- */
function scrollToContact(bladeName, buildDetails = '') {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  if (bladeName) {
    setTimeout(() => {
      const subjectEl = document.getElementById('subject');
      if (subjectEl) {
        subjectEl.value = 'Existing Blade';
        const msgEl = document.getElementById('message');
        if (msgEl && !msgEl.value) {
          msgEl.value = `I'm interested in the ${bladeName}. ${buildDetails ? `\n\n${buildDetails}` : ''}`;
          msgEl.focus();
        }
      }
    }, 600);
  }
}

function openQuickView(bladeName) {
  const blade = COMPLETE_COLLECTION.find(b => b.name === bladeName);
  if (!blade) return;
  openDrawer(blade.id);
}

function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  form.style.display = 'none';
  success.style.display = 'block';
}

function handleNewsletterSubmit() {
  const input = document.querySelector('.newsletter-input');
  if (input && input.value.includes('@')) {
    const btn = document.querySelector('.newsletter-btn');
    btn.textContent = 'Subscribed ✓';
    btn.style.background = '#2a5a1a';
    btn.style.borderColor = '#2a5a1a';
    btn.disabled = true;
    input.value = '';
  }
}
