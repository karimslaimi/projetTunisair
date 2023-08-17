import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import voucherService from "../../../Services/VoucherService";
import SuccesVerifyModal from "../SuccesVerifyModal";
import ErrorVerifyModal from "../ErrorVerifyModal";


function main() {
    const {id} = useParams();
    const [voucher, setVoucher] = useState<any>();
    const [called, setCalled] = useState(false);

    let [isOpenOk, setIsOpenOk] = useState(false);
    let [isClosedOk, setIsClosedOk] = useState(true);
    let [isOpenNOk, setIsOpenNOk] = useState(false);
    let [isClosedNOk, setIsClosedNOk] = useState(true);
    useEffect(() => {
        if (id) {
            voucherService.getById(id).then(x => {
                setVoucher(x);
                setCalled(true);
            }).catch(() => alert("an error occured"));

        }
    }, [id]);

    useEffect(() => {
        if (!called) return;
        if (voucher && !voucher.consumed) {
            voucher.consumed = true;
            voucherService.consumeVoucher(id ?? '').then(x => {
                setIsOpenOk(true);
                setIsClosedOk(false);
            }).catch(() => alert("error occured"));
        } else {
            setIsOpenNOk(true);
            setIsClosedNOk(false);
        }
    }, [called]);
    return (
        <>
            <SuccesVerifyModal isOpen={isOpenOk} onClose={() => {
                setIsOpenOk(false);
                setIsClosedOk(true);
            }}/>
            <ErrorVerifyModal isOpen={isOpenNOk} onClose={() => {
                setIsOpenNOk(false);
                setIsClosedNOk(true);
            }}/>

        </>
    )
}

export default main;