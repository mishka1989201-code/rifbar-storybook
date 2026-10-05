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
| CardRow | мобільна картка списку (Figma V1–V6): один компонент, пропи `direction`, `index`, `selectable`, `image`, `fields`, `actions` |

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
- Іконки: брати лише з наявного набору (`Icon`). Якщо у Figma растровий SVG без назви, підбирати за виглядом
  і зазначати це в MDX. Приклади: `download-cloud`, `tick`, `user` (Figma `person`).
- Колір, якого не видно у `get_design_context` (зображення), знімати з рендера і позначати в MDX
  як потребує підтвердження (так зроблено для бейджа `CardHeader`, `--color-blue-light-tint`).
- Тип-чек перед комітом: `npx tsc --noEmit -p tsconfig.json` — не пушити з помилками.

- Перед пушем робити `git pull origin claude/peaceful-franklin-tnrmh4`: у `src/index.ts` легко отримати конфлікт на рядках експорту — залишити всі експорти.
- Контейнер ефемерний: на початку сесії виконати `npm ci`, інакше `tsc` не працюватиме.
