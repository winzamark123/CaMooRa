import { execSync } from 'child_process';
import { config } from 'dotenv';

config();
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('\n❌ Error: DATABASE_URL environment variable is not set.\n');
  process.exit(1);
}

try {
  execSync(
    `npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-url "${databaseUrl}" --exit-code`,
    { stdio: 'inherit' }
  );
  console.log('✅ Database schema is up to date. Proceeding with build.');
} catch (error) {
  if (error.status === 2) {
    console.error(
      '\n❌ Error: Schema changes detected. Please create a migration before building.\n'
    );
    process.exit(1);
  } else {
    console.error(
      '\n❌ An unexpected error occurred during schema check.\n',
      error
    );
    process.exit(1);
  }
}
