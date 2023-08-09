import {
    FormLabel,
    FormSwitch,
    FormInput,
    FormSelect,
} from "../../../base-components/Form";
import { Menu, Dialog } from "../../../base-components/Headless";
import Button from "../../../base-components/Button";
import Lucide from "../../../base-components/Lucide";
import React, {useState, useRef, useEffect} from "react";

interface ModalProps {
    isOpen: boolean;
    voldId: String;
    onClose: () => void;
}

function main({ isOpen , onClose, voldId }:ModalProps){
    const [headerFooterModalPreview, setHeaderFooterModalPreview] = useState(isOpen);
    const sendButtonRef = useRef(null);
    useEffect(() => {
    console.log(voldId);
    }, [isOpen]);
    return(
    <>

        {/* BEGIN: Modal Content */}
        <Dialog open={isOpen} onClose={onClose}
                initialFocus={sendButtonRef}
        >
            <Dialog.Panel>
                <Dialog.Title>
                    <h2 className="mr-auto text-base font-medium">
                        Fill the delay data
                    </h2>

                </Dialog.Title>
                <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
                    <form>

                    </form>
                    <div className="col-span-12 sm:col-span-6">
                        <FormLabel htmlFor="duration">
                            Duration in Hour
                        </FormLabel>
                        <FormInput id="duration" type="number" placeholder="2 hours" />
                    </div>


                </Dialog.Description>
                <Dialog.Footer>
                    <Button type="button" variant="outline-secondary" className="w-20 mr-1" onClick={()=> {onClose()}}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="button" className="w-20" ref={sendButtonRef}>
                        Save
                    </Button>
                </Dialog.Footer>
            </Dialog.Panel>
        </Dialog>
        {/* END: Modal Content */}
    </>);
}
export default main;