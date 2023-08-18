import {
    FormLabel,
    FormInput,

} from "../../../base-components/Form";
import { Dialog} from "../../../base-components/Headless";
import Button from "../../../base-components/Button";
import React, {useState, useRef, useEffect} from "react";
import supplierService from "../../../Services/SupplierService";
import {ClassicEditor} from "../../../base-components/Ckeditor";
import Toastify from "toastify-js";
import Notification from "../../../base-components/Notification";
import Lucide from "../../../base-components/Lucide";
import Alert from "../../../base-components/Alert";

interface ModalProps {
    isOpen: boolean;
    supplierId: string;
    onClose: () => void;
}

function main({isOpen, onClose, supplierId}: ModalProps) {
    const sendButtonRef = useRef(null);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [supplier, setSupplier] = useState<any>();
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        if(supplierId){
            supplierService.getById(supplierId).then(x=>setSupplier(x.data)).catch(()=>{alert("an error occured");onClose();});
        }
    }, [supplierId]);


    const showNotification = () => {
        const failedEl = document
            .querySelectorAll("#failed-notification-content")[0]
            .cloneNode(true) as HTMLElement;
        failedEl.classList.remove("hidden");
        return failedEl;
    }

    const formSubmit =(e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValidContent()){
            supplierService.sendMail(supplierId, subject, message).then(x=>onClose()).catch(()=>{
                displayNotification();
            })
        }else{
            setErrorMessage(true);
            displayNotification();
        }
    }

    const displayNotification=()=>{
        let failedEl = showNotification();
        Toastify({
            node: failedEl,
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
        }).showToast();
    }
    const isValidContent=()=>{
        return message.trim() !== '';
    }
    return supplier?(
        <>

            {/* BEGIN: Modal Content */}
            <Dialog open={isOpen} onClose={onClose} size="xl"
                    initialFocus={sendButtonRef}
            >
                <Dialog.Panel>
                    <Dialog.Title>
                        <h2 className="mr-auto text-base font-medium">
                            Send Mail to {supplier.title}
                        </h2>

                    </Dialog.Title>
                    <form onSubmit={formSubmit}>
                        <Dialog.Description>
                            <div className={"mt-3"}>
                                <FormLabel htmlFor="subject">Subject</FormLabel>
                                <FormInput
                                    id="subject"
                                    type="text"
                                    className="w-full"
                                    placeholder="Email Subject"
                                    value={subject}
                                    onChange={e=>setSubject(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mt-3" >
                                <label>Email Content</label>
                                <div className="mt-2">
                                    <ClassicEditor
                                        style={{border: isValidContent() ? 'none' : '1px solid red'}}
                                        value={message}
                                        onChange={e=>{setMessage(e);setErrorMessage(isValidContent)}}
                                    />
                                </div>
                            </div>

                            {errorMessage &&
                                (<Alert  variant="soft-danger" className="flex items-center mb-2">
                                <Lucide icon="AlertOctagon" className="w-6 h-6 mr-2" />{" "}
                               Error: Email content is emtpy, verify form fields
                            </Alert>)}
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
            <Notification
                id="failed-notification-content"
                className="flex hidden"
            >
                <Lucide icon="XCircle" className="text-danger"/>
                <div className="ml-4 mr-4">
                    <div className="font-medium">Email content is empty</div>
                    <div className="mt-1 text-slate-500">
                        Please check the form fields.
                    </div>
                </div>
            </Notification>
        </>):<></>;
}

export default main;