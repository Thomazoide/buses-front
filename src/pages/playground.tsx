import {
  Button,
  Divider,
} from '@/theme/components';
import { ChangeThemeButton } from '@/components';
import { MapSection } from '@/components/map-section/mapSection';
import { Image } from '@nextui-org/react';



export const Playground = () => {

  return (
    <div className='container mx-auto flex flex-col items-center	gap-6 my-6'>
      <div className='flex w-full h-[70px] justify-between space-x-4 border-solid border-3 border-warning-300 rounded-xl p-[10px] '>
        <div className="max-h-full flex lg:w-80 " >
          <Image src='https://storagejca.s3.sa-east-1.amazonaws.com/logo_e_connection.webp' />
        </div>
        <div className="flex flex-row w-full gap-3 justify-start">
          <Button color='warning'>Mapa</Button>
          <Button color='warning'>Choferes</Button>
          <Button color='warning'>Buses</Button>
        </div>
        <div className="flex justify-end" >
          <ChangeThemeButton />
        </div>
      </div>

      <Divider />

      <div className="flex w-full p-[10px]" >
        <MapSection/>
      </div>
    </div>
  );
};
