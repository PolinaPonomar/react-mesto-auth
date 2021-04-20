# Mesto

## Описание проекта:
Cервис Mesto - интерактивная страница для создания альбома фотографий. Фотографии можно добавлять, удалять и ставить им лайки. Создан в рамках выполнения задания курса по веб-разработке от Яндекс.Практикума.

### Функциональность:
Сайт адаптивен и интерактивен. На сайте можно:
- Зарегистрироваться и авторизироваться:) При успешной/неуспешной регистрации всплывают поп-апы - фидбеки. 
- Редактировать аватар.
- Редактировать информацию о пользователе.
- Добавлять новые фотографии в ленту.
- Лайкать посты любых пользователей.
- Увеличивать фотографии нажатием на них.
- Удалять свои посты.
- Выйти из аккаунта.
- Все поп-апы плавно открываются и закрываются, все кнопки подсчвечиваются при наведении на них.
- В мобильной версии сайта реализовано разворачивающееся меню.
- Eсли при закрытии сайта пользователь не вышел из аккаунта, то при повторном визите не нужно вновь авторизовываться.

### Какие технологии используются?
- Сайт написан на React, в проекте используются HTML5, CSS3, JavaScript, JSX.
- Благодяря React осуществлена автоматическая сборка с помощью Webpack.
- Код оформлен по методологии БЭМ, организация файловой структуры - Nested. Для создания сеток использовался flex и grid-layout. 
- Все свойства элементов прописывались с учетом адаптивности сайта.
- Плавное открытие и закрытие поп-апов реализовано с помощью css-свойств.
- Проект подключен к серверу, реализовано взаимодействие с API.
- В проекте применяется декларативный подход, реализованы функциональные компоненты, используются хуки useState, useEffect, useHistory и useLocation.
- Для оптимизации кода использован контекст, при работе с формами используются управляемые компоненты, рефы.
- Для регистрации, авторизации и профиля сделаны отдельные страницы, реализована переадресация (библиотека react-router-dom)
- Проверка наличия токена в LocalStorage (т.е. пользователь сможет сразу же попасть на свою страницу, если не выходил из аккаунта)


Для проекта использовались изображения со свободной лицензией с сайта [Pixabay](https://pixabay.com/)

Получившийся проект можно посмотреть по ссылке:

* [Ссылка на проект](https://polinaponomar.github.io/react-mesto-auth/)

### Инструкция по развёртыванию:
1) Клонируйте репозиторий к себе на компьютер с помощью команды
```
git clone https://github.com/PolinaPonomar/react-mesto-auth.git
```
2) Откройте репозиторий и выполните команду
```
npm start
```
3) Проект откроется на локальном сервере по адресу: http://localhost:3000/react-mesto-auth#/sign-in
4) Чтобы завершить выполнение локального сервера нажмите Ctrl + C (Win) или Cmd + T (macOS) или Ctrl + T (Linux). Подтвердите действие.
5) Готово!
