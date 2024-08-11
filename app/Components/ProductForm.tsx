import { useForm } from '@mantine/form';
import { TextInput, Textarea, Button, Group } from '@mantine/core';

type Product = {
  name: string;
  description: string;
  price: string;
  status: string;
};

type ProductFormProps = {
  initialValues: Product;
  onSubmit: (values: Product) => Promise<void>;
  onDelete?: () => void;
};

export default function ProductForm({ initialValues, onSubmit, onDelete }: ProductFormProps) {
  const form = useForm({
    initialValues,
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      price: (value) => (value ? null : 'Price is required'),
    },
  });

  const handleFormSubmit = async (values: Product) => {
    await onSubmit(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <TextInput
        label="Name"
        placeholder="Enter product name"
        {...form.getInputProps('name')}
      />

      <TextInput
        label="Status"
        placeholder="Enter product status"
        {...form.getInputProps('status')}
      />

      <Textarea
        label="Description"
        placeholder="Enter product description"
        {...form.getInputProps('description')}
      />

      <TextInput
        label="Price"
        placeholder="Enter product price"
        type="number"
        {...form.getInputProps('price')}
      />

      <Group justify='flex-end' mt="md">
        <Button type="submit">Save Changes</Button>
        {onDelete && (
          <Button color="red" onClick={onDelete}>
            Delete
          </Button>
        )}
      </Group>
    </form>
  );
}
