# Toast

<!-- STORY -->

## Usage

Toasts are used to display system messages. The messages are short and straightforward. It may contain a dismiss button, and an action button depending on the situation.

**Using the plugin**

In order to use the plugin, it needs to be included in your application with `Vue.use`.

```js
// myApp.js

import { GlToast } from '@gitlab/ui';

// Note, this has to be done before `Vue.new()`
Vue.use(GlToast);
```

Once included in your application, the toast plugin is globally available.

```js
// myComponent.vue

this.$toast.show('Hello GitLab!');
```

Below is an example with options

```js
// myComponent.vue

this.$toast.show('This is a toast with an option.', {
  action: {
      text: 'Undo',
      onClick: () => { ... },
    },
});
```

### Options

Below are the options you can pass to create a toast

| **Option**     | **Type**       | **Default**       | **Description**                                                                                                                  |
| -------------- | -------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| position       | String         | 'bottom-left'     | Position of the toast container <br> **['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left']** |
| duration       | Number         | 5000              | Display time of the toast in millisecond                                                                                         |
| action         | Object         | close             | Add single actions to toast                                                                   |
| fullWidth      | Boolean        | false             | Enable Full Width                                                                                                                |
| fitToScreen    | Boolean        | false             | Fits to Screen on Full Width                                                                                                     |
| className      | String, Array  | 'gl-toast'        | Custom css class name of the toast                                                                                               |
| containerClass | String, Array  | null              | Custom css classes for toast container                                                                                           |
| iconPack       | String         | 'custom-class'    | Icon pack type to be used <br> **['material', 'fontawesome', 'mdi', 'custom-class', 'callback']**                                |
| Icon           | String, Object | null              | Material icon name as string                                                                      |
| type           | String         | 'default'         | Type of the Toast **['success', 'info', 'error']**                                                                               |
| theme          | String         | 'toasted-primary' | Theme of the toast you prefer<br> **['toasted-primary', 'outline', 'bubble']**                                                   |
| onComplete     | Function       | null              | Trigger when toast is completed                                                                                                  |
| closeOnSwipe   | Boolean        | true              | Closes the toast when the user swipes it                                                                                         |
| keepOnHover    | Boolean        | true              | Prevents toast from closing on hover                                                                                             |
| singleton      | Boolean        | true              | Only allows one toast at a time                                                                                                 |

## Under the hood

Toast uses [`vue-toasted`] internally. So please take a look at their extensive documentation for more information.

[`vue-toasted`]: https://github.com/shakee93/vue-toasted
