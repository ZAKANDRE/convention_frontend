import { TextInput } from '@mantine/core';
import { useForm }   from '@mantine/form';
import type { UseFormReturnType } from '@mantine/form';

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  return digits.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
}
interface PhoneMaskProps {
  form: UseFormReturnType<any>;
}
export const  PhoneMask = ({ form }: PhoneMaskProps) => {

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(event.target.value);
    form.setFieldValue('telephone', formatted);
  };

  return (
    <TextInput
      label="Téléphone"
      placeholder="06 12 34 56 78"
      required
      radius="md"
      mt="md"
      value={form.values.telephone}
      {...form.getInputProps('telephone')}
      onChange={handlePhoneChange}
    />
  );
}