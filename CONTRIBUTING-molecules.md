# Переніс молекул з Figma — шпаргалка для нового чату

Гілка: `claude/peaceful-franklin-tnrmh4`. Скіл: `.claude/skills/dobzha-storybook-ds` (підхоплюється сам).

## Стан

У `src/components/` лежать атоми та молекули з Figma. Молекули (`Molecules/…` у Storybook):

| Молекула | Примітка |
|---|---|
| Pagination, TabsHeader, BreadCrumbs, PaginationBar, TableActionsRow | |
| TableProductsHeader, TableProductsRow | темний заголовок і рядок таблиці продуктів |
| TableHeader | один компонент із пресетами `warehouses` / `categories` / `clients` або власними `columns` |
| TotalRow | рядок «Total» + кнопки (Button) |
| CardHeader | заголовок картки: бейдж-іконка + h3; `tone` `blue`/`violet`; слот `actions` |
| InfoClient | пари label/value; один flex-компонент, проп `justify` (`between` = Figma Line, `start` = Wrap) |
| ClientDetails | картка з довільним текстом |
| InfoBlock | `CardHeader` + `InfoClient` (або `children`); `variant="ticket"` (Figma TicketInfo/v1) — фіолетовий бейдж і `sections` (`DepartmentSection`) |
| CardRow | мобільна картка списку (Figma V1–V6) і варіанти 1024/768: один компонент, пропи `direction`, `index`, `selectable`, `image`, `imageSize`, `fields` (з `label` → двоколонкова лінія), `actions` |
| ProductCard | картка товару (Figma Card/Category): фото + бейдж + чекбокс, spec-рядки, слот `action` |
| OrderCard | картка замовлення (Card/Order): заголовок + кнопка, превʼю документа, рядки label/value |
| StepCard | крок процесу (Card/Step): круглa іконка, назва, дата |
| StatCard | число з підписом (Card/InProcessingV1+V2): `footer` + `watermark` або `aside` |
| Notification | повідомлення (Figma Notiffications): `kind` success/info/warning/error + `layout` toast/banner (Sign the Contract), `actions`, `onClose` |
| CardStrokeRow | рядок картки (Row.CardStroke): `label` ліворуч, `value` праворуч |
| DepartmentSection | секція панелі (Section.Department): заголовок + пілюля `ChevronDropDown` «Change» + підказка; усі тексти — пропи |
| RowInfoBlock | рядок списку з нижньою лінією (Figma RowInfoBlock): `variant` `pair` / `line` / `cells`, пропи `label`, `value`, `cells` |
| ChartLegendItem | елемент легенди графіка (ChartDescription): кольоровий квадрат, `value` («-»), `label`; пропи `color` |
| UserDropdown | юзер у шапці (Figma user): `Avatar` + імʼя + chevron; кнопка, `open` |
| DepartmentItem | відділ (Figma Department): квадратний `Avatar` + назва; `initials` |
| InfoRowCard | двоколонковий рядок картки (InfoRow.Card 1024px): `label` (semi-bold, 200px) + `value` |
| TableRowMobile | компактний рядок таблиці для вузьких екранів (Figma TableRow 360px/480px): `label` / `value` / `result` + кнопка `Button`; проп `size`, слот `action` |
| TableRowClient | рядок-картка таблиці клієнтів (Figma Table Row 14 / Table Row Hover Name): `name` (`nameHref` / `onNameClick`), `company`, `phone`, `email`, `joined`, `updated`, кнопка `More`; `forceNameHover` |
| CategoryCard | плитка категорії (Figma Card Category): картинка + назва в один рядок; `href` робить її посиланням, hover — стан (`:hover`/`:focus-visible`) |
| LogoBar | ліва частина хедера (Figma Logo, Icon - Navbar): бургер + `Logo` (`inverse`); `expanded`, `onMenuClick`, `href`, `hideMenu` |
| ViewSwitch | перемикач «View:» (Figma viewing style): іконки cards/list, `value`, `onChange` |
| ShowSelect | «Show: [8 ⌄]» (Figma viewing style 2): `FilterField` + список, `value`, `options`, `onChange`; його ж використовує `PaginationBar` |
| SwitchGroup | дріжка з `SwitchButton` (Figma Switch: Light / Dark + hover): `options`, `value`, `onChange`, `tone` |
| TimeTrackerTitle | Play-кнопка + «My Time» (Figma TimeTracker/Play Buttons and Title); `title`, `playProps` |
| TimeTrackerDate | іконка + дата + три кнопки prev/reset/next (Figma TimeTracker/Date) |
| NoRowsTable | заглушка порожньої таблиці (Figma No Rows table, desktop / phone-large / phone-small × light / dark): SVG-діаграма + водяний знак `Logo` + «Table has no rows»; `size`, `label`; сітка й осі — кольори зчитані з рендеру, потребують підтвердження |
| TimeTrackerBar | верхня панель трекера = Title + Date (Figma TimeTracker/Play Actions Menu) |
| AlertRow | рядок-підказка (Figma Welcome Card → Option 1/4/5): крапка + речення (`lead` Medium + решта) + `Button text-arrow`; `tone` warning / info |
| CheckListModal | діалог зі списком чекбоксів (Figma Info Modal): `Modal size="list" elevated` + `Button` у шапці + рядки `Checkbox`; `options`, `value`, `onChange`, `allLabel`, `searchable`, `description` |
| TimeScale | шкала дня з відпрацьованими періодами (Figma TimeTracker/Time Scale and Numbers); `segments` у годинах, `startHour`, `hours` |
| AccessModeRow | карта «Default / Custom» (Figma Edit User Access): два radio (`Checkbox`) + кнопка «Edit» (активна лише для Custom); `value`, `onChange`, `onEdit`, `disabled` |
| DocumentCard | карта документа (Figma Edit User Access New): іконка + заголовок + значення, вертикальні кнопки в `actions` |
| NavbarMenu | вертикальне меню сторінок (Figma Navbar Menu Tabs): `size` desktop/768/480/360, `collapsed` (= Style=Icons), `items`, `value`, `onChange` |
| ChatMessage | повідомлення чату (Figma Message): `direction` received/sent, `author` (аватар), `time`, `checked` |
| ChatHeader | шапка чату (Figma chat header): іконка + h5 `title` + `quote` |
| MessageBox | поле повідомлення (Figma message box): справжня форма з `input` і кнопкою send, `onSend`, `disabled`, `forceFocus` / `forceHover` |
| TableRowQuantity | рядок вибору кількості (Figma TableRows / Choice of quantity): `name`, `prices`, `InputField` 200px; порожнє поле з рамкою Stroke Light V2 |
| NoteCard | картка нотатки (Figma Notes: Static / Hover): текст у сірому блоці, `onMore` («more»), `date`; hover = рамка Headlines + `--shadow-hover-card-lg` |
| TableRowAnalytics | строка аналітичної таблиці (Figma Table Row Analytics 1–3): `cells` (`value`, `label`, `width`, `align`, `strong`, `truncate`, `group`); заголовки — пресети `productsAnalytics` / `paymentsAnalytics` у `TableHeader` |
| NotificationLine | рядок списку сповіщень (Figma NotificationLine): `message` + іконка з `date`; `type` `old`/`new`, `disabled`, `forceHover` |
| TableRowExpandable | картковий рядок таблиці продуктів (Figma Table Row Static/Hover/Active/Disabled): `ImageCard` + колонки + кнопка-перемикач; `expanded`, `onToggle` |
| FilterActions | мобільна панель (Figma Actions): `Button` «Filter» з `counter` + `SearchField` mobile; `filterCount`, `searchProps` |
| TimePicker | «01:20 PM» + два `Slider` (години 0–23, хвилини 0–59); `hours`/`minutes` або `defaultHours`/`defaultMinutes`, `onChange` |
| RadioGroupCard | підпис + сіра картка з рядом радіо (Figma Integrations for invoices): `title`, `options`, `value`/`defaultValue`, `onChange` |
| AudioPlayer | плеєр (Figma Player - Time Tracker): візуалізатор `levels`, таймлайн, play/pause, гучність; контрольований (`currentTime`, `duration`, `playing`, `volume`) |
| Modal | діалог (Figma Pop-up warehouse Desktop/Mobile): `Modal` + `ModalSection` + `ModalField`, `size`, `actions`; лише поверхня, без оверлею |
| Dropdown | панель меню (Figma Dropdown, 8 стилів): `variant` `list`/`notifications`/`user`, `control` `none`/`radio`/`checkbox`, `searchable` |

Усі експортуються з `src/index.ts`.

Нове з екрана «Клієнт → Orders»: `TableRowOrder` (`layout` row / card, `OrderStatus`), `TableToolbar` (Export / Clear / `filters` / View / Search; `compact` для ≤768px),
`CheckListModal` `variant` check / radio / pick + `accent`, `PageHeader` `onMenuClick`, `BreadCrumbs` `variant="back"`, пресет `orders` у `TableHeader`.

Нове з екрана «Pagination Responsive»: `IconButton` / `Pagination` `size="sm"` (24px, 10px цифри), `PaginationBar` `stacked` / `flat` / `siblingCount` (v1 = 2, v2 = 1),
`PageHeader` `size="compact"`, `TableToolbar` `showClear`, нова молекула `CardGrid` (адаптивна сітка карток, токен `--size-card-grid-min`).

## Prototypes

Цілі екрани з бібліотечних компонентів і фейкових даних: `src/prototypes/<Name>/`, заголовок історій `Prototypes/<Name>`, **не** експортуються з `src/index.ts`.
Одна історія на кожен брейкпоінт Figma (декоратор задає ширину кадру) + окремі історії для екранів фільтрів. Нові компоненти, потрібні екрану, живуть у `src/components`.
Прототипи: `ClientOrders` (1920 / 1440 / 1280 / 1024 / 768 / 480 / 360 + Filter menu / All Filters), `DepartmentUsers` (768 / 480 / 360 × пагінація v1 / v2). «Гілка Prototypes» у запиті = цей розділ Storybook.

## Organisms

Великі компоненти, зібрані лише з молекул. Заголовок історій — `Organisms/<Name>`.

| Organism | Примітка |
|---|---|
| ChatLayout | вся панель чату (Figma chat  layout v2): `ChatHeader` + тред `items` (`date` / `message`) + `MessageBox`; `onSend`, `messageBoxProps`, `height` (тред скролиться і тримається внизу) |
| TableProducts | таблиця продуктів (Figma Table - Products): `TableProductsHeader` + `TableProductsRow` з `rows`; `status` `ready` / `loading` / `error`, `emptyText`; у вузькому контейнері скролиться |
| TableClients | таблиця клієнтів (Figma Table/Row & Header): `TableHeader` (`DEFAULT_CLIENTS_COLUMNS`) + `TableRowClient` з `rows`; `onSort`, `status`, `emptyText`; у вузькому контейнері скролиться |
| Navbar | бічне меню (Figma Navbar/Full): `LogoBar` + `NavbarMenu` + `UserDropdown`; `size` 1920/1440/1280/1024/768/480/360, `collapsed`, `items` (групи з `children`), `user`; темна тема — через `data-theme` |
| TimeTracker | картка робочого часу (Figma TimeTracker): `TimeTrackerBar` + статистика `stats` + `TimeScale`; `state` static/active/disabled, `segments`, `onToggle` |
| WelcomeCard | вітальна картка (Figma Welcome Card): темний заголовок із `title`, `subtitle`, `stats`, `image` + `rows` (`AlertRow`); картинку з Figma не завантажено (403) |
| FilterMenu | екран фільтрів 768px (Figma Filter Responsive Menu): шапка з `title`, `count`, закриттям + чіпи `FilterChevron` (`filters`) + секції в `children` (`CheckListModal`, `Modal` з `DatePicker`) |
| ProductDetailCard | детальна картка товару (Figma Product Card 1524px): картинка 640 + `title`, `details` (`RowInfoBlock line`), `description`, `actions`; не плутати з плиткою `ProductCard`; фото з Figma не завантажено (403) |
| ProductFormModal | форма товару (Figma Modal Add / Edit product, 480 / 360): `Modal size="480"/"360"` + 7 полів + блок зображення (add: бібліотека + `FileDropzone`; edit: `ImageCard lg` + кнопки); `mode`, `size`, `values`, `onFieldClick` |
| ScheduledCallCard | картка запланованого дзвінка (Figma scheduled-call-menu): `CardHeader` (`tone` warning / success) + `FilterField icon="date"` + кнопка Refresh; `state` static / time-to-call |
| TableOrders | список замовлень клієнта (Figma Table 1 - Management / Cards Line): `TableHeader` (пресет `orders`) + `TableRowOrder`; `layout` `table` / `cards` (сітка карток), `status`, `onSort` |
| DatePicker | календар (Figma date-range-apply: date / date-time / OneButtonApply / Full): `mode` `single` / `range`, `withTime` (`TimePicker`), `footer` `actions` / `today` / `none`, `months`; `value` — чернетка, `onApply` / `onCancel`; клавіатура, `locale` |

## Процес для кожної молекули

1. Прочитати Figma через `get_design_context` (fileKey `4Q7E8IQ07a9xFiNVBfmo4M`, nodeId з URL, `-` → `:`).
2. Скласти молекулу з наявних атомів; нові токени додавати лише за потреби.
3. Створити в `src/components/<Name>/`: `<Name>.tsx`, `<Name>.css`, `<Name>.stories.tsx`, `<Name>.mdx`, `index.ts`.
   Додати експорт у `src/index.ts`.
4. Перевірити:
   - `npx tsc --noEmit -p tsconfig.json`
   - `npx vite build --config vite.lib.config.ts`
5. Закомітити й запушити.

## Правила

- Усі значення беруться з токенів (`src/tokens/tokens.json`), жодних захардкоджених.
- Після кожного компонента — Token Usage Report (токен, значення, джерело:
  `Figma: …`, `Existing tokens.json` або `AI-defined (причина)`). Та сама таблиця — в MDX у розділі «Design tokens used».
- Усе, чого немає у Figma (hover, focus, відкритий список тощо), позначати як AI-defined.
- Стани й edge cases — окремими історіями (довгий текст, вузький контейнер, disabled).
- Якщо кілька Figma-вузлів відрізняються лише розкладкою чи набором колонок — робити один гнучкий
  компонент (приклади: `TableHeader` з пресетами, `InfoClient` з `justify`), а не окремі компоненти.
- Нову молекулу складати з наявних (`Button`, `Icon`, `CardHeader`, `InfoClient`…), нових стилів
  дублювати не треба. Власні проп-імена не повинні збігатися з HTML-атрибутами (`id`, `title` у `HTMLAttributes`
  треба `Omit`-ити або перейменовувати: `id` → `index`).

## Підводні камені

- Токени: після змін у `src/tokens/tokens.json` запускати `npm run build:tokens` (`src/tokens/build/` не в git).
  Нові «raw» значення Figma додавати з `source` і датою за зразком `green-light-tint`.
- Figma-вузол з кількома різними розкладками (`Card`: Category/Order/Step/InProcessing) розбивати на окремі молекули, якщо структура вмісту різна; V1/V2 зі схожою структурою — один компонент (`StatCard`).
- Іконки: брати лише з наявного набору (`Icon`). Якщо у Figma растровий SVG без назви, підбирати за виглядом
  і зазначати це в MDX. Приклади: `download-cloud`, `tick`, `user` (Figma `person`).
- Колір, якого не видно у `get_design_context` (зображення), знімати з рендера і позначати в MDX
  як потребує підтвердження (так зроблено для бейджа `CardHeader`, `--color-blue-light-tint`).
- Тип-чек перед комітом: `npx tsc --noEmit -p tsconfig.json` — не пушити з помилками.

- Перед пушем робити `git pull origin claude/peaceful-franklin-tnrmh4`: у `src/index.ts` легко отримати конфлікт на рядках експорту — залишити всі експорти.
- Контейнер ефемерний: на початку сесії виконати `npm ci`, інакше `tsc` не працюватиме.
- Figma-ассети з `get_design_context` у цьому середовищі віддають 403 (проксі). Форми малювати в CSS за розмірами; кольори й розміри
  знімати зі скріншота (Pillow: `python3 -I`, читати піксельні значення) і позначати в MDX як «потребує підтвердження».
  Так зроблено для `AudioPlayer` (стовпчики візуалізатора, неактивний трек `--color-headlines-alpha-22`).
- Візуальна перевірка справжнього компонента: `esbuild` бандлить entry з `renderToStaticMarkup`
  (`NODE_PATH=$PWD/node_modules npx esbuild entry.tsx --bundle --platform=node --jsx=automatic --loader:.css=empty`),
  потім HTML + `src/tokens/build/tokens.css` + `dist/style.css` (після `vite build`) → headless Chromium.
  Висоту `--window-size` ставити більшою за потрібну (~+100px), інакше знімок обрізається.
- Власні пропи не повинні збігатися з HTML-атрибутами: `onVolumeChange`, `title`, `onChange`, `defaultValue` — `Omit`-ити (tsc це ловить).
- Радіо в кількох інстансах на одній сторінці мусять мати унікальний `name` (`useId`), інакше браузер дозволяє лише одну вибрану.
- Атом, який задає свій `color` на `.ds-checkbox` / `.ds-icon`, перебиває успадкування: у молекулі ставити `color: inherit` або
  підвищувати специфічність (`.ds-molecule .ds-icon`). Це вже траплялось із `Checkbox` і `Icon` (розмір через `--ds-icon-size`).
- Перевизначення атомів робити лише всередині молекули (наприклад, gap `Checkbox` 4px у `RadioGroupCard`) і писати це в Figma notes.
- Іконка без назви у Figma: порівняти кандидатів окремим рендером (так `filter-light` виявилась повзунками, а потрібна `filter-dark`).

## Передача в новий чат

**Стан на 2026-10-09:** PR #12, #13 і #14 злиті в `main`. Темна тема атомів, молекул і **Організмів** (Figma `Dark Organisms Components`, вузол `3765:129991`) зроблена на гілці `claude/peaceful-franklin-tnrmh4` (групи: таблиці; DatePicker; WelcomeCard / AlertRow / ScheduledCallCard; ProductDetailCard / ProductFormModal; фон Prototypes). Navbar, ChatLayout, TimeTracker, FilterMenu вже мали темну тему з молекул. Без темної теми лишились `AudioPlayer` і `CardGrid`. Новий PR — лише на прохання.
Гілка `claude/peaceful-franklin-tnrmh4` після злиття містить лише злиту історію. На початку нового чату: `git fetch origin`, `git checkout -B claude/peaceful-franklin-tnrmh4 origin/main`,
пуш `--force-with-lease`, **новий** PR відкривати і зливати лише на прохання. Далі `npm ci`, `npm run build:tokens`.

- Дизайнер надсилає посилання на темний блок Організмів (Figma `Dark … Components`, той самий файл `4Q7E8IQ07a9xFiNVBfmo4M`); спершу `get_metadata`, потім `get_screenshot` по вузлах, **розбити на групи самому** і йти групами (один коміт на групу, звіт українською після кожної). Усі групи підряд, без зупинок, якщо дизайнер не просив інакше.
- Організми в коді (Storybook `Organisms/…`): `Navbar`, `TableClients`, `TableOrders`, `TableProducts`, `DatePicker`, `ChatLayout`, `TimeTracker`, `WelcomeCard`, `ProductDetailCard`, `ScheduledCallCard`, `ProductFormModal`, `FilterMenu` (+ `Prototypes/ClientOrders`, `Prototypes/DepartmentUsers`).
  Ще **без темної теми** (сирі `--color-*` у CSS): `WelcomeCard`, `ScheduledCallCard`, `AudioPlayer`, `DatePicker`, `ProductDetailCard`, `ProductFormModal`, `CardGrid`, `TableProducts`, `TableClients`, `TableOrders`, секції `FilterMenu`. Перелік повторно знайти так:
  `grep -ln "color-white)\|color-text)\|color-stroke-light\|color-secondary-light)\|color-primary-blue-dark)\|color-bg)\|color-headlines)" src/components/*/*.css`.
- Метод — розділ «Dark theme» у `CLAUDE.md` + нижче «Темна тема молекул: що вже вміємо» (токени, `table-row`, перебивання кнопок, рендер, MDX).
- Figma MCP інколи відключається посеред чату: `ToolSearch` із запитом `figma get_design_context` повертає інструменти. Скіл `figma-design-to-code` читати як MCP-ресурс
  `skill://figma/figma-design-to-code/SKILL.md` (server `Figma`), у `get_design_context` передавати `skillNames: "resource:figma-design-to-code"`.
  Дуже великі фрейми обрізаються: `get_metadata`, далі по дочірніх вузлах; великі відповіді зберігаються у файл — читати `python3 -I` + `json`.
- Скріншоти Figma: `get_screenshot` з `enableBase64Response: true` (посилання дає 403 через проксі); PNG лежить у `/root/.claude/projects/.../tool-results/` — пікселі брати звідти (`PIL`).
- «Гілка Prototypes» у запитах = розділ Storybook `Prototypes/<Name>` (`src/prototypes/<Name>/`).

### Темна тема молекул: що вже вміємо (2026-10-09)

- Токени: групи на компонент (`dropdown.*`, `modal.*`, `table-row.*` …), `value` = попередній колір, `dark` = із Figma, посилання на наявні `color.*`. Сирі значення без змінної — `color.<назва-за-значенням>` (`green-pale-dark`). Тінь у темній темі: `--shadow-dark-1`, контур+тінь — `--shadow-modal-dark`, верхня лінія — `--shadow-line-top-dark`.
- **`table-row.*`** (bg, border, text, shadow, hover-bg, hover-shadow, action-*) — готові токени для будь-якого рядка / картки списку; використані в `TableRowClient`, `TableRowExpandable`, `TableRowMobile`, `CardRow`, `TableRowOrder/Quantity/Analytics`.
- Якщо світле значення було `transparent` / `none` — так і писати в `value` (світла тема не змінюється).
- Атом `Button` у темній темі: `dark` тільки `big` / `iconOnly` суцільний (`#BDC5E2`), `small` / `medium` майже чорні. Де Figma малює суцільну кнопку на будь-якому розмірі — перебити в CSS молекули:
  `.ds-<name> .ds-button--dark { background-color: var(--button-solid-bg); color: var(--button-on-solid); }` (світле значення те саме, тож світла тема не змінюється). Так зроблено в `TotalRow`, `TableRowMobile`, `Modal`, `ConfirmModal`.
- Кадр Figma не завжди адаптований (світла активна вкладка з нечитним текстом, сірий заголовок відкритого акордеона тощо) — копіювати те, що намальовано, якщо читається; нечитне **не** копіювати і виносити питання дизайнеру (є в описі PR #13).
- Історії: `…Dark` через `...Base` + decorator `data-theme="dark"` (шаблон — наприкінці будь-якого `*.stories.tsx` молекули). Id на кшталт `molecules-dropdown--all-variants-dark`; організми — `organisms-…`; `TimeTracker/Bar/Date/Title/Scale` мають id `organisms-timetracker--…` і `molecules-timetracker-bar--…`.
- Рендер і порівняння: `npx storybook build -o /tmp/sb-out`, далі `node scripts/dark-shot.mjs <outDir> <id> …` (темну тему ставить сам; параметр URL `globals=theme:dark` не працює). Контрасти — скриптом (формула WCAG), не на око.
- MDX: розділ **Dark theme** перед «Design tokens used», нові рядки в кінці таблиці, контрасти в Accessibility; питання до дизайнера — в описі PR.

### Зроблено в останніх чатах (2026-10-09)

- **Темна тема всіх атомів** — див. розділ «Темна тема» нижче (PR #12 злито).
- `TableRowClient`: hover-рядок із тултіпом (Figma Hover Row in Table, світла й темна), кнопки `onDelete` / `onCall` / `onNotes`, теми через токени `--table-row-*`;
  `TooltipBordered` `tone="subtle"`. Тултіп показується на hover і фокус, Escape ховає.
- `NoRowsTable` (Atoms): заглушка порожньої таблиці, 3 розміри × 2 теми, SVG перемальовано (Figma-вектори 403). Ще не підставлена в `TableClients` / `TableOrders`.
- `Foundations/Favicons`: шаблон іконки + список розмірів; PNG-файлів у репо нема (можна відрендерити з `AppIcon` у `FaviconsDocs.tsx`).
- Картинки від дизайнера лежать у `src/assets/demo` і використані в історіях `WelcomeCard`, `ProductDetailCard`, `ProductFormModal`, `ProductCard`, `OrderCard`, `BarcodeSettings`.
- Ще не підтверджено дизайнером: кольори сітки / осі `NoRowsTable` (зчитані з рендеру), іконка телефону `call-v2`, позиція тултіпа рядка (307px / 899px — статичний мок).
- Не пройдено вручну: `TableClients` у вузькому контейнері (скрол може обрізати тултіп), dark hover кнопок рядка, `ProductFormModal` з новим фото.

### Темна тема (Figma `Dark Atoms Components`, 2026-10-09)

Усі **атоми** мають темну тему (4 коміти: `357e578` кнопки / IconButton / Play / Pagination; `1b23ddd` поля, Checkbox, Toggle, Switcher, Search, Slider; `dc64c11` Tabs, SwitchButton, Status, DropDown, FilterChevron, HeaderMenu;
`672678f` Tooltip, Scrollbar, Avatar, Logo, Icon, ImageCard). Нових компонентів і пропів немає: кольори в CSS беруть **теми-токени** (`--button-*`, `--field-*`, `--tab-accent` …; світле значення = попереднє, темне — з Figma). Усього 83 нових токени.
Механізм: `data-theme="dark"` на `<html>` (перемикач у Storybook) або на будь-якому елементі; історії `…Dark` (`AllVariantsDark`, `AllStatesDark`, `DarkTheme` …) вмикають темну тему примусово.

Як робити далі (**Молекули, потім Організми** — дизайнер надсилає посилання на темний блок, компоненти не переносимо, а оновлюємо наявні). Повний порядок — у `CLAUDE.md`, розділ «Dark theme». Коротко:
1. `get_metadata` блока → `get_screenshot` / `get_design_context` кожного дочірнього вузла (великі відповіді зберігаються у файл). Імена змінних у коді — **світлі**, темне значення беремо **з пікселів скріншота** (`PIL`: найчастіший не-чорний колір у боксі; тонку 1px рамку на іншому тлі — сума двох рядків).
2. Групу токенів у `tokens.json` (`value` = попереднє, `dark` = знайдене, посилання на наявні `color.*`), `npm run build:tokens`; у CSS замінити сирі `--color-*` на тему-токен; історія `…Dark`; розділ **Dark theme** в MDX + рядки в таблиці токенів + контрасти скриптом.
3. Багато молекул успадкують темну тему від атомів — спершу подивитися їх у темній темі, власні токени додавати лише для власних кольорів (як `table-row`).
4. Темний кадр Figma не завжди «адаптований» (див. питання нижче) — не копіювати нечитабельне мовчки, а винести питання дизайнеру.
5. Один коміт на групу, звіт українською по кожній групі (що змінилось, нові токени, де темне ≠ світле, чого Figma не малює, контрасти < 3:1, що перевірено).

Технічні дрібниці: історія `…Dark` береться через `...AllVariants` + decorator із `width: 'max-content'` (decorators meta можуть обмежувати ширину); якщо `args` обов'язкові — додати `args`. `Scrollbar` у headless Chromium малюється як overlay — перевіряти по обчислених кольорах.
Токен не називати `value`. Id історій: `atoms-button--all-variants-dark`, `atoms-chevrondropdown--all-states-dark`, `atoms-headermenu--dark-theme`.

### Як перевіряти (працює в контейнері)

1. `npx tsc --noEmit -p tsconfig.json` і `npx vite build --config vite.lib.config.ts`.
2. Візуально: esbuild + `renderToStaticMarkup` → HTML → headless Chromium (`/opt/pw-browsers/chromium-1194/chrome-linux/chrome --headless --no-sandbox --window-size=W,H --screenshot=…`);
   CSS компонентів збирається esbuild (`--bundle --platform=node --jsx=automatic --outdir=…`, поруч з'являється `entry.css`), токени — `src/tokens/build/tokens.css` і `src/tokens/typography.css`.
3. Storybook: `npx storybook build -o /tmp/sb-out` (≈30 с), далі статичний сервер на `/tmp/sb-out` і Playwright з `/opt/node-tools/node_modules/playwright`
   (`chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] })`), `iframe.html?id=<story-id>&viewMode=story`,
   слухати `pageerror` і `console` error. id історії: `prototypes-clientorders--tablet-768`, `molecules-pagination--small-v-1` (назва історії → kebab-case).
4. Ще не пройдено вручну: `FilterMenu`, `Navbar`, `ProductFormModal`, `DatePicker`, `TableClients` Sortable і вузькі контейнери.

### Відкриті питання дизайнеру (зібрано з усіх екранів)
- Темна тема атомів: іконки `Icon` Primary у темному кадрі `#1D2542` на чорному (1.40:1, схоже, кадр не адаптований; у коді `#BDC5E2`); піл `Switcher` Dark `#050411` у Dark Atoms, але `#1D2542` у темному кадрі Navbar (`--theme-switcher-bg` не змінено);
  `IconButton` Close: hover (залита `#050411`) проти «Activate» (яскрава рамка) — у коді логіка світлої теми; `FilterChevron` Outline V2 «(not approve)»; hover `SwitchButton` і темні фокус-кільця не намальовані;
  кольори, зчитані з рендера (без змінної): hover / focus рамки, `Change`, галочка, рамка тултіпа, open-стани `ChevronStatus` / `ChevronDropDown`.
  Нижче 3:1 на чорному (лишено за дизайном): hover `Checkbox` / `Toggle` / `HeaderMenu` / `Icon` (2.72:1), статичні рамки `InputField` / `SearchField` / `ImageCard` (1.35:1), `Primary` у `ChevronDropDown` / `ChevronStatus`, ініціали `chat` / `department` Avatar, підпис (2.97:1) і hover-значення (1.90:1) `FilterChevron`.

- Правило рамки полів (Stroke Light V2 / Stroke Input / Activated), `Roli's Name` на `DepartmentUsers` (рамка).
- Іконки за виглядом: `reboot`, `picture`, `save-line`, `admin`, `burger-rolled-up` (бургер шапки), `chevron-left` (назад у крихтах), `info` для «Main info».
- `TableClients`: назва 7-ї колонки; `DatePicker`: мок-дати і Manrope; `--color-deep-blue`, кольори крапок `AlertRow`, `--color-warning-tint`, вага підпунктів `Navbar`.
- Екрани `ClientOrders` / `DepartmentUsers`: перемикач View на ≤768 (завжди картки), v1 чи v2 пагінації, тінь `PaginationBar` у картках, відступи контенту (27px → `--spacing-28`),
  таби на 360px (обрізаються), `CheckListModal accent` (Warehouse), діапазон дат у фільтрі за замовчуванням, нумерація карток (у Figma мок 1–10).

## Повідомлення: Info / Important / Error (Figma `Error/Importantly/Info`)

Три види текстів не є окремими компонентами, а пропи наявних:
- **Info** — `Modal description` (Secondary Grey, Medium 14) під заголовком діалогу;
- **Important** — `Modal important` (Warning, Semi-Bold 14) під описом, `role="note"`;
- **Error** — `ModalField error` / `LabeledField error` (Danger, Regular 12, 4px під полем, `role="alert"`) + `invalid` на самому полі;
  для `FileDropzone` рамка не змінюється (лише `invalid` → `aria-invalid`), повідомлення малює `ModalField error`.
- Обов'язкове поле — `LabeledField required` (помаранчева `*`).
Діалог «Discount confirmation» (дві групи радіо «відсоток / валюта» через «OR») зібрано в історіях `Modal` (`Discount…`), окремого компонента немає.
- Дизайн-дошки з «станами» (як `Error/Importantly/Info`) — не компоненти: розібрати, які стани це, додати їх пропами/історіями в наявні компоненти
  й у MDX (мапінг, Figma notes, токени, доступність), окремих компонентів не створювати.
