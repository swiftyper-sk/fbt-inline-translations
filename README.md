# 👽 Inline Translations for FBT

The extension serves to effectively translate your application using inline translations so that you can view strings you are
translating in context.
If you right-click on the underlined string, the translation dialog appears and you will be able to vote for the available translations or submit a new one.

You can make translations available to your translators, users, or the entire community and make your product multilingual.

❇️ **Translations can also be approved by your trusted translator(s).**

## 👀 Preview

![Demo of FBT inline translating](https://raw.githubusercontent.com/swiftyper-sk/fbt-inline-translations/main/images/demo.gif)


## ℹ️ Prerequisites

This library requires one of the following FBT frameworks:
  - [FBT for Laravel (v5.5+)](https://github.com/richardDobron/laravel-fbt)
  - [FBT for PHP (v7.0+)](https://github.com/richardDobron/fbt)
  - [FBT for JavaScript](https://github.com/facebook/fbt)
  - [FBTee for JavaScript](https://github.com/nkzw-tech/fbtee)

## ✨ Key Features

- 📝 **Inline**: translating for real-time context
- 📚 **Glossary**: support for consistent terminology
- 👍 **Voting**: on translation options
- 🔄 **Variations**: for dynamic content
- 🌙 **Dark Mode**: to match your theme

## 📦 Installation

⚠️ **React 15 or higher is required.**

Install the plugin using npm or yarn:

```bash
npm install fbt-inline-translations
# or
yarn add fbt-inline-translations
```

### How to Add Polyfills in Webpack 5

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

```shell
npm install buffer url path-browserify stream-http https-browserify --save-dev
# you may need to clear your cache after this change
rm -fr node_modules/.cache
```

Restart the Dev Server and the error will be gone.

## Instructions for JavaScript Version of FBT Package

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


| **Option**                | **Type** | **Description**                                                     |
|---------------------------|----------|---------------------------------------------------------------------|
| `apiKey`                  | string   | API key for authenticating with the translation service.                    |
| `locale`                  | string   | Locale setting for translations (e.g., `en_US`, `de_DE`). |
| `contributor`             | string   | Contributor email for authentication.                               |
| `darkMode`                | boolean  | Dark mode theme.                                                    |

## ⚡️ Quick Start

### Non-React Usage

Include the following code snippet in your HTML page:

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

### React Usage

In your application, wrap your `App` component. We recommend adding it around your root component in the `index.js` file.

```javascript
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

## 🧪 Testing

```bash
npm run start
```

## 🌟 Contributing

We welcome contributions! If you'd like to help improve this project, feel free to open an issue or submit a pull request.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
