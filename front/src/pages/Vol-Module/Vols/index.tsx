import {useNavigate} from "react-router-dom";
import volService from "../../../Services/VolService";
import {createRef, useRef, useState} from "react";
import {TabulatorFull as Tabulator} from "tabulator-tables";
import {stringToHTML} from "../../../utils/helper";
import {createIcons, icons} from "lucide";
import Button from "../../../base-components/Button";
import {FormInput, FormSelect} from "../../../base-components/Form";
import {DateTime} from 'luxon';
import RetardModal from "../RetardModal";
import {useAppSelector} from "../../../stores/hooks";
import {authenticated} from "../../../stores/authSlice";

function Main() {
    let navigate = useNavigate();
    let vols: any[] = [];
    const user = useAppSelector(authenticated);
    let [isOpen, setIsOpen] = useState(false);
    let [isClosed, setIsClosed] = useState(true);
    let [voldId, setVolId] = useState('');
    const refreshTab = async () => {
        volService.volList().then((x: any) => {
            vols = x;
            initTabulator();
            reInitOnResizeWindow();

        }).catch((error: any) => {
            console.log(error);
            alert("error occured");
        });
    }

    let a = refreshTab().then((res) => res);
    const handlePassengers = (id: string) => {
        navigate("passengers/" + id);
    }

    const tableRef = createRef<HTMLDivElement>();
    const tabulator = useRef<Tabulator>();
    const [filter, setFilter] = useState({
        field: "num_vol",
        type: "like",
        value: "",
    });

    const initTabulator = () => {
        if (tableRef.current) {
            tabulator.current = new Tabulator(tableRef.current, {
                data: vols,
                pagination: true,
                paginationSize: 10,
                paginationSizeSelector: [10, 20, 30, 40],
                layout: "fitColumns",
                responsiveLayout: "collapse",
                placeholder: "No matching records found",
                columns: [
                    {
                        title: "",
                        formatter: "responsiveCollapse",
                        width: 40,
                        minWidth: 30,
                        hozAlign: "center",
                        resizable: false,
                        headerSort: false,
                    },

                    // For HTML table
                    {
                        title: "Company",
                        minWidth: 200,
                        responsive: 0,
                        field: "compagnie",
                        vertAlign: "middle",
                        print: false,
                        download: false,
                    },
                    {
                        title: "Number",
                        minWidth: 200,
                        responsive: 0,
                        field: "num_vol",
                        vertAlign: "middle",
                        print: false,
                        download: false,
                    }, {
                        title: "Date",
                        minWidth: 200,
                        responsive: 0,
                        field: "date_vol",
                        vertAlign: "middle",
                        formatter: cell => {
                            const dateValue = cell.getValue();
                            if (dateValue) {
                                return DateTime.fromISO(dateValue).toFormat('dd/MM/yyyy');
                            }
                            return '';
                        }
                    }, {
                        title: "Origine",
                        minWidth: 200,
                        responsive: 0,
                        field: "origine",
                        vertAlign: "middle",
                        print: false,
                        download: false,
                    }, {
                        title: "Destination",
                        minWidth: 200,
                        responsive: 0,
                        field: "destination",
                        vertAlign: "middle",
                        print: false,
                        download: false,
                    }, {
                        title: "Passengers",
                        minWidth: 200,
                        responsive: 0,
                        field: "nombre_passager",
                        vertAlign: "middle",
                        print: false,
                        download: false,
                    }, {
                        title: "ACTIONS",
                        minWidth: 200,
                        field: "actions",
                        responsive: 1,
                        hozAlign: "center",
                        headerHozAlign: "center",
                        vertAlign: "middle",
                        print: false,
                        download: false,
                        formatter(cell) {
                            const a = ("ADMIN,CHEFESCALE".includes(user.roles?.replace("ROLE_", "")))?
                                stringToHTML(`<div class="flex lg:justify-center items-center">
                                                      <a class="flex items-center text-pending mr-3" href="javascript:;">
                                                        <i data-lucide="alarm-minus" class="w-4 h-4 mr-1"></i> Delay
                                                      </a> 
                                                      <a class="passengers flex items-center  mr-3" href="javascript:;">
                                                        <i data-lucide="user" class="w-4 h-4 mr-1"></i> Passengers
                                                      </a>
                                                     
                                </div>`):stringToHTML(`<div class="flex lg:justify-center items-center">
                                                     
                                                      <a class="passengers flex items-center  mr-3" href="javascript:;">
                                                        <i data-lucide="user" class="w-4 h-4 mr-1"></i> Passengers
                                                      </a>
                                                     
                                </div>`);

                            a.addEventListener("click", function (e) {

                                const clickedElement = e.target;
                                if (!clickedElement) return;
                                // @ts-ignore
                                if (clickedElement.matches('.text-pending')) {
                                    // @ts-ignore
                                    setVolId(cell.getData()._id);
                                    setIsClosed(false);
                                    setIsOpen(true);
                                    return;

                                }
                                // @ts-ignore
                                if (clickedElement.className.includes("passengers")) {
                                    // @ts-ignore
                                    handlePassengers(cell.getData()._id);
                                }


                                // On click actions
                            });

                            return a;
                        },
                    },
                ],
            });
        }

        tabulator.current?.on("renderComplete", () => {
            createIcons({
                icons,
                attrs: {
                    "stroke-width": 1.5,
                },
                nameAttr: "data-lucide",
            });
        });
    };

    // Redraw table onresize
    const reInitOnResizeWindow = () => {
        window.addEventListener("resize", () => {
            if (tabulator.current) {
                tabulator.current.redraw();
                createIcons({
                    icons,
                    attrs: {
                        "stroke-width": 1.5,
                    },
                    nameAttr: "data-lucide",
                });
            }
        });
    };

    // Filter function
    const onFilter = () => {
        if (tabulator.current) {
            tabulator.current.setFilter(filter.field, filter.type, filter.value);
        }
    };

    // On reset filter
    const onResetFilter = () => {
        setFilter({
            ...filter,
            field: "title",
            type: "like",
            value: "",
        });
        onFilter();
    };

    const handleAddClick = () => {
        navigate("add");
    }


    return (
        <>
            <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
                <h2 className="mr-auto text-lg font-medium">Flights</h2>
                <div className="flex w-full mt-4 sm:w-auto sm:mt-0">


                </div>
            </div>
            {/* BEGIN: HTML Table Data */}
            <div className="p-5 mt-5 intro-y box">
                <div className="flex flex-col sm:flex-row sm:items-end xl:items-start">
                    <form
                        id="tabulator-html-filter-form"
                        className="xl:flex sm:mr-auto"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onFilter();
                        }}
                    >
                        <div className="items-center sm:flex sm:mr-4">
                            <label className="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                                Field
                            </label>
                            <FormSelect
                                id="tabulator-html-filter-field"
                                value={filter.field}
                                onChange={(e) => {
                                    setFilter({
                                        ...filter,
                                        field: e.target.value,
                                    });
                                }}
                                className="w-full mt-2 2xl:w-full sm:mt-0 sm:w-auto"
                            >
                                <option value="num_vol">Numéro</option>
                                <option value="date_vol">Date</option>
                                <option value="origine">Origine</option>
                                <option value="destination">destination</option>
                            </FormSelect>
                        </div>
                        <div className="items-center mt-2 sm:flex sm:mr-4 xl:mt-0">
                            <label className="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                                Type
                            </label>
                            <FormSelect
                                id="tabulator-html-filter-type"
                                value={filter.type}
                                onChange={(e) => {
                                    setFilter({
                                        ...filter,
                                        type: e.target.value,
                                    });
                                }}
                                className="w-full mt-2 sm:mt-0 sm:w-auto"
                            >
                                <option value="like">like</option>
                                <option value="=">=</option>
                                <option value="<">&lt;</option>
                                <option value="<=">&lt;=</option>
                                <option value=">">&gt;</option>
                                <option value=">=">&gt;=</option>
                                <option value="!=">!=</option>
                            </FormSelect>
                        </div>
                        <div className="items-center mt-2 sm:flex sm:mr-4 xl:mt-0">
                            <label className="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                                Value
                            </label>
                            <FormInput
                                id="tabulator-html-filter-value"
                                value={filter.value}
                                onChange={(e) => {
                                    setFilter({
                                        ...filter,
                                        value: e.target.value,
                                    });
                                }}
                                type="text"
                                className="mt-2 sm:w-40 2xl:w-full sm:mt-0"
                                placeholder="Search..."
                            />
                        </div>
                        <div className="mt-2 xl:mt-0">
                            <Button
                                id="tabulator-html-filter-go"
                                variant="primary"
                                type="button"
                                className="w-full sm:w-16"
                                onClick={onFilter}
                            >
                                Go
                            </Button>
                            <Button
                                id="tabulator-html-filter-reset"
                                variant="secondary"
                                type="button"
                                className="w-full mt-2 sm:w-16 sm:mt-0 sm:ml-1"
                                onClick={onResetFilter}
                            >
                                Reset
                            </Button>
                        </div>
                    </form>

                </div>
                <div className="overflow-x-auto scrollbar-hidden">
                    <div id="tabulator" ref={tableRef} className="mt-5"></div>
                </div>
            </div>
            {/* END: HTML Table Data */}

            <RetardModal isOpen={isOpen} voldId={voldId} onClose={() => {
                setIsOpen(false);
                setIsClosed(true);
            }}/>
        </>
    );
}

export default Main;
