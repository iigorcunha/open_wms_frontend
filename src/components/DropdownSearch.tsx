import { Flex, List, ListItem, Input as ChakraInput } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';

interface Item {
  userId: string;
  name: string;
  id: string;
}

interface DropdownSearchProps {
  name: string;
  listItems: Item[];
  setValue: (name: string, value: string) => void;
}

const DropdownSearchComponent = ({
  name,
  listItems,
  setValue,
}: DropdownSearchProps): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedItemName, setSelectedItemName] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setItems(listItems);
  }, [listItems]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchValue(e.currentTarget.value);
    if (!visible) {
      setVisible(true);
    }
  };

  const selectItem = (item: Item): void => {
    setSelectedItemName(item.name);
    setValue(name, item.id);
    setVisible(false);
  };

  useEffect((): void => {
    const lowerCaseQuery = searchValue.toLowerCase();
    const filteredList = searchValue
      ? listItems.filter(x => x.name.toLowerCase().includes(lowerCaseQuery))
      : listItems;
    setItems(filteredList);
  }, [listItems, setItems, searchValue]);

  return (
    <Flex
      flexDir="column"
      align="center"
      w="100%"
      maxW="450px"
      position="relative"
      ref={dropdownRef}
    >
      <ChakraInput
        autoComplete="off"
        w="100%"
        name={name}
        className="input"
        type="text"
        placeholder="Search Text"
        value={selectedItemName}
        onFocus={() => {
          setVisible(true);
        }}
        size="lg"
        isReadOnly
        aria-label={name}
        fontSize="xl"
        color="main.darkBlue"
        borderWidth="3px"
        borderColor="transparent"
        borderRadius=""
        bgColor="main.offWhite"
        css={{
          borderBottomRightRadius: visible ? '0' : '20px',
          borderBottomLeftRadius: visible ? '0' : '20px',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
        py={8}
        pr={8}
      />

      {visible && (
        <Flex
          flexDir="column"
          w="100%"
          position="absolute"
          top="70px"
          zIndex="3"
          bgColor="#e5e5e5"
          pb={2}
          css={{
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
          maxH={200}
        >
          <ChakraInput
            autoComplete="off"
            w="100%"
            name={name}
            variant="outline"
            className="input"
            type="text"
            value={searchValue}
            placeholder="Buscar Produto"
            onChange={handleChange}
            size="lg"
            aria-label={name}
            fontSize="xl"
            color="main.darkBlue"
            borderWidth="3px"
            borderColor="transparent"
            bgColor="#e5e5e5"
            mb={4}
          />
          <List
            overflowY="scroll"
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#023047',
                borderRadius: '24px',
              },
            }}
          >
            {!items && <ListItem>Produto não encontrado</ListItem>}

            {items &&
              items.map(item => (
                <ListItem
                  as="button"
                  key={item.id}
                  bg="transparent"
                  onClick={() => selectItem(item)}
                  w="100%"
                  textAlign="initial"
                  pl={6}
                  py={2}
                >
                  {item.name}
                </ListItem>
              ))}
          </List>
        </Flex>
      )}
    </Flex>
  );
};

export const DropdownSearch = DropdownSearchComponent;
