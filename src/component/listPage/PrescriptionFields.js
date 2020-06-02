import React, {useEffect, useState} from 'react';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import * as EmailValidator from 'email-validator';

function ListRow(props) {
    const [formFirstName, setFormFirstName] = useState(props.initData.firstName || "");
    const [formLastName, setFormLastName] = useState(props.initData.lastName || "");
    const [formPesel, setFormPesel] = useState(props.initData.pesel || "");
    const [formPostalCode, setFormPostalCode] = useState(props.initData.postalCode || "");
    const [formRemarks, setFormRemarks] = useState(props.initData.remarks || "");
    const [formPhoneNumber, setFormPhoneNumber] = useState(props.initData.phoneNumber || "+48");
    const [formPhoneNumberValid, setPhoneNumberValid] = useState(true);
    const [formEmail, setFormEmail] = useState(props.initData.email || "");
    const [formEmailValid, setFormEmailValid] = useState(true);
    const formEmailValidate = (input) => {
        setFormEmailValid(input === "" || EmailValidator.validate(input));
    };
    const formPhoneNumberValidate = (input) => {
        var phoneRegexp = /\+48[0-9]{9}$/;
        setPhoneNumberValid(input === '' || input === '+48' || input.match(phoneRegexp));
    };

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
                phoneNumberValid: formPhoneNumberValid,
                email: formEmail,
                emailValid: formEmailValid
            });
    }, [formFirstName, formLastName, formPesel, formPostalCode, formRemarks, formPhoneNumber, formEmail, formEmailValid, formPhoneNumberValid, onChange]);

    return (
        <>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Imię</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    value={formFirstName}
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
                    value={formLastName}
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
                    value={formPesel}
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
                    value={formPostalCode}
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
                    as="textarea"
                    value={formRemarks}
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
                    value={formPhoneNumber}
                    onChange={e => {
                        formPhoneNumberValidate(e.target.value);
                        setFormPhoneNumber(e.target.value);
                    }}
                    placeholder="Numer telefonu"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Email</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    value={formEmail}
                    onChange={e => {
                        formEmailValidate(e.target.value);
                        setFormEmail(e.target.value)
                    }
                    }
                    placeholder="Email"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
        </>
    );
}

export default ListRow;
