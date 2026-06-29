import DeleteUser from "@/components/manageuser.jsx/DeleteUser";
import EditUserRole from "@/components/manageuser.jsx/EditUserRole";
import { Table } from "@heroui/react";

const UserTable = ({ users = [] }) => {
    // console.log(users);
    return (
        <div className="w-full overflow-hidden rounded-xl border border-divider bg-content1 p-2 sm:p-4">
            <Table variant="secondary">
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="User management table"
                        className="min-w-[650px]"
                    >
                        <Table.Header>
                            <Table.Column isRowHeader>Name</Table.Column>
                            <Table.Column>Email</Table.Column>
                            <Table.Column>Role</Table.Column>
                            <Table.Column className="text-right">
                                Actions
                            </Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {users.map((user) => (
                                <Table.Row
                                    key={user.id || user._id || user.email}
                                >
                                    {/* Name */}
                                    <Table.Cell>
                                        <div className="max-w-[120px] sm:max-w-[180px] md:max-w-none truncate font-medium text-foreground">
                                            {user.name}
                                        </div>
                                    </Table.Cell>

                                    {/* Email */}
                                    <Table.Cell>
                                        <div className="max-w-[140px] sm:max-w-[220px] md:max-w-[320px] truncate text-default-500">
                                            {user.email}
                                        </div>
                                    </Table.Cell>

                                    {/* Role */}
                                    <Table.Cell>
                                        <span
                                            className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium whitespace-nowrap ${user.role === "admin"
                                                ? "border-danger/20 bg-danger/10 text-danger"
                                                : user.role === "lawyer"
                                                    ? "border-success/20 bg-success/10 text-success"
                                                    : user.role === "client"
                                                        ? "border-primary/20 bg-primary/10 text-primary"
                                                        : "border-default/20 bg-default/10 text-default-600"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </Table.Cell>

                                    {/* Actions */}
                                    <Table.Cell>
                                        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                                            <EditUserRole user={user} />
                                            <DeleteUser id={user._id} />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default UserTable;