import { IItem } from './models';

const uniqueItem = (arr: IItem[]) => {
  const uniqueIds = new Set();

  const uniqueProducts = arr.filter((a) => {
    const isDuplicate = uniqueIds.has(a.id);

    uniqueIds.add(a.id);

    if (!isDuplicate) {
      return true;
    }

    return false;
  });

  return uniqueProducts;
};

export default uniqueItem;
