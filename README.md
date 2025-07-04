![Coding assistance for Node.js](https://ideomotor.me/banner.jpg)

---
[Документация](https://ideomotor.me/quick-builder/) |
[Быстрый старт](https://ideomotor.me/quick-builder/guide/quick-start.html)
---

# QuickBuilder

**QuickBuilder** — это гибкий и конфигурируемый сборщик для многостраничных проектов вёрстки, основанный на [Vite](https://vite.dev/) и [Vituum](https://vituum.dev/). Он использует компонентный (блочный) подход и методологию [БЭМ](https://ru.bem.info/).

В проекте применяется строгий код-гайд, который проверяется с помощью [ESLint](https://eslint.org/), [Stylelint](https://stylelint.io/), [Pug-lint](https://github.com/pugjs/pug-lint) и [Prettier](https://prettier.io/) перед коммитом (с использованием [husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/lint-staged/lint-staged)) или вручную.

Встроенные препроцессоры:
* **HTML-разметка** собирается из шаблонов [Pug](https://pugjs.org) (ранее Jade);
* **CSS-стили** обрабатываются с помощью препроцессора [Sass](https://sass-lang.com/), синтаксис SCSS (Sassy CSS) + PostCSS плагины;

Также в сборщик интегрирован `генератор иконочных SVG-спрайтов`.

## Цель проекта

**Цель сборщика** — обеспечить максимально быструю и простую разработку многостраничного проекта.

В моей практике встречаются проекты, которые требуют стандартный набор HTML, CSS, JS, изображений и других дополнительных файлов.

---

## Требования

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org) (v20+) или [Deno](https://deno.com/) (v2+) или [Bun](https://bun.sh/) (v1.2+)

## Разворачивание проекта

1. Открыть терминал, перейти в папку проектов, клонировать репозиторий
   ```sh
   git clone https://github.com/motosasha/quick-builder.git my-new-project
   ```
2. Перейти в папку нового проекта (в этом примере — `cd my-new-project`).
3. Удалить историю разработки сборщика: `rm -rf .git`.
4. Установить зависимости проекта
   ```sh [npm]
   npm install
   ```
   ```sh [deno]
   deno install
   ```
   ```sh [bun]
   bun install
   ```

## Pre-commit хук (⚠️ обязательно!)

---
⚠️ **Внимание!** После настройки IDE нужно обязательно запустить команду `prepare` для подготовки `husky`, без этого pre-commit хук не будет работать.

---

```sh [npm]
npm run prepare
```
```sh [deno]
deno run prepare
```
```sh [bun]
bun run prepare
```

## Предварительная подготовка

Перед началом работы удалите демонстрационные файлы из сборщика.

### Шрифты

При использовании локальных шрифтов, отличных от `Inter`, или шрифтов Google Fonts, необходимо:

1. Удалить файлы `*.woff2` в директории `./public/assets/fonts/`.
2. Удалить или обновить адреса шрифтов в секции `isFontsPreload` в `head` файла `./src/layouts/layout__default-head.pug`.
3. Удалить или заменить имя шрифта в файле примеси `./src/styles/base/fonts.scss`.
4. Удалить или заменить имя шрифта в секции `fonts` файла переменных `./src/styles/base/variables.scss`.

### Favicon

Вы можете заменить или удалить существующие в проекте файлы `favicon` и `webmanifest` в директории `./public/assets/img/favicon`. Их подключение происходит в секции `favicon` в файле `./src/layouts/layout__default-head.pug`.

### Компоненты

В базовой поставке сборщика есть четыре подготовленных компонента:

* Уровень `atoms`: `container` и `page`;
* Уровень `edging`: `header` и `footer`.

Если эти компоненты не требуются, их можно удалить.

---
⚠️ **Компонент page!** Компонент `page` содержит базовые стили и фиксированный подвал. При его удалении потребуется самостоятельно реализовать эти стили и убрать упоминание компонента из основного шаблона `./src/layouts/layout__default.pug`.

---
⚠️ **Компоненты header и footer!** Если вы решаете удалить компоненты `header` и `footer`, необходимо также удалить их упоминания из основного шаблона `./src/layouts/layout__default.pug`.

---

### Передача данных в разметку

Существует несколько способов передачи данных для использования в разметке:

1. JSON-файлы в директории `./src/data/`;
2. JSON-файлы в директории `./src/pages/`, имена которых совпадают с названиями страниц (пример: `index.pug` для `index.pug.json`);
3. Конфигурационные файлы проекта (обычно `./project.config.json`.

Если вы не используете внешние JSON-данные, можете удалить все файлы .json из директорий `./src/data/` и `./src/pages/`.

### Отключение проектной навигации

Если ваш проект представляет собой лендинг или использует перелинковку страниц, вы можете отключить стандартную навигацию:

1. Установить значение `false` для свойства `includeProjectNav` в файле `./project.config.js`.
2. Удалить файлы `./src/data/project-navigation.json` и `./src/layouts/layout__project-nav.pug`.
3. [Опционально]: Удалить все упоминания `isProjectNav` из шаблона `./src/layouts/layout__default.pug`.

### Иконки

Удалите демонстрационную иконку `./src/icons/icon__example.svg`.

### Скрипты и стили

Удалите или отключите ненужные вам скрипты (`./src/scripts/helpers`) и стили (`./src/styles/base`) в соответствии с требованиями вашего проекта.

---
⚠️ **Напоминание!** Не забудьте также удалить соответствующие записи из свойств `addScripts` и `style` в конфигурационном файле `./project.config.js`.
