import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import ua from '@/locales/ua.json';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ru,
    ua
  },
});

export default i18n;
