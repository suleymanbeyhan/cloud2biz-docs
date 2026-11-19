---
sidebar_position: 4
title: Security Groups
description: Controlling incoming and outgoing traffic to FlexoStack virtual machines by port, protocol and source with security groups.
---

A **security group** is a set of network access rules that control incoming and outgoing traffic to the virtual machines assigned to it. With security group rules, you specify the type and direction of traffic allowed to reach a virtual interface port. Security groups are enforced outside the virtual machine at the network layer; no software is needed inside the VM.

## How Rules Are Evaluated

**Every rule in a security group is an allow rule.** The rules listed on a group's **Rules** tab in the panel show the traffic that is allowed. **Any traffic not listed there is not allowed; it is denied.** You do not write separate "deny" rules; to block traffic, simply delete the rule that allows it.

- A virtual machine can have **multiple** security groups. Rules from all groups are evaluated together.
- **Rule order does not matter**, neither within a group nor across groups.
- Each packet is compared with all applicable rules. If **at least one rule allows it**, the packet passes.
- Rules are cumulative; overlapping or duplicate rules cause no problems.
- Security groups are **stateful**: you do not need a separate rule for the return traffic of an allowed connection.

## The Default Security Group

A security group named **default** is created automatically for each project. To see its rules, click the **default** group on the **Compute** > **Security groups** screen; the right pane opens with the **Rules**, **Properties** and **Assigned VMs** tabs.

![Inbound and Outbound rules of the default security group in the FlexoStack panel](/img/flexostack/security-group-default.png)

The default group contains the following **allow** rules:

| Direction | Protocol | Port range | Source / Destination | Meaning |
| --- | --- | --- | --- | --- |
| Inbound | Any | 1 - 65535 | `default` (IPv4 and IPv6) | VMs in the default group can reach each other on any port. |
| Inbound | Any | 1 - 65535 | `0.0.0.0/0` | Incoming traffic from all IPv4 addresses is allowed. |
| Inbound | Any | 1 - 65535 | `::/0` | Incoming traffic from all IPv6 addresses is allowed. |
| Outbound | Any | 1 - 65535 | `0.0.0.0/0` | Outgoing traffic to all IPv4 addresses is allowed. |
| Outbound | Any | 1 - 65535 | `::/0` | Outgoing traffic to all IPv6 addresses is allowed. |

In other words, the default group allows incoming and outgoing traffic **on all protocols and ports**. If you delete one of these rules, the traffic it allowed is denied.

- The default group cannot be deleted.
- If you do not choose a specific group when adding a network interface to a VM, the interface joins this group.
- The **Assigned VMs** tab shows the virtual machines assigned to the group.

:::warning Do not use the default group on production servers
Because the default group allows access to all ports, use a custom security group that opens only the ports you need on servers exposed to the internet.
:::

## Creating a Security Group

1. In the panel, open **Security groups** and click **Create security group**.
2. Give the group a descriptive name, for example `web-server` or `database`.
3. After creating the group, add rules with the **Add** button in the **Inbound** (incoming) or **Outbound** (outgoing) section of the group's **Rules** tab. To remove a rule, click the trash icon at the end of its row.

A new group comes with rules allowing all **Outbound** (outgoing) traffic; **Inbound** (incoming) traffic stays closed until you add allow rules.

## Rule Fields

| Field | Description |
| --- | --- |
| **Direction** | You add the rule to the **Inbound** (incoming) or **Outbound** (outgoing) section. |
| **Protocol** | TCP, UDP, ICMP or all (Any) |
| **Port range** | A single port (e.g. `443`) or a range (e.g. `8000-8100`) |
| **Source** / **Destination** | Source of incoming traffic (Inbound) or destination of outgoing traffic (Outbound): a **CIDR** (e.g. `203.0.113.10/32`, `0.0.0.0/0` for all IPv4, `::/0` for all IPv6) or another **security group** |

### Using a Security Group as the Source

When you select another security group instead of a CIDR as the source, the rule allows traffic from all virtual machines in that group. For example, if you add "TCP 3306 only from the `web-server` group" to the database group, you do not need to update the rule when new web servers are added.

## Example Rule Sets

### Web Server

| Direction | Protocol | Port | Source |
| --- | --- | --- | --- |
| Inbound | TCP | 80 | `0.0.0.0/0` |
| Inbound | TCP | 443 | `0.0.0.0/0` |
| Inbound | TCP | 22 | Your office IP, e.g. `203.0.113.10/32` |

### Database Server

| Direction | Protocol | Port | Source |
| --- | --- | --- | --- |
| Inbound | TCP | 3306 (MySQL) or 5432 (PostgreSQL) | `web-server` security group |
| Inbound | TCP | 22 | Your office IP |

### Windows Server

| Direction | Protocol | Port | Source |
| --- | --- | --- | --- |
| Inbound | TCP | 3389 | Your office IP |
| Inbound | ICMP | – | Your office IP (optional) |

## Assigning Security Groups to a Virtual Machine

Security groups are assigned to a virtual machine's **network interface**. You can assign more than one group to an interface; the allow rules of all groups then apply together.

### At Creation

1. On the **Virtual machines** screen, click **Create virtual machine**.
2. In the **Network interfaces** section, add a network interface with **Add** (or edit an existing one).
3. In the **Add network interface** window, select the network in the **Network** field.
4. Open the **Security groups** field and select the groups to assign to the interface. You can select more than one.
5. Save the interface with **Add** and continue creating the virtual machine.

![Selecting security groups in the Add network interface window](/img/flexostack/security-group-add-interface.png)

### Changing After Creation

1. On the **Virtual machines** screen, click the virtual machine.
2. In the **Network interfaces** section, click **Edit** and select the interface to change.
3. In the **Edit network interface** window, open the **Security groups** field.
4. Select the groups to add and clear the groups to remove.
5. Click **Save**, then **Done**.

![Changing security groups in the Edit network interface window](/img/flexostack/security-group-edit-interface.png)

Changes to security group assignments and rules are applied **immediately**, without restarting the virtual machine.

:::tip
If you remove all security groups from an interface, no allow rules apply to it and its traffic is denied. Make sure at least one suitable group stays selected so you do not lose access to the virtual machine.
:::

## Advanced Firewall Needs

Security groups are sufficient for most use cases. For more advanced needs (e.g. deep packet inspection, IPS), open-source software firewalls such as pfSense or FortiGate (virtual or physical) can also be used. Contact our support team for these options.

## Troubleshooting

- **Connection times out:** Check that there is an Inbound allow rule for the port and that the source CIDR covers your IP. Use `curl ifconfig.me` to find your public IP.
- **Rule is correct but still unreachable:** Check the firewall inside the virtual machine (ufw, firewalld, Windows Firewall) and that the service listens on the port (`ss -tlnp`).
- **Ping does not work:** ICMP requires its own Inbound allow rule.
