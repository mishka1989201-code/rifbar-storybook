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
| CategoryCard | плитка категорії (Figma Card Category): картинка + назва в один рядок; `href` робить її посиланням, hover — стан (`:hover`/`:focus-visible`) |
| LogoBar | ліва частина хедера (Figma Logo, Icon - Navbar): бургер + `Logo` (`inverse`); `expanded`, `onMenuClick`, `href`, `hideMenu` |
| ViewSwitch | перемикач «View:» (Figma viewing style): іконки cards/list, `value`, `onChange` |
| ShowSelect | «Show: [8 ⌄]» (Figma viewing style 2): `FilterField` + список, `value`, `options`, `onChange`; його ж використовує `PaginationBar` |
| SwitchGroup | дріжка з `SwitchButton` (Figma Switch: Light / Dark + hover): `options`, `value`, `onChange`, `tone` |
| TimeTrackerTitle | Play-кнопка + «My Time» (Figma TimeTracker/Play Buttons and Title); `title`, `playProps` |
| TimeTrackerDate | іконка + дата + три кнопки prev/reset/next (Figma TimeTracker/Date) |
| TimeTrackerBar | верхня панель трекера = Title + Date (Figma TimeTracker/Play Actions Menu) |
| TimeScale | шкала дня з відпрацьованими періодами (Figma TimeTracker/Time Scale and Numbers); `segments` у годинах, `startHour`, `hours` |
| AccessModeRow | карта «Default / Custom» (Figma Edit User Access): два radio (`Checkbox`) + кнопка «Edit» (активна лише для Custom); `value`, `onChange`, `onEdit`, `disabled` |
| DocumentCard | карта документа (Figma Edit User Access New): іконка + заголовок + значення, вертикальні кнопки в `actions` |
| NavbarMenu | вертикальне меню сторінок (Figma Navbar Menu Tabs): `size` desktop/768/480/360, `collapsed` (= Style=Icons), `items`, `value`, `onChange` |
| ChatMessage | повідомлення чату (Figma Message): `direction` received/sent, `author` (аватар), `time`, `checked` |
| ChatHeader | шапка чату (Figma chat header): іконка + h5 `title` + `quote` |
| MessageBox | поле повідомлення (Figma message box): справжня форма з `input` і кнопкою send, `onSend`, `disabled`, `forceFocus` / `forceHover` |
| TableRowQuantity | рядок вибору кількості (Figma TableRows / Choice of quantity): `name`, `prices`, `InputField` 200px; порожнє поле з рамкою Stroke Light V2 |
| NoteCard | картка нотатки (Figma Notes: Static / Hover): текст у сірому блоці, `onMore` («more»), `date`; hover = рамка Headlines + `--shadow-hover-card-lg` |
| NotificationLine | рядок списку сповіщень (Figma NotificationLine): `message` + іконка з `date`; `type` `old`/`new`, `disabled`, `forceHover` |
| TableRowExpandable | картковий рядок таблиці продуктів (Figma Table Row Static/Hover/Active/Disabled): `ImageCard` + колонки + кнопка-перемикач; `expanded`, `onToggle` |
| FilterActions | мобільна панель (Figma Actions): `Button` «Filter» з `counter` + `SearchField` mobile; `filterCount`, `searchProps` |
| TimePicker | «01:20 PM» + два `Slider` (години 0–23, хвилини 0–59); `hours`/`minutes` або `defaultHours`/`defaultMinutes`, `onChange` |
| RadioGroupCard | підпис + сіра картка з рядом радіо (Figma Integrations for invoices): `title`, `options`, `value`/`defaultValue`, `onChange` |
| AudioPlayer | плеєр (Figma Player - Time Tracker): візуалізатор `levels`, таймлайн, play/pause, гучність; контрольований (`currentTime`, `duration`, `playing`, `volume`) |
| Modal | діалог (Figma Pop-up warehouse Desktop/Mobile): `Modal` + `ModalSection` + `ModalField`, `size`, `actions`; лише поверхня, без оверлею |
| Dropdown | панель меню (Figma Dropdown, 8 стилів): `variant` `list`/`notifications`/`user`, `control` `none`/`radio`/`checkbox`, `searchable` |

Усі експортуються з `src/index.ts`.

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
