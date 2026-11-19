---
sidebar_position: 6
title: Site-to-Site VPN
description: Connecting FlexoStack virtual networks to your office or other data centers securely with an IPsec Site-to-Site VPN.
---

A **Site-to-Site VPN** connects your FlexoStack virtual networks to your office network, another cloud environment or a different Cloud2Biz location using encrypted **IPsec** tunnels. Once connected, servers on both sides communicate securely over their private IP addresses as part of a single network, without being exposed to the internet.

## Use Cases

- Letting office staff reach servers via private IPs without exposing them to the internet
- Building hybrid setups between on-premises systems and cloud servers
- Joining your servers in the Istanbul, Ankara and Sofia locations under a single private network
- Cross-location data replication for disaster recovery

## Prerequisites

:::info Create a private network and router first
An IPsec VPN requires a **private network** and a **virtual router** connected to it. Before setting up the VPN, read the following documents and complete their steps:

1. [Creating a Virtual Network](./sanal-aglar.md#creating-a-virtual-network): create the private network and subnet
2. [Creating a Router](./sanal-routerlar.md#creating-a-router): create a virtual router that connects the private network to the public network
:::

You also need:

- An IPsec-capable device on the remote side (such as FortiGate, pfSense, MikroTik or Cisco) with a **static public IP address**
- **Non-overlapping** network ranges on both sides (e.g. FlexoStack `192.168.1.0/24`, office `10.1.1.0/24`)

## Creating a VPN Connection

Once the private network and virtual router are ready, you can create the VPN.

### 1. Open the VPN Page

Open **VPN** in the left menu and click **Add VPN**. The **Create VPN** wizard opens.

![VPN page and the Add VPN button](/img/flexostack/vpn-add.png)

### 2. Configure the IKE Policy

In the **Configure IKE** step, select **New IKE policy** in **IKE policy** and set the **Policy name**, **Key lifetime**, **Authentication algorithm**, **Encryption algorithm**, **IKE version** and **Diffie-Hellman group**. Click **Next**.

![Create VPN: Configure IKE step](/img/flexostack/vpn-ike.png)

### 3. Configure the IPsec Policy

In the **Configure IPsec** step, set the parameters of the IPsec policy used to encrypt VPN traffic: policy name, **Key lifetime**, authentication and encryption algorithms, and **Diffie-Hellman group**. Click **Next**.

![Create VPN: Configure IPsec step](/img/flexostack/vpn-ipsec.png)

### 4. Create Endpoint Groups

In the **Create endpoint groups** step, first select the virtual router you created earlier in **Router**.

![Create endpoint groups: selecting the router](/img/flexostack/vpn-router.png)

Then define the networks that will communicate over the VPN:

- **Local endpoint:** Select **Create endpoint group**, enter a group name and select your FlexoStack private network in **Subnets** (e.g. `192.168.1.0/24`).
- **Remote endpoint:** Select **Create endpoint group**, enter a group name and add the remote subnet with **Add** in **Subnets** (e.g. `10.1.1.0/24`).

![Create endpoint groups: Local and Remote endpoints](/img/flexostack/vpn-endpoints.png)

### 5. Enter the VPN Connection Details

In the **Configure VPN** step:

- **VPN name:** Enter a name for the remote location (e.g. `Branch Office`).
- **Public IPv4 address (Peer IP):** Enter the public IP address of the remote location.
- **Pre-shared key (PSK):** Create a new key with **Generate** or enter the key you were given.
- **Peer ID authentication** and **Local ID authentication** are optional; fill them in if needed.
- Under **Advanced settings**, you can also adjust **Initiator mode** and **Dead Peer Detection (DPD)**.

![Create VPN: Configure VPN step](/img/flexostack/vpn-configure.png)

### 6. Review the Summary and Create

The **Summary** step shows the settings you selected. Click **Create** to complete the IPsec VPN setup.

:::note Summary
An IPsec VPN setup requires first creating a private network and a virtual router, then defining the IKE and IPsec policies, the endpoint groups (local/remote) and finally the remote gateway and pre-shared key in the VPN wizard.
:::

### Recommended IKE and IPsec Settings

Both sides must use the **same** encryption settings. A secure and widely compatible starting configuration:

| Parameter | IKE (Phase 1) | IPsec (Phase 2) |
| --- | --- | --- |
| Version | IKEv2 | – |
| Encryption | AES-256 | AES-256 |
| Authentication | SHA-256 | SHA-256 |
| Diffie-Hellman group | group14 | group14 |
| Key lifetime | 3600 seconds | 3600 seconds |

:::warning Use a strong PSK
The pre-shared key should be a randomly generated value of at least 32 characters. You can use the **Generate** button in the panel. Do not share the PSK in plain text by email or messaging apps.
:::

## Configuring the Remote Side

On the remote device, create an IPsec tunnel with the same parameters:

- **Remote gateway:** The public IP of your FlexoStack router (shown in the router details)
- **Local subnet:** Your office network (e.g. `10.1.1.0/24`)
- **Remote subnet:** Your FlexoStack virtual network (e.g. `192.168.1.0/24`)
- **PSK and IKE/IPsec settings:** Exactly the same as on the FlexoStack side

Once the tunnel is configured on both sides, the connection status shows **Active** in the panel.

## Security Groups and Firewalls

Traffic arriving over the VPN is also filtered by [security groups](./security-groups.md). In your FlexoStack servers' security groups, allow the required ports from the remote network range (e.g. `10.1.1.0/24`). Remember to allow the FlexoStack network in the remote firewall as well.

## Troubleshooting

- **Tunnel does not come up (Phase 1):** Check that the IKE version, encryption, hash, DH group and PSK match exactly on both sides, and that UDP 500 and UDP 4500 are open on the remote firewall.
- **Tunnel is up but no traffic passes (Phase 2):** Check that local and remote subnets are defined as mirror images on both sides, and check security group rules.
- **Problems with large packets:** The tunnel adds headers and may cause MTU issues. Try lowering the TCP MSS on the remote device to around 1350.

If the problem persists, open a support ticket with the VPN connection name and the remote device model.
