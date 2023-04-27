# gigdata-inputs

## Установка в nuxt 

### Установка из npm

```bash
npm i gigdata-inputs
```

### Подключение в плагинах и передача токена

#### Nuxt 3
```js
// plugins/gigdata-inputs.vue
import InputWithHints from "gigdata-inputs"
export default defineNuxtPlugin((nuxtApp) => {
    InputWithHints.props.token.default = "TOKEN";
    InputWithHints.props.apiURL.default = "URL";
    nuxtApp.vueApp.component('InputWithHints', InputWithHints)
});
```
#### Nuxt 2

```js
// plugins/gigdata-inputs.vue
import InputWithHints from "gigdata-inputs"
import Vue from "vue"

InputWithHints.props.token.default = "rqe*rjr4MRU9ata0vte"
InputWithHints.props.apiURL.default = "https://stage.gigdata.ru/api/v2"
Vue.component("InputWithHints", InputWithHints)
```

```js
// nuxt config 
plugins:[
    { src: "~/plugins/gigdata-inputs.js", mode: "client" }
]
```

## Пропсы

| Название    | Тип    | Описание                                                                      |
|-------------|--------|-------------------------------------------------------------------------------|
| count       | number | количество выдаваемых подсказок                                               |
| token       | string | токен для доступа к api                                                       |
| apiURL      | string | адрес api                                                                     |
| params      | object | дополнительные параметры для запроса, можно найти в основной документации api |
| type        | string | тип запроса (email, fio, address...), можно найти в enums.js                  |
| placeholder | string | стандартный placeholder                                                       |
| value       | string | value для двустороннего связывания                                            |


## Эвенты

| Название | тип    | Описание                                                                         |
|----------|--------|----------------------------------------------------------------------------------|
| input    | string | срабатывает при вводе текста в инпуте, возвращает введенный текст                |
| select   | Object | срабатывает при выборе подсказки, возвращает выбранный элемент, со всеми данными |


## Пример использования 

```vue
<InputWithHints
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="onInput"
/>
```

## ВНИМАНИЕ
Есть стили которые желательно переписывать с помощью `!important;`

При билде могут возникать конфликты, которые могут не проявиться в dev режиме

Ниже стили которые необходимо переписывать через `!important;`

```scss
.defaultInput{
  position: relative;
  background: white;
  input{
    width: 100%;
    outline: none;
    background: inherit;
  }
  &__suggestions {
    z-index: 1;
    &__item{
      cursor: pointer;
    }
    width: 100%;
    background: inherit;
    position: absolute;
    top: 100%;
    list-style: none;
  }
}
```

## Дополнительно

### Подключение enums типов

```js
import {requestEnum} from "gigdata-inputs/src/enums.js";
```
Если используете typescipt, пока нету типов, поэтому нужно добавить комментарий
```ts
// @ts-ignore-next-line
import {requestEnum} from "gigdata-inputs/src/enums.js";
```