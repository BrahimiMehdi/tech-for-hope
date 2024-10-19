import { db } from "@/server/db";
import { UserColumns } from "@/components/tables/columns";
import DataTable from "@/components/tables/DataTable";
import Await from "@/components/Await";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";
import AddUserButton from "@/components/users/AddUserButton";
import { users } from "@/server/db/schema";

export default async function Home() {
  const usersData = db.query.users.findMany({
    with: {
      image: {
        columns: {
          path: true,
        },
      },
    },
  });

  return (
    <main className="flex min-h-screen gap-y-12 flex-col items-center justify-center p-24">
      <Suspense fallback={<Spinner />}>
        <Await promise={usersData}>
          {(data) => (
            <DataTable
              description="Manage your users."
              title="Users"
              filterBy="email"
              data={data as (typeof users.$inferSelect & { image: { path: string } })[]}
              columns={UserColumns}
            >
              <AddUserButton />
            </DataTable>
          )}
        </Await>
      </Suspense>
    </main>
  );
}
