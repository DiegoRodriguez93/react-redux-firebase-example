import { FormEvent, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Button, Form } from 'react-bootstrap';
import { useFirestore } from 'react-redux-firebase';
import { getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const INITIAL_FORM_COLOR = '#aabbcc';

export const NewCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [color, setColor] = useState('#aabbcc');
  const firestore = useFirestore();

  const handleCreateNewCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryName) {
      Swal.fire('Error!', 'Category name is required', 'error');
      return;
    }
    try {
      const categoriesReq = await getDocs(firestore.collection('categories'));
      const categories = categoriesReq?.docs.map((doc) => doc.data());
      const hasThisCategory = categories?.find((category) => categoryName.toLowerCase() === category?.name.toLowerCase());

      if (hasThisCategory) {
        Swal.fire('Error!', 'Category already exists', 'error');
        return;
      }

      const firestorePromise = firestore.add('categories', {
        name: categoryName,
        color,
      });
      toast.promise(firestorePromise, {
        pending: 'Creating new category...',
        success: 'The category has been created successfully 👌',
        error: 'An error occurred when creating the category',
      });
      const target = e?.target as HTMLFormElement;
      target.reset();
      setCategoryName('');
      setColor(INITIAL_FORM_COLOR);
    } catch (error) {}
  };

  return (
    <Form onSubmit={handleCreateNewCategory}>
      <Form.Group className="mb-3">
        <Form.Label>Category name:</Form.Label>
        <Form.Control
          type="text"
          id="category_name"
          value={categoryName}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setCategoryName(target?.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Category color:</Form.Label>
        <HexColorPicker id="category_color" color={color} onChange={setColor} />
      </Form.Group>
      <Button className="w-100 mt-4" type="submit">
        Create
      </Button>
    </Form>
  );
};
