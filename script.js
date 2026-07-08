/* ============================================================
   FULL CATALOG DATA — 24 Blades
   ============================================================ */
const ALL_BLADES = [
  /* ---- Kampilan ---- */
  {
    id:'k1', name:'Kampilan ng Bayani', category:'kampilan',
    material:'High-Carbon Damascus 1075/15N20', length:'28 in', weight:'680g',
    handle:'Carabao Horn · Brass Pins', edge:'Single-bevel convex',
    hrc:'58–61', sheath:'Water buffalo leather', price:28500, badge:'Limited Edition',
    desc:'The sword of the hero — 240-fold Damascus pattern forged over three days. A commanding presence in any collection.',
    bg:'#110f08', gradColor:'#3a2010',
    svgPath:`<path d="M38 172 L38 155 L228 104 Q270 88 276 77 Q266 68 242 76 L48 128 L38 118 L32 140 Z" fill="#8a8a8a" stroke="#bbb" stroke-width=".8"/>
    <path d="M228 104 Q270 88 276 77" stroke="#C8963C" stroke-width="1.2" fill="none" opacity=".85"/>
    <path d="M48 128 L225 80" stroke="#E0D8C8" stroke-width=".5" opacity=".3"/>
    <path d="M55 136 Q110 116 165 100 Q215 86 228 82" stroke="#999" stroke-width="1.5" fill="none" opacity=".22"/>
    <rect x="22" y="153" width="20" height="52" rx="3" fill="#5a3a1a" stroke="#7a5a2a" stroke-width="1"/>
    <rect x="25" y="159" width="14" height="3" rx="1" fill="#C8963C" opacity=".55"/>
    <rect x="25" y="172" width="14" height="3" rx="1" fill="#C8963C" opacity=".55"/>
    <rect x="25" y="185" width="14" height="3" rx="1" fill="#C8963C" opacity=".55"/>
    <circle cx="200" cy="92" r="2" fill="#C8963C" opacity=".7"/>
    <circle cx="184" cy="85" r="1.2" fill="#E8C86A" opacity=".6"/>
    <text x="150" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="3">KAMPILAN</text>`
  },
  {
    id:'k2', name:'Kampilan Hari ng Digma', category:'kampilan',
    material:'High-Carbon 1080', length:'30 in', weight:'720g',
    handle:'Narra Hardwood · Rattan Wrap', edge:'Single-bevel convex',
    hrc:'57–60', sheath:'Embossed leather', price:22000, badge:'In Stock',
    desc:'The war king — a longer blade profile for reach and authority. Rattan-wrapped handle for superior grip.',
    bg:'#0f0b08', gradColor:'#2a1808',
    svgPath:`<path d="M35 175 L35 158 L248 100 Q285 84 290 73 Q278 63 252 72 L46 130 L35 120 L29 143 Z" fill="#888" stroke="#aaa" stroke-width=".8"/>
    <path d="M248 100 Q285 84 290 73" stroke="#C8963C" stroke-width="1" fill="none" opacity=".8"/>
    <rect x="20" y="156" width="18" height="56" rx="2" fill="#2a1808" stroke="#4a3015" stroke-width="1"/>
    <line x1="20" y1="165" x2="38" y2="165" stroke="#8a6030" stroke-width="2" opacity=".45"/>
    <line x1="20" y1="177" x2="38" y2="177" stroke="#8a6030" stroke-width="2" opacity=".45"/>
    <line x1="20" y1="189" x2="38" y2="189" stroke="#8a6030" stroke-width="2" opacity=".45"/>
    <text x="155" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="3">KAMPILAN</text>`
  },
  {
    id:'k3', name:'Kampilan Lapu-Lapu', category:'kampilan',
    material:'Laminated San Mai', length:'26 in', weight:'640g',
    handle:'Molave Wood · Brass Guard', edge:'Single-bevel hollow',
    hrc:'59–62', sheath:'Carved wood kaluban', price:36000, badge:'Made to Order',
    desc:'Named for the great chieftain who never yielded — this San Mai laminate offers exceptional edge retention with a tough spine.',
    bg:'#090c0e', gradColor:'#102030',
    svgPath:`<path d="M36 170 L36 154 L218 106 Q262 91 268 80 Q258 70 235 78 L46 128 L36 118 L30 140 Z" fill="#7a7a7a" stroke="#aaa" stroke-width=".8"/>
    <path d="M46 128 L218 80" stroke="#E0D8C8" stroke-width=".5" opacity=".35"/>
    <rect x="20" y="152" width="20" height="54" rx="3" fill="#2a1a0c" stroke="#5a4020" stroke-width="1"/>
    <rect x="17" y="148" width="26" height="8" rx="2" fill="#C8963C" opacity=".7"/>
    <rect x="23" y="158" width="14" height="3" rx="1" fill="#C8963C" opacity=".4"/>
    <rect x="23" y="172" width="14" height="3" rx="1" fill="#C8963C" opacity=".4"/>
    <text x="150" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="3">KAMPILAN</text>`
  },
  /* ---- Bolo ---- */
  {
    id:'b1', name:'Bolo ng Lupa', category:'bolo',
    material:'High-Carbon 1075', length:'18 in', weight:'380g',
    handle:'Narra Hardwood', edge:'Single-bevel convex',
    hrc:'55–58', sheath:'Vegetable-tanned leather', price:8900, badge:'In Stock',
    desc:'The farmer\'s companion — a classic Tagalog-style bolo with perfect balance for everyday work and display.',
    bg:'#0a0f0a', gradColor:'#1a2a10',
    svgPath:`<path d="M28 163 L28 150 L205 118 Q244 109 252 100 Q244 91 218 96 L40 132 L28 122 L22 140 Z" fill="#999" stroke="#bbb" stroke-width=".8"/>
    <path d="M28 163 Q80 168 130 160 Q180 152 205 118" stroke="#666" stroke-width="1" fill="none" opacity=".35"/>
    <rect x="10" y="148" width="22" height="48" rx="4" fill="#3a2010" stroke="#5a3a18" stroke-width="1"/>
    <path d="M14 157 Q21 155 30 157 Q21 160 14 157Z" fill="#5a3a18" opacity=".6"/>
    <path d="M14 170 Q21 168 30 170 Q21 173 14 170Z" fill="#5a3a18" opacity=".6"/>
    <rect x="24" y="144" width="10" height="8" rx="1" fill="#888" stroke="#aaa" stroke-width=".5"/>
    <text x="150" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="4">BOLO</text>`
  },
  {
    id:'b2', name:'Bolo Talibong', category:'bolo',
    material:'Stainless 440C', length:'20 in', weight:'420g',
    handle:'Carabao Horn', edge:'Single-bevel convex',
    hrc:'56–59', sheath:'Brown leather', price:9800, badge:'In Stock',
    desc:'The Visayan bolo — a wider, more aggressive clip-point blade profile from the southern islands tradition.',
    bg:'#0b0808', gradColor:'#201010',
    svgPath:`<path d="M26 166 L26 152 L195 116 Q240 102 250 90 Q238 78 210 88 L38 132 L26 120 L20 142 Z" fill="#aaa" stroke="#ccc" stroke-width=".8"/>
    <path d="M195 116 Q240 102 250 90 Q238 78 210 88" stroke="#C8963C" stroke-width=".9" fill="none" opacity=".7"/>
    <rect x="8" y="150" width="20" height="50" rx="3" fill="#2a1a08" stroke="#4a3018" stroke-width="1"/>
    <path d="M11 160 Q18 158 26 160" stroke="#6a4a20" stroke-width="1" fill="none" opacity=".5"/>
    <path d="M11 172 Q18 170 26 172" stroke="#6a4a20" stroke-width="1" fill="none" opacity=".5"/>
    <text x="150" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="3">TALIBONG</text>`
  },
  {
    id:'b3', name:'Bolo Barong Tagalog', category:'bolo',
    material:'Damascus 1075/15N20', length:'16 in', weight:'340g',
    handle:'Narra · Ivory Pins', edge:'Double-bevel',
    hrc:'58–61', sheath:'Embossed ceremonial leather', price:18500, badge:'Limited Edition',
    desc:'A ceremonial piece inspired by the traditional barong — leaf-shaped blade with full Damascus pattern and ivory handle pins.',
    bg:'#08080c', gradColor:'#101018',
    svgPath:`<path d="M25 168 L25 152 L155 118 Q190 105 198 94 Q190 82 168 90 L35 130 L25 118 L19 138 Z" fill="#888" stroke="#aaa" stroke-width=".8"/>
    <path d="M35 130 Q80 116 128 106 Q162 98 155 90" stroke="#C8963C" stroke-width=".8" fill="none" opacity=".45"/>
    <path d="M38 138 Q80 124 125 114 Q155 106 158 98" stroke="#888" stroke-width="1.5" fill="none" opacity=".2"/>
    <rect x="8" y="150" width="20" height="50" rx="3" fill="#3a2010" stroke="#5a3a18" stroke-width="1"/>
    <circle cx="18" cy="163" r="3" fill="#C8963C" stroke="#E8A840" stroke-width=".5"/>
    <circle cx="18" cy="182" r="3" fill="#C8963C" stroke="#E8A840" stroke-width=".5"/>
    <text x="130" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="2">BARONG TAGALOG</text>`
  },
  /* ---- Itak ---- */
  {
    id:'i1', name:'Itak ng Bundok', category:'itak',
    material:'Stainless 440C', length:'16 in', weight:'310g',
    handle:'Carabao Horn', edge:'Single-bevel convex',
    hrc:'56–59', sheath:'Natural leather', price:6500, badge:'In Stock',
    desc:'The mountain itak — a forward-curved work blade from the Cordillera tradition, built for utility and decades of service.',
    bg:'#100808', gradColor:'#280a0a',
    svgPath:`<path d="M28 166 L28 153 L185 110 Q232 89 247 73 Q250 60 240 56 Q222 58 200 73 L43 130 L28 120 L22 142 Z" fill="#aaa" stroke="#ccc" stroke-width=".8"/>
    <path d="M185 110 Q232 89 247 73 Q250 60 240 56" stroke="#C8963C" stroke-width="1" fill="none" opacity=".75"/>
    <path d="M12 148 Q12 168 18 200 L30 200 Q36 168 36 148 Q34 142 24 142 Q14 142 12 148Z" fill="#2a1a08" stroke="#4a3018" stroke-width="1"/>
    <path d="M15 162 Q24 159 33 162" stroke="#6a4a20" stroke-width="1" fill="none" opacity=".5"/>
    <path d="M15 174 Q24 171 33 174" stroke="#6a4a20" stroke-width="1" fill="none" opacity=".5"/>
    <text x="150" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="4">ITAK</text>`
  },
  {
    id:'i2', name:'Itak Pangasinan Heritage', category:'itak',
    material:'High-Carbon 1080', length:'18 in', weight:'360g',
    handle:'Molave · Brass Bolster', edge:'Single-bevel convex',
    hrc:'57–60', sheath:'Hand-stitched leather', price:11500, badge:'In Stock',
    desc:'Our provincial heritage design — the classic Pangasinan itak profile, refined over decades into its most elegant expression.',
    bg:'#0e0908', gradColor:'#221204',
    svgPath:`<path d="M26 168 L26 154 L188 108 Q234 88 248 72 Q252 58 242 54 Q224 56 202 72 L40 132 L26 120 L20 144 Z" fill="#999" stroke="#bbb" stroke-width=".8"/>
    <path d="M188 108 Q234 88 248 72" stroke="#C8963C" stroke-width=".9" fill="none" opacity=".7"/>
    <rect x="8" y="152" width="22" height="52" rx="4" fill="#2a1a0c" stroke="#5a3a18" stroke-width="1"/>
    <rect x="7" y="148" width="24" height="8" rx="2" fill="#C8963C" opacity=".55"/>
    <text x="150" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="4">ITAK</text>`
  },
  {
    id:'i3', name:'Itak Sandata Damascus', category:'itak',
    material:'Damascus 1075/15N20', length:'20 in', weight:'400g',
    handle:'Carabao Horn · Silver Pins', edge:'Single-bevel hollow',
    hrc:'58–61', sheath:'Tooled leather', price:21000, badge:'Made to Order',
    desc:'The weapon itak — upgraded with Damascus steel and precision hollow grind. A collector\'s piece that remains fully functional.',
    bg:'#0a080e', gradColor:'#14100a',
    svgPath:`<path d="M24 168 L24 153 L182 110 Q228 89 244 73 Q248 59 237 55 Q220 56 196 72 L38 132 L24 120 L18 143 Z" fill="#888" stroke="#aaa" stroke-width=".8"/>
    <path d="M38 132 Q90 112 145 98 Q190 86 188 78" stroke="#999" stroke-width="1.4" fill="none" opacity=".22"/>
    <path d="M41 140 Q92 120 146 106 Q190 94 186 86" stroke="#777" stroke-width="1" fill="none" opacity=".16"/>
    <rect x="7" y="150" width="20" height="53" rx="3" fill="#2a1808" stroke="#4a2808" stroke-width="1"/>
    <circle cx="17" cy="165" r="3.5" fill="#C8963C" stroke="#E8A840" stroke-width=".5"/>
    <circle cx="17" cy="185" r="3.5" fill="#C8963C" stroke="#E8A840" stroke-width=".5"/>
    <text x="148" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="4">ITAK</text>`
  },
  /* ---- Kalis ---- */
  {
    id:'kl1', name:'Kalis ng Datu', category:'kalis',
    material:'Laminated Steel', length:'24 in', weight:'540g',
    handle:'Narra Hardwood · Brass', edge:'Double-bevel hollow',
    hrc:'60–63', sheath:'Carved narra kaluban', price:42000, badge:'Made to Order',
    desc:'The wavy kalis — a prestige weapon of the Philippine nobility, demanding months of hand-labor to produce each wave.',
    bg:'#080810', gradColor:'#181828',
    svgPath:`<path d="M32 172 L32 156 Q58 144 74 128 Q90 112 112 118 Q132 124 152 108 Q172 92 193 98 Q222 93 242 82 Q232 72 212 76 Q186 81 166 96 Q146 111 126 106 Q106 101 84 116 Q62 131 44 140 L32 130 L28 150 Z" fill="#888" stroke="#bbb" stroke-width=".8"/>
    <path d="M44 140 Q62 131 84 116 Q106 101 126 106 Q146 111 166 96 Q186 81 212 76" stroke="#C8963C" stroke-width=".9" fill="none" opacity=".5"/>
    <rect x="16" y="152" width="20" height="52" rx="3" fill="#1a1a3a" stroke="#2a2a5a" stroke-width="1"/>
    <rect x="19" y="158" width="14" height="2" rx="1" fill="#C8963C" opacity=".45"/>
    <rect x="19" y="170" width="14" height="2" rx="1" fill="#C8963C" opacity=".45"/>
    <text x="150" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="4">KALIS</text>`
  },
  {
    id:'kl2', name:'Kalis ng Datu Puti', category:'kalis',
    material:'San Mai — W2 core', length:'26 in', weight:'580g',
    handle:'Narra · Brass Fittings', edge:'Double-bevel hollow',
    hrc:'60–63 core', sheath:'Carved narra', price:52000, badge:'Made to Order',
    desc:'Named for the legendary Datu — San Mai laminate for supreme edge retention paired with the iconic wavy double-edged form.',
    bg:'#0a0a12', gradColor:'#141428',
    svgPath:`<path d="M30 172 L30 156 Q56 144 72 128 Q88 112 110 118 Q130 124 150 108 Q170 92 190 98 Q220 93 240 82 Q230 72 210 76 Q184 81 164 96 Q144 111 124 106 Q104 101 82 116 Q60 131 42 140 L30 130 L26 150 Z" fill="#7a7a7a" stroke="#aaa" stroke-width=".8"/>
    <path d="M42 140 Q60 131 82 116 Q104 101 124 106 Q144 111 164 96 Q184 81 210 76" stroke="#C8963C" stroke-width=".9" fill="none" opacity=".55"/>
    <rect x="14" y="152" width="20" height="52" rx="3" fill="#1a1a3a" stroke="#3a3a6a" stroke-width="1"/>
    <rect x="12" y="148" width="24" height="8" rx="2" fill="#C8963C" opacity=".65"/>
    <text x="150" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="4">KALIS</text>`
  },
  {
    id:'kl3', name:'Kalis Sundang', category:'kalis',
    material:'High-Carbon 1075', length:'20 in', weight:'460g',
    handle:'Carabao Horn · Rattan', edge:'Double-bevel convex',
    hrc:'56–59', sheath:'Black leather', price:24500, badge:'In Stock',
    desc:'The shorter sundang-style kalis — a Moro blade form with a tighter wave pattern and aggressive double-edge profile.',
    bg:'#0a0808', gradColor:'#200a0a',
    svgPath:`<path d="M32 170 L32 155 Q54 144 68 130 Q82 116 100 121 Q118 126 135 113 Q152 100 170 104 Q194 99 212 89 Q204 80 186 84 Q162 89 144 103 Q127 116 110 111 Q93 106 76 119 Q59 132 44 141 L32 131 L28 149 Z" fill="#8a8a8a" stroke="#bbb" stroke-width=".8"/>
    <path d="M44 141 Q59 132 76 119 Q93 106 110 111 Q127 116 144 103 Q162 89 186 84" stroke="#C8963C" stroke-width=".9" fill="none" opacity=".48"/>
    <rect x="16" y="152" width="19" height="50" rx="3" fill="#2a1a08" stroke="#4a3018" stroke-width="1"/>
    <text x="140" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="4">KALIS</text>`
  },
  /* ---- Punyal ---- */
  {
    id:'p1', name:'Punyal Hari', category:'punyal',
    material:'Damascus', length:'12 in', weight:'220g',
    handle:'Purple Heart Wood · Brass', edge:'Double-bevel hollow',
    hrc:'58–61', sheath:'Tooled ceremonial leather', price:18000, badge:'Limited Edition',
    desc:'The king\'s dagger — a short double-edged punyal with Damascus steel and rare purple heart wood handle. A prestige collector piece.',
    bg:'#0a080a', gradColor:'#1a101a',
    svgPath:`<path d="M150 38 L134 156 L150 162 L166 156 Z" fill="#aaa" stroke="#ccc" stroke-width=".8"/>
    <path d="M150 38 L134 156" stroke="#999" fill="none" stroke-width="1"/>
    <path d="M150 38 L166 156" stroke="#ccc" fill="none" stroke-width=".9"/>
    <rect x="118" y="153" width="64" height="8" rx="2" fill="#C8963C" stroke="#E8A840" stroke-width=".5"/>
    <rect x="135" y="159" width="30" height="42" rx="4" fill="#3a1a3a" stroke="#5a2a5a" stroke-width="1"/>
    <line x1="135" y1="168" x2="165" y2="168" stroke="#C8963C" stroke-width="1.5" opacity=".4"/>
    <line x1="135" y1="179" x2="165" y2="179" stroke="#C8963C" stroke-width="1.5" opacity=".4"/>
    <ellipse cx="150" cy="202" rx="16" ry="6" fill="#888" stroke="#aaa" stroke-width=".5"/>
    <text x="150" y="175" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".15" letter-spacing="3">PUNYAL</text>`
  },
  {
    id:'p2', name:'Punyal Kawal', category:'punyal',
    material:'High-Carbon 1075', length:'10 in', weight:'195g',
    handle:'Narra · Rattan Wrap', edge:'Double-bevel convex',
    hrc:'55–58', sheath:'Simple leather', price:9500, badge:'In Stock',
    desc:'The soldier\'s punyal — a no-frills sidearm dagger meant to be carried and used. Elegant in its simplicity.',
    bg:'#0c0808', gradColor:'#221008',
    svgPath:`<path d="M150 40 L136 152 L150 158 L164 152 Z" fill="#999" stroke="#bbb" stroke-width=".8"/>
    <rect x="120" y="149" width="60" height="7" rx="2" fill="#C8963C" opacity=".65"/>
    <rect x="137" y="154" width="26" height="44" rx="3" fill="#2a1808" stroke="#4a2808" stroke-width="1"/>
    <line x1="137" y1="163" x2="163" y2="163" stroke="#8a6030" stroke-width="1.5" opacity=".5"/>
    <line x1="137" y1="173" x2="163" y2="173" stroke="#8a6030" stroke-width="1.5" opacity=".5"/>
    <line x1="137" y1="183" x2="163" y2="183" stroke="#8a6030" stroke-width="1.5" opacity=".5"/>
    <ellipse cx="150" cy="199" rx="14" ry="5" fill="#888"/>
    <text x="150" y="175" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".15" letter-spacing="3">PUNYAL</text>`
  },
  {
    id:'p3', name:'Punyal Ginoo Damascus', category:'punyal',
    material:'Damascus 1075/15N20', length:'14 in', weight:'260g',
    handle:'Carabao Horn · Gold Inlay', edge:'Double-bevel hollow',
    hrc:'59–62', sheath:'Embossed gold-stamped leather', price:28000, badge:'Made to Order',
    desc:'The gentleman\'s dagger — a longer punyal with Damascus blade and hand-inlaid gold motifs on the carabao horn handle.',
    bg:'#080a10', gradColor:'#101428',
    svgPath:`<path d="M150 36 L133 158 L150 164 L167 158 Z" fill="#888" stroke="#aaa" stroke-width=".8"/>
    <path d="M150 36 L133 158" stroke="#888" fill="none" stroke-width="1"/>
    <path d="M150 36 L167 158" stroke="#bbb" fill="none" stroke-width=".9"/>
    <path d="M144 80 Q150 76 156 80 Q150 84 144 80" stroke="#C8963C" stroke-width=".8" fill="none" opacity=".5"/>
    <path d="M143 110 Q150 106 157 110 Q150 114 143 110" stroke="#C8963C" stroke-width=".8" fill="none" opacity=".5"/>
    <rect x="116" y="155" width="68" height="9" rx="2" fill="#C8963C" stroke="#E8A840" stroke-width=".6"/>
    <rect x="133" y="162" width="34" height="40" rx="4" fill="#2a1a08" stroke="#4a3018" stroke-width="1"/>
    <circle cx="150" cy="175" r="3" fill="#C8963C" stroke="#E8A840" stroke-width=".5"/>
    <circle cx="150" cy="191" r="3" fill="#C8963C" stroke="#E8A840" stroke-width=".5"/>
    <text x="150" y="178" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".15" letter-spacing="3">PUNYAL</text>`
  },
  /* ---- Panabas ---- */
  {
    id:'pb1', name:'Panabas Dagat', category:'panabas',
    material:'High-Carbon 1080', length:'32 in', weight:'920g',
    handle:'Long hardwood · Rattan wrap', edge:'Single-bevel convex',
    hrc:'55–58', sheath:'Canvas sleeve', price:35000, badge:'Made to Order',
    desc:'The sea panabas — a large polearm-class blade from the Maranao tradition. Commands respect on both water and land.',
    bg:'#080a08', gradColor:'#101a10',
    svgPath:`<path d="M18 166 L18 150 L78 120 L242 68 Q272 53 274 43 Q256 33 232 43 L68 104 L18 132 L14 150 Z" fill="#888" stroke="#aaa" stroke-width=".8"/>
    <path d="M242 68 Q272 53 274 43" stroke="#C8963C" stroke-width="1.2" fill="none" opacity=".82"/>
    <path d="M18 150 L68 104 L232 43" stroke="#555" stroke-width="3" fill="none" opacity=".45"/>
    <rect x="2" y="148" width="18" height="52" rx="3" fill="#2a1808" stroke="#4a2808" stroke-width="1"/>
    <line x1="2" y1="155" x2="20" y2="155" stroke="#8a6030" stroke-width="2" opacity=".5"/>
    <line x1="2" y1="165" x2="20" y2="165" stroke="#8a6030" stroke-width="2" opacity=".5"/>
    <line x1="2" y1="175" x2="20" y2="175" stroke="#8a6030" stroke-width="2" opacity=".5"/>
    <text x="152" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="3">PANABAS</text>`
  },
  {
    id:'pb2', name:'Panabas ng Datu', category:'panabas',
    material:'Damascus 1075/15N20', length:'28 in', weight:'840g',
    handle:'Molave · Brass Collar', edge:'Single-bevel hollow',
    hrc:'58–61', sheath:'Embossed leather wrap', price:52000, badge:'Limited Edition',
    desc:'A ceremonial panabas reserved for chieftains — Damascus steel gives this blade both beauty and unmatched authority.',
    bg:'#0a0808', gradColor:'#1e0808',
    svgPath:`<path d="M20 165 L20 149 L76 120 L235 69 Q264 55 266 45 Q250 35 228 45 L66 106 L20 132 L15 150 Z" fill="#7a7a7a" stroke="#999" stroke-width=".8"/>
    <path d="M235 69 Q264 55 266 45" stroke="#C8963C" stroke-width="1.1" fill="none" opacity=".85"/>
    <path d="M36 128 Q100 104 165 82 Q216 64 234 54" stroke="#888" stroke-width="1.5" fill="none" opacity=".2"/>
    <rect x="4" y="147" width="18" height="52" rx="2" fill="#2a1808" stroke="#4a2808" stroke-width="1"/>
    <rect x="2" y="143" width="22" height="8" rx="2" fill="#C8963C" opacity=".55"/>
    <text x="148" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="3">PANABAS</text>`
  },
  {
    id:'pb3', name:'Panabas Sanggalang', category:'panabas',
    material:'High-Carbon 1075', length:'24 in', weight:'760g',
    handle:'Hardwood · Iron Bolster', edge:'Single-bevel convex',
    hrc:'55–57', sheath:'Heavy canvas', price:18500, badge:'In Stock',
    desc:'The defender panabas — a shorter, more maneuverable version designed for close-quarters use. Iron bolster adds balance.',
    bg:'#0c0a08', gradColor:'#201810',
    svgPath:`<path d="M22 164 L22 149 L74 121 L218 72 Q246 58 248 48 Q233 39 212 49 L64 107 L22 131 L17 149 Z" fill="#999" stroke="#bbb" stroke-width=".8"/>
    <path d="M218 72 Q246 58 248 48" stroke="#C8963C" stroke-width="1" fill="none" opacity=".75"/>
    <rect x="5" y="147" width="19" height="50" rx="2" fill="#2a1808" stroke="#4a2808" stroke-width="1"/>
    <rect x="4" y="143" width="21" height="8" rx="2" fill="#666" opacity=".8"/>
    <text x="140" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="3">PANABAS</text>`
  },
  /* ---- Ginunting ---- */
  {
    id:'g1', name:'Ginunting ng Luzon', category:'ginunting',
    material:'High-Carbon 1075', length:'22 in', weight:'480g',
    handle:'Molave · Brass Guard', edge:'Single-bevel convex',
    hrc:'57–60', sheath:'Embossed leather', price:16500, badge:'In Stock',
    desc:'The Philippine Marine Corps combat blade — the legendary ginunting in its most refined civilian collector form.',
    bg:'#0a0c0a', gradColor:'#121e12',
    svgPath:`<path d="M30 170 L30 154 Q80 148 120 138 Q170 125 200 108 Q240 88 252 76 Q242 64 222 72 Q190 82 155 100 Q115 120 80 132 Q50 142 30 148 L30 135 L24 153 Z" fill="#999" stroke="#bbb" stroke-width=".8"/>
    <path d="M200 108 Q240 88 252 76 Q242 64 222 72" stroke="#C8963C" stroke-width=".9" fill="none" opacity=".75"/>
    <rect x="12" y="152" width="22" height="52" rx="3" fill="#2a1a0c" stroke="#4a3020" stroke-width="1"/>
    <rect x="11" y="148" width="24" height="8" rx="2" fill="#C8963C" opacity=".6"/>
    <text x="150" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="2">GINUNTING</text>`
  },
  {
    id:'g2', name:'Ginunting Damascus Elite', category:'ginunting',
    material:'Damascus 1075/15N20', length:'22 in', weight:'500g',
    handle:'Carabao Horn · Silver Collar', edge:'Single-bevel convex',
    hrc:'58–61', sheath:'Tactical leather', price:32000, badge:'Made to Order',
    desc:'The collector-grade ginunting — Damascus blade with the same geometry as the service blade but elevated to heirloom quality.',
    bg:'#0a0808', gradColor:'#180a08',
    svgPath:`<path d="M29 170 L29 154 Q78 148 118 138 Q168 125 198 108 Q238 88 250 76 Q240 63 220 71 Q188 82 152 100 Q113 120 78 132 Q48 142 28 148 L28 135 L22 153 Z" fill="#888" stroke="#aaa" stroke-width=".8"/>
    <path d="M38 148 Q88 136 135 120 Q175 106 198 92" stroke="#888" stroke-width="1.5" fill="none" opacity=".2"/>
    <path d="M41 156 Q90 144 136 128 Q175 114 198 100" stroke="#666" stroke-width="1" fill="none" opacity=".15"/>
    <rect x="10" y="152" width="22" height="52" rx="3" fill="#2a1a0c" stroke="#4a3020" stroke-width="1"/>
    <circle cx="21" cy="167" r="4" fill="#C8963C" stroke="#E8A840" stroke-width=".5"/>
    <text x="150" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="2">GINUNTING</text>`
  },
  /* ---- Pirah ---- */
  {
    id:'pi1', name:'Pirah Mindanao', category:'pirah',
    material:'High-Carbon 1080', length:'18 in', weight:'380g',
    handle:'Narra · Rattan Wrap', edge:'Single-bevel convex',
    hrc:'55–58', sheath:'Leather slip', price:12000, badge:'In Stock',
    desc:'The Lumad pirah — a recurved blade from Mindanao\'s highland peoples. Excellent for both utility and martial arts practice.',
    bg:'#0c0808', gradColor:'#200e08',
    svgPath:`<path d="M28 168 L28 153 Q60 148 90 142 Q130 134 165 116 Q195 100 205 85 Q195 72 175 80 Q148 92 118 108 Q82 126 58 134 Q36 141 26 147 L26 134 L20 151 Z" fill="#999" stroke="#bbb" stroke-width=".8"/>
    <path d="M165 116 Q195 100 205 85 Q195 72 175 80" stroke="#C8963C" stroke-width=".9" fill="none" opacity=".72"/>
    <rect x="10" y="151" width="20" height="50" rx="3" fill="#2a1808" stroke="#4a2808" stroke-width="1"/>
    <line x1="10" y1="161" x2="30" y2="161" stroke="#8a6030" stroke-width="1.5" opacity=".5"/>
    <line x1="10" y1="173" x2="30" y2="173" stroke="#8a6030" stroke-width="1.5" opacity=".5"/>
    <text x="142" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="4">PIRAH</text>`
  },
  {
    id:'pi2', name:'Pirah Batik Damascus', category:'pirah',
    material:'Damascus 1075/15N20', length:'20 in', weight:'420g',
    handle:'Ebony · Brass Fittings', edge:'Single-bevel hollow',
    hrc:'58–61', sheath:'Batik-fabric wrapped leather', price:26500, badge:'Limited Edition',
    desc:'The art pirah — Damascus blade with ebony handle and batik fabric-wrapped sheath reflecting the weave traditions of Mindanao.',
    bg:'#08080a', gradColor:'#101018',
    svgPath:`<path d="M26 170 L26 154 Q58 148 88 142 Q128 134 162 116 Q192 100 202 84 Q192 71 172 79 Q145 91 115 108 Q80 126 56 134 Q34 141 24 148 L24 134 L18 152 Z" fill="#888" stroke="#aaa" stroke-width=".8"/>
    <path d="M38 150 Q85 136 130 118 Q165 104 182 90" stroke="#888" stroke-width="1.5" fill="none" opacity=".2"/>
    <rect x="8" y="152" width="20" height="50" rx="3" fill="#0a0a0a" stroke="#2a2a2a" stroke-width="1"/>
    <circle cx="18" cy="166" r="3.5" fill="#C8963C" stroke="#E8A840" stroke-width=".5"/>
    <circle cx="18" cy="185" r="3.5" fill="#C8963C" stroke="#E8A840" stroke-width=".5"/>
    <text x="140" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="4">PIRAH</text>`
  },
  /* ---- Special / Collector ---- */
  {
    id:'s1', name:'Sibat Sandata Set', category:'set',
    material:'High-Carbon 1075 + Damascus', length:'Various', weight:'1200g total',
    handle:'Matched Narra · Brass', edge:'Mixed',
    hrc:'55–61', sheath:'Fitted leather roll', price:68000, badge:'Collector Set',
    desc:'The complete sandata triad — bolo, punyal, and itak in matched materials with a fitted presentation roll. The ultimate collection piece.',
    bg:'#0a0808', gradColor:'#201010',
    svgPath:`
    <g transform="translate(20,55) rotate(-8)">
      <path d="M0 20 L0 10 L200 2 Q225 -4 227 -12 Q215 -20 196 -13 L4 4 L0 -4 L-4 9 Z" fill="#888" stroke="#aaa" stroke-width=".7"/>
      <rect x="-12" y="10" width="15" height="42" rx="2" fill="#2a1508"/>
    </g>
    <g transform="translate(50,92) rotate(-3)">
      <path d="M0 16 L0 8 L145 2 Q165 -3 167 -9 Q156 -16 140 -10 L3 3 L0 -4 L-4 7 Z" fill="#999" stroke="#bbb" stroke-width=".7"/>
      <rect x="-10" y="8" width="14" height="38" rx="2" fill="#1a1808"/>
    </g>
    <g transform="translate(130,60) rotate(90)">
      <path d="M0 100 L-8 14 L8 14 Z" fill="#aaa" stroke="#ccc" stroke-width=".7"/>
      <rect x="-12" y="96" width="24" height="36" rx="3" fill="#3a1a3a" stroke="#5a2a5a" stroke-width="1"/>
      <rect x="-14" y="92" width="28" height="7" rx="2" fill="#C8963C" opacity=".65"/>
    </g>
    <text x="150" y="192" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".2" letter-spacing="2">SANDATA SET</text>`
  },
  {
    id:'s2', name:'Balaraw Heirloom', category:'set',
    material:'W2 Tool Steel', length:'14 in', weight:'295g',
    handle:'Ivory-tone bone · Gold', edge:'Double-bevel hollow',
    hrc:'62–64', sheath:'Gold-stamped black leather', price:45000, badge:'Heirloom',
    desc:'The balaraw — a Malay-tradition push dagger with a uniquely shaped T-handle, hand-ground W2 blade with a distinct hamon line.',
    bg:'#08080a', gradColor:'#120a10',
    svgPath:`
    <path d="M150 38 L136 155 L150 161 L164 155 Z" fill="#aaa" stroke="#ccc" stroke-width=".8"/>
    <path d="M148 80 Q152 82 150 86 Q148 90 150 94 Q152 98 150 102 Q148 106 150 110" stroke="#E8E0D0" stroke-width=".8" fill="none" opacity=".4"/>
    <rect x="116" y="152" width="68" height="9" rx="2" fill="#C8963C" stroke="#E8A840" stroke-width=".6"/>
    <rect x="100" y="156" width="100" height="12" rx="3" fill="#1a0808" stroke="#3a1818" stroke-width="1"/>
    <rect x="133" y="167" width="34" height="38" rx="3" fill="#1a1010" stroke="#3a2020" stroke-width="1"/>
    <circle cx="150" cy="180" r="5" fill="#C8963C" stroke="#E8A840" stroke-width=".6"/>
    <text x="150" y="185" text-anchor="middle" font-family="Georgia" font-size="9" fill="#C8963C" opacity=".15" letter-spacing="3">BALARAW</text>`
  }
];

/* ============================================================
   FULL CATALOG ENGINE
   ============================================================ */
let fcActiveFilter = 'all';
let fcActiveSort   = 'default';
let fcVisibleData  = [...ALL_BLADES];

const FC_CATEGORIES = [
  { key:'all',       label:'All Blades' },
  { key:'kampilan',  label:'Kampilan' },
  { key:'bolo',      label:'Bolo' },
  { key:'itak',      label:'Itak' },
  { key:'kalis',     label:'Kalis' },
  { key:'punyal',    label:'Punyal' },
  { key:'panabas',   label:'Panabas' },
  { key:'ginunting', label:'Ginunting' },
  { key:'pirah',     label:'Pirah' },
  { key:'set',       label:'Sets & Special' },
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
    ? [...ALL_BLADES]
    : ALL_BLADES.filter(b => b.category === fcActiveFilter);
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
  count.textContent   = `Showing ${blades.length} of ${ALL_BLADES.length} blades`;
  label.textContent   = `${blades.length} blade${blades.length!==1?'s':''}`;

  blades.forEach((blade, idx) => {
    const card = document.createElement('div');
    card.className = 'fc-card';
    card.style.animationDelay = `${idx * 30}ms`;
    card.innerHTML = `
      <div class="fc-card-img">
        <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="200" fill="${blade.bg}"/>
          <defs><radialGradient id="fcg${blade.id}" cx="50%" cy="50%" r="48%">
            <stop offset="0%" stop-color="${blade.gradColor}" stop-opacity=".7"/>
            <stop offset="100%" stop-color="${blade.bg}"/>
          </radialGradient></defs>
          <rect width="300" height="200" fill="url(#fcg${blade.id})"/>
          ${blade.svgPath}
        </svg>
        <div class="fc-card-overlay">
          <button class="fc-qbtn" onclick="event.stopPropagation();openDrawer('${blade.id}')">Quick View</button>
          <button class="fc-qbtn" onclick="event.stopPropagation();closeFullCatalog();scrollToContact('${blade.name}')">Inquire</button>
        </div>
      </div>
      <div class="fc-card-body">
        <span class="fc-badge ${blade.badge==='Sold Out'?'sold':''}">${blade.badge}</span>
        <h3 class="fc-name">${blade.name}</h3>
        <p class="fc-meta">${blade.material} · ${blade.length}</p>
        <div class="fc-foot">
          <span class="fc-price">${blade.price >= 1000 ? '₱'+blade.price.toLocaleString() : '—'}</span>
          <div class="fc-arr">→</div>
        </div>
      </div>`;
    card.addEventListener('click', () => openDrawer(blade.id));
    grid.appendChild(card);
  });
}

function openFullCatalog() {
  const modal = document.getElementById('fullCatalogModal');
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  fcActiveFilter = 'all';
  fcActiveSort   = 'default';
  buildFCFilters();
  renderFCGrid(ALL_BLADES);
  modal.scrollTop = 0;
  document.getElementById('fcSort').value = 'default';
  // Focus for accessibility
  document.getElementById('fcTitle').focus();
  document.getElementById('fcTitle').setAttribute('tabindex','-1');
}

function closeFullCatalog() {
  document.getElementById('fullCatalogModal').style.display = 'none';
  document.body.style.overflow = '';
}

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
  const blade = ALL_BLADES.find(b => b.id === id);
  if (!blade) return;

  document.getElementById('qdBody').innerHTML = `
    <div class="qd-blade-img">
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
        <rect width="400" height="300" fill="${blade.bg}"/>
        <defs><radialGradient id="qdg${blade.id}" cx="50%" cy="50%" r="52%">
          <stop offset="0%" stop-color="${blade.gradColor}" stop-opacity=".8"/>
          <stop offset="100%" stop-color="${blade.bg}"/>
        </radialGradient></defs>
        <rect width="400" height="300" fill="url(#qdg${blade.id})"/>
        <g transform="scale(1.35) translate(10,25)">${blade.svgPath}</g>
      </svg>
    </div>
    <span style="display:inline-flex;align-items:center;gap:4px;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;">
      ✦ ${blade.badge}
    </span>
    <h2 class="qd-title" id="qdTitle">${blade.name}</h2>
    <p class="qd-meta">${blade.category.charAt(0).toUpperCase()+blade.category.slice(1)} · ${blade.material} · ${blade.length}</p>
    <p class="qd-desc">${blade.desc}</p>
    <table class="qd-specs">
      <tr><td>Steel</td><td>${blade.material}</td></tr>
      <tr><td>Blade Length</td><td>${blade.length}</td></tr>
      <tr><td>Weight</td><td>${blade.weight}</td></tr>
      <tr><td>Hardness</td><td>${blade.hrc} HRC</td></tr>
      <tr><td>Handle</td><td>${blade.handle}</td></tr>
      <tr><td>Edge Grind</td><td>${blade.edge}</td></tr>
      <tr><td>Sheath</td><td>${blade.sheath}</td></tr>
    </table>
    <div class="qd-price">₱${blade.price.toLocaleString()}</div>
    <div class="qd-ctas">
      <button class="btn-primary" onclick="closeDrawer();closeFullCatalog();scrollToContact('${blade.name}')">
        Inquire About This Blade
      </button>
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
  const filterPills = document.querySelectorAll('.filter-bar .filter-pill');
  const bladeCards = document.querySelectorAll('.blade-card');
  const filterCount = document.getElementById('filterCount');

  filterPills.forEach(pill => {
    pill.addEventListener('click', function() {
      filterPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
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
  galleryPills.forEach(pill => {
    pill.addEventListener('click', function() {
      galleryPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
    });
  });

});

/* --- UTILITY FUNCTIONS --- */
function scrollToContact(bladeName) {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  if (bladeName) {
    setTimeout(() => {
      const subjectEl = document.getElementById('subject');
      if (subjectEl) {
        subjectEl.value = 'Existing Blade';
        const msgEl = document.getElementById('message');
        if (msgEl && !msgEl.value) {
          msgEl.value = `I'm interested in the ${bladeName}. `;
          msgEl.focus();
        }
      }
    }, 600);
  }
}

function openQuickView(bladeName) {
  const blade = ALL_BLADES.find(b => b.name === bladeName);
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
