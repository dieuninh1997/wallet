import I18n from 'react-native-i18n';
import en from './locales/en';
import vi from './locales/vi';
import jp from './locales/jp';
import ta from './locales/ta';
import vis from './locales/vis';

I18n.defaultLocale = 'en';
I18n.locale = 'en';
I18n.fallbacks = true;

I18n.translations = {
  vi,
  en,
  jp,
  ta,
  vis,
};
export default I18n;
