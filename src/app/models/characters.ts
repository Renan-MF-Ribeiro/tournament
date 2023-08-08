import { Locale } from './locale';

export interface Character {
  description: {
    defaultText: string;
    localizedByCulture: Locale;
  };
  id: string;
  thumb: string;
  full: string;
  bust: string;
  label: string;
  name: {
    defaultText: string;
    localizedByCulture: Locale;
  };
}
