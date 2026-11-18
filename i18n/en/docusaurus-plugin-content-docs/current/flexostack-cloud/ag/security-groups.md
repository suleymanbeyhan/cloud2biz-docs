---
sidebar_position: 4
title: Security Groups
description: Controlling incoming and outgoing traffic to FlexoStack virtual machines by port, protocol and source with security groups.
---

A **security group** is a set of network access rules that control incoming and outgoing traffic to the virtual machines assigned to it. With security group rules, you specify the type and direction of traffic allowed to reach a virtual interface port. Security groups are enforced outside the virtual machine at the network layer; no software is needed inside the VM.

## How rules are evaluated

- A virtual machine can have **multiple** security groups. Rules from all groups are evaluated together.
- **Rule order does not matter**, neither within a group nor across groups.
- Each packet is checked against all applicable rules. If **at least one rule allows it**, the packet passes.
- **Traffic that matches no rule is denied by default.**
- Rules are cumulative; overlapping or duplicate rules cause no conflicts.
- Security groups are **stateful**: return traffic for an allowed connection does not need its own rule.

## The default security group

A security group named **default** is created automatically for each project.

- It allows all traffic on all protocols and ports.
- It cannot be deleted.
- When you add a network interface to a virtual machine without selecting a custom group, the interface joins this group.

:::warning Do not use the default group on production servers
Because the default group allows access to all ports, use a custom security group that opens only the ports you need on internet-facing servers.
:::

## Creating a security group

1. In the panel, open **Security groups** and click **Create security group**.
2. Give the group a descriptive name, for example `web-server` or `database`.
3. After creating the group, add rules with **Add rule**.

A new group comes with rules allowing all **egress** (outgoing) traffic; **ingress** (incoming) traffic stays closed until you add rules.

## Rule fields

| Field | Description |
| --- | --- |
| **Direction** | **Ingress** (incoming) or **Egress** (outgoing) |
| **Protocol** | TCP, UDP, ICMP or any |
| **Port range** | A single port (e.g. `443`) or a range (e.g. `8000-8100`) |
| **Remote** | Source (ingress) or destination (egress): a **CIDR** (e.g. `203.0.113.10/32`) or another **security group** |
| **Ethertype** | IPv4 or IPv6 |

### Using a security group as the source

When you select another security group instead of a CIDR as the source, the rule allows traffic from all virtual machines in that group. For example, if you add "TCP 3306 only from the `web-server` group" to the database group, you do not need to update the rule when new web servers are added.

## Example rule sets

### Web server

| Direction | Protocol | Port | Source |
| --- | --- | --- | --- |
| Ingress | TCP | 80 | `0.0.0.0/0` |
| Ingress | TCP | 443 | `0.0.0.0/0` |
| Ingress | TCP | 22 | Your office IP, e.g. `203.0.113.10/32` |

### Database server

| Direction | Protocol | Port | Source |
| --- | --- | --- | --- |
| Ingress | TCP | 3306 (MySQL) or 5432 (PostgreSQL) | `web-server` security group |
| Ingress | TCP | 22 | Your office IP |

### Windows server

| Direction | Protocol | Port | Source |
| --- | --- | --- | --- |
| Ingress | TCP | 3389 | Your office IP |
| Ingress | ICMP | – | Your office IP (optional) |

## Assigning security groups to a virtual machine

You can assign security groups to both new and existing virtual machines:

- **At creation:** Select groups for each network interface in the **Networks** section.
- **On a running VM:** Edit the interface on the virtual machine's **Networks** tab to add or remove groups.

When you add or remove rules, changes are enforced **immediately**, without restarting the virtual machine.

## Advanced firewall needs

Security groups are sufficient for most use cases. For more advanced needs (e.g. deep packet inspection, IPS), open-source software firewalls such as pfSense or FortiGate (virtual or physical) can also be used. Contact our support team for these options.

## Troubleshooting

- **Connection times out:** Check that there is an ingress rule for the port and that the source CIDR covers your IP. Use `curl ifconfig.me` to find your public IP.
- **Rule is correct but still unreachable:** Check the firewall inside the virtual machine (ufw, firewalld, Windows Firewall) and that the service listens on the port (`ss -tlnp`).
- **Ping does not work:** ICMP requires its own ingress rule.
