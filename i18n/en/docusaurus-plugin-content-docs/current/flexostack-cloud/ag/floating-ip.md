---
sidebar_position: 3
title: Floating IP
description: Creating floating IPs on FlexoStack, assigning them to virtual machines, moving them between virtual machines and reverse DNS records.
---

A **floating IP** is a public IP address you can assign to a virtual machine and move instantly to another virtual machine when needed. Use it to make a server on a Private Network reachable from the internet, or to redirect traffic to a standby server during maintenance or failures without changing the IP address.

## How It Works

A floating IP is not configured directly in the virtual machine's operating system. The virtual machine only sees its own private IP (e.g. `192.168.10.15`); the router forwards traffic arriving at the floating IP to that private address (1:1 NAT).

```text
Internet ──> 185.x.x.x (floating IP) ──> Router ──> 192.168.10.15 (web-01)
```

As a result:

- When you move a floating IP from one virtual machine to another, nothing needs to change inside the server.
- Even if you delete the virtual machine, the floating IP stays in your project; you can assign it to a new server without changing your DNS records.

## Prerequisites

To assign a floating IP to a virtual machine, the network the virtual machine is on must be connected to a [router](./sanal-routerlar.md) with an external gateway.

## Creating and Assigning a Floating IP

1. In the panel, open **Floating IPs** and click **Add floating IP**.
2. Select the public network.
3. Optionally assign the IP to a virtual machine's network interface right away, or leave it unassigned for later.
4. Click **Add**.

To assign an existing unassigned floating IP, select it, click **Assign** and choose the virtual machine.

## Moving a Floating IP to Another Virtual Machine

1. On the **Floating IPs** screen, select the IP and click **Unassign** to detach it from the current virtual machine.
2. Click **Assign** and select the new virtual machine.

This takes a few seconds. It is the fastest way to redirect traffic to a standby server during planned maintenance or when a server fails.

:::tip Remember the security group
Make sure the virtual machine you move the floating IP to has a security group that opens the required ports.
:::

## Reverse DNS (PTR) Record

For services that require reverse DNS, such as mail servers, open a support ticket with the IP address and the desired record value to have a PTR record set for your floating IP.

## Releasing a Floating IP

Unused floating IPs continue to be billed. If you no longer need an IP:

1. If it is assigned to a virtual machine, detach it first with **Unassign**.
2. Release it from your project with **Delete**.

:::warning A released IP may not be recoverable
A released IP returns to the pool and may be assigned to another customer. Update your DNS records before releasing an IP that they use.
:::
