import { seed } from "drizzle-seed";
import { db } from "./index";
import * as schema_users from "./schema/users";

async function main() {
  const genders = ["male", "female"];
  const sexualities = ["heterosexual", "homosexual", "bisexual", "pansexual"];
  const identities = ["cd", "straight", "ts"];

  //await db.delete(schema.users)

  await seed(db, schema_users).refine((f) => ({
    users: {
      count: 30,
      columns: {
        name: f.fullName(),
        age: f.int({ maxValue: 99, minValue: 18 }),
        email: f.email(),
        occupation: f.jobTitle(),
        gender: f.valuesFromArray({ values: genders }),
        identity: f.valuesFromArray({ values: identities }),
        sexuality: f.valuesFromArray({ values: sexualities }),
        city: f.city(),
        created_at: f.timestamp(),
      },
    },
  }));
}

main().catch((e) => {
  console.log(e);
});
