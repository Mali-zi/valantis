const uniqueId = (arr: string[]) => {
  const uniqueIds = new Set(arr);
  const uniqueArr = Array.from(uniqueIds);

  return uniqueArr;
};

export default uniqueId;
