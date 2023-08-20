import Button from "../../../base-components/Button";
import {Dialog} from "../../../base-components/Headless";
import React from "react";
import Lucide from "../../../base-components/Lucide";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    value:number,
}

function main({isOpen, onClose,value}: ModalProps) {

    return (
        <>

            {/* BEGIN: Modal Content */}
            <Dialog open={isOpen} onClose={onClose}>
                <Dialog.Panel>
                    <div className="p-5 text-center">
                        <Lucide icon="CheckCircle" className="w-16 h-16 mx-auto mt-3 text-success"/>
                        <div className="mt-5 text-3xl">Voucher verified</div>
                        <div className="mt-2 text-slate-500">
                            Voucher is eligible for consumption and it will marked as consumed in the database.<br/>
                            The value of the voucher is {value} tnd
                        </div>
                    </div>
                    <div className="px-5 pb-8 text-center">
                        <Button type="button" variant="primary" onClick={onClose}
                                className="w-24"
                        >
                            Ok
                        </Button>
                    </div>
                </Dialog.Panel>
            </Dialog>
            {/* END: Modal Content */}
        </>
    )
}

export default main;