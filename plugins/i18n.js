export default function ({ app, store }) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
		store.commit("other/set_language", newLocale)
	}
}
