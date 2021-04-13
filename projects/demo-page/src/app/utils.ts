export class Utils {
  static replace(str: string, obj: object): string {
    return str.replace(/<%([\w\W][^%]+)%>/g, (val, name) => obj[name] ?? val);
  }
  static toCamelCase(str: string): string {
    return str
      .split(/[,| -]+/)
      .filter(v => !!v && !!v.trim())
      .map((part, index) => index ? this.capitalize(part, true) : part.toLowerCase())
      .join('');
  }
  static capitalize(str: string, toLower = false): string {
    return str[0].toUpperCase() + (toLower ? str.slice(1).toLowerCase() : str.slice(1));
  }
}
