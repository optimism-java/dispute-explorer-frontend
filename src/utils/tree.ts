export const depth = (position: bigint): number => {
  const bitLength = position.toString(2).length; // 将 position 转为二进制字符串并获取其长度
  return bitLength - 1;
};
