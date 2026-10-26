// Project catalogue. Every project exists exactly once; each text field
// carries both languages. Facts come from the live eshelltd.co.il pages
// (source noted per project). Anything unclear is listed in CONTENT_REVIEW.md.
//
// status: "marketing" | "planning" | "occupied"
// images: "<folder>/<NN>" keys from src/images (first = hero)

export const projects = [
  // ------------------------------------------------------------ marketing
  {
    slug: "neot-navon-haifa",
    source: "/מבואות-דרומיים-ב-חיפה/",
    status: "marketing",
    featured: true,
    city: { he: "חיפה", en: "Haifa" },
    area: { he: "שכונת נאות נבון", en: "Neot Navon neighbourhood" },
    name: { he: "פרויקט הדגל בנאות נבון", en: "Neot Navon Flagship" },
    tagline: { he: "איכות חיים אל מול הים", en: "Living with the sea in view" },
    summary: {
      he: "786 יח\"ד ומסחר שכונתי על פני ארבעה מגרשים, באזור המבוקש ביותר בחיפה.",
      en: "786 homes and neighbourhood retail across four plots, in one of Haifa's most sought-after areas.",
    },
    body: {
      he: [
        "באזור המבוקש ביותר בחיפה, אשל הירדן מקימה פרויקט מגורים רחב היקף וייחודי, הכולל 786 יח\"ד למגורים ומסחר שכונתי הפרוסות על פני ארבעה מגרשים, בתמהיל מגוון של דירות שוק חופשי ודירות מחיר מטרה.",
        "המתחם משלב בנייני בוטיק בני 5 עד 9 קומות לצד מגדלים בני קומות רבות, עם מסחר שכונתי ופיתוח סביבתי מוקפד. בכל המתחמים יש חלל מרכזי של גינה ציבורית עם ספסלי ישיבה, צמחייה ותאורה, וחיבורים לשטחים הירוקים.",
      ],
      en: [
        "In one of Haifa's most sought-after areas, Eshel HaYarden is building a large-scale residential scheme of 786 homes with neighbourhood retail, laid out across four plots and combining open-market apartments with Mechir Matara (target-price) homes.",
        "The scheme pairs boutique buildings of 5 to 9 storeys with high-rise towers, neighbourhood shops and carefully landscaped grounds. Each compound is organised around a central public garden with seating, planting and lighting, linked to the surrounding green spaces.",
      ],
    },
    facts: [
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "786", en: "786" } },
      { label: { he: "מגרשים", en: "Plots" }, value: { he: "4", en: "4" } },
      { label: { he: "בינוי", en: "Building types" }, value: { he: "בנייני בוטיק 5-9 קומות ומגדלים", en: "5-9 storey boutique buildings and towers" } },
      { label: { he: "תמהיל", en: "Mix" }, value: { he: "שוק חופשי ומחיר מטרה", en: "Open market and Mechir Matara" } },
    ],
    highlights: {
      he: ["מסחר שכונתי ופיתוח סביבתי מוקפד", "גינה ציבורית מרכזית בכל מתחם", "סמיכות לכביש החוף, כביש 4 ומנהרות הכרמל", "קרבה לתחבורה ציבורית ולתחנת הרכבת"],
      en: ["Neighbourhood retail and landscaped public realm", "A central public garden in every compound", "Close to the Coastal Road, Route 4 and the Carmel Tunnels", "Near public transport and the railway station"],
    },
    map: "נאות נבון חיפה",
    images: ["neot-navon/00", "neot-navon/01", "neot-navon/02", "neot-navon/03", "neot-navon/04", "neot-navon/05", "neot-navon/06", "neot-navon/07"],
  },
  {
    slug: "kava-tiberias",
    source: "/סובב-כנרת/",
    status: "marketing",
    featured: true,
    city: { he: "טבריה", en: "Tiberias" },
    area: { he: "שכונת מול ארבל", en: "Mol Arbel neighbourhood" },
    name: { he: "KAVA - מול ארבל", en: "KAVA, Mol Arbel" },
    tagline: { he: "קו ראשון לנוף הכנרת", en: "Front row to the Sea of Galilee" },
    summary: {
      he: "כ-250 יחידות דיור בבנייה נמוכה, כ-200 מ' מחוף הכנרת. בשותפות עם קבוצת מגידו.",
      en: "Around 250 low-rise homes, some 200 metres from the shore of the Sea of Galilee. A joint venture with the Megido Group.",
    },
    body: {
      he: [
        "פרויקט יוקרה המשותף לחברות אשל הירדן וקבוצת מגידו, באחד המיקומים הייחודיים בארץ מעל החוף הפרטי שבכנרת, במיקום טופוגרפי הצופה לנוף פנורמי של הכנרת.",
        "הפרויקט תוכנן במשרד האדריכלים של פרופ' גבי שוורץ ועתיד לכלול כ-250 יחידות דיור בבנייה נמוכה בשכונת מול ארבל החדשה, הממוקמת מעל קו המים של הכנרת וצוק ארבל, בכניסה הצפונית לטבריה מעל כביש 438.",
        "השכונה מתפרשת על פני 195 דונם של פארקים ירוקים, ומתוכננים בה מבני ציבור ושטחי מסחר לטובת דייריה, עם גישה נפרדת מכביש 438.",
      ],
      en: [
        "A premium joint venture between Eshel HaYarden and the Megido Group, set above a private beach on the Sea of Galilee on a site that looks out across the whole lake.",
        "Designed by the architectural practice of Prof. Gabi Schwartz, the project will comprise around 250 low-rise homes in the new Mol Arbel neighbourhood, above the waterline and Mount Arbel cliff at the northern entrance to Tiberias, above Route 438.",
        "The neighbourhood spans 195 dunams of green parkland, with public buildings and retail planned for residents and a dedicated access road from Route 438.",
      ],
    },
    facts: [
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "כ-250", en: "Approx. 250" } },
      { label: { he: "מרחק מהחוף", en: "To the shore" }, value: { he: "כ-200 מ'", en: "Approx. 200 m" } },
      { label: { he: "שטח השכונה", en: "Neighbourhood" }, value: { he: "195 דונם", en: "195 dunams" } },
      { label: { he: "אדריכלות", en: "Architecture" }, value: { he: "משרד פרופ' גבי שוורץ", en: "Prof. Gabi Schwartz" } },
    ],
    partners: { he: "בשותפות עם קבוצת מגידו", en: "Joint venture with the Megido Group" },
    highlights: {
      he: ["נוף פנורמי לכנרת", "בנייה נמוכה", "גישה נפרדת מכביש 438", "מבני ציבור ושטחי מסחר בשכונה"],
      en: ["Panoramic views of the lake", "Low-rise architecture", "Dedicated access from Route 438", "Public buildings and retail within the neighbourhood"],
    },
    externalSite: "https://aura-project.co.il/kava/",
    video: "m1AQRcclKTQ",
    map: "שכונת מול ארבל טבריה",
    images: ["kava-tiberias/00", "kava-tiberias/01", "kava-tiberias/02", "kava-tiberias/03", "kava-tiberias/04", "kava-tiberias/05", "kava-tiberias/06", "kava-tiberias/07"],
  },
  {
    slug: "elad-center",
    source: "/אלעד-סנטר/",
    status: "marketing",
    featured: true,
    city: { he: "אלעד", en: "Elad" },
    area: { he: "מרכז העיר", en: "City centre" },
    name: { he: "אלעד סנטר", en: "Elad Center" },
    tagline: { he: "מגורים, מסחר ותעסוקה בלב העיר", en: "Homes, retail and workspace at the heart of the city" },
    summary: {
      he: "460 יח\"ד ו-40,000 מ\"ר של מסחר ותעסוקה, במיקום המרכזי ביותר בעיר אלעד.",
      en: "460 homes and 40,000 sqm of retail and employment space in the most central location in Elad.",
    },
    body: {
      he: [
        "במיקום המרכזי ביותר בעיר אלעד, אשל הירדן מקימה מיזם המשלב מגורים, מסחר ותעסוקה, עם טיילת ירוקה ואזורי מסחר פרושים בעלי גישה נוחה להולכי רגל.",
        "המיזם ממוקם סמוך לכביש 6 וכביש 444, ליד מבני חינוך וצירי תנועה מרכזיים, ומשתרע על פני כ-38,000 מ\"ר. במתחם פארק העסקים SkyPark.",
      ],
      en: [
        "In the most central location in Elad, Eshel HaYarden is developing a mixed-use scheme combining homes, retail and employment space, with a green promenade and open, pedestrian-friendly retail areas.",
        "The site of around 38,000 sqm sits close to Routes 6 and 444, beside schools and main traffic arteries, and includes the SkyPark business park.",
      ],
    },
    facts: [
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "460", en: "460" } },
      { label: { he: "מסחר ותעסוקה", en: "Retail and employment" }, value: { he: "40,000 מ\"ר", en: "40,000 sqm" } },
      { label: { he: "שטח המתחם", en: "Site area" }, value: { he: "כ-38,000 מ\"ר", en: "Approx. 38,000 sqm" } },
      { label: { he: "נגישות", en: "Access" }, value: { he: "כביש 6 וכביש 444", en: "Routes 6 and 444" } },
    ],
    highlights: {
      he: ["טיילת ירוקה ומסחר פתוח להולכי רגל", "פארק העסקים SkyPark", "סמיכות למבני חינוך ולצירי תנועה מרכזיים"],
      en: ["A green promenade and open-air retail", "The SkyPark business park", "Close to schools and main traffic routes"],
    },
    video: "xnOE0v4yMls",
    map: "אלעד",
    images: ["elad-center/00", "elad-center/01", "elad-center/02", "elad-center/03"],
  },
  {
    slug: "ahuzat-yaar-nofit",
    source: "/פרויקט-אחוזת-יער-בנופית/",
    status: "marketing",
    city: { he: "נופית", en: "Nofit" },
    area: { he: "הגליל התחתון", en: "Lower Galilee" },
    name: { he: "אחוזת יער", en: "Ahuzat Ya'ar" },
    tagline: { he: "וילות בוטיק בנופית", en: "Boutique villas in Nofit" },
    summary: {
      he: "14 וילות בנות 3 מפלסים, מוקפות גינה פרטית, עם מרפסות הצופות אל נוף הגליל.",
      en: "Fourteen three-level villas, each set in its own garden, with terraces facing the Galilee landscape.",
    },
    body: {
      he: [
        "נופית שוכנת בגובה 213 מ' מעל פני הים בגליל התחתון, ישוב כפרי ומבוקש המונה כ-700 משפחות. בלב הישוב מקימה אשל הירדן את וילות הבוטיק של אחוזת יער.",
        "הפרויקט כולל 14 וילות בנות 3 קומות, מוקפות גינה עם חניה פרטית ומרפסות הפונות אל הנוף הגלילי ושמי הים התיכון.",
      ],
      en: [
        "Nofit lies 213 metres above sea level in the Lower Galilee, a sought-after rural community of around 700 families. Here Eshel HaYarden is building the boutique villas of Ahuzat Ya'ar.",
        "The project comprises 14 three-storey villas, each surrounded by its own garden, with private parking and terraces facing the Galilee hills and the Mediterranean sky.",
      ],
    },
    facts: [
      { label: { he: "וילות", en: "Villas" }, value: { he: "14", en: "14" } },
      { label: { he: "מפלסים בכל וילה", en: "Levels per villa" }, value: { he: "3", en: "3" } },
      { label: { he: "כיווני אוויר", en: "Aspects" }, value: { he: "4", en: "4" } },
      { label: { he: "חניות צמודות", en: "Private parking" }, value: { he: "2", en: "2 spaces" } },
    ],
    highlights: {
      he: ["גינה היקפית פרטית לכל וילה", "מרפסות עם נוף פנורמי לגליל", "קהילה כפרית ותיקה"],
      en: ["A private wrap-around garden for every villa", "Terraces with panoramic Galilee views", "An established rural community"],
    },
    phone: "*2491",
    video: "Rd0FnexBILc",
    map: "נופית",
    images: ["ahuzat-yaar/00", "ahuzat-yaar/01", "ahuzat-yaar/02", "ahuzat-yaar/03", "ahuzat-yaar/04"],
  },
  {
    slug: "haparsa-rechasim",
    source: "/שכונת-הפרסה-ברכסים/",
    status: "marketing",
    featured: true,
    city: { he: "רכסים", en: "Rechasim" },
    area: { he: "גבעת הפרסה", en: "HaParsa hill" },
    name: { he: "שכונת הפרסה", en: "HaParsa" },
    tagline: { he: "בניינים מדורגים מול הרי הכרמל", en: "Terraced buildings facing the Carmel" },
    summary: {
      he: "278 יחידות דיור ב-13 בניינים ומסחר שכונתי של כ-1,000 מ\"ר. המכירה המוקדמת החלה.",
      en: "278 homes in 13 buildings with around 1,000 sqm of neighbourhood retail. Early sales have opened.",
    },
    body: {
      he: [
        "רכסים נמצאת בתנופת התפתחות, ושכונת הפרסה החדשה, על גבעת הפרסה, תגדיל את אוכלוסיית היישוב באופן משמעותי. אשל הירדן מתכננת בה פרויקט למגורים ומסחר.",
        "הפרויקט כולל 278 יח\"ד בשוק החופשי ובמחיר מטרה ב-13 בניינים, עם מסחר שכונתי של כ-1,000 מ\"ר. הבניינים מדורגים, בני 6 עד 10 קומות, עם גינות צמודות ומרפסות רחבות הכוללות אופציה לסוכה.",
        "תמהיל הדירות כולל דירות 3 עד 7 חדרים, דירות גן ופנטהאוז, הצופות אל נוף הרי הכרמל. לשכונה מתוכננת כניסה נפרדת מכביש 762, דקות מכביש 6.",
      ],
      en: [
        "Rechasim is growing fast, and the new HaParsa neighbourhood on HaParsa hill will substantially enlarge the town. Eshel HaYarden is planning a residential and retail scheme there.",
        "The project comprises 278 homes, open-market and Mechir Matara, in 13 buildings, with around 1,000 sqm of neighbourhood retail. The buildings step down the hill at 6 to 10 storeys, with private gardens and wide terraces designed to accommodate a sukkah.",
        "Apartments range from 3 to 7 rooms, including garden apartments and penthouses, all looking out to the Carmel hills. The neighbourhood will have its own entrance from Route 762, minutes from Route 6.",
      ],
    },
    facts: [
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "278", en: "278" } },
      { label: { he: "בניינים", en: "Buildings" }, value: { he: "13, בני 6-10 קומות", en: "13, of 6-10 storeys" } },
      { label: { he: "מסחר שכונתי", en: "Retail" }, value: { he: "כ-1,000 מ\"ר", en: "Approx. 1,000 sqm" } },
      { label: { he: "דירות", en: "Apartments" }, value: { he: "3-7 חדרים, גן ופנטהאוז", en: "3-7 rooms, garden and penthouse" } },
    ],
    highlights: {
      he: ["מרפסות רחבות עם אופציה לסוכה", "נוף פנורמי להרי הכרמל", "כניסה נפרדת מכביש 762", "טיילת להולכי רגל ושבילי אופניים"],
      en: ["Wide terraces designed for a sukkah", "Panoramic views of the Carmel", "Dedicated entrance from Route 762", "Pedestrian promenade and cycle paths"],
    },
    note: { he: "המכירה המוקדמת החלה", en: "Early sales now open" },
    phone: "*3569",
    video: "Q-nmLvvfSNg",
    map: "רכסים",
    images: ["haparsa-rechasim/00", "haparsa-rechasim/01", "haparsa-rechasim/02", "haparsa-rechasim/03", "haparsa-rechasim/04", "haparsa-rechasim/05"],
  },
  {
    slug: "rova-alonim",
    source: "/פרויקט-רובע-אלונים/",
    status: "marketing",
    city: { he: "מגדל העמק", en: "Migdal HaEmek" },
    area: { he: "השכונה המערבית החדשה", en: "New western neighbourhood" },
    name: { he: "רובע אלונים", en: "Rova Alonim" },
    tagline: { he: "מגורים ומסחר במערב מגדל העמק", en: "Homes and retail in western Migdal HaEmek" },
    summary: {
      he: "כ-227 יחידות דיור ומסחר בוטיק שכונתי, בשותפות עם קבוצת מגידו. כל הדירות נמכרו.",
      en: "Around 227 homes and boutique neighbourhood retail, a joint venture with the Megido Group. All apartments sold.",
    },
    body: {
      he: [
        "פרויקט משותף של אשל הירדן וקבוצת מגידו הכולל כ-227 יחידות דיור, בתמהיל מגוון של דירות רגילות, דירות גן, פנטהאוזים, דופלקסים וקוטג'ים.",
        "הפרויקט מוקם בשכונה החדשה במערב מגדל העמק, שעתידה לכלול כ-1,700 יח\"ד, בצמוד ליציאה המערבית של העיר לכיוון צומת נהלל. בפרויקט מתחם מסחר בוטיק שכונתי של כ-450 מ\"ר.",
      ],
      en: [
        "A joint venture between Eshel HaYarden and the Megido Group comprising around 227 homes, with a broad mix of apartments, garden apartments, penthouses, duplexes and cottages.",
        "The project sits in the new neighbourhood in western Migdal HaEmek, planned for around 1,700 homes, beside the town's western exit towards Nahalal Junction. It includes around 450 sqm of boutique neighbourhood retail.",
      ],
    },
    facts: [
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "כ-227", en: "Approx. 227" } },
      { label: { he: "מסחר בוטיק", en: "Boutique retail" }, value: { he: "כ-450 מ\"ר", en: "Approx. 450 sqm" } },
      { label: { he: "השכונה", en: "Neighbourhood" }, value: { he: "כ-1,700 יח\"ד מתוכננות", en: "Approx. 1,700 homes planned" } },
    ],
    partners: { he: "בשותפות עם קבוצת מגידו", en: "Joint venture with the Megido Group" },
    highlights: {
      he: ["תמהיל דירות מגוון במיוחד", "מסחר בוטיק בלב השכונה", "כ-10 דקות נסיעה לפארק ההייטק ביוקנעם"],
      en: ["An unusually broad mix of home types", "Boutique retail at the heart of the neighbourhood", "About 10 minutes' drive to the Yokneam high-tech park"],
    },
    note: { he: "כל הדירות נמכרו. נותר שטח מסחר אחרון באכלוס מיידי.", en: "All apartments sold. One final retail unit remains, ready for immediate occupancy." },
    phone: "050-6274196",
    map: "מגדל העמק",
    images: ["rova-alonim/00", "rova-alonim/01", "rova-alonim/02", "rova-alonim/03", "rova-alonim/04"],
  },
  {
    slug: "rova-alonim-villas",
    source: "/פרויקט-רובע-אלונים-צמודי-קרקע/",
    status: "marketing",
    city: { he: "מגדל העמק", en: "Migdal HaEmek" },
    area: { he: "השכונה המערבית החדשה", en: "New western neighbourhood" },
    name: { he: "רובע אלונים - צמודי קרקע", en: "Rova Alonim Villas" },
    tagline: { he: "וילות פרטיות מול שדות העמק", en: "Private villas facing the valley fields" },
    summary: {
      he: "61 וילות בשלושה דגמים, השלב האחרון ברובע אלונים. כל הוילות נמכרו.",
      en: "Sixty-one villas in three designs, the final phase of Rova Alonim. All villas sold.",
    },
    body: {
      he: [
        "פרויקט משותף של אשל הירדן וקבוצת מגידו הכולל 61 וילות בשכונה המערבית החדשה במגדל העמק, ומהווה את השלב האחרון בפרויקט רובע אלונים.",
        "הפרויקט מציע שלושה דגמים של וילות, באזור הבנייה הנמוכה של השכונה הנושקת לפארק ההייטק רמת גבריאל, סמוך ליציאה המערבית של העיר לכיוון צומת נהלל.",
      ],
      en: [
        "A joint venture between Eshel HaYarden and the Megido Group comprising 61 villas in the new western neighbourhood of Migdal HaEmek, forming the final phase of Rova Alonim.",
        "Three villa designs are offered in the low-rise part of the neighbourhood, which borders the Ramat Gavriel high-tech park near the town's western exit towards Nahalal Junction.",
      ],
    },
    facts: [
      { label: { he: "וילות", en: "Villas" }, value: { he: "61", en: "61" } },
      { label: { he: "דגמים", en: "Designs" }, value: { he: "3", en: "3" } },
    ],
    partners: { he: "בשותפות עם קבוצת מגידו", en: "Joint venture with the Megido Group" },
    note: { he: "כל הוילות נמכרו", en: "All villas sold" },
    map: "מגדל העמק",
    images: ["rova-alonim-villas/00", "rova-alonim-villas/01", "rova-alonim-villas/02", "rova-alonim-villas/03", "rova-alonim-villas/04", "rova-alonim-villas/05", "rova-alonim-villas/06", "rova-alonim-villas/07", "rova-alonim-villas/08"],
  },
  {
    slug: "nofim-maalot",
    source: "/פרויקט-נופים/",
    status: "marketing",
    city: { he: "מעלות-תרשיחא", en: "Ma'alot-Tarshiha" },
    area: { he: "שכונת יפה נוף", en: "Yefe Nof neighbourhood" },
    name: { he: "נופים", en: "Nofim" },
    tagline: { he: "מדורגי בוטיק בלב חורש טבעי", en: "Boutique terraced homes in natural woodland" },
    summary: {
      he: "6 מבני בוטיק, 2 דירות בקומה ושלושה כיווני אוויר, מול אגם מונפורט והרי הגליל המערבי.",
      en: "Six boutique buildings with two homes per floor and three aspects, facing Lake Montfort and the Western Galilee hills.",
    },
    body: {
      he: [
        "מתחם מדורגי הבוטיק של מעלות-תרשיחא, בקצה רחוב אשכולות בשכונת יפה נוף, הגובלת בשווייץ הקטנה ובכפר ורדים.",
        "בלב חורש טבעי, 6 מבני בוטיק באדריכלות חדשנית, 2 דירות בלבד בקומה ושלושה כיווני אוויר, עם נוף לאגם מונפורט ולהרי הגליל המערבי.",
      ],
      en: [
        "A boutique terraced development in Ma'alot-Tarshiha, at the end of Eshkolot Street in the Yefe Nof neighbourhood, bordering Little Switzerland and Kfar Vradim.",
        "Set in natural woodland, six boutique buildings of contemporary design offer just two homes per floor and three aspects, with views of Lake Montfort and the Western Galilee hills.",
      ],
    },
    facts: [
      { label: { he: "מבני בוטיק", en: "Boutique buildings" }, value: { he: "6", en: "6" } },
      { label: { he: "דירות בקומה", en: "Homes per floor" }, value: { he: "2", en: "2" } },
      { label: { he: "כיווני אוויר", en: "Aspects" }, value: { he: "3", en: "3" } },
    ],
    note: { he: "נותרה דירת גן דו-מפלסית אחרונה, באכלוס מיידי", en: "One final two-level garden apartment remains, ready for immediate occupancy" },
    phone: "*2491",
    map: "יפה נוף מעלות תרשיחא",
    images: ["nofim-maalot/00", "nofim-maalot/01", "nofim-maalot/02", "nofim-maalot/03"],
  },

  // ------------------------------------------------------------ planning
  {
    slug: "danya-haifa",
    source: "/פרויקט-דניה-הירוקה/",
    status: "planning",
    city: { he: "חיפה", en: "Haifa" },
    area: { he: "מורדות הכרמל, דרום שכונת דניה", en: "Carmel slopes, southern Danya" },
    name: { he: "דניה הירוקה", en: "Green Danya" },
    tagline: { he: "222 בתים על מורדות הכרמל", en: "222 houses on the slopes of the Carmel" },
    summary: {
      he: "222 בתים צמודי קרקע על כ-107 דונם, ו-50% משטח הפרויקט ריאה ירוקה.",
      en: "222 houses on around 107 dunams, with half of the site kept as green open space.",
    },
    body: {
      he: [
        "פרויקט דניה הירוקה משתרע על שטח של כ-107 דונם על מורדות הכרמל, בדרום שכונת דניה, וכולל 222 בתים צמודי קרקע המשתלבים בנוף הכרמל, על מגרשים בגודל של 600 עד 1,100 מ\"ר.",
        "50% משטח הפרויקט יהווה ריאה ירוקה עם שבילי הליכה ואופניים שיחברו את שכונת דניה לפארק הכרמל. בשכונה מרכז מסחרי שכונתי, מבנה ציבור ומלון בוטיק בן 50 חדרים. הבתים צופים לדרום, לפארק הכרמל, ולמערב, לים.",
      ],
      en: [
        "Green Danya covers around 107 dunams on the slopes of the Carmel in southern Danya, with 222 houses designed to sit within the Carmel landscape on plots of 600 to 1,100 sqm.",
        "Half of the site will remain green open space, with walking and cycle paths linking Danya to Carmel Park. The plan includes a neighbourhood shopping centre, a public building and a 50-room boutique hotel. The houses face south to Carmel Park and west to the sea.",
      ],
    },
    facts: [
      { label: { he: "בתים צמודי קרקע", en: "Houses" }, value: { he: "222", en: "222" } },
      { label: { he: "שטח", en: "Site area" }, value: { he: "כ-107 דונם", en: "Approx. 107 dunams" } },
      { label: { he: "גודל מגרש", en: "Plot size" }, value: { he: "600-1,100 מ\"ר", en: "600-1,100 sqm" } },
      { label: { he: "שטח ירוק", en: "Green space" }, value: { he: "50% מהשטח", en: "50% of the site" } },
    ],
    highlights: {
      he: ["שבילים המחברים לפארק הכרמל", "מלון בוטיק בן 50 חדרים", "נוף לים ולפארק הכרמל"],
      en: ["Paths connecting to Carmel Park", "A 50-room boutique hotel", "Views of the sea and Carmel Park"],
    },
    map: "שכונת דניה חיפה",
    images: ["danya-haifa/00"],
  },
  {
    slug: "beit-amichai-akko",
    source: "/פרויקט-בית-עמיחי-בעכו/",
    status: "planning",
    city: { he: "עכו", en: "Akko" },
    area: { he: "מרכז העיר", en: "City centre" },
    name: { he: "בית עמיחי", en: "Beit Amichai" },
    tagline: { he: "בית שהוא קהילה", en: "A building that is a community" },
    summary: {
      he: "2 בנייני מגורים ו-64 יח\"ד במרכז עכו, בצמוד לתחנת הרכבת ולתחנה המרכזית.",
      en: "Two residential buildings with 64 homes in central Akko, beside the railway and central bus stations.",
    },
    body: {
      he: [
        "מתחם מגורים חדש בעל צביון דתי-לאומי ומאפיינים קהילתיים במרכז העיר עכו, בהובלת גרעין אומץ ומכינת אבנר.",
        "בפרויקט 2 בנייני מגורים ו-64 יח\"ד, דירות 3, 4 ו-5 חדרים עם מרפסות ופנטהאוזים של 5 ו-6 חדרים. המרחבים המשותפים כוללים מבואות מרווחות, מרחבים מוגנים קומתיים דו-תכליתיים ושטחים פתוחים, וגג הארקדה מונגש לרווחת הדיירים.",
      ],
      en: [
        "A new residential community with a religious-Zionist character in central Akko, led by the Ometz community group and the Avner pre-military academy.",
        "Two buildings provide 64 homes: 3, 4 and 5-room apartments with balconies, plus 5 and 6-room penthouses. Shared spaces include generous lobbies, dual-use protected rooms on each floor and open areas, with the arcade roof landscaped for residents.",
      ],
    },
    facts: [
      { label: { he: "בניינים", en: "Buildings" }, value: { he: "2", en: "2" } },
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "64", en: "64" } },
      { label: { he: "דירות", en: "Apartments" }, value: { he: "3-5 חדרים ופנטהאוזים", en: "3-5 rooms and penthouses" } },
    ],
    highlights: {
      he: ["סמיכות לתחנת הרכבת ולתחנה המרכזית", "מרחבים משותפים לחיי קהילה", "גג ארקדה מגונן לרווחת הדיירים"],
      en: ["Beside the railway and central bus stations", "Shared spaces for community life", "A landscaped arcade roof for residents"],
    },
    map: "תחנת רכבת עכו",
    images: ["beit-amichai-akko/00", "beit-amichai-akko/01", "beit-amichai-akko/02", "beit-amichai-akko/03", "beit-amichai-akko/04"],
  },
  {
    slug: "rechasim-mixed-use",
    source: "/רכסים/",
    status: "planning",
    city: { he: "רכסים", en: "Rechasim" },
    area: { he: "עמק זבולון", en: "Zevulun Valley" },
    name: { he: "רכסים - מגורים, מסחר ומלונאות", en: "Rechasim Mixed-Use" },
    tagline: { he: "מתחם עירוב שימושים", en: "A mixed-use quarter" },
    summary: {
      he: "200 יחידות אירוח, 80 יחידות דיור ו-3,500 מ\"ר מסחר. בתכנון ראשוני.",
      en: "200 hotel rooms, 80 homes and 3,500 sqm of retail. In early planning.",
    },
    body: {
      he: [
        "בעמק זבולון, כ-5 ק\"מ מחיפה, יוקם במסגרת תכנית המתאר של רכסים מתחם עירוב שימושים הכולל מלון, שטחי מסחר ומגורים.",
        "במתחם 200 יחידות אירוח ו-80 יחידות דיור, סביב חלל ציבורי פתוח הפונה לנוף השדות. המלון מתוכנן על גג 3,500 מ\"ר שטחי מסחר, ומתחתיו חניון תת-קרקעי בן שתי קומות.",
      ],
      en: [
        "In the Zevulun Valley, about 5 km from Haifa, the Rechasim master plan provides for a mixed-use quarter combining a hotel, retail and homes.",
        "The scheme comprises 200 hotel rooms and 80 homes arranged around an open public space facing the fields. The hotel sits above 3,500 sqm of retail, over a two-level underground car park.",
      ],
    },
    facts: [
      { label: { he: "יחידות אירוח", en: "Hotel rooms" }, value: { he: "200", en: "200" } },
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "80", en: "80" } },
      { label: { he: "מסחר", en: "Retail" }, value: { he: "3,500 מ\"ר", en: "3,500 sqm" } },
      { label: { he: "שלב", en: "Stage" }, value: { he: "תכנון ראשוני", en: "Early planning" } },
    ],
    map: "רכסים",
    images: ["rechasim-mixed-use/00", "rechasim-mixed-use/01"],
  },
  {
    slug: "rechasim-cbd",
    source: "/מער-ברכסים/",
    status: "planning",
    city: { he: "רכסים", en: "Rechasim" },
    area: { he: "מרכז העסקים הראשי", en: "Central business district" },
    name: { he: "מע\"ר רכסים", en: "Rechasim Business Center" },
    tagline: { he: "משרדים ומסחר ליד מחלף כביש 6", en: "Offices and retail by the Route 6 interchange" },
    summary: {
      he: "מבנה בן 5 קומות של משרדים ומסחר, כ-6,000 מ\"ר שטחי בנייה. בתכנון מתקדם.",
      en: "A five-storey office and retail building of around 6,000 sqm. In advanced planning.",
    },
    body: {
      he: [
        "בסמוך לחיפה והקריות, צמוד למחלף כביש 6 ולצירי תחבורה ראשיים, יוקם מתחם עסקים חדש: מבנה בן 5 קומות של משרדים ומסחר, עם כ-6,000 מ\"ר שטחי בנייה.",
        "למבנה חניון תת-קרקעי, קומת קרקע עם ארקדה מקורה הפונה לשדרת הרחוב, פתחים גבוהים, מרפסות גדולות בכל קומה ושימוש באבן ועץ. המבנה ממוקם ליד בית העירייה ומסוף התחבורה העתידי של היישוב.",
      ],
      en: [
        "Close to Haifa and the Krayot, beside the Route 6 interchange and major transport routes, a new business centre: a five-storey office and retail building of around 6,000 sqm.",
        "The design includes an underground car park, a covered ground-floor arcade along the street, tall openings, large terraces on every floor and a palette of stone and timber. The building stands next to the town hall and the town's future transport terminal.",
      ],
    },
    facts: [
      { label: { he: "קומות", en: "Storeys" }, value: { he: "5", en: "5" } },
      { label: { he: "שטחי בנייה", en: "Built area" }, value: { he: "כ-6,000 מ\"ר", en: "Approx. 6,000 sqm" } },
      { label: { he: "שלב", en: "Stage" }, value: { he: "תכנון מתקדם", en: "Advanced planning" } },
    ],
    map: "רכסים",
    images: ["rechasim-cbd/00"],
  },
  {
    slug: "kiryat-ata-north",
    source: "/פריוקט-קרית-אתא/",
    status: "planning",
    city: { he: "קרית אתא", en: "Kiryat Ata" },
    area: { he: "קרית אתא צפון", en: "Kiryat Ata North" },
    name: { he: "קרית אתא צפון", en: "Kiryat Ata North" },
    tagline: { he: "המרכז החדש של קרית אתא", en: "The new centre of Kiryat Ata" },
    summary: {
      he: "1,122 יח\"ד, 38,000 מ\"ר מסחר ו-65,000 מ\"ר תעסוקה. בשותפות עם ריביירה צרפת ישראל.",
      en: "1,122 homes, 38,000 sqm of retail and 65,000 sqm of employment space. With Riviera France Israel.",
    },
    body: {
      he: [
        "אשל הירדן, בשותפות עם חברת ריביירה צרפת ישראל בע\"מ, מקדמת פרויקט המהווה חלק מרכזי בפיתוח המרכז החדש של קרית אתא צפון: 1,122 יח\"ד בשוק החופשי, 38,000 מ\"ר שטחי מסחר ו-65,000 מ\"ר שטחי תעסוקה.",
        "הפרויקט כולל שלושה מתחמים על פני יותר מ-100 דונם, הצופים לכיכר עירונית ולשטחים ירוקים. בתכנון עובר בו תוואי הרכבת הקלה \"נופית\", עם 2 תחנות במרכז העיר החדש.",
      ],
      en: [
        "Together with Riviera France Israel Ltd., Eshel HaYarden is advancing a central part of the new town centre of Kiryat Ata North: 1,122 open-market homes, 38,000 sqm of retail and 65,000 sqm of employment space.",
        "Three compounds extend over more than 100 dunams, overlooking a civic square and green spaces. The planned Nofit light-rail line will cross the site, with two stations in the new centre.",
      ],
    },
    facts: [
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "1,122", en: "1,122" } },
      { label: { he: "מסחר", en: "Retail" }, value: { he: "38,000 מ\"ר", en: "38,000 sqm" } },
      { label: { he: "תעסוקה", en: "Employment" }, value: { he: "65,000 מ\"ר", en: "65,000 sqm" } },
      { label: { he: "שטח", en: "Site area" }, value: { he: "מעל 100 דונם", en: "Over 100 dunams" } },
    ],
    partners: { he: "בשותפות עם ריביירה צרפת ישראל בע\"מ", en: "With Riviera France Israel Ltd." },
    map: "קרית אתא",
    images: [],
  },

  // ------------------------------------------------------------ occupied
  {
    slug: "terasa-karmiel",
    source: "/פרויקט-טרסה/",
    status: "occupied",
    year: 2025,
    city: { he: "כרמיאל", en: "Karmiel" },
    area: { he: "שכונת רמת נבון", en: "Ramat Navon neighbourhood" },
    name: { he: "טרסה", en: "Terasa" },
    tagline: { he: "חמישה מתחמים על צלע הר כרמי", en: "Five compounds on the slope of Mount Karmi" },
    summary: {
      he: "222 יח\"ד ב-30 בניינים, מחיר למשתכן. אוכלס ב-2025.",
      en: "222 homes in 30 buildings under the Mechir LaMishtaken programme. Occupied in 2025.",
    },
    body: {
      he: [
        "בשכונת רמת נבון בכרמיאל נבנה פרויקט מגורים במסגרת 'מחיר למשתכן' ו'משפרי דיור': 222 יח\"ד על צלע הר כרמי, הפונות מזרחה אל הרי הגליל התחתון, גוש שגב והעיר כרמיאל.",
        "30 בניינים עם ממוצע של 7 דירות בכל בניין, רובן עם גינה או מרפסות פנטהאוז. הפרויקט בנוי בחמישה מתחמים בגבהים שונים על צלע ההר, ומכאן שמו.",
      ],
      en: [
        "In Karmiel's Ramat Navon neighbourhood, a residential project built under the Mechir LaMishtaken and upgrader-housing programmes: 222 homes on the slope of Mount Karmi, facing east to the Lower Galilee hills, the Segev bloc and Karmiel.",
        "Thirty buildings average seven apartments each, most with a garden or penthouse terrace. The project steps across the hillside in five compounds at different levels, which gives it its name.",
      ],
    },
    facts: [
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "222", en: "222" } },
      { label: { he: "בניינים", en: "Buildings" }, value: { he: "30", en: "30" } },
      { label: { he: "מסלול", en: "Programme" }, value: { he: "מחיר למשתכן", en: "Mechir LaMishtaken" } },
      { label: { he: "אכלוס", en: "Occupied" }, value: { he: "2025", en: "2025" } },
    ],
    map: "רמת נבון כרמיאל",
    images: ["terasa-karmiel/00", "terasa-karmiel/01", "terasa-karmiel/02", "terasa-karmiel/03"],
  },
  {
    slug: "migdalei-hanasi-nahariya",
    source: "/פרויקט-מגדלי-הנשיא/",
    status: "occupied",
    city: { he: "נהריה", en: "Nahariya" },
    area: { he: "שכונת רסקו", en: "Rasco neighbourhood" },
    name: { he: "מגדלי הנשיא", en: "HaNasi Towers" },
    tagline: { he: "בין הים הפתוח לכביש 4", en: "Between the open sea and Route 4" },
    summary: {
      he: "שלושה בנייני בוטיק ושלושה מגדלים, 292 יח\"ד. בשותפות עם חברת גשם.",
      en: "Three boutique buildings and three towers with 292 homes. A joint venture with Geshem.",
    },
    body: {
      he: [
        "בשותפות עם חברת גשם נבנה פרויקט בשכונת רסקו בנהריה, בין הים הפתוח לכביש 4, מוקף שטחים חקלאיים ואזורים ירוקים.",
        "הפרויקט כולל שלושה בנייני בוטיק ושלושה מגדלים, 292 יח\"ד, עם נוף לים ולפארק חדש, ובמרחק הליכה מטיילת עם שבילי אופניים. תכנון: האדריכל אילן פיבקו. השכונה כ-5 דקות נסיעה מתחנת הרכבת של נהריה.",
      ],
      en: [
        "Built with Geshem in Nahariya's Rasco neighbourhood, between the open sea and Route 4, surrounded by farmland and green space.",
        "Three boutique buildings and three towers provide 292 homes overlooking the sea and a large new park, within walking distance of a promenade with cycle paths. Architect: Ilan Pivko. The neighbourhood is about five minutes' drive from Nahariya station.",
      ],
    },
    facts: [
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "292", en: "292" } },
      { label: { he: "בינוי", en: "Buildings" }, value: { he: "3 בנייני בוטיק ו-3 מגדלים", en: "3 boutique buildings, 3 towers" } },
      { label: { he: "אדריכלות", en: "Architecture" }, value: { he: "אילן פיבקו", en: "Ilan Pivko" } },
    ],
    partners: { he: "בשותפות עם חברת גשם", en: "Joint venture with Geshem" },
    phone: "*6487",
    map: "שכונת רסקו נהריה",
    images: ["migdalei-hanasi-nahariya/00", "migdalei-hanasi-nahariya/01", "migdalei-hanasi-nahariya/02", "migdalei-hanasi-nahariya/03"],
  },
  {
    slug: "the-valley-nahariya",
    source: "/פרויקט-the-valley/",
    status: "occupied",
    year: 2023,
    city: { he: "נהריה", en: "Nahariya" },
    area: { he: "המתחם הצפוני", en: "Northern compound" },
    name: { he: "THE VALLEY", en: "THE VALLEY" },
    tagline: { he: "בין נופי הגליל לים", en: "Between the Galilee and the sea" },
    summary: {
      he: "6 בניינים ו-272 יח\"ד, בשותפות עם חברת גשם. אוכלס ב-2023.",
      en: "Six buildings and 272 homes, a joint venture with Geshem. Occupied in 2023.",
    },
    body: {
      he: [
        "בשותפות עם חברת גשם נבנה המתחם הצפוני מתוך חמישה מתחמים, עם תמהיל דירות של 3 עד 5 חדרים, מוקף גני משחקים ופארקים, בסמוך לכביש 89 המתחבר לכבישים 4 ו-6.",
        "THE VALLEY כולל 6 בניינים ו-272 יח\"ד, בין נופי הגליל והים. הפרויקט אוכלס בשנת 2023.",
      ],
      en: [
        "Built with Geshem, the northern compound of five offers 3 to 5-room apartments surrounded by playgrounds and parks, close to Route 89, which connects to Routes 4 and 6.",
        "THE VALLEY comprises six buildings and 272 homes between the Galilee and the sea. It was occupied in 2023.",
      ],
    },
    facts: [
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "272", en: "272" } },
      { label: { he: "בניינים", en: "Buildings" }, value: { he: "6", en: "6" } },
      { label: { he: "אכלוס", en: "Occupied" }, value: { he: "2023", en: "2023" } },
    ],
    partners: { he: "בשותפות עם חברת גשם", en: "Joint venture with Geshem" },
    map: "נהריה",
    images: ["the-valley-nahariya/00", "the-valley-nahariya/01"],
  },
  {
    slug: "white-neighborhood-karmiel",
    source: "/שכונה-לבנה/",
    status: "occupied",
    year: 2022,
    city: { he: "כרמיאל", en: "Karmiel" },
    area: { he: "רמת רבין", en: "Ramat Rabin" },
    name: { he: "השכונה הלבנה", en: "The White Neighbourhood" },
    tagline: { he: "ניקיון צורני וקווים נקיים", en: "Clean lines and formal restraint" },
    summary: {
      he: "שני מתחמים, סחלב ונרקיס, בתכנון האדריכל גבי שוורץ. אוכלס ב-2022.",
      en: "Two compounds, Sachlav and Narkis, designed by architect Gabi Schwartz. Occupied in 2022.",
    },
    body: {
      he: [
        "פרויקט שנבנה בשיתוף עם חברת טרקלין בכניסה לכרמיאל, בשכונת רמת רבין, הנושקת לפארק רבין ולפארק טללים.",
        "בשכונה שני מתחמי מגורים, סחלב ונרקיס, בכל אחד 5 בניינים בני 4 עד 9 קומות. התכנון הופקד בידי האדריכל גבי שוורץ. הפרויקט אוכלס ב-2022.",
      ],
      en: [
        "Built with Traklin at the entrance to Karmiel, in the Ramat Rabin neighbourhood beside Rabin Park and Tlalim Park.",
        "Two residential compounds, Sachlav and Narkis, each have five buildings of 4 to 9 storeys. The design is by architect Gabi Schwartz. The project was occupied in 2022.",
      ],
    },
    facts: [
      { label: { he: "מתחמים", en: "Compounds" }, value: { he: "2", en: "2" } },
      { label: { he: "בניינים", en: "Buildings" }, value: { he: "10, בני 4-9 קומות", en: "10, of 4-9 storeys" } },
      { label: { he: "אדריכלות", en: "Architecture" }, value: { he: "גבי שוורץ", en: "Gabi Schwartz" } },
      { label: { he: "אכלוס", en: "Occupied" }, value: { he: "2022", en: "2022" } },
    ],
    partners: { he: "בשיתוף עם חברת טרקלין", en: "With Traklin" },
    map: "רמת רבין כרמיאל",
    images: ["white-neighborhood-karmiel/00", "white-neighborhood-karmiel/01", "white-neighborhood-karmiel/02"],
  },
  {
    slug: "lev-hapisga-karmiel",
    source: "/פרויקט-לב-הפסגה/",
    status: "occupied",
    year: 2021,
    city: { he: "כרמיאל", en: "Karmiel" },
    area: { he: "שכונת רמת נבון", en: "Ramat Navon neighbourhood" },
    name: { he: "לב הפסגה", en: "Lev HaPisga" },
    tagline: { he: "שני מתחמים סביב מרחב פתוח", en: "Two compounds around an open space" },
    summary: {
      he: "15 מבני מגורים בני 5-7 קומות, 224 יח\"ד. אוכלס ב-2021.",
      en: "Fifteen residential buildings of 5-7 storeys with 224 homes. Occupied in 2021.",
    },
    body: {
      he: [
        "בשכונת רמת נבון בכרמיאל נבנה מתחם מגורים שתכנונו מדגיש חזות ייצוגית של צורה וצבע, והפניית הדירות לשמירה על פרטיות.",
        "שני מתחמים המתוכננים סביב מרחב פתוח לחניה וגינון, 15 מבני מגורים בני 5 עד 7 קומות ו-224 יח\"ד. הפרויקט אוכלס ב-2021.",
      ],
      en: [
        "A residential scheme in Karmiel's Ramat Navon neighbourhood, designed around a distinctive use of form and colour, with apartments oriented for privacy.",
        "Two compounds are arranged around open space for parking and planting, with 15 buildings of 5 to 7 storeys and 224 homes. Occupied in 2021.",
      ],
    },
    facts: [
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "224", en: "224" } },
      { label: { he: "בניינים", en: "Buildings" }, value: { he: "15, בני 5-7 קומות", en: "15, of 5-7 storeys" } },
      { label: { he: "אכלוס", en: "Occupied" }, value: { he: "2021", en: "2021" } },
    ],
    map: "רמת נבון כרמיאל",
    images: ["lev-hapisga-karmiel/00", "lev-hapisga-karmiel/01", "lev-hapisga-karmiel/02", "lev-hapisga-karmiel/03"],
  },
  {
    slug: "unew-migdal-haemek",
    source: "/פרוייקטים-מאוכלסים/פרויקט-unew/",
    status: "occupied",
    year: 2021,
    city: { he: "מגדל העמק", en: "Migdal HaEmek" },
    area: { he: "קרית רבין", en: "Kiryat Rabin" },
    name: { he: "UNEW", en: "UNEW" },
    tagline: { he: "מתחם מגורים פרטי בעמק", en: "A private residential enclave in the valley" },
    summary: {
      he: "2 מבנים בני 5-6 קומות, 56 יח\"ד. אוכלס במלואו ב-2021.",
      en: "Two buildings of 5-6 storeys with 56 homes. Fully occupied in 2021.",
    },
    body: {
      he: [
        "UNEW הוא מתחם מגורים פרטי במגדל העמק הכולל שני בניינים, עם תכנון ועיצוב חדשני, פיתוח סביבתי וחללים נרחבים: 2 מבני מגורים בני 5 עד 6 קומות ו-56 יח\"ד. הפרויקט אוכלס במלואו בשנת 2021.",
        "הפרויקט ממשיך את מתחם \"U בעמק\" ברחוב נחל צבי פינת הערבה בקרית רבין, 4 מבני מגורים ו-104 יח\"ד, שאוכלס בשנת 2015.",
      ],
      en: [
        "UNEW is a private residential enclave in Migdal HaEmek: two buildings of 5 to 6 storeys with 56 homes, generous interiors and landscaped grounds. It was fully occupied in 2021.",
        "It follows \"U BaEmek\" on Nahal Tzvi and HaArava Streets in Kiryat Rabin, four buildings with 104 homes, occupied in 2015.",
      ],
    },
    facts: [
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "56", en: "56" } },
      { label: { he: "בניינים", en: "Buildings" }, value: { he: "2, בני 5-6 קומות", en: "2, of 5-6 storeys" } },
      { label: { he: "אכלוס", en: "Occupied" }, value: { he: "2021", en: "2021" } },
    ],
    map: "קרית רבין מגדל העמק",
    images: ["unew-migdal-haemek/00", "unew-migdal-haemek/01", "unew-migdal-haemek/02"],
  },
  {
    slug: "pisgat-sagi-karmiel",
    source: "/פסגת-שגיא/",
    status: "occupied",
    year: 2020,
    city: { he: "כרמיאל", en: "Karmiel" },
    area: { he: "כרמיאל", en: "Karmiel" },
    name: { he: "פסגת שגיא", en: "Pisgat Sagi" },
    tagline: { he: "מגורים בכרמיאל", en: "Homes in Karmiel" },
    summary: {
      he: "13 מבני מגורים בני 3-7 קומות, 57 יח\"ד. אוכלס ב-2020.",
      en: "Thirteen residential buildings of 3-7 storeys with 57 homes. Occupied in 2020.",
    },
    body: {
      he: ["פרויקט מגורים של 13 מבני מגורים בני 3 עד 7 קומות, הכוללים 57 יח\"ד. הפרויקט אוכלס בשנת 2020."],
      en: ["A residential project of 13 buildings of 3 to 7 storeys, with 57 homes. Occupied in 2020."],
    },
    facts: [
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "57", en: "57" } },
      { label: { he: "בניינים", en: "Buildings" }, value: { he: "13, בני 3-7 קומות", en: "13, of 3-7 storeys" } },
      { label: { he: "אכלוס", en: "Occupied" }, value: { he: "2020", en: "2020" } },
    ],
    map: "כרמיאל",
    images: ["pisgat-sagi-karmiel/00", "pisgat-sagi-karmiel/01"],
  },
  {
    slug: "pisgat-michush-karmiel",
    source: "/פרויקט-פסגת-מכוש/",
    status: "occupied",
    year: 2016,
    city: { he: "כרמיאל", en: "Karmiel" },
    area: { he: "שכונת מכוש", en: "Michush neighbourhood" },
    name: { he: "פסגת מכוש", en: "Pisgat Michush" },
    tagline: { he: "קוטג'ים בשכונת מכוש", en: "Cottages in the Michush neighbourhood" },
    summary: {
      he: "9 מבני קוטג'ים, 57 יח\"ד. אוכלס במלואו ב-2016.",
      en: "Nine cottage buildings with 57 homes. Fully occupied in 2016.",
    },
    body: {
      he: ["פרויקט מגורי קוטג'ים של 9 מבני מגורים הכוללים 57 יח\"ד, במקום בעל נגישות מרכזית, חנייה מרווחת ונוף ירוק. אוכלס במלואו בשנת 2016."],
      en: ["A cottage development of nine buildings with 57 homes, centrally located with ample parking and green views. Fully occupied in 2016."],
    },
    facts: [
      { label: { he: "יחידות דיור", en: "Homes" }, value: { he: "57", en: "57" } },
      { label: { he: "מבנים", en: "Buildings" }, value: { he: "9", en: "9" } },
      { label: { he: "אכלוס", en: "Occupied" }, value: { he: "2016", en: "2016" } },
    ],
    map: "שכונת מכוש כרמיאל",
    images: ["pisgat-michush-karmiel/00", "pisgat-michush-karmiel/01"],
  },
];

// Urban-renewal schemes (shown on the urban-renewal page, source: /התחדשות-עירונית/)
export const renewal = [
  {
    id: "yokneam",
    city: { he: "יקנעם", en: "Yokneam" },
    name: { he: "יקנעם - הכניסה הצפונית", en: "Yokneam, northern gateway" },
    body: {
      he: "תוכנית ההתחדשות העירונית הגדולה ביותר בצפון, בשכונה הוותיקה בכניסה הצפונית ליקנעם, על שטח של כ-97 דונם. התכנון משלב מבני מגורים בגבהים שונים, מתחם ייעודי לדיור מוגן, שטחי מסחר ותעסוקה, מבני ציבור ושטחים פתוחים נרחבים.",
      en: "The largest urban-renewal plan in northern Israel, covering about 97 dunams in the established neighbourhood at Yokneam's northern entrance. The plan combines residential buildings of varying heights, a dedicated assisted-living compound, retail and employment space, public buildings and extensive open space.",
    },
    facts: [
      { label: { he: "יח\"ד קיימות", en: "Existing homes" }, value: { he: "כ-452", en: "Approx. 452" } },
      { label: { he: "יח\"ד חדשות", en: "New homes" }, value: { he: "כ-2,000", en: "Approx. 2,000" } },
      { label: { he: "שטח", en: "Area" }, value: { he: "כ-97 דונם", en: "Approx. 97 dunams" } },
    ],
    images: ["ur-yokneam/00", "ur-yokneam/01", "ur-yokneam/02", "ur-yokneam/03", "ur-yokneam/04", "ur-yokneam/05"],
  },
  {
    id: "migdal-haemek",
    city: { he: "מגדל העמק", en: "Migdal HaEmek" },
    name: { he: "מגדל העמק - קרן היסוד והנשיאים", en: "Migdal HaEmek, Keren HaYesod and HaNesi'im" },
    body: {
      he: "בדרום מגדל העמק, מול נופי העמק הפתוחים. התוכנית מחדשת את המרקם העירוני ויוצרת שכונת מגורים מודרנית עם שטחי מסחר, מבני ציבור, שטחים פתוחים ופיתוח סביבתי רחב.",
      en: "In southern Migdal HaEmek, overlooking the open valley. The plan renews the urban fabric with a modern residential neighbourhood, retail, public buildings, open space and extensive landscaping.",
    },
    facts: [
      { label: { he: "יח\"ד קיימות", en: "Existing homes" }, value: { he: "176", en: "176" } },
      { label: { he: "יח\"ד חדשות", en: "New homes" }, value: { he: "למעלה מ-1,000", en: "Over 1,000" } },
    ],
    images: ["ur-migdal-haemek/00", "ur-migdal-haemek/01", "ur-migdal-haemek/02", "ur-migdal-haemek/03", "ur-migdal-haemek/04"],
  },
  {
    id: "haifa-hatoren",
    city: { he: "חיפה", en: "Haifa" },
    name: { he: "חיפה - התורן", en: "Haifa, HaToren" },
    body: {
      he: "בקו הראשון לים, בלב שכונת עין הים הוותיקה בחיפה. הקרבה לחוף, הפיתוח הסביבתי והשטחים הירוקים יוצרים סביבת מגורים המשתלבת באופייה של השכונה ושל העיר.",
      en: "On Haifa's seafront, at the heart of the established Ein HaYam neighbourhood. The beach, landscaping and green spaces create a residential setting in keeping with the character of the neighbourhood and the city.",
    },
    facts: [
      { label: { he: "יח\"ד קיימות", en: "Existing homes" }, value: { he: "כ-230", en: "Approx. 230" } },
      { label: { he: "יח\"ד חדשות", en: "New homes" }, value: { he: "למעלה מ-1,000", en: "Over 1,000" } },
    ],
    images: ["ur-haifa-hatoren/00", "ur-haifa-hatoren/01", "ur-haifa-hatoren/02", "ur-haifa-hatoren/03", "ur-haifa-hatoren/04"],
  },
];
