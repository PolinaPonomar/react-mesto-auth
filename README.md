# Mesto

## Описание проекта:
Cервис Mesto - интерактивная страница для создания альбома фотографий. Фотографии можно добавлять, удалять и ставить им лайки. Создан в рамках выполнения задания курса по веб-разработке от Яндекс.Практикума.

### Функциональность:
Сайт адаптивен и интерактивен. На сайте можно:
1) Зарегистрироваться и авторизироваться:) При успешной/неуспешной регистрации всплывают поп-апы - фидбеки. 
2) Редактировать аватар.
3) Редактировать информацию о пользователе.
4) Добавлять новые фотографии в ленту.
5) Лайкать посты любых пользователей.
6) Увеличивать фотографии нажатием на них.
7) Удалять свои посты.
6) Выйти из аккаунта.
Все поп-апы плавно открываются и закрываются, все кнопки подсчвечиваются при наведении на них.

### Какие технологии используются?
Сайт написан на React, в проекте используются HTML5, CSS3, JavaScript, JSX.
Благодяря React осуществлена автоматическая сборка с помощью Webpack.
Код оформлен по методологии БЭМ, организация файловой структуры - Nested. Для создания сеток использовался flex и grid-layout. 
Все свойства элементов прописывались с учетом адаптивности сайта.
Плавное открытие и закрытие поп-апов реализовано с помощью css-свойств.
Проект подключен к серверу, реализовано взаимодействие с API.
В проекте применяется декларативный подход, реализованы функциональные компоненты, используются хуки useState, useEffect, useHistory и useLocation.
Для оптимизации кода использован контекст, при работе с формами используются управляемые компоненты, рефы.
Проведена работа с роутами (библиотека react-router-dom), реализована регистрация, авторизация, проверка наличия токена в локальном хранилище (т.е. пользователь сможет сразу же попасть на свою страницу, если не выходил из аккаунта), выход из аккаунта.


Для проекта использовались изображения со свободной лицензией с сайта [Pixabay](https://pixabay.com/)

Получившийся проект можно посмотреть по ссылке:

* [Ссылка на проект](https://polinaponomar.github.io/react-mesto-auth/)
