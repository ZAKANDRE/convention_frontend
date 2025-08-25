import React from 'react';
import { Tabs} from '@mantine/core';

export const TabsInfo = ({ info }) => {
        return (
        <Tabs.Tab key={info.id} value={info.value}>
            {info.label}
        </Tabs.Tab>
        );
};