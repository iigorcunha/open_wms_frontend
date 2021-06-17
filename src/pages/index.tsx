import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { Sidebar } from '../components/Sidebar';
import { useSidebarDrawer } from '../contexts/SidebarDrawerContext';

export default function Home(): JSX.Element {
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex>
      { !isWideVersion && (
        <IconButton
          aria-label='Open navigation'
          icon={<Icon as={RiMenuLine} color='#023047' />}
          fontSize='28'
          variant='unstyled'
          onClick={onOpen}
          mr='2'
        >

        </IconButton>
      )}

      <Flex w='100%' maxW={1480} mx='auto'>
        <Sidebar />
      </Flex>
    </Flex>
  )
}
