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
| CardHeader | заголовок картки: бейдж-іконка + h3; слот `actions` |
| InfoClient | пари label/value; один flex-компонент, проп `justify` (`between` = Figma Line, `start` = Wrap) |
| ClientDetails | картка з довільним текстом |
| InfoBlock | `CardHeader` + `InfoClient` (або `children`) |
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
