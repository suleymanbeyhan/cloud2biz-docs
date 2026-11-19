---
sidebar_position: 1
title: Virtual Networks (Private Network)
sidebar_label: Virtual Networks
description: Creating isolated virtual networks closed to external access on FlexoStack; subnet, DHCP and DNS settings.
---

On FlexoStack, you connect your servers to each other through **virtual networks (Private Network)**. Virtual networks are built with software-defined networking (SDN); each project has its own networks, fully isolated from other customers' networks.

## Network Types

| Type | Description |
| --- | --- |
| **Public / external network** | Provided by Cloud2Biz and connected to the internet. Floating IPs and router external gateways come from this network. |
| **Virtual (private) network** | Created by you and closed to external access. Internal traffic between servers flows over it, with no additional traffic charges for internal traffic. |

The recommended setup is to connect servers to virtual networks, provide internet access through a [router](./sanal-routerlar.md), and assign [floating IPs](./floating-ip.md) only to servers that must be reachable from outside.

## Creating a Virtual Network

**1. Open the Networks page**

In the **Compute** panel, open **Networks** in the left menu and click **Create network** at the top right.

![Networks page and the Create network button](/img/flexostack/network-create.png)

**2. Add a subnet**

In the **Create virtual network** window, give the network a name (e.g. `Private Network`). In the **IP address management** step, click **Add** in the **Subnets** section and add an IPv4 subnet.

![Subnets - Add button in the Create virtual network window](/img/flexostack/network-subnet-add.png)

**3. Enter the IPv4 subnet details**

In the **Add IPv4 subnet** window, enter the **CIDR** (e.g. `192.168.1.0/24`). Optionally, fill in **Gateway**, **Allocation pools** and **DNS servers**. Click **Add** to add the subnet, then click **Create** on the summary screen to create the network.

![Add IPv4 subnet window](/img/flexostack/network-subnet-ipv4.png)

| Field | Example | Description |
| --- | --- | --- |
| **CIDR** | `192.168.1.0/24` | The network's IP range. A `/24` provides about 250 addresses. |
| **Gateway** | `192.168.1.1` | Gateway address (optional). The router uses this address; assigned automatically if left empty. |
| **Built-in DHCP server** | On | Lets virtual machines obtain IP addresses automatically. |
| **Allocation pools** | `192.168.1.100 — 192.168.1.200` | Address range handed out by DHCP (optional). |
| **DNS servers** | `8.8.8.8` | DNS servers given to virtual machines (optional). |

:::tip Next step: router
For servers on the private network to reach the internet, or to set up a [site-to-site VPN](./vpn.md), connect the network to a [virtual router](./sanal-routerlar.md#creating-a-router).
:::

:::tip Address range planning
Use non-overlapping ranges for different virtual networks (e.g. `192.168.10.0/24`, `192.168.20.0/24`). If you plan a [Site-to-Site VPN](./vpn.md) with your office network, also make sure the ranges do not overlap with your office.
:::

## Example Network Architecture

An example layout for a multi-tier application:

```text
                    Internet
                       │
              Load Balancer (floating IP)
                       │
 ┌──────────── web-net 192.168.10.0/24 ────────────┐
 │   web-01            web-02            web-03     │
 └──────────────────────┬──────────────────────────┘
                        │ (via router)
 ┌──────────── db-net 192.168.20.0/24 ─────────────┐
 │   db-01 (primary)         db-02 (replica)        │
 └─────────────────────────────────────────────────┘
```

Here the database servers have no floating IPs and cannot be reached directly from the internet. [Security Groups](./security-groups.md) allow database port access only from the web network.

## Editing Network Settings

Select the network on the **Networks** screen and click **Edit** to change its name, DNS servers and DHCP settings. The subnet CIDR cannot be changed after creation; create a new network if you need a different range.

## Connecting a Virtual Machine to a Network

- When creating a virtual machine, select the network in the **Networks** section.
- To add a new interface to a running virtual machine, use its **Networks** tab. See [Managing virtual machines](../sanal-makineler/sanal-makine-yonetimi.md#adding-and-removing-network-interfaces).

## Deleting a Virtual Network

Before deleting a network, remove all virtual machine interfaces, router interfaces and load balancers connected to it. Then select the network on the **Networks** screen and click **Delete**.

## About MTU

Because virtual networks use VXLAN encapsulation, the MTU inside virtual machines may be slightly lower than the standard 1500. On ready-made images, the MTU is set automatically via DHCP. If you see problems with large packets on your own images or with VPNs and tunnels, check the MTU value.
