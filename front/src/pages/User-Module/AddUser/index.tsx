import {
    FormInput,
    FormLabel
} from "../../../base-components/Form";
import TomSelect from "../../../base-components/TomSelect";
import {useState} from "react";
import Button from "../../../base-components/Button";



function main() {

    const formSubmit =()=>{

    }



    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const restForm = ()=>{
        setEmail("");
        setUsername("");
        setRole("");
        setPassword("");
    }
    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Add user</h2>
            </div>
            <div className="grid grid-cols-12 gap-2 mt-5">
                <div className="col-span-12 intro-y lg:col-span-6">
                    {/* BEGIN: Form Layout */}
                    <div className="p-5 intro-y box">
                        <div>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <FormInput
                                id="username"
                                type="text"
                                className="w-full"
                                placeholder="Enter the username"
                                onChange={e=>setUsername(e.target.value)}
                                value={username}
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormInput
                                id="email"
                                type="email"
                                placeholder="Enter the email"
                                aria-describedby="input-group-2"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <FormLabel htmlFor="crud-form-4">Password</FormLabel>
                            <FormInput
                                id="password"
                                type="password"
                                placeholder="Enter the password"
                                aria-describedby="password-input"
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <FormLabel htmlFor="role">Role</FormLabel>
                            <TomSelect
                                id="role"
                                value={role}
                                onChange={setRole}
                                className="w-full"
                                required
                            >
                                <option value="">Select a role</option>
                                <option value="FINANCIER">Financier</option>
                                <option value="CHEFESCALE">Chef d’escale</option>
                                <option value="AGENT">Agent</option>
                            </TomSelect>
                        </div>


                        <div className="mt-5 text-right">
                            <Button
                                type="button"
                                variant="outline-secondary"
                                className="w-24 mr-1"
                                onClick={restForm}
                            >
                                Reset
                            </Button>
                            <Button type="button" variant="primary" className="w-24" onClick={formSubmit}>
                                Save
                            </Button>
                        </div>
                    </div>
                    {/* END: Form Layout */}
                </div>
            </div>

        </>
    )
}

export default main;