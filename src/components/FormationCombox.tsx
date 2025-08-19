import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox, ScrollArea, TextInput } from '@mantine/core';

const FormationCMFP = [
    // Aéronautique
    { formation: "Ajusteur Monteur Aéronautique", acronyme: "TP AMA" },
    { formation: "Monteur Câbleur Aéronautique", acronyme: "TP MCA" },
    { formation: "Soudeur Assembleur Industriel et licence TIG Inox Aéronautique", acronyme: "TP SAI + TIG AERO" },
    { formation: "Inspecteur Qualité Aéronautique et Spatiale", acronyme: "TP IQAS" },

    // Bâtiment
    { formation: "Agent de Maintenance des Bâtiments", acronyme: "TP AMB" },
    { formation: "Conducteur d'Engins de Chantiers Urbains", acronyme: "TP CECU" },
    { formation: "Électricien d'Équipement du Bâtiment", acronyme: "TP EEB" },
    { formation: "Installateur Thermique et Sanitaire", acronyme: "TP ITS" },
    { formation: "Menuisier Agenceur", acronyme: "TP MA" },
    { formation: "Technicien d'Études du Bâtiment en Dessin de Projet", acronyme: "TP TEBDP" },
    { formation: "Technicien d'Installation en Équipements de Confort Climatique", acronyme: "TP TIECC" },
    { formation: "Technicien du Bâtiment Communicant et Connecté", acronyme: "TP TBCC" },

    // Génie Climatique
    { formation: "Monteur Dépanneur Frigoriste", acronyme: "TP MDF" },
    { formation: "Technicien d'Intervention en Froid Commercial et Climatisation", acronyme: "TP TIFCC" },

    // Industrie
    { formation: "Opérateur Régleur en Usinage Assisté par Ordinateur", acronyme: "TP ORUAO" },
    { formation: "Fraiseur en Réalisation de Pièces Mécaniques", acronyme: "TP FRPM" },
    { formation: "Soudeur Assembleur Industriel et licence TIG Inox", acronyme: "TP SAI + TIG" },
    { formation: "Technicien en Usinage Assisté par Ordinateur", acronyme: "TP TUAO" },
    { formation: "Tourneur en Réalisation de Pièces Mécaniques", acronyme: "TP TRPM" },

    // Mécanique
    { formation: "Carrossier Réparateur (initiation peinture)", acronyme: "TP CR" },
    { formation: "Mécanicien Automobile", acronyme: "TP MA" },
    { formation: "Mécanicien Réparateur de Motocycles", acronyme: "TP MRM" },

    // Réseaux, Télécommunication, Informatique
    { formation: "Développeur Web et Web Mobile", acronyme: "TP DWWM" },
    // Note: Le site mentionne d'autres formations dans ce domaine sans les lister exhaustivement.

    // Transport et Logistique (Exemples courants)
    { formation: "Agent Magasinier", acronyme: "TP AM" },
    { formation: "Préparateur de Commandes en Entrepôt", acronyme: "TP PCE" },
    { formation: "Technicien en Logistique d'Entreposage", acronyme: "TP TLE" },
    { formation: "Conducteur du Transport Routier de Marchandises sur Porteur", acronyme: "TP CTRMP" },
    { formation: "Conducteur Livreur sur Véhicule Utilitaire Léger", acronyme: "TP CLVUL" },
    { formation: "Conducteur de Transport en Commun sur Route", acronyme: "TP CTCR" },
    
    // Services (Exemples courants)
    { formation: "Agent de Sûreté et de Sécurité Privée", acronyme: "TP ASSP" },
    { formation: "Assistant de Vie aux Familles", acronyme: "TP ADVF" }
];

export function FormationCombox() {
  const combobox = useCombobox();
  const [value, setValue] = useState('');
  const shouldFilterOptions = !FormationCMFP.some((item) => item.formation === value);
  const filteredOptions = shouldFilterOptions
    ? FormationCMFP.filter((item) => item.formation.toLowerCase().includes(value.toLowerCase().trim()))
    : FormationCMFP;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.formation} key={item.formation}>
      {item.formation} {item.acronyme}
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
            mt={4}
          label="Selectionner votre formation"
          placeholder="Selectionner votre formation"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
          required
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options><ScrollArea.Autosize type="scroll" mah={200}>
            {options.length === 0 ? <Combobox.Empty>Aucunne formation trouvée</Combobox.Empty> : options}
          </ScrollArea.Autosize></Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}