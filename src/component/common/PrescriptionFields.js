import React, {useEffect, useState} from 'react';
import * as EmailValidator from 'email-validator';
import {validatePolish} from 'validate-polish';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ZrInput from './ZrInput';
import ZrCheckbox from "./ZrCheckbox";
import {getUserData, isPrescriptionClientType, isServiceClientType} from "../config/Config";

function ListRow(props) {

    const isNotEmpty = (input) => {
        return input !== null && input !== "";
    };

    const isPeselValid = (input) => {
        return validatePolish.pesel(input);
    };

    const isEmailValid = (input) => {
        return EmailValidator.validate(input);
    };

    const isPhoneNumberValid = (input) => {
        var phoneRegexp = /\+48[0-9]{9}$/;
        return input.match(phoneRegexp) !== null;
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

    const [formEmail, setFormEmail] = useState(props.initData.email || props.ownerEmailAddress);
    const [formEmailValid, setFormEmailValid] = useState(isEmailValid(formEmail));
    const [formEmailChanged, setFormEmailChanged] = useState(false);

    const [copied, setCopied] = useState(false);

    const [useDefaultEmail, setUseDefaultEmail] = useState(props.initData.email === undefined || props.initData.email === props.ownerEmailAddress);

    const [formPrice, setFormPrice] = useState(props.initData.price || (isServiceClientType() ? getUserData().defaultPrice || "" : ""));
    const [formPriceValid, setFormPriceValid] = useState(isNotEmpty(formPrice));
    const [formPriceChanged, setFormPriceChanged] = useState(false);

    const setUseDefaultEmailWrapper = (value) => {
        setUseDefaultEmail(value);
        if (value === true) {
            setFormEmail(props.ownerEmailAddress);
            setFormEmailValid(true);
        } else {
            if (!(props.initData.email === undefined || props.initData.email === props.ownerEmailAddress)) {
                setFormEmail(props.initData.email);
            } else {
                setFormEmail("");
            }
            setFormEmailValid(false);
        }
    };

    const isAllValid = () => {
        if (isServiceClientType()) {
            return formFirstNameValid &&
                formLastNameValid &&
                formPeselValid &&
                formRemarksValid &&
                formPhoneNumberValid &&
                formEmailValid &&
                formPriceValid;
        }
        return formFirstNameValid &&
            formLastNameValid &&
            formPeselValid &&
            formRemarksValid &&
            formPhoneNumberValid &&
            formEmailValid;
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
                email: formEmail ? formEmail : props.ownerEmailAddress,
                price: formPrice,
                allValid: allValid
            });
    }, [formFirstName, formLastName, formPesel, formPostalCode, formRemarks, formPhoneNumber, formEmail, formPrice, onChange, allValid]);

    const checkAll = props.checkAll;
    useEffect(() => {
        if (checkAll === true) {
            setFormFirstNameChanged(true);
            setFormLastNameChanged(true);
            setFormPeselChanged(true);
            setFormRemarksChanged(true);
            setFormPhoneNumberChanged(true);
            setFormEmailChanged(true);
            if (isServiceClientType()) {
                setFormPriceChanged(true);
            }
        }
    }, [checkAll]);

    return (
        <>
            {isServiceClientType() ?
                <ZrInput
                    label={"Kwota"}
                    errorMessage={"Pole kwota nie może być puste"}
                    placeholder={"Kwota płatności"}
                    className="mb-3"
                    disabled={props.disabled}
                    value={formPrice}
                    onChange={e => {
                        let trimmedValue = e.target.value.replace(/\D/g, '');
                        setFormPriceValid(isNotEmpty(trimmedValue));
                        setFormPrice(trimmedValue);
                    }}
                    onBlur={() => setFormPriceChanged(true)}
                    isInvalid={formPriceChanged && !formPriceValid}
                    autoFocus={true}
                >
                    <div className={"right-aligned-description"}>
                        PLN
                    </div>
                </ZrInput> : null}

            <ZrInput
                label={"Imię"}
                errorMessage={"Pole imię nie może być puste"}
                placeholder={"Imię pacjenta"}
                className="mb-3"
                disabled={props.disabled}
                value={formFirstName}
                onChange={e => {
                    setFormFirstNameValid(isNotEmpty(e.target.value));
                    setFormFirstName(e.target.value);
                }}
                onBlur={() => setFormFirstNameChanged(true)}
                isInvalid={formFirstNameChanged && !formFirstNameValid}
                autoFocus={isPrescriptionClientType() || isNotEmpty(formPrice)}
            />
            <ZrInput
                label={"Nazwisko"}
                errorMessage={"Pole nazwisko nie może być puste"}
                placeholder={"Nazwisko pacjenta"}
                className="mb-3"
                disabled={props.disabled}
                value={formLastName}
                onChange={e => {
                    setFormLastNameValid(isNotEmpty(e.target.value));
                    setFormLastName(e.target.value);
                }}
                onBlur={() => setFormLastNameChanged(true)}
                isInvalid={formLastNameChanged && !formLastNameValid}
            />
            <div className={props.copyPeselButton ? "zr-input-with-copy" : ""}>
                <ZrInput
                    label={"Pesel"}
                    errorMessage={"Niepoprawny numer pesel"}
                    placeholder={"Pesel pacjenta"}
                    className="mb-3"
                    disabled={props.disabled}
                    value={formPesel}
                    onChange={e => {
                        setFormPeselValid(isPeselValid(e.target.value));
                        setFormPesel(e.target.value);
                    }}
                    onBlur={() => setFormPeselChanged(true)}
                    isInvalid={formPeselChanged && !formPeselValid}
                />
                {props.copyPeselButton && <CopyToClipboard text={formPesel}
                                                           onCopy={() => {
                                                               setCopied(true);
                                                               setTimeout(() => {
                                                                   setCopied(false);
                                                               }, 2000)
                                                           }}>
                    <button className="btn zr-copy-btn button with-tooltip">
                        <span className="tooltiptext" style={copied ? {opacity: 1} : {}}>PESEL skopiowany</span>
                        Kopiuj
                    </button>
                </CopyToClipboard>}
            </div>
            <ZrInput
                label={"Kod pocztowy"}
                placeholder={"Kod pocztowy pacjenta"}
                className="mb-3"
                disabled={props.disabled}
                value={formPostalCode}
                onChange={e => setFormPostalCode(e.target.value)}
            />
            {isPrescriptionClientType() ?
                <ZrInput
                    label={"Leki na recepcie"}
                    errorMessage={"Pole leki na recepcie nie może być puste"}
                    placeholder={"Nazwy leków"}
                    className="mb-3"
                    disabled={props.disabled}
                    value={formRemarks}
                    onChange={e => {
                        setFormRemarksValid(isNotEmpty(e.target.value));
                        setFormRemarks(e.target.value);
                    }}
                    onBlur={() => setFormRemarksChanged(true)}
                    isInvalid={formRemarksChanged && !formRemarksValid}
                /> : null}
            {isServiceClientType() ?
                <ZrInput
                    label={"Szczegóły usługi"}
                    errorMessage={"Pole szczegóły usługi nie może być puste"}
                    placeholder={"Czego dotyczy płatność"}
                    className="mb-3"
                    disabled={props.disabled}
                    value={formRemarks}
                    onChange={e => {
                        setFormRemarksValid(isNotEmpty(e.target.value));
                        setFormRemarks(e.target.value);
                    }}
                    onBlur={() => setFormRemarksChanged(true)}
                    isInvalid={formRemarksChanged && !formRemarksValid}
                /> : null}

            <ZrInput
                label={"Numer telefonu"}
                errorMessage={"Niepoprawny numer telefonu"}
                placeholder={"Numer telefonu pacjenta"}
                className="mb-3"
                disabled={props.disabled}
                value={formPhoneNumber}
                onChange={e => {
                    setFormPhoneNumberValid(isPhoneNumberValid(e.target.value));
                    setFormPhoneNumber(e.target.value);
                }}
                onBlur={() => setFormPhoneNumberChanged(true)}
                isInvalid={formPhoneNumberChanged && !formPhoneNumberValid}
                noSelectionOnFocus={true}
            />
            {
                props.defaultEmailFeature &&
                <ZrCheckbox className="mb-3" label="Pacjent nie posiada adresu e-mail"
                            onChange={setUseDefaultEmailWrapper}
                            initValue={useDefaultEmail}/>
            }
            <ZrInput
                label={"E-mail"}
                errorMessage={"Niepoprawny adres e-mail"}
                placeholder={"Adres e-mail"}
                className={"mb-3" + props.defaultEmailFeature && useDefaultEmail ? "d-none" : ""}
                disabled={props.disabled || useDefaultEmail}
                value={formEmail}
                onChange={e => {
                    setFormEmailValid(isEmailValid(e.target.value));
                    setFormEmail(e.target.value)
                }}
                onBlur={() => setFormEmailChanged(true)}
                isInvalid={formEmailChanged && !formEmailValid}
            />
        </>
    );
}

export default ListRow;
