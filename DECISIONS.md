# Engineering Decisions

## PostgreSQL

PostgreSQL is a good fit because the application has relational ownership rules: users own meetings, meetings own action items, and action items own reminder history. It also supports JSON fields for transcript and citation payloads.

Alternatives considered:

- MongoDB: convenient for transcript JSON, weaker for relational constraints.
- SQLite: useful locally, less suitable for hosted production with multiple users.

Tradeoff: PostgreSQL needs connection management and migrations, but gives stronger data integrity.

## Prisma

Prisma keeps database access typed and readable while avoiding hand-written SQL for common CRUD operations.

Alternatives considered:

- Raw SQL: maximum control, more boilerplate.
- TypeORM: heavier and less direct for this project.

Tradeoff: Prisma adds generated code and version-specific setup. The service keeps Prisma isolated in repositories so this cost stays contained.

## Transcript Stored As JSON

The transcript is consumed as a whole by the AI workflow, so storing it as JSON keeps the model simple and avoids unnecessary transcript line tables.

Alternatives considered:

- Separate transcript table: better for line-level search, more schema and query complexity.

Tradeoff: JSON is less optimized for advanced transcript search, but much simpler for the required AI analysis.

## Gemini 2.5 Flash

Gemini 2.5 Flash is fast and cost-conscious for structured meeting analysis. The prompt forces JSON output and strict grounding.

Alternatives considered:

- Larger models: potentially better reasoning, higher cost and latency.
- Rule-only extraction: safer but too limited for summarization and action item discovery.

Tradeoff: AI output must be treated as untrusted. The implementation validates JSON shape and citation timestamps before saving action items.

## Telegram

Telegram is simple to integrate and useful for demonstrating real external reminder delivery.

Alternatives considered:

- Email: common, but requires SMTP/provider setup.
- Slack: useful for teams, more workspace configuration.

Tradeoff: Telegram needs bot and chat configuration, but the API surface is small.

## Monolithic Backend

A single Express service keeps the project understandable and easy to deploy.

Alternatives considered:

- Microservices: unnecessary operational complexity for this scope.
- Serverless functions: good for small endpoints, awkward for cron and shared service structure.

Tradeoff: one service handles all responsibilities, but the code is separated into controllers, services, repositories, integrations, and AI helpers.
