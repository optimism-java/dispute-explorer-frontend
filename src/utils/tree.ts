export const depth = (position: number): number => {
  return 31 - Math.clz32(position);
};
