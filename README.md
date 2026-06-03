# Hintro Meeting Intelligence API

Backend service for AI-powered meeting intelligence. It stores meeting transcripts, analyzes them with Gemini, validates all AI output against transcript citations, tracks action items, and sends overdue reminders through Telegram.

## Stack

- Node.js, Express, TypeScript
- Supabase PostgreSQL
- Prisma ORM
- Zod validation
- JWT authentication
- Gemini 2.5 Flash
- Telegram Bot API
- node-cron
- Pino logging
- Swagger/OpenAPI
- Docker

## Architecture

```txt
HTTP request
  -> route
  -> validate middleware
  -> controller
  -> service
  -> repository
  -> Prisma/PostgreSQL

AI analysis
  -> fetch meeting transcript
  -> build grounded prompt
  -> call Gemini
  -> parse strict JSON
  -> validate Zod schema
  -> validate citation timestamps
  -> save action items
```

## Setup

```powershell
npm install
copy .env.example .env
npm run prisma:generate
npm run dev
```

The API runs on:

```txt
http://localhost:3000
```

Health check:

```txt
GET /health
```

Swagger docs:

```txt
GET /api/docs
```

## Environment Variables

```txt
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/postgres
JWT_SECRET=replace-with-a-long-random-secret
GEMINI_API_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
CANDIDATE_NAME=
CANDIDATE_EMAIL=
REPOSITORY_URL=
DEPLOYMENT_URL=
```

Use the normal Supabase PostgreSQL connection string for `DATABASE_URL`.

## Database

After setting `DATABASE_URL`:

```powershell
npm run prisma:migrate
```

Core models:

- `User`
- `Meeting`
- `ActionItem`
- `ReminderHistory`

Meeting transcript and citations are stored as JSON.

## API Examples

Register:

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Create meeting:

```http
POST /api/meetings
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Sprint Planning",
  "meetingDate": "2026-06-03T10:00:00.000Z",
  "participants": ["John", "Alice"],
  "transcript": [
    {
      "timestamp": "00:10",
      "speaker": "John",
      "text": "We should launch Friday."
    },
    {
      "timestamp": "00:20",
      "speaker": "Alice",
      "text": "I will prepare release notes."
    }
  ]
}
```

Analyze meeting:

```http
POST /api/meetings/<meeting-id>/analyze
Authorization: Bearer <token>
```

## Tests

```powershell
npm test
```

Current tests cover AI output parsing and citation validation.

## Docker

```powershell
docker build -t hintro-meeting-intelligence .
docker run --env-file .env -p 3000:3000 hintro-meeting-intelligence
```

## Deployment

For Render:

1. Create a Web Service from the repository.
2. Set build command: `npm ci && npm run prisma:generate && npm run build`
3. Set start command: `npm start`
4. Add all environment variables.
5. Run Prisma migration against Supabase before production traffic.

## Screenshots

Add screenshots for:

- Swagger docs at `/api/docs`
- Register/login API call
- Meeting analysis response
- Telegram overdue reminder demo
