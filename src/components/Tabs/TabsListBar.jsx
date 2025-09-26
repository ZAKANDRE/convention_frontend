import {TabsInfo} from '../Tab/TabsInfo.jsx'
import { Tabs} from '@mantine/core';

export const TabsListBar = ({ infos }) => {
      return( 
          <Tabs.List>
              {infos.map(info => (
                <TabsInfo info={info} key={info.id} value={info.value} />
              ))}
          </Tabs.List>
      );
};