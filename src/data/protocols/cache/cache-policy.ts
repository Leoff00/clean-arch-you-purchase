export class CachePolicy {
  private static MAX_AGE_IN_DAYS = 3;

  private constructor() {}

  static validate(timestamp: Date, date: Date): boolean {
    const maxAge = new Date(timestamp);
    maxAge.setDate(maxAge.getDate() + CachePolicy.MAX_AGE_IN_DAYS);
    return maxAge > date;
  }
}
