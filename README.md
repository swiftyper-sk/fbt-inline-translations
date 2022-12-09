# 👽 Inline translations for FBT

The extension serves to effectively translate your application using inline translations so that you can view strings you are
translating in context.
If you right-click on the underlined string, the translation dialog appears and you will be able to vote for the available translations or submit a new one.

You can make translations available to your translators, users, or the entire community and make your product multilingual.

**Translations can also be approved by your trusted translator(s).**

![Demo of FBT inline translating](https://raw.githubusercontent.com/swiftyper-sk/fbt-inline-translations/main/images/demo.gif)


## ℹ️ Usage notes

- this library requires FBT for PHP:
  - [FBT for Laravel (v5.5+)](https://github.com/richardDobron/laravel-fbt)
  - [FBT for PHP (v7.0+)](https://github.com/richardDobron/fbt)

## 📦 Installing

```
npm install fbt-inline-translations
```

## 🔧 Configuration

Register your FBT project on [Swiftyper Translations](https://translations.swiftyper.sk)


### Non-React usage

Add this code to your page:

```html
<div id="inline-translator"></div>

<script src="https://cdn.jsdelivr.net/npm/fbt-inline-translations/dist/bundle.js"></script>
<script>
    swiftyperInlineTranslations({
        token: 'YOUR_API_KEY_HERE',
        locale: 'sk_SK', // translation locale
        contributor: 'contributor@email.com', // contributor must be invited
        darkMode: false, // dark mode also depends on html class 'tw-dark'
    })
</script>
```