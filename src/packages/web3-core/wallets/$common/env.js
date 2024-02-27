const isProduction = process.env.NODE_ENV === 'production';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const __DEV__ = !isProduction;
