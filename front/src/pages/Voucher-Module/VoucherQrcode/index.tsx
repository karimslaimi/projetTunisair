import {Dialog} from "../../../base-components/Headless";
import Button from "../../../base-components/Button";
import React, {useEffect, useRef, useState} from "react";
import voucherService from "../../../Services/VoucherService";
import {APP_URL} from "../../../utils/config";
import QRCode from "qrcode.react";
import Lucide from "../../../base-components/Lucide";

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
                setValue(APP_URL + "/voucher/verify/" + x._id);
            });
            console.log(value);
        }

    }, [isOpen]);


    return isOpen ? value !== '' ?
        (<>


            {/* BEGIN: Modal Content */}
            <Dialog open={isOpen} onClose={onClose} initialFocus={sendButtonRef}>
                <Dialog.Panel>
                    <Dialog.Title>
                        <h2 className="mr-auto text-base font-medium">
                            QR Code for {voucher ? voucher.nom + " " + voucher.prenom : ''}
                        </h2>

                    </Dialog.Title>
                    <Dialog.Description className="grid grid-cols-12  gap-y-3">

                        <div className={" col-span-4 sm:col-span-6"}>
                            <div className={"flex justify-start items-center"}>
                                <span>{voucher ? voucher.nom + " " + voucher.prenom : ''}</span>
                            </div>
                        </div>
                            <div className={"  col-span-8 sm:col-span-6"}>
                            <div className={"flex justify-end items-center h-64"}>
                                <QRCode value={value} size={size}/>
                            </div>
                            <div className={"flex justify-center items-center mt-2 no-print"}>
                                <Button
                                    id="tabulator-print"
                                    variant="outline-secondary"
                                    className="w-1/2 mr-2 sm:w-auto"
                                    onClick={() => window.print()}
                                >
                                    <Lucide icon="Printer" className="w-4 h-4 mr-2"/> Print
                                </Button>
                            </div>
                        </div>
                    </Dialog.Description>
                    <Dialog.Footer className={"no-print"}>
                        <Button type="button" variant="outline-secondary" className="w-20 mr-1" onClick={() => {
                            onClose()
                        }}>
                            Ok
                        </Button>

                    </Dialog.Footer>
                </Dialog.Panel>
            </Dialog>


            {/* END: Modal Content */}
        </>)
        : <p>Loading...</p> : <></>;
}

export default main;