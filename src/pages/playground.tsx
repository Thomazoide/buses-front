import {
  Button,
  Divider,
} from '@/theme/components';
import { ChangeThemeButton } from '@/components';
import { MapSection } from '@/components/map-section/mapSection';

export const Playground = () => {
  return (
    <div className='container mx-auto flex flex-col items-center	gap-6 my-6'>
      <div className='flex w-full h-[70px] justify-center space-x-4 border-solid border-3 border-warning-300 rounded-xl p-[10px] '>
        <div className="max-h-full w-full flex justify-start" >
          <h1>LOGO</h1>
        </div>
        <Button color='warning'>Mapa</Button>
        <Button color='warning'>Choferes</Button>
        <Button color='warning'>Buses</Button>
        <div className="flex w-full justify-end" >
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
