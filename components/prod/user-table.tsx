import { type ColumnDef } from "@tanstack/react-table";
import FlexTable from "@/components/prod/flex-table";
import { db } from "@/lib/db";
import { user } from "@/lib/auth-schema";

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  // image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "编号",
    // cell: ({ row }) => (
    //   <div className="font-semibold">{row.getValue("id")}</div>
    // ),
  },
  {
    accessorKey: "name",
    header: "网名",
  },
  {
    accessorKey: "email",
    header: "邮箱",
  },
  {
    accessorKey: "emailVerified",
    header: "验证邮箱",
  },
  // {
  //   accessorKey: "image",
  //   header: "头像",
  // },
  {
    accessorKey: "createdAt",
    header: "创建日期",
  },
  {
    accessorKey: "updatedAt",
    header: "更新日期",
  },
];

export default async function UserTable() {
  const db_users = await db.select().from(user);
  return <FlexTable data={db_users} columns={userColumns} pageNum={7} />;
}
