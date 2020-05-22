import React, {useEffect, useState} from 'react';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";


function ListRow(props) {

    const [formFirstName, setFormFirstName] = useState("");
    const [formLastName, setFormLastName] = useState("");
    const [formPesel, setFormPesel] = useState("");
    const [formPostalCode, setFormPostalCode] = useState("");
    const [formRemarks, setFormRemarks] = useState("");
    const [formPhoneNumber, setFormPhoneNumber] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const onChange = props.onChange;
    useEffect(() => {
        onChange(
            {
                firstName: formFirstName,
                lastName: formLastName,
                pesel: formPesel,
                postalCode: formPostalCode,
                remarks: formRemarks,
                phoneNumber: formPhoneNumber,
                email: formEmail
            });
    }, [formFirstName, formLastName, formPesel, formPostalCode, formRemarks, formPhoneNumber, formEmail, onChange]);

    return (
        <>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Imię</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    onChange={e => setFormFirstName(e.target.value)}
                    placeholder="Imię pacjenta"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Nazwisko</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    onChange={e => setFormLastName(e.target.value)}
                    placeholder="Nazwisko pacjenta"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">PESEL</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    onChange={e => setFormPesel(e.target.value)}
                    placeholder="PESEL"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Kod pocztowy</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    onChange={e => setFormPostalCode(e.target.value)}
                    placeholder="Kod pocztowy"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Uwagi/Objawy</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    onChange={e => setFormRemarks(e.target.value)}
                    placeholder="Uwagi/objawy"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Numer telefonu</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    onChange={e => setFormPhoneNumber(e.target.value)}
                    placeholder="Numer telefonu"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Email</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    onChange={e => setFormEmail(e.target.value)}
                    placeholder="Email"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
        </>
    );
}

export default ListRow;
