# Content review - items to confirm with Eshel HaYarden

Everything on the site was taken from eshelltd.co.il (crawled 26 Oct 2026).
Nothing below was invented, but these points are unclear, conflicting or
need the company's sign-off before going live.

## Facts that conflict on the current site

| # | Item | What the old site says | What the new site shows |
|---|------|------------------------|--------------------------|
| 1 | Years of experience | "מעל עשרים ושמונה שנים" (homepage meta), "עשרים וחמש" (site description), "30 שנות ניסיון" (urban renewal page) | "משנת 1994" on the main pages; "30" only on the urban-renewal page, as on the old site |
| 2 | Units delivered | About: "איכלסה רבבות יחידות דיור בארץ ובחו\"ל". Homepage counters show "0+" with no number | Not shown as a number. Please supply real figures (homes delivered, homes in planning, number of cities) if you want a counter |
| 3 | KAVA status | Listed under "בשיווק" with "לחץ כאן" to aura-project.co.il/kava | Shown as "בשיווק" with a link to the KAVA site |
| 4 | Green Danya status | Homepage lists it under "בתכנון"; the project page says "הפרויקט המצליח בחיפה" | Shown as "בתכנון" |
| 5 | Rova Alonim (both phases) | Listed under "בשיווק", but both pages say all units are sold (one retail unit left) | Kept under "בשיווק" with a "sold" note. Consider moving to occupied/completed |
| 6 | Migdalei HaNasi | Listed under "מאוכלסים" but the page says "מתאכלס בימים אלו" and "נותר פנטהאוז אחרון" | Shown as occupied, last-penthouse note removed. Confirm |
| 7 | Rova Alonim neighbourhood name | Page says "קרית רבין" in one heading and "קרית בגין" in the body | Neither name is used; "השכונה המערבית החדשה" |
| 8 | Neot Navon page slug | Old URL is "מבואות-דרומיים-ב-חיפה" while the title is "נאות נבון" | New URL /projects/neot-navon-haifa/ (old URL redirects) |
| 9 | Press date | "הושק פרויקט הדגל של אלעד" is dated "דצמבר 25, 2026" (future date) | Shown as December 2025. Confirm |
| 10 | Rechasim "Green Summit" article (June 2026) | Listed in press with no link | Listed without a link. Please supply the URL |

## Items deliberately left out

- **Kiryat Ata North images**: the old site only has a "coming soon" graphic. The page shows a text panel instead of a photo. Please supply a rendering.
- **Assisted living page** (/פרויקטי-דיור-מוגן/): contains only placeholder "lorem ipsum" text. Not rebuilt; mentioned in About only as on the old About page. The old URL redirects to About.
- **Mechir LaMishtaken page** (/מחיר-למשתכן/): a generic guide to the government programme, not company content. Old URL redirects to Projects. Can be restored if wanted.
- **Articles blog** (38 SEO articles): not migrated in this phase. The old /מאמרים/ URL redirects to the news page. Decide whether to migrate them (they carry some SEO value).
- **Prices** ("החל מ-3,680,000 ש\"ח" for Ahuzat Ya'ar, "2,300,000 ש\"ח" for the last Nofim apartment): left out, as prices change. Add back if marketing wants them.
- **Facebook reels** on the old homepage: not embedded (heavy iframes). The footer links to the Facebook, Instagram and YouTube channels.
- **Partner logos**: all 12 logos from the old homepage are shown. Confirm the list is current (e.g. whether Horowitz, Shem and Traklin should still appear).
- **Org-chart image** ("עץ" diagram on About): not used. It is an image of text and not accessible; can be rebuilt as HTML if the content is confirmed.

## English - please have a native reviewer confirm

- Company name: **Eshel HaYarden Development & Construction Ltd.** (from the logo tagline the client gave: "ESHEL HAYARDEN DEVELOPMENT & CONSTRUCTION").
- Programme names are transliterated with a short gloss: *Mechir Matara* (target price), *Mechir LaMishtaken*.
- Contractor class "ג'5" is written **G5**.
- "כוכב בטיחות של תוכנית הכוכבים בשיתוף התאחדות הקבלנים" is translated as "a safety star in the Stars programme with the Israel Builders Association". Confirm the official English name.
- Partner names in English: Megido Group, Geshem, Traklin, Riviera France Israel Ltd. Confirm spellings.
- Architects: Prof. Gabi Schwartz, Ilan Pivko.
- Neighbourhood spellings: Mol Arbel, Ein HaYam, Yefe Nof, Ramat Navon, Ramat Rabin, Rasco, Kiryat Rabin. Project names: Ahuzat Ya'ar, HaParsa, Rova Alonim, Lev HaPisga, Pisgat Sagi, Pisgat Michush, Beit Amichai.
- The English privacy policy is a convenience translation; it states that the Hebrew version prevails.
- The Hebrew logo is used on the English site (no English logo exists). Supply one if available.

## Operational settings to complete before launch

- **Forms**: no form backend is configured yet (`company.forms` in `src/data/site.mjs`). Until it is, forms open the visitor's email app pre-filled to mazkirut@eshelltd.co.il. Recommended: a Web3Forms (or similar) key routed to the secretariat, and possibly a separate address for resident inquiries.
- **Accessibility statement**: updated to describe the new site (the old one referred to the "UA User Accessibility" plugin, which is no longer used). Coordinator details are unchanged: Israel Meir Weil, ext. 127. Confirm.
- **Job postings**: the three current roles (JB-2000, JB-6000, JB-4000) are reproduced. Confirm they are still open.
- **Analytics / cookie banner**: the new site sets no tracking cookies, so no consent banner is shown. If Google Analytics / Meta Pixel are required, a consent banner must be added at the same time.
