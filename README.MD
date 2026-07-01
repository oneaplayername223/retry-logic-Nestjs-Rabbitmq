<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>

<body>

<div class="container">

<h1>Retry Logic with NestJS and RabbitMQ</h1>

<p>
This project is an implementation of a microservices architecture using
<strong>NestJS</strong>, <strong>RabbitMQ</strong>,
<strong>PostgreSQL</strong>, and <strong>Prisma</strong>.
Its purpose is to demonstrate asynchronous communication patterns,
exponential backoff retry strategies, dead-letter queue handling,
and distributed message processing across multiple services.
</p>

<h2>Project Goal</h2>

<p>
The system simulates a business workflow where an API Gateway coordinates
operations between multiple microservices using RabbitMQ as the message broker.
This approach decouples services and improves the overall resilience of the system.
</p>

<h2>Architecture Overview</h2>

<pre><code>API Gateway
   │
   ▼
RabbitMQ
   ├── Cart Service
   ├── Inventory Service
   └── Payments Service
</code></pre>

<p>
The services communicate through RabbitMQ events and queues, while each domain
service manages its own PostgreSQL database using Prisma.
</p>

<h2>Included Services</h2>

<ul>
<li><strong>API Gateway</strong> — Entry point of the system responsible for orchestrating operations.</li>
<li><strong>Cart Service</strong> — Handles shopping cart operations.</li>
<li><strong>Inventory Service</strong> — Manages product inventory.</li>
<li><strong>Payments Service</strong> — Processes payments and publishes transaction-related events.</li>
</ul>

<h2>Technologies Used</h2>

<ul>
<li>NestJS</li>
<li>TypeScript</li>
<li>RabbitMQ</li>
<li>Prisma ORM</li>
<li>PostgreSQL</li>
<li>Docker</li>
<li>Docker Compose</li>
<li>Jest</li>
</ul>

<h2>Key Features</h2>

<ul>
<li>Microservices-based architecture</li>
<li>Asynchronous communication using RabbitMQ</li>
<li>Automatic retry mechanism with exponential backoff</li>
<li>Dead Letter Queue (DLQ) support</li>
<li>Independent database per service</li>
<li>Data persistence with Prisma</li>
<li>Dockerized local development environment</li>
</ul>

<h2>Repository Structure</h2>

<pre><code>retry-logic/
├── api-gateway/
├── cart-service/
├── inventory-service/
├── payments-service/
└── README.md
</code></pre>

<h2>Prerequisites</h2>

<p>Before running the project, make sure you have installed:</p>

<ul>
<li>Node.js 20+</li>
<li>npm</li>
<li>Docker & Docker Compose</li>
<li>Git</li>
</ul>

<h2>Quick Start</h2>

<h3>1. Clone the Repository</h3>

<pre><code>git clone https://github.com/oneaplayername223/retry-logic-Nestjs-Rabbitmq.git

cd retry-logic-Nestjs-Rabbitmq
</code></pre>

<h3>2. Start the Local Infrastructure</h3>

<p>
Each service contains its own Docker Compose configuration for its database.
For example:
</p>

<pre><code>docker compose -f cart-service/compose.yaml up -d
docker compose -f inventory-service/compose.yml up -d
docker compose -f payments-service/compose.yml up -d
docker compose -f api-gateway/compose.yml up -d
</code></pre>

<p>This will start:</p>

<ul>
<li>RabbitMQ on port <code>5672</code></li>
<li>RabbitMQ Management UI on port <code>15672</code></li>
<li>A PostgreSQL instance for each microservice</li>
</ul>

<h3>3. Install Dependencies</h3>

<p>Inside each service directory:</p>

<pre><code>cd api-gateway && npm install

cd ../cart-service && npm install

cd ../inventory-service && npm install

cd ../payments-service && npm install
</code></pre>

<h3>4. Run Prisma Migrations</h3>

<p>Each service with a database must apply its own migrations:</p>

<pre><code>cd cart-service
npx prisma migrate deploy

cd ../inventory-service
npx prisma migrate deploy

cd ../payments-service
npx prisma migrate deploy
</code></pre>

<h3>5. Start the Services</h3>

<p>Run each service in a separate terminal:</p>

<pre><code>cd api-gateway && npm run start:dev

cd cart-service && npm run start:dev

cd inventory-service && npm run start:dev

cd payments-service && npm run start:dev
</code></pre>

<h2>Environment Variables</h2>

<p>
Each service expects a <code>.env</code> file containing configuration values such as:
</p>

<pre><code>RABBITMQ_URL=amqp://guest:guest@localhost:5672

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/&lt;database_name&gt;?schema=public
</code></pre>

<p>
Ensure these values match the ports defined in your Docker Compose configuration.
</p>

<h2>Message Flow</h2>

<ol>
<li>The API Gateway receives a request.</li>
<li>It publishes an event to RabbitMQ.</li>
<li>A consumer microservice processes the message.</li>
<li>If processing fails, the retry logic is triggered.</li>
<li>If the retry limit is exceeded, the message is moved to a Dead Letter Queue (DLQ) for later inspection.</li>
</ol>

<h2>Testing</h2>

<p>Run unit tests:</p>

<pre><code>npm run test
</code></pre>

<p>Run end-to-end tests:</p>

<pre><code>npm run test:e2e
</code></pre>

<h2>Recommended Development Practices</h2>

<ul>
<li>Use RabbitMQ Management at <code>http://localhost:15672</code> to inspect queues, exchanges, and messages.</li>
<li>Monitor each microservice's logs to validate retry and DLQ behavior.</li>
<li>Keep services independent and avoid tightly coupling business logic between them.</li>
</ul>

<h2>Important Notes</h2>

<ul>
<li>This project is intended for educational purposes and to demonstrate distributed system patterns.</li>
<li>The retry strategy and RabbitMQ topology can be customized to meet business requirements.</li>
<li>For production environments, consider adding observability, metrics, distributed tracing, and advanced error handling.</li>
</ul>

<h2>Contributing</h2>

<p>
Contributions are welcome! Feel free to open an issue or submit a pull request
with your improvements.
</p>

</div>

</body>
</html>
