import {
    FormLabel,
    FormSwitch,
    FormSelect,
} from "../../../base-components/Form";
import {Menu, Dialog} from "../../../base-components/Headless";
import Button from "../../../base-components/Button";
import Lucide from "../../../base-components/Lucide";
import React, {useState, useRef, useEffect} from "react";
import retardService from "../../../Services/RetardService";
import TomSelect from "../../../base-components/TomSelect";
import clsx from "clsx";
import contratService from "../../../Services/ContratService";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface ModalProps {
    isOpen: boolean;
    delayId: string;
    onClose: () => void;
}

function main({isOpen, onClose, delayId}: ModalProps) {

    const sendButtonRef = useRef(null);

    const [contrat, setContrat] = useState('');

    const [contratList, setContratList] = useState<any[]>([]);

    useEffect(() => {
        contratService.contratList().then(x=>setContratList(x)).catch(err=>console.log(err));
    }, []);

    const formSubmit =(event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        retardService.affectContrat(delayId,contrat).then(x=>{
            onClose();
        }).catch(error=>alert("error occured"));

    }
    return (
        <>

            {/* BEGIN: Modal Content */}
            <Dialog open={isOpen} onClose={onClose}
                    initialFocus={sendButtonRef}
            >
                <Dialog.Panel>
                    <Dialog.Title>
                        <h2 className="mr-auto text-base font-medium">
                            Affect a contract
                        </h2>

                    </Dialog.Title>
                    <form onSubmit={formSubmit}>
                        <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
                            <div className="col-span-12 sm:col-span-6">
                                <FormLabel htmlFor="duration">
                                    Select contrat
                                </FormLabel>
                                <TomSelect
                                    value={contrat}
                                    onChange={setContrat}
                                    placeholder="Select the contrat"
                                    className="w-full"
                                    required
                                >
                                    <option>Select contrat</option>
                                    {contratList.map(option => {
                                        return (
                                            < option
                                                key={option._id}
                                                value={option._id}>
                                                {option.title}
                                            </option>
                                        )
                                    })}
                                </TomSelect>
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
                    </form>
                </Dialog.Panel>
            </Dialog>
            {/* END: Modal Content */}
        </>);
}

export default main;