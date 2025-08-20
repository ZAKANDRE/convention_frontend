import { useEffect, useState } from 'react';
import { Combobox, useCombobox, ScrollArea, TextInput } from '@mantine/core';
import axios from 'axios';

interface Formation {
  id: number;
  name: string;
  sigle: string;
}

interface FormationComboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function FormationCombox({ value, onChange }: FormationComboxProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Formation[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('http://localhost:8000/api/formations');
        if (response.member) {
          setData(response.member);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des formations:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (value && data.length > 0) {
      const selectedFormation = data.find((item) => String(item.id) === value);
      setSearchValue(selectedFormation?.name || '');
    }
  }, [value, data]);

  const combobox = useCombobox();

  const filteredOptions = data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase().trim())
  );

  const options = filteredOptions.map((item) => (

    <Combobox.Option value={String(item.id)} key={item.id}>
      {item.name} ({item.sigle})
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(optionValue: string) => {
        onChange(optionValue); 
        const selectedName = data.find(item => String(item.id) === optionValue)?.name;
        setSearchValue(selectedName || '');

        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          label="Formation"
          placeholder={loading ? "Chargement..." : "Rechercher une formation"}
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            const selectedFormation = data.find((item) => String(item.id) === value);
            setSearchValue(selectedFormation?.name || '');
            combobox.closeDropdown();
          }}
          required
          disabled={loading}
          mt="md"
          radius="md"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize type="scroll" mah={200}>
            {options.length === 0 && !loading ? <Combobox.Empty>Aucune formation trouvée</Combobox.Empty> : options}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
