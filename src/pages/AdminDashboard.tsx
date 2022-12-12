import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

import { Layout } from '../components/Layout';
import { NewCategory } from '../components/NewCategory';
import { NewProduct } from '../components/NewProduct';

enum FormsKeys {
  NewCategory = 'NewCategory',
  NewProduct = 'NewProduct',
}

const Forms = {
  [FormsKeys.NewCategory]: <NewCategory />,
  [FormsKeys.NewProduct]: <NewProduct />,
};

export const AdminDashboard = () => {
  const [form, setForm] = useState<FormsKeys>(FormsKeys.NewCategory);
  return (
    <Layout>
      <Row className="mt-3">
        <Col className="justify-content-center d-flex" sm={12}>
          <BootstrapSwitchButton
            width={200}
            onlabel="New Product"
            offlabel="New Category"
            onChange={() => {
              setForm(form === FormsKeys.NewCategory ? FormsKeys.NewProduct : FormsKeys.NewCategory);
            }}
          />
        </Col>
      </Row>
      {Forms[form]}
    </Layout>
  );
};
