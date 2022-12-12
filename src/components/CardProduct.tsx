import { format } from 'date-fns';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { HeartOutline, Heart, TrashOutline } from 'react-ionicons';
import { useFirestore } from 'react-redux-firebase';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

type CardProductType = ProductType & {
  favorites: CurrentUser['favorites'];
  userId: string;
  productsIdOfFavorites: Array<string>;
  onlyFavorites?: boolean;
};

type AddedOnTimeType = {
  favorites: CurrentUser['favorites'];
  id: ProductType['id'];
};

const AddedOnTime: FC<AddedOnTimeType> = ({ favorites, id }) => {
  const timeAdded = favorites?.find((fav) => fav?.product_id === id)?.time_added;
  const formatedTime = timeAdded && format(new Date(timeAdded), 'M-d-Y H:I');

  if (!formatedTime) {
    return null;
  }

  return <small>Added {formatedTime}</small>;
};

export const CardProduct: FC<CardProductType> = ({
  id,
  name,
  file,
  favorites,
  productsIdOfFavorites = [],
  userId,
  onlyFavorites,
}) => {
  const firestore = useFirestore();

  const handleFavorite = async (isFavorite: boolean) => {
    if (id) {
      let newFavorites = [...favorites, { product_id: id, time_added: new Date().toISOString() }];
      if (isFavorite) {
        newFavorites = favorites?.filter(({ product_id }) => product_id !== id);
      }
      const firestorePromise = firestore.collection('users').doc(userId).set({ favorites: newFavorites });

      toast.promise(firestorePromise, {
        pending: isFavorite ? 'Removing from favorites...' : 'Adding to favorites...',
        success: `${name ?? 'The Product'} has been ${isFavorite ? 'removed' : 'added'} to favorites successfully 👌`,
        error: `An error occurred when ${isFavorite ? 'removing' : 'adding'} ${
          name ?? 'the Product'
        } to favorites, please try again later🤯`,
      });
    }
  };

  const deleteProduct = () => {
    if (id) {
      Swal.fire({
        title: `Are you sure you want to delete "${name}"?`,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#a83f39',
        imageUrl: file,
        imageHeight: 150,
        imageAlt: name,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const firestorePromise = firestore.collection('products').doc(id).delete();
          toast.promise(firestorePromise, {
            pending: `Removing ${name}...`,
            success: `${name ?? 'The Product'} has been removed successfully 👌`,
            error: `An error occurred when removing ${name ?? 'the Product'} , please try again later🤯`,
          });
        }
      });
    }
  };

  return (
    <Card className="m-2">
      <Card.Img style={{ maxHeight: 250, objectFit: 'contain' }} className="p-4" src={file} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>

        <Row>
          <Col sm={12}>
            {productsIdOfFavorites.includes(id) ? (
              <Heart
                color="#a83f39"
                cssClasses="pointer"
                onClick={() => handleFavorite(true)}
                title={`Remove ${name} to favorites`}
                height="30px"
                width="30px"
              />
            ) : (
              <HeartOutline
                color="#a83f39"
                cssClasses="pointer"
                onClick={() => handleFavorite(false)}
                title={`Add ${name} to favorites`}
                height="30px"
                width="30px"
              />
            )}
            <TrashOutline
              color="#666666"
              cssClasses="pointer"
              onClick={deleteProduct}
              title={`Delete ${name}`}
              height="30px"
              width="30px"
            />
          </Col>
          <Col className="mt-2" sm={12}>
            {onlyFavorites && <AddedOnTime favorites={favorites} id={id} />}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
