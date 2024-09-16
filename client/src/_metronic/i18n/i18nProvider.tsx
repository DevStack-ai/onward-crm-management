import { FC } from "react";

import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/en";
import "@formatjs/intl-relativetimeformat/locale-data/de";
import "@formatjs/intl-relativetimeformat/locale-data/es";
import "@formatjs/intl-relativetimeformat/locale-data/fr";
import "@formatjs/intl-relativetimeformat/locale-data/ja";
import "@formatjs/intl-relativetimeformat/locale-data/zh";

import { WithChildren } from "../helpers";

const I18nProvider: FC<WithChildren> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export { I18nProvider };
