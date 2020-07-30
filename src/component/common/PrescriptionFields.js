import React, {useEffect, useState} from 'react';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import * as EmailValidator from 'email-validator';
import {validatePolish} from 'validate-polish';

function ListRow(props) {

    const isNotEmpty = (input) => {
        return input !== "";
    };

    const isPeselValid = (input) => {
        return validatePolish.pesel(input);
    };

    const isEmailValid = (input) => {
        return EmailValidator.validate(input);
    };
    const isEmailEmpty = (email) => {
        return email === "";
    };

    const isPhoneNumberValid = (input) => {
        var phoneRegexp = /\+48[0-9]{9}$/;
        return input.match(phoneRegexp) !== null;
    };

    const isPhoneNumberEmpty = (phoneNumber) => {
        return phoneNumber === '' || phoneNumber === '+48';
    };

    const [formFirstName, setFormFirstName] = useState(props.initData.firstName || "");
    const [formFirstNameValid, setFormFirstNameValid] = useState(isNotEmpty(formFirstName));
    const [formFirstNameChanged, setFormFirstNameChanged] = useState(false);

    const [formLastName, setFormLastName] = useState(props.initData.lastName || "");
    const [formLastNameValid, setFormLastNameValid] = useState(isNotEmpty(formFirstName));
    const [formLastNameChanged, setFormLastNameChanged] = useState(false);

    const [formPesel, setFormPesel] = useState(props.initData.pesel || "");
    const [formPeselValid, setFormPeselValid] = useState(isPeselValid(formPesel));
    const [formPeselChanged, setFormPeselChanged] = useState(false);

    const [formPostalCode, setFormPostalCode] = useState(props.initData.postalCode || "");

    const [formRemarks, setFormRemarks] = useState(props.initData.remarks || "");
    const [formRemarksValid, setFormRemarksValid] = useState(isNotEmpty(formFirstName));
    const [formRemarksChanged, setFormRemarksChanged] = useState(false);

    const [formPhoneNumber, setFormPhoneNumber] = useState(props.initData.phoneNumber || "+48");
    const [formPhoneNumberValid, setFormPhoneNumberValid] = useState(isPhoneNumberValid(formPhoneNumber));
    const [formPhoneNumberChanged, setFormPhoneNumberChanged] = useState(false);

    const [formEmail, setFormEmail] = useState(props.initData.email || "krzyampagabinet@outlook.com");
    const [formEmailValid, setFormEmailValid] = useState(isEmailValid(formEmail));
    const [formEmailChanged, setFormEmailChanged] = useState(false);

    const [showOneFormOfContact, setShowOneFormOfContact] = useState(false);


    const isAllValid = () => {
        return formFirstNameValid &&
            formLastNameValid &&
            formPeselValid &&
            formRemarksValid &&
            (formPhoneNumberValid || formEmailValid);
    };

    const onChange = props.onChange;
    const allValid = isAllValid();

    useEffect(() => {
        onChange(
            {
                firstName: formFirstName,
                lastName: formLastName,
                pesel: formPesel,
                postalCode: formPostalCode,
                remarks: formRemarks,
                phoneNumber: formPhoneNumber,
                email: formEmail,
                allValid: allValid
            });
    }, [formFirstName, formLastName, formPesel, formPostalCode, formRemarks, formPhoneNumber, formEmail, onChange, allValid]);

    const checkAll = props.checkAll;
    useEffect(() => {
        if(checkAll === true) {
            setFormFirstNameChanged(true);
            setFormLastNameChanged(true)
            setFormPeselChanged(true);
            setFormRemarksChanged(true);
            if(isEmailEmpty(formEmail) && isPhoneNumberEmpty(formPhoneNumber)) {
                setShowOneFormOfContact(true);
            }
            else {
                setFormPhoneNumberChanged(true);
                setFormEmailChanged(true)
            }
        }
    }, [checkAll]);

    return (
        <>
            <InputGroup className={"mb-3 " + (formFirstNameChanged && !formFirstNameValid ? "patient-input-invalid" : "")}>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Imię</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    disabled={props.disabled}
                    value={formFirstName}
                    onChange={e => {
                        setFormFirstNameValid(isNotEmpty(e.target.value));
                        setFormFirstName(e.target.value);
                    }}
                    onBlur={() => setFormFirstNameChanged(true)}
                    placeholder="Imię pacjenta"
                    aria-describedby="inputGroup-sizing-default"
                />
                <div className="patient-input-error-message">Imię nie może być puste</div>
            </InputGroup>
            <InputGroup className={"mb-3 " + (formLastNameChanged && !formLastNameValid ? "patient-input-invalid" : "")}>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Nazwisko</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    disabled={props.disabled}
                    value={formLastName}
                    onChange={e => {
                        setFormLastNameValid(isNotEmpty(e.target.value));
                        setFormLastName(e.target.value);
                    }}
                    onBlur={() => setFormLastNameChanged(true)}
                    placeholder="Nazwisko pacjenta"
                    aria-describedby="inputGroup-sizing-default"
                />
                <div className="patient-input-error-message">Nazwisko nie może być puste</div>
            </InputGroup>
            <InputGroup className={"mb-3 " + (formPeselChanged && !formPeselValid ? "patient-input-invalid" : "")}>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">PESEL</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    disabled={props.disabled}
                    value={formPesel}
                    onChange={e => {
                        setFormPeselValid(isPeselValid(e.target.value));
                        setFormPesel(e.target.value);
                    }}
                    onBlur={() => setFormPeselChanged(true)}
                    placeholder="PESEL"
                    aria-describedby="inputGroup-sizing-default"
                />
                <div className="patient-input-error-message">Niepoprawny numer PESEL</div>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Kod pocztowy</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    disabled={props.disabled}
                    value={formPostalCode}
                    onChange={e => setFormPostalCode(e.target.value)}
                    placeholder="Kod pocztowy"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <InputGroup className={"mb-3 " + (formRemarksChanged && !formRemarksValid ? "patient-input-invalid" : "")}>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Uwagi/Objawy</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    disabled={props.disabled}
                    as="textarea"
                    value={formRemarks}
                    onChange={e => {
                        setFormRemarksValid(isNotEmpty(e.target.value));
                        setFormRemarks(e.target.value);
                    }}
                    onBlur={() => setFormRemarksChanged(true)}
                    placeholder="Uwagi/objawy"
                    aria-describedby="inputGroup-sizing-default"
                />
                <div className="patient-input-error-message">Uwagi/objawy nie mogą być puste</div>
            </InputGroup>
            <InputGroup className={"mb-3 " + (formPhoneNumberChanged && !isPhoneNumberEmpty(formPhoneNumber) && !formPhoneNumberValid ? "patient-input-invalid" : "")}>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Numer telefonu</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    disabled={props.disabled}
                    value={formPhoneNumber}
                    onChange={e => {
                        setFormPhoneNumberValid(isPhoneNumberValid(e.target.value));
                        setFormPhoneNumber(e.target.value);
                    }}
                    onBlur={() => setFormPhoneNumberChanged(true)}
                    placeholder="Numer telefonu"
                    aria-describedby="inputGroup-sizing-default"
                />
                <div className="patient-input-error-message">Niepoprawny numer telefonu</div>
            </InputGroup>
            <InputGroup className={"email-input mb-3 " + (formEmailChanged && !isEmailEmpty(formEmail) && !formEmailValid ? "patient-input-invalid" : "")}>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Email</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    disabled={props.disabled}
                    value={formEmail}
                    onChange={e => {
                        setFormEmailValid(isEmailValid(e.target.value));
                        setFormEmail(e.target.value)
                    }}
                    onBlur={() => setFormEmailChanged(true)}
                    placeholder="Email"
                    aria-describedby="inputGroup-sizing-default"
                />
                <div className="patient-input-error-message">Niepoprawny adres email</div>
            </InputGroup>

            <div className={( showOneFormOfContact && !formPhoneNumberValid && !formEmailValid ) ? "patient-input-invalid" : ""}>
                <div className="patient-input-error-message">Proszę podać przynajmniej jedną forme kontaktu (telefon lub email)</div>
            </div>
        </>
    );
}

export default ListRow;
