---
sidebar_position: 6
title: Site-to-Site VPN
description: Connecting FlexoStack virtual networks to your office or other data centers securely with an IPsec Site-to-Site VPN.
---

A **Site-to-Site VPN** connects your FlexoStack virtual networks to your office network, another cloud environment or a different Cloud2Biz location using encrypted **IPsec** tunnels. Once connected, servers on both sides communicate with private IP addresses as if they were on the same network.

## Use cases

- Letting office staff reach servers via private IPs without exposing them to the internet
- Building hybrid setups between on-premises systems and cloud servers
- Joining your servers in the Istanbul, Ankara and Sofia locations under a single private network
- Cross-location data replication for disaster recovery

## Prerequisites

- On the FlexoStack side, a virtual network connected to a [router](./sanal-routerlar.md) with an external gateway
- On the remote side, an IPsec-capable device (FortiGate, pfSense, MikroTik, Cisco, etc.) with a **static public IP address**
- **Non-overlapping** network ranges on both sides (e.g. FlexoStack `192.168.10.0/24`, office `10.0.0.0/24`)

## Creating a VPN connection

1. In the panel, open **VPN** and click **Create VPN connection**.
2. Fill in the sections below and click **Create**.

### Connection details

| Field | Description |
| --- | --- |
| **Router** | The FlexoStack router the VPN runs on |
| **Local subnets** | The FlexoStack virtual network(s) reachable over the VPN |
| **Peer address** | The public IP of the remote VPN device |
| **Peer subnets** | The network ranges on the remote side (e.g. `10.0.0.0/24`) |
| **Pre-shared key (PSK)** | The shared secret used by both sides for authentication |

### IKE and IPsec policies

Both sides must use the same encryption settings. A secure and widely compatible starting configuration:

| Parameter | IKE (Phase 1) | IPsec (Phase 2) |
| --- | --- | --- |
| Version | IKEv2 | – |
| Encryption | AES-256 | AES-256 |
| Integrity (hash) | SHA-256 | SHA-256 |
| DH group / PFS | Group 14 | Group 14 |
| Lifetime | 28800 seconds | 3600 seconds |

:::warning Use a strong PSK
The pre-shared key should be a randomly generated value at least 32 characters long, for example from `openssl rand -base64 32`. Do not share the PSK in plain text over email or messaging apps.
:::

## Configuring the remote side

On the remote device, create an IPsec tunnel with the same parameters:

- **Remote gateway:** The public IP of your FlexoStack router (shown in the router details)
- **Local subnet:** Your office network (e.g. `10.0.0.0/24`)
- **Remote subnet:** Your FlexoStack virtual network (e.g. `192.168.10.0/24`)
- **PSK and IKE/IPsec settings:** Exactly the same as on the FlexoStack side

Once the tunnel is configured on both sides, the connection status shows **Active** in the panel.

## Security groups and firewalls

Traffic arriving over the VPN is also filtered by [security groups](./security-groups.md). In your FlexoStack servers' security groups, allow the required ports from the remote network range (e.g. `10.0.0.0/24`). Remember to allow the FlexoStack network in the remote firewall as well.

## Troubleshooting

- **Tunnel does not come up (Phase 1):** Check that the IKE version, encryption, hash, DH group and PSK match exactly on both sides, and that UDP 500 and UDP 4500 are open on the remote firewall.
- **Tunnel is up but no traffic passes (Phase 2):** Check that local and remote subnets are defined as mirror images on both sides, and check security group rules.
- **Problems with large packets:** The tunnel adds headers and may cause MTU issues. Try lowering the TCP MSS on the remote device to around 1350.

If the problem persists, open a support ticket with the VPN connection name and the remote device model.
