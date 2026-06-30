<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Microservices Architecture - NestJS + RabbitMQ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 40px;
      background: #f9f9f9;
      color: #222;
    }
    h1, h2, h3 {
      color: #111;
    }
    code {
      background: #eee;
      padding: 2px 6px;
      border-radius: 4px;
    }
    pre {
      background: #1e1e1e;
      color: #fff;
      padding: 15px;
      border-radius: 8px;
      overflow-x: auto;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 10px 0;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background: #eee;
    }
    .box {
      background: #fff;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>

<h1>📦 Microservices Architecture (NestJS + RabbitMQ)</h1>

<div class="box">
  <p>
    This project implements a microservices architecture using <b>NestJS</b> and <b>RabbitMQ</b>,
    featuring event-driven communication, retry mechanisms, DLQ handling, and delayed messaging.
  </p>
</div>

<h2>🧠 Architecture Overview</h2>

<pre>
Producer Service
      │
      ▼
RabbitMQ Exchange (x-delayed-message)
      │
      ▼
Main Queue
      │
      ▼
Consumer Service
      │
   ┌──┴─────────────┐
   │                │
 Success          Failure
   │                │
  ACK     Retry with x-delay
                   │
                   ▼
                  DLQ
</pre>

<h2>🚀 Tech Stack</h2>
<ul>
  <li>NestJS</li>
  <li>RabbitMQ</li>
  <li>amqplib</li>
  <li>Docker</li>
  <li>RabbitMQ Delayed Message Exchange Plugin</li>
</ul>

<h2>📦 Features</h2>

<h3>Event-driven architecture</h3>
<p>Uses <code>@EventPattern()</code> for async message consumption.</p>

<h3>Retry system (exponential backoff)</h3>
<pre>
5s → 10s → 20s → 40s → ...
</pre>

<h3>Retry tracking</h3>
<pre><code>x-retry-count</code></pre>

<h3>Dead Letter Queue (DLQ)</h3>
<p>Messages exceeding retry limit are sent to a DLQ for inspection.</p>

<h2>⚙️ RabbitMQ Setup</h2>

<pre><code>rabbitmq_delayed_message_exchange</code></pre>

<h3>Exchanges</h3>

<table>
  <tr>
    <th>Exchange</th>
    <th>Type</th>
    <th>Purpose</th>
  </tr>
  <tr>
    <td>payments_exchange</td>
    <td>x-delayed-message</td>
    <td>Main event exchange with retry support</td>
  </tr>
  <tr>
    <td>payments_dlq_exchange</td>
    <td>direct</td>
    <td>Dead letter exchange</td>
  </tr>
</table>

<h3>Queues</h3>

<table>
  <tr>
    <th>Queue</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>payments_queue</td>
    <td>Main processing queue</td>
  </tr>
  <tr>
    <td>payments_dlq</td>
    <td>Dead letter queue</td>
  </tr>
</table>

<h2>🔁 Retry Strategy</h2>

<pre><code>
const retryCount = headers['x-retry-count'] ?? 0;
const delay = 5000 * Math.pow(2, retryCount);
</code></pre>

<p>Flow:</p>
<ul>
  <li>Process message</li>
  <li>If success → ACK</li>
  <li>If failure → retry or send to DLQ</li>
</ul>

<h2>📤 Event Publishing</h2>

<pre><code>
channel.publish(
  'payments_exchange',
  'payment.created',
  Buffer.from(JSON.stringify(payload)),
  {
    persistent: true,
    headers: {
      'x-retry-count': retryCount,
      'x-delay': delay,
    },
  },
);
</code></pre>

<h2>⚠️ Note about NestJS ClientProxy</h2>
<ul>
  <li>Does not support x-delay</li>
  <li>No exchange control</li>
  <li>Limited for advanced RabbitMQ patterns</li>
</ul>

<p>Therefore, <b>amqplib</b> is used for event publishing.</p>

<h2>🧩 Communication Types</h2>

<h3>Events (Async)</h3>
<ul>
  <li>amqplib</li>
  <li>Exchange-based</li>
  <li>Fire-and-forget</li>
</ul>

<h3>RPC (Sync)</h3>
<ul>
  <li>ClientProxy.send()</li>
  <li>Request/response pattern</li>
</ul>

<h2>🚀 Author</h2>
<p>This project is part of my learning path for distributed systems using NestJS and RabbitMQ.</p>


<h2>🧠 Key Concepts</h2>
<ul>
  <li>Event-driven architecture</li>
  <li>Retry policies</li>
  <li>Exponential backoff</li>
  <li>DLQ handling</li>
  <li>Exchange types</li>
</ul>

</body>
</html>