interface Item {
  userId: string;
  name: string;
  category: string;
  minimumStock: number;
  daysToNotifyExpirationDate: number;
  measureUnity: string;
  id: string;
}

export const searchFilterItems = (
  searchValue: string,
  list: Item[],
  searchBy = 'name'
): Item[] => {
  const lowerCaseQuery = searchValue.toLowerCase();
  const filteredList = searchValue
    ? list.filter(x => x[searchBy].toLowerCase().includes(lowerCaseQuery))
    : list;
  return filteredList;
};
