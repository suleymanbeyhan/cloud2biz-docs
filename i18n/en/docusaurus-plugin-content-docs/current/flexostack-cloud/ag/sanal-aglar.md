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

1. In the panel, open **Networks** and click **Create virtual network**.
2. Name the network, for example `app-network`.
3. Keep **IP address management** enabled and enter the subnet details:

| Field | Example | Description |
| --- | --- | --- |
| **Subnet CIDR** | `192.168.10.0/24` | The IP range of the network. `/24` provides about 250 addresses. |
| **Gateway** | `192.168.10.1` | Gateway address used by the router. Assigned automatically if left empty. |
| **DHCP** | Enabled | Lets virtual machines get IP addresses automatically. |
| **Allocation pool** | `192.168.10.100-192.168.10.200` | The range DHCP hands out (optional). |
| **DNS servers** | `1.1.1.1`, `8.8.8.8` | DNS servers provided to virtual machines. |

4. Click **Create**.

:::tip Plan your address ranges
Use non-overlapping ranges for different virtual networks (e.g. `192.168.10.0/24`, `192.168.20.0/24`). If you plan a [Site-to-Site VPN](./vpn.md) to your office, make sure they do not overlap with office ranges either.
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
