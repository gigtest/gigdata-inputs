# @appsoftware/gigdata-inputs

## Установка в nuxt

### Установка из npm

```bash
npm i @appsoftware/gigdata-inputs
```

### Подключение в плагинах и передача токена

#### Nuxt 3

```js
// plugins/gigdata-inputs.js
import InputWithHints from "@appsoftware/gigdata-inputs/src/components/DefaultInput.vue";

export default defineNuxtPlugin((nuxtApp) => {
  InputWithHints.props.token.default = "TOKEN";
  InputWithHints.props.apiURL.default = "URL";
  nuxtApp.vueApp.component('InputWithHints', InputWithHints)
});
```

#### Nuxt 2

```js
// plugins/gigdata-inputs.js
import InputWithHints from "@appsoftware/gigdata-inputs/src/components/DefaultInput.vue";
import Vue from "vue"

InputWithHints.props.token.default = "TOKEN"
InputWithHints.props.apiURL.default = "URL"
Vue.component("InputWithHints", InputWithHints)
```

```js
// nuxt config 
plugins:[
  {src: "~/plugins/gigdata-inputs.js", mode: "client"}
]
```

## Пропсы

| Название            | Тип        | Описание                                                                      |
|---------------------|------------|-------------------------------------------------------------------------------|
| count               | number     | количество выдаваемых подсказок                                               |
| token               | string     | токен для доступа к api                                                       |
| apiURL              | string     | адрес api                                                                     |
| params              | object     | дополнительные параметры для запроса, можно найти в основной документации api |
| type                | string     | тип запроса (email, fio, address...), можно найти в enums.js                  |
| placeholder         | string     | стандартный placeholder                                                       |
| onSelectChangeValue | boolean    | Меняется ли значение в инпуте при select                                      |
| htmlInputType       | string     | Устанавливает тип поля ввода                                                  |
| disabled            | bool       | Устанавливает disabled поля ввода                                             |
| modelValue          | modelValue | Для быстрого двухстороннего связывания                                        |

## Эвенты

| Название          | тип           | Описание                                                                         |
|-------------------|---------------|----------------------------------------------------------------------------------|
| input             | string, event | срабатывает при вводе текста в инпуте, возвращает введенный текст                |
| select            | Object, event | срабатывает при выборе подсказки, возвращает выбранный элемент, со всеми данными |
| focus             | Object        | стандартный эвент                                                                |
| blur              | Object        | стандартный эвент                                                                |
| update:modelValue | Object        | стандартный эвент для связки                                                     |

## Пример использования

```vue

<InputWithHints
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="onInput"
/>
```

## Полный кастом

Чтобы полносью кастомизировать коппонент, следует скопировать его себе на проект из
каталога `@/appsoftware/gigdata-inputs` и заменить импорты

```vue
import {maskit, maskTokens} from "../helpers/mask";
import highlightSubString from "../helpers/highlightSubString";
import {getGigdataHints} from "../api/gigdataHints";
import debounce from "../helpers/debounce";
import config from "../config";
```

на

```vue
import {
config,
debounce,
getGigdataHints,
highlightSubString,
maskit,
maskTokens,
requestEnum
} from "@appsoftware/gigdata-inputs"
```

## ВНИМАНИЕ

Есть стили которые желательно переписывать с помощью `!important;`

При билде могут возникать конфликты, которые могут не проявиться в dev режиме

Ниже стили которые необходимо переписывать через `!important;`

```scss
.defaultInput {
  position: relative;
  background: white;

  input {
    width: 100%;
    outline: none;
    background: inherit;
  }

  &__suggestions {
    z-index: 1;

    &__item {
      cursor: pointer;
    }

    width: 100%;
    background: inherit;
    position: absolute;
    top: 100%;
    list-style: none;

    .selected {
      background: rgba(128, 128, 128, 0.19);
    }
  }
}
```