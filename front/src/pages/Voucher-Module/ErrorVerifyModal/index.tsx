import Button from "../../../base-components/Button";
import {Dialog} from "../../../base-components/Headless";
import Lucide from "../../../base-components/Lucide";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function main({isOpen, onClose}: ModalProps) {

    return (
        <>

            {/* BEGIN: Modal Content */}
            <Dialog open={isOpen} onClose={onClose}>
                <Dialog.Panel>
                    <div className="p-5 text-center">
                        <Lucide icon="XCircle" className="w-16 h-16 mx-auto mt-3 text-danger"/>
                        <div className="mt-5 text-3xl">Voucher not verified</div>
                        <div className="mt-2 text-slate-500">
                            Voucher is not eligible for consumption, it is consumed or there is an error in the system.
                            Please contact the administrator
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