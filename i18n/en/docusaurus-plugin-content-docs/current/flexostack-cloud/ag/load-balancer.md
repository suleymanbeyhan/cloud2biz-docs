---
sidebar_position: 5
title: Load Balancer
description: Creating load balancers on FlexoStack; listeners, balancing pools, algorithms, health checks and allowed CIDRs.
---

A **load balancer** distributes incoming traffic across multiple virtual machines. Your application can serve more users, and if one server fails, traffic is automatically sent to the healthy ones.

## Key concepts

```text
                 Internet
                    │
            Floating IP (LB address)
                    │
         ┌──── Load Balancer ────┐
         │                       │
   Listener HTTP:80       Listener HTTPS:443
         │                       │
         └──── Balancing pool ───┘
              │      │      │
           web-01 web-02 web-03   (pool members)
```

| Concept | Description |
| --- | --- |
| **Load balancer** | The component that receives and distributes traffic. Runs on a virtual network and has an IP address. |
| **Listener** | Defines the protocol and port on which the load balancer accepts connections, e.g. HTTP 80 or HTTPS 443. |
| **Balancing pool** | The group of servers traffic is distributed to, and the distribution rules. |
| **Member** | Each virtual machine in the pool and the port the application runs on. |
| **Health monitor** | Regularly checks whether members are working and removes unresponsive ones from rotation. |

## Pricing

FlexoStack offers a single load balancer type; there is no size to choose:

| Model | Price |
| --- | --- |
| Fixed resources | 15 USD per load balancer per month |
| PAYG | 0.0308 USD per load balancer per hour (≈ 22.48 USD per month) |

See [Billing](../faturalandirma/sabit-kaynak.md#load-balancer) for details.

## Creating a load balancer

1. In the panel, open **Load balancers** and click **Create load balancer**.
2. Enter a name and select the **virtual network** the load balancer runs on. This should be the network your backend servers are on.
3. Choose to assign a **floating IP** so it is reachable from the internet.
4. Optionally enable **high availability (HA)** so the load balancer runs redundantly.
5. Add one or more **balancing pools** (see below).
6. Click **Create**.

## Balancing pool settings

### Protocol and port

You set the listener protocol and port (frontend) and the members' application port (backend):

| Frontend | Backend | Use case |
| --- | --- | --- |
| HTTP 80 | HTTP 80 | Simple websites |
| HTTPS 443 (TLS termination) | HTTP 80 | Manage the SSL certificate on the load balancer; servers run plain HTTP |
| TCP 443 | TCP 443 | SSL terminated on the servers (TLS passthrough) |
| TCP / UDP | TCP / UDP | Non-HTTP services such as databases, game servers, DNS |

With **TLS termination**, you upload your SSL certificate and private key to the load balancer. You manage the certificate in one place, and encryption overhead is removed from the servers.

### Balancing algorithm

| Algorithm | Behavior | When to use |
| --- | --- | --- |
| **Round robin** | Distributes requests to members in turn. | Members are equally sized and requests are similar |
| **Least connections** | Sends each request to the member with the fewest active connections. | Long-lived connections or variable processing times |
| **Source IP** | Always sends the same client IP to the same member. | Applications that store session data on the server |

### Session persistence (sticky sessions)

If your application keeps session data in server memory, enable session persistence (e.g. based on source IP or an HTTP cookie) so all of a user's requests go to the same server.

### HTTP headers

On HTTP listeners, the load balancer can add headers such as `X-Forwarded-For` to pass the client's real IP to your servers. Use this header to see real visitor IPs in your web server logs.

### Allowed CIDRs

To allow access to the pool only from specific IP ranges, add them in CIDR format (e.g. `203.0.113.0/24`) under **Allowed CIDRs**. If left empty, all addresses are allowed.

### Health monitor

The health monitor sends requests to members at regular intervals to check that they are working:

- **Type:** HTTP (a request to a path such as `/health`), TCP (is the port open) or PING.
- **Interval and timeout:** How often checks run and how long to wait for a response.
- **Retries:** How many consecutive checks must fail or succeed before a member is marked unhealthy or healthy again.

:::tip Add a health check endpoint to your application
Creating a simple `/health` endpoint that also checks core dependencies such as the database connection, and using it for the HTTP health monitor, helps remove faulty servers from rotation more accurately.
:::

## Managing pool members

1. Select the load balancer and open the balancing pool.
2. In **Members**, use **Add** to add virtual machines or remove existing members.
3. For each member, set the application port and an optional **weight**. Members with higher weight receive more traffic.

Temporarily removing a server from the pool lets you perform maintenance while traffic continues on the other members.

## Security groups

Make sure the security groups of pool member virtual machines allow traffic to the application port from the load balancer's network, including health checks. Otherwise members appear unhealthy and receive no traffic.

## Editing and deleting a pool

- **Edit:** Changes balancing settings (headers, TLS, algorithm, session persistence).
- **Edit allowed CIDRs:** Edits the allowed IP ranges.
- **Edit health monitor:** Changes health monitor parameters.
- **Delete:** Deletes the pool.

To delete the whole load balancer, select it on the **Load balancers** screen and click **Delete**. Release the floating IP assigned to it separately.
