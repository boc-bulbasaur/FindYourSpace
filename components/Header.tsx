/* eslint-disable react/no-children-prop */
import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import{Flex, InputGroup, InputRightElement, Input, Menu, MenuButton, MenuList, MenuItem, Text} from '@chakra-ui/react'
import {BiSearch, BiStar} from 'react-icons/bi'

const Header = ({setType, setRatings, setCoordinates})=>{
  const [autocomplete, setAuotcomplete] = useState(null)
  const onLoad = (autoC) => setAuotcomplete(autoC);
  const onPlaceChanged = ()=>{
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()
    setCoordinates({lat,lng})
  }
  return (
    <Flex
    position ={'absolute'}
    top={0}
    left={0}
    width={'full'}
    px={4}
    py={2}
    zIndex={101}
    >
      <Flex>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <InputGroup width={'35vw'} shadow='lg'>
            <InputRightElement
            pointerEvents = {'none'}
            children={<BiSearch color ='gray' fontSize={20} />}
            />
            <Input
              type={'text'}
              placeholder ='Search Available Parking...'
              variant = {'filled'}
              fontSize = {18}
              bg = {'white'}
              color = {'gray.700'}
              _hover = {{bg:'whiteAlppha.800'}}
              _focus = {{bg: 'whiteAlpha.800'}}
              _placeholder ={{color: 'gray.700'}}
            />
          </InputGroup>
        </Autocomplete>
        <Flex
          alignItems = {'center'}
          justifyContent={'center'}>
          <Flex
            px={4}
            py={2}
            bg={'white'}
            rounded={'full'}
            ml={4}
            shadow='lg'
            cursor={'pointer'}
            _hover={{bg:'gray.100'}}
            transition={'ease-in-out'}
            transitionDuration ={'0.3s'}
          >
            <Menu>
              <BiStar fontSize={25} />
              <MenuButton mx={2} transition='all 0.2s' borderRadius={'md'}>
                Filter
              </MenuButton>
              <MenuList>
                <MenuItem display = {'flex'} alignItems={'center'} justifyContent={'center'} onClick={()=>setRatings('')}>
                  <Text fontSize={20} fontWeight={500} color={'orange.500'}>
                    Distance
                  </Text>
                </MenuItem>
                <MenuItem display = {'flex'} alignItems={'center'} justifyContent={'center'} onClick={()=>setRatings('')}>
                  <Text fontSize={20} fontWeight={500} color={'orange.500'}>
                    Price
                  </Text>
                </MenuItem>

              </MenuList>
            </Menu>
          </Flex>
       </Flex>
      </Flex>
    </Flex>
  )
}

export default Header;