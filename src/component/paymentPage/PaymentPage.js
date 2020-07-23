import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import PrescriptionFields from '../common/PrescriptionFields';
import {useParams} from 'react-router-dom'
import axios from "axios";
import {getEndpoint} from "../config/Config";

function PaymentPage(props) {

  const [accepted, setAccepted] = useState(false);
  const [clientData, setClientData] = useState({});
  let { prescriptionId } = useParams();

  const handlePay = () => {
  };

  function fetchData() {
    axios.get(getEndpoint() + "/api/prescriptions/client/" + prescriptionId)
    .then(res => {
      setClientData(res.data);
    })
    .catch(err => {
      alert(err);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div className="container">
        <div className="row mb-lg-5 mt-3 mb-sm-2">
          <h4 className="text-center">Szczegóły Twojego zamówienia sporządzonego przez
            gabinet Dr Marka Krzystyniaka</h4>
        </div>
        <div className="row">
          <div className="offset-lg-3 col-lg-6 offset-sm-12 col-sm-12">
            <PrescriptionFields disabled={true} key={clientData.id} onChange={() => {
            }} initData={clientData} checkAll={false}/>
            <Form.Check
                className="mb-4 mt-4"
                type="checkbox"
                id="myid"
            >
              <Form.Check.Input type="checkbox"
                                onChange={e => {
                                  console.log(e.target.checked);
                                  setAccepted(e.target.checked);
                                }} />
              <Form.Check.Label>Oświadczam, że zapoznałem/am się z <a href="/regulamin">regulaminem</a> i akceptuje go</Form.Check.Label>
            </Form.Check>
            <a href={ clientData.orderUrl}>
            <button className="btn btn-success btn-block patient-button" disabled={!accepted} onClick={handlePay}>
              Akceptuj zamówienie i przejdź do płatności
            </button>
            </a>
          </div>
        </div>
        <div className="row">
        </div>
      </div>
  );
}

export default PaymentPage;
