import React, {useEffect, useState} from 'react';
import ZrModal from "../common/ZrModal";
import ZrInput from "../common/ZrInput";
import ZrErrorModal from "../common/ZrErrorModal";
import axios from "axios";
import {getEndpoint} from "../config/Config";


function ChangePasswordModal(props) {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepeated, setNewPasswordRepeated] = useState("");
    const [errorAlert, setErrorAlert] = useState({
        show: false, message: ""
    });

    useEffect(() => {
        if (props.show) {
            setOldPassword("");
            setNewPassword("");
            setNewPasswordRepeated("");
            setErrorAlert({show: false, message: ""});
        }
    }, [props.show]);

    const showAlert = (properties) => {
        setErrorAlert({...properties, key: Math.random()});
    };

    return [<ZrModal
        show={props.show}
        showToggle={props.showToggle}
        title={"Zmiana hasła"}
        actionLabel={"Zmień hasło"}
        actionHandler={() => axios.patch(getEndpoint() + "/api/password",
            {
                oldPassword: oldPassword,
                newPassword: newPassword,
                newPasswordRepeated: newPasswordRepeated
            })
            .then(() => {
                showAlert({
                    show: true, onClose: () => {
                    },
                    header: "Informacja", message: "Hasło zostało zmienione."
                })
            })
            .catch(err => {
                    if (err.response.status === 403) {
                        showAlert({
                            show: true, onClose: () => {
                            },
                            header: "Błąd", message: "Błedne hasło."
                        });
                    } else {
                        showAlert({
                            show: true, onClose: () => {
                            },
                            header: "Błąd", message: "Wystąpił błąd - skontaktuj się z administratorem."
                        });
                    }
                    throw err;
                }
            )}
        disabled={oldPassword === "" || newPassword === "" || newPasswordRepeated === "" || newPassword !== newPasswordRepeated}>
        <ZrInput
            type={"password"}
            label={"Stare hasło"}
            placeholder={"Stare hasło"}
            className="mb-3"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
        />
        <ZrInput
            type={"password"}
            label={"Nowe hasło"}
            placeholder={"Nowe hasło"}
            className="mb-3"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
        />
        <ZrInput
            type={"password"}
            label={"Powtórz nowe hasło"}
            placeholder={"Powtórz nowe hasło"}
            className="mb-3"
            value={newPasswordRepeated}
            onChange={e => setNewPasswordRepeated(e.target.value)}
        />
        {(newPasswordRepeated !== "") && newPassword !== newPasswordRepeated &&
        <div className={"change-password-error-label"}>
            Podane hasła nie pasują
        </div>
        }
    </ZrModal>,
        <ZrErrorModal show={errorAlert.show} onClose={() => {
        }} message={errorAlert.message}
                      key={errorAlert.key} header={errorAlert.header}/>];
}

export default ChangePasswordModal;
