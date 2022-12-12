import { FormEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import { RootState } from '../redux/reducers/rootReducers';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../context/ReactReduxFirebaseContextProvider';

export const NewProduct = () => {
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [file, setFile] = useState<File | undefined>();
  const [error, setError] = useState('');

  const firestore = useFirestore();
  useFirestoreConnect('categories');
  const categories = useSelector<RootState, Array<{ id: string; name: string; color: string }>>(
    (state) => state?.firestore?.ordered?.categories,
  );

  const handleCreateNewProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productName) {
      Swal.fire('Error!', 'Product name is required', 'error');
      return;
    }

    if (!categoryId) {
      Swal.fire('Error!', 'Category is required', 'error');
      return;
    }
    try {
      const productsReq = await getDocs(firestore.collection('products'));
      const products = productsReq?.docs.map((doc) => doc.data());
      const hasThisCategory = products?.find((product) => productName.toLowerCase() === product?.name.toLowerCase());

      if (hasThisCategory) {
        Swal.fire('Error!', 'Product already exists', 'error');
        return;
      }

      const fileName = `images/${productName?.replace(' ', '_')}${file?.name?.slice(-5)}`;

      const reqFile = await uploadBytes(ref(storage, fileName), file as Blob);

      const url = await getDownloadURL(reqFile?.ref);

      const firestorePromise = firestore.add('products', {
        name: productName,
        categoryId,
        file: url,
      });

      toast.promise(firestorePromise, {
        pending: 'Creating new product...',
        success: 'The product has been created successfully 👌',
        error: 'An error occurred when creating the product , please try again later🤯',
      });

      const target = e?.target as HTMLFormElement;
      target.reset();
      setProductName('');
      setCategoryId('');
      setFile(undefined);
    } catch (error) {}
  };

  return (
      <Form onSubmit={handleCreateNewProduct}>
        <Form.Group className="mb-3">
          <Form.Label>Product name:</Form.Label>
          <Form.Control
            type="text"
            id="product_name"
            value={productName}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setProductName(target?.value);
              if (error) {
                setError('');
              }
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Choose a category:</Form.Label>
          <Form.Select
            onChange={(e) => {
              const target = e.target as HTMLSelectElement;
              setCategoryId(target?.value);
            }}
            name="categories"
            id="categories"
          >
            <option>- Select -</option>
            {categories?.map((category) => (
              <option key={category?.id} value={category?.id}>
                {category?.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload Product image:</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setFile(target?.files?.[0]);
              if (error) {
                setError('');
              }
            }}
            name="product_file"
            id="product_file"
          />
        </Form.Group>
        <Button className="w-100 mt-4" type="submit">
          Create
        </Button>
      </Form>
  );
};
