# 👽 Inline translations for FBT

The extension serves to effectively translate your application using inline translations so that you can view strings you are
translating in context.
If you right-click on the underlined string, the translation dialog appears and you will be able to vote for the available translations or submit a new one.

You can make translations available to your translators, users, or the entire community and make your product multilingual.

❇️ **Translations can also be approved by your trusted translator(s).**

![Demo of FBT inline translating](https://raw.githubusercontent.com/swiftyper-sk/fbt-inline-translations/main/images/demo.gif)


## ℹ️ Usage notes

- this library requires one of these FBT frameworks:
  - [FBT for Laravel (v5.5+)](https://github.com/richardDobron/laravel-fbt)
  - [FBT for PHP (v7.0+)](https://github.com/richardDobron/fbt)
  - [FBT for JavaScript](https://github.com/facebook/fbt)

## 🚀 Features
-   [x] Inline translating
-   [x] Glossary
-   [x] Voting
-   [ ] Variations
-   [x] Dark mode

## 📦 Installing

⚠️ **React 15 or higher only.**

```shell
npm install fbt-inline-translations
# or
yarn add fbt-inline-translations
```

### How to add polyfills in Webpack 5

Errors in the terminal will give hints on how to add the required polyfill.

In your Webpack config:

```javascript
module.exports = {
  resolve: {
    // ...
    fallback: {
      "buffer": require.resolve("buffer/"),
      "url": require.resolve("url/"),
      "path": require.resolve("path-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
    },

    alias: {
      process: "process/browser",
    },

    plugins: [
      // Work around for Buffer is undefined:
      // https://github.com/webpack/changelog-v5/issues/10
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
  },
};
```

and

```cmd
npm install buffer url path-browserify stream-http https-browserify --save-dev
# you may need to clear your cache after this change
rm -fr node_modules/.cache
```

Restart the Dev Server and the error will be gone.

## Instructions for JavaScript version of FBT package

Copy file [fbt/InlineFbtResult.js](fbt/InlineFbtResult.js) to your project.

Register custom `getFbtResult` hook:

```javascript
import { init } from "fbt";
import FbtResult from "fbt/lib/FbtResult";
import InlineFbtResult from "./InlineFbtResult";

let inlineMode = 'NO_INLINE';

if (true) { // enable inline translations
    inlineMode = 'TRANSLATION';
}

init({
  hooks: {
    // ...
    getFbtResult: (input) => {
      if (inlineMode && inlineMode !== 'NO_INLINE') {
        return new InlineFbtResult(
          input.contents,
          inlineMode,
          input.patternString,
          input.patternHash,
        );
      }

      return new FbtResult(input.contents, input.errorListener);
    },
  },
  // ...
});
```

## 🔧 Configuration

Register your FBT project on [Swiftyper Translations](https://translations.swiftyper.sk).


### Non-React usage

Add this code to your page:

```html
<div id="inline-translator"></div>

<script src="https://cdn.jsdelivr.net/npm/fbt-inline-translations/dist/bundle.js"></script>
<script>
    swiftyperInlineTranslations.default({
        token: 'YOUR_API_KEY_HERE',
        locale: 'sk_SK', // translation locale
        contributor: 'contributor@email.com', // contributor must be invited
        darkMode: false, // dark mode also depends on html class 'tw-dark'
    })
</script>
```

### React usage

In your application, wrap your `App` component. We recommend adding it around your root component in the `index.js` file.

```js
// src/index.js

import ReactDOM from 'react-dom';
import { FbtInlineTranslationsWrapper } from 'fbt-inline-translations';

ReactDOM.render(
  <FbtInlineTranslationsWrapper
    token={'YOUR_API_KEY_HERE'}
    locale={"sk_SK"} // translation locale
    contributor={"contributor@email.com"} // contributor must be invited
    darkMode={false} // dark mode also depends on html class 'tw-dark'
  >
    <App />
  </FbtInlineTranslationsWrapper>,
  document.getElementById('root')
);
```
