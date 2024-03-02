# Antipoff app

- Стек: React.JS + TypeScript + Vite + Redux Toolkit + TailwindCSS + Sass
- Code Quality Tools: ESLint + Prettier
- [Deploy](https://mali-zi-valantis.netlify.app)
- ![Screenshot](https://github.com/Mali-zi/valantis/blob/main/public/screenshot.JPG)


Используя предоставленный API, создана страница, которая отражает список товаров. Для каждого товара отображается его id, название, цена и бренд.
На страницу выводится по 50 товаров с возможностью постраничного перехода (пагинация) в обе стороны.
Есть возможность отметить понравившиеся товары, что сохраняется при перезагрузке страницы.
Реализована фильтрация выдачи по названию, цене и бренду, используя предоставленное API. Очистить фильтр можно нажатием на кнопку "Сбросить фильтр".
Добавлена минимальная валидация для проверки вводимых значений в поле "Поиск по цене".
Реализована фильтрация дубей товаров по id. В случае дублирования выводится только первый товар, даже если другие поля различаются.
Если API возвращает ошибку, идентификатор ошибки выводится в консоль при его наличии, и запрос повторяется.
Для улучшения Fetch API реализован интерфейс для выполнения запросов с автоматическими повторными попытками. Количество попыток указывает, сколько раз запрос должен быть повторен в случае сбоя.
На fetch() установлен пользовательский Timeout для прерывания запроса при превышении заданного максимального времени ожидания.