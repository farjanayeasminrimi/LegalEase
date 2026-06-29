export const dynamic = 'force-dynamic';

import { getAllUser } from "@/lib/api/data";
import UserTable from "./UserTable";


const ManageUser = async () => {
    const users = await getAllUser();
    // console.log(users, "user");
    return (
        <div>
            <h1>ManageUser</h1>
            <UserTable users={users}></UserTable>
        </div>
    );
};

export default ManageUser;