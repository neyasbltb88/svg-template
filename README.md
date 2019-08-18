# SVG Templte
Пример объекта для шаблонизации svg иконок. Позволяет получать чистый svg-код с подставленным цветом или url-кодированном виде.

Результат работы можно посмотереть на [***demo-странице***](https://neyasbltb88.github.io/svg-template/index.html).

## Описание объекта
Допустим, объект шаблонизации svg-иконок будет находиться у нас под глобальной переменной `window.icons`.

***window.icons._colors*** - Объект с именованными заготовленными цветами. В примере выглядит следующим образом:
```` js
_colors: {
    green: '#00B75A',
    red: '#F92672',
    white: '#FFFFFF',
    yellow: '#FFC000',
    black: '#000000',
    grey: '#C3CFE0',
}
````

***window.icons._template*** - Объект с именованными шаблонами svg.

Для шаблонизации цветов в таких шаблонах нужно вместо значений цвета в свойства подставить конструкцию `{{color}}`:

```` js
_template: {
    /* html */
    arrow: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" version="1.1" viewBox="0 0 16 16">
                <path fill="{{color}}" d="M 4,0 4,8 0,8 8,16 16,8 12,8 12,0 4,0 z"/>
            </svg>`,
}
````

## Использование
Для получения иконки с подставленным цветом, нужно вызвать метод `.get('color', 'template', url)` и передать в него 2 или 3 параметра:

- ***color*** - [String] название цвета из объекта `_colors` или непосредственное значение цвета, например `#ff0000`, `rgb(255, 0, 0)`.

- ***template*** - [String] название шаблона из объекта `_template`. 

- ***url*** (не обязательный, по умолчанию true) - [Boolean] флаг, указывающий на формат возвращаемого шаблона.  
  - Если не передан, или передан `true`, то ответ будет в url-кодировке и с префиксом `data:image`. Такой формат можно использовать для создания стилей или присвоения в качестве атрибута `src` тегу `<img>`.
  - Если передан `false`, то ответ будет в виде обычной svg разметки.
  
## Примеры
1. *Пример генерации стилей: [codepen](https://codepen.io/neyasbltb_88/pen/JjPKxeV)*
    ```` js
    // Создадим элемент изображения
    let image = document.createElement('img');
    image.className = 'new-image';
    document.body.appendChild(image);

    // Получим url-кодированный шаблон иконки со стрелкой зеленого цвета
    let svg_icon = window.icons.get('green', 'arrow');
    /* data:image\/svg+xml;charset=utf-8,<svg%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20width%3D"16"%20height%3D"16"%20version%3D"1.1"%20viewBox%3D"0%200%2016%2016">%20<path%20fill%3D"%2300B75A"%20d%3D"M%204%2C0%204%2C8%200%2C8%208%2C16%2016%2C8%2012%2C8%2012%2C0%204%2C0%20z"%2F>%20<%2Fsvg> */

    // Создадим элемент со стилем для нашего изображения
    let style = document.createElement('style');
    style.textContent = /* css */ `
        .new-image {
            width: 16px;
            height: 16px;
            background-image: url("${svg_icon}");
        }
    `;
    document.head.appendChild(style);
    ````

2. *Пример с атрибутом src: [codepen](https://codepen.io/neyasbltb_88/pen/ZEzOwVR)*
    ```` js
    // Создадим элемент изображения
    let image = document.createElement('img');

    // Получим url-кодированный шаблон иконки со стрелкой ярко красного цвета
    let svg_icon = window.icons.get('#f00', 'arrow');

    // Присвоим в атрибут src полученный шаблон иконки
    image.src = svg_icon;

    // Добавим изображение на страницу
    document.body.appendChild(image);
    ````

3. *Пример вставки на страницу чистого svg-кода: [codepen](https://codepen.io/neyasbltb_88/pen/vYBKbbO)*
    ```` js
    // Создадим блок-контейнер иконки
    let icon_container = document.createElement('div');

    // Получим чистый шаблон иконки со стрелкой желтого цвета
    let svg_icon = window.icons.get('yellow', 'arrow', false);
    /* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" version="1.1" viewBox="0 0 16 16"> <path fill="#FFC000" d="M 4,0 4,8 0,8 8,16 16,8 12,8 12,0 4,0 z"/> </svg> */

    // Вставим иконку в контейнер в качестве html-содержимого
    icon_container.innerHTML = svg_icon;

    // Добавим блок-контейнер иконки на страницу
    document.body.appendChild(icon_container);
    ````