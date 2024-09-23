import {
  Button,
  Divider,
} from '@/theme/components';
import { ChangeThemeButton } from '@/components';
import { MapSection } from '@/components/map-section/mapSection';
import { Image } from '@nextui-org/react';
import { useState } from 'react';
import ChoferSection from '@/components/chofer-section/choferSection';
import BusSection from '@/components/bus-section/busSection';

enum SECTION {
  DASHBOARD = 1,
  CHOFERS = 2,
  BUSES = 3
}

export const Playground = () => {
  const [section, setSection] = useState<SECTION>(SECTION.DASHBOARD)

  return (
    <div className='container mx-auto flex flex-col items-center	gap-6 my-6'>
      <div className='flex w-full h-[70px] justify-between space-x-4 border-solid border-3 border-warning-300 rounded-xl shadow-md shadow-warning-500 p-[10px] '>
        <div className="max-h-full flex lg:w-80 " >
          <Image src='https://storagejca.s3.sa-east-1.amazonaws.com/logo_e_connection.webp' />
        </div>
        <div className="flex flex-row w-full gap-3 justify-start">
          <Button as="a" href='#dashboard' color='warning' onClick={
            () => setSection(SECTION.DASHBOARD)
          } isDisabled={section === SECTION.DASHBOARD} >Mapa</Button>
          <Button as="a" href='#choferes' color='warning' onClick={
            () => setSection(SECTION.CHOFERS)
          } isDisabled={section === SECTION.CHOFERS} >Choferes</Button>
          <Button as="a" href='#buses' color='warning' onClick={
            () => setSection(SECTION.BUSES)
          } isDisabled={section === SECTION.BUSES} >Buses</Button>
        </div>
        <div className="flex justify-end" >
          <ChangeThemeButton />
        </div>
      </div>

      <Divider />

      <div className="flex w-full p-[10px]" >
        { section === SECTION.DASHBOARD ?
        <MapSection/>
        : section === SECTION.CHOFERS ?
        <ChoferSection/>
        : section === SECTION.BUSES &&
        <BusSection/>
        }
      </div>
    </div>
  );
};
