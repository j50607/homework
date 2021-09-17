class SiteEnum {
  constructor(ids, prefix, name, locale) {
    // 站台id
    this.ids = ids;
    // 站台前綴
    this.prefix = prefix;
    // 站台名稱
    this.name = name;
    // 站台语言
    this.locale = locale;
  }

  getIds() {
    return this.ids;
  }

  getPrefix() {
    return this.prefix;
  }

  getName() {
    return this.name;
  }

  getLocale() {
    return this.locale;
  }
}

SiteEnum.FBD = new SiteEnum([14, 801], 'mtz', 'mtz', 'en_us');
SiteEnum.DEFAULT = new SiteEnum([0], 'default', 'default', 'default');

export default SiteEnum;
