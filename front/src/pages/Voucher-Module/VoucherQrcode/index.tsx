import {Dialog} from "../../../base-components/Headless";
import Button from "../../../base-components/Button";
import React, {useEffect, useRef, useState} from "react";
import voucherService from "../../../Services/VoucherService";
import {APP_URL} from "../../../utils/config";
import QRCode from "qrcode.react";

interface ModalProps {
    isOpen: boolean;
    voucherId: string;
    onClose: () => void;
}

function main({isOpen, onClose, voucherId}: ModalProps) {

    const size = 256;
    const [value, setValue] = useState("");
    const sendButtonRef = useRef(null);
    let [voucher, setVoucher] = useState<any>();
    useEffect(() => {
        if (isOpen) {
            voucherService.getById(voucherId ?? '').then(x => {
                setVoucher(x);
                console.log(x);//fixme there is error in voucher not getting set
                setValue(APP_URL + "/voucher/verify/" + voucher._id);
            });
        }

    }, [isOpen]);


    return value !== '' ?
        (<>


            {/* BEGIN: Modal Content */}
            <Dialog open={isOpen} onClose={onClose} initialFocus={sendButtonRef}>
                <Dialog.Panel>
                    <Dialog.Title>
                        <h2 className="mr-auto text-base font-medium">
                            QR Code for {voucher ? voucher.nom + " " + voucher.prenom : ''}
                        </h2>

                    </Dialog.Title>
                    <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">

                        <div className={" ml-auto col-span-12 sm:col-span-6"}>
                            <div className={"flex justify-center items-center h-64"}>
                                <QRCode value={value} size={size}/>
                            </div>
                        </div>
                    </Dialog.Description>
                    <Dialog.Footer>
                        <Button type="button" variant="outline-secondary" className="w-20 mr-1" onClick={() => {
                            onClose()
                        }}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className="w-20" ref={sendButtonRef}>
                            Save
                        </Button>

                    </Dialog.Footer>
                </Dialog.Panel>
            </Dialog>
            )

            {/* END: Modal Content */}
        </>)
        : <p>Loading...</p>;
}

export default main;