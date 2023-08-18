import {useNavigate} from "react-router-dom";
import supplierService from "../../../Services/SupplierService";
import {createRef, useRef, useState} from "react";
import {TabulatorFull as Tabulator} from "tabulator-tables";
import {stringToHTML} from "../../../utils/helper";
import {createIcons, icons} from "lucide";
import Button from "../../../base-components/Button";
import {FormInput, FormSelect} from "../../../base-components/Form";
import EmailModal from "../EmailModal";


function Main() {
    let navigate = useNavigate();
    let suppliers: any[] = [];
    let [isOpen, setIsOpen] = useState(false);
    let [supplierId, setSupplierId] = useState('');

    const refreshTab = async () => {
        supplierService.supplierList().then((x: any) => {
            suppliers = x;
            initTabulator();
            reInitOnResizeWindow();

        }).catch((error: any) => {
            console.log(error);
            alert("error occured");
        });
    }

    let a = refreshTab().then((res) => res);
    const handleDelete = (id: string) => {
        let res = supplierService.deleteSupplier(id).then(async (res) => {
            if (res) {
                await refreshTab();
                alert("Supplier deleted");
            }
            return res;
        }).catch((e) => {
            console.log(e);
            alert("error occured");
        })

    }

    const handleEdit = (id: string) => {
        console.log(id);
        if (id) {
            navigate("/supplier/edit/" + id);
        }
    }
    const handleMailClick =(id:string)=>{
        console.log(id);
        if(id){
            setSupplierId(id);
            setIsOpen(true);
        }
    }

    const tableRef = createRef<HTMLDivElement>();
    const tabulator = useRef<Tabulator>();
    const [filter, setFilter] = useState({
        field: "title",
        type: "like",
        value: "",
    });

    const initTabulator = () => {
        if (tableRef.current) {
            tabulator.current = new Tabulator(tableRef.current, {
                data: suppliers,
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
                        title: "Titre",
                        minWidth: 200,
                        responsive: 0,
                        field: "title",
                        vertAlign: "middle",
                        print: false,
                        download: false,
                    },
                    {
                        title: "Email",
                        minWidth: 200,
                        responsive: 0,
                        field: "email",
                        vertAlign: "middle",
                        print: false,
                        download: false,
                    },
                    {
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
                            const a =
                                stringToHTML(`<div class="flex lg:justify-center items-center">
                                                      <a class="edit flex items-center mr-3" href="javascript:;">
                                                        <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                                                      </a>
                                                      <a class="delete flex items-center text-danger mr-3" href="javascript:;">
                                                        <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                                                      </a>
                                                       <a class="mail flex items-center text-success mr-3" href="javascript:;">
                                                        <i data-lucide="mail" class="w-4 h-4 mr-1"></i> mail
                                                      </a>
                                </div>`);

                            a.addEventListener("click", function (e) {

                                const clickedElement = e.target;
                                if (!clickedElement) return;

                                // Check if the clicked element is the 'Edit' link
                                // @ts-ignore
                                if (clickedElement.className.includes('edit')) {
                                    // @ts-ignore
                                    handleEdit(cell.getData()._id);
                                }

                                // Check if the clicked element is the 'Delete' link
                                // @ts-ignore
                                if (clickedElement.className.includes('delete')) {
                                    // @ts-ignore
                                    handleDelete(cell.getData()._id);
                                }
                                // @ts-ignore
                                if (clickedElement.className.includes("mail")){
                                    // @ts-ignore
                                    handleMailClick(cell.getData()._id);
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
                <h2 className="mr-auto text-lg font-medium">Suppliers</h2>
                <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
                    <Button variant="primary" className="mr-2 shadow-md" onClick={handleAddClick}>
                        Add New Supplier
                    </Button>

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
                                <option value="title">Title</option>
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
            <EmailModal isOpen={isOpen} supplierId={supplierId} onClose={()=> setIsOpen(false)} />
        </>
    );
}

export default Main;
