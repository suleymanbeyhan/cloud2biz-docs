---
sidebar_position: 2
title: Virtual Routers
description: Creating virtual routers on FlexoStack to connect virtual networks to the internet and to each other, SNAT and static routes.
---

A virtual router is a software-defined router that connects your virtual networks to each other and to the internet. Virtual networks are closed to the outside world by default; servers on them cannot reach the internet until a router is connected.

## What Does a Router Do?

- **Internet access (SNAT):** Lets servers without a floating IP reach the internet (for example, to download updates). These servers appear externally with the router's public IP address.
- **Floating IPs:** To assign a [floating IP](./floating-ip.md) to a server on a virtual network, that network must be connected to a router with an external gateway.
- **Routing between networks:** Different virtual networks connected to the same router can communicate with each other.

## Creating a Router

1. In the panel, open **Routers** and click **Add router**.
2. Name the router, for example `main-router`.
3. Select the public network as the **External gateway**.
4. Keep **SNAT** enabled so your servers can reach the internet.
5. Use **Add interface** to connect the virtual networks. The router uses the gateway address of each network.
6. Click **Create**.

## Adding and Removing Interfaces

To connect new virtual networks after creation:

1. Select the router on the **Routers** screen.
2. On the **Interfaces** tab, click **Add** and select the network.

To disconnect a network, remove its interface with **Delete**. After that, servers on the network cannot reach the internet and their floating IPs stop working.

## Static Routes

Add static routes to send traffic for a specific destination network to a server on your network (for example, your own VPN or firewall server):

1. Select the router and open the **Static routes** tab.
2. Click **Add**.
3. Enter the destination network in **Destination** (e.g. `10.50.0.0/16`) and the internal IP of the target server in **Next hop**.

## Removing the External Gateway

If you remove a router's external gateway, it only routes between connected virtual networks; internet access and floating IPs stop working. This can be used for isolated environments that must never connect to the internet.

## Deleting a Router

Before deleting a router:

1. Unassign floating IPs used through the router.
2. Remove all of the router's virtual network interfaces.
3. Select the router on the **Routers** screen and click **Delete**.
