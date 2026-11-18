---
sidebar_position: 1
title: FlexoStack Cloud Overview
sidebar_label: Overview
description: Infrastructure, billing models, locations and key features of the FlexoStack flexible cloud platform.
---

FlexoStack is a KVM-based flexible cloud infrastructure platform that lets you shape CPU, RAM and disk resources to your needs. As your project grows, you can scale without rebuilding your infrastructure, and manage your resources with **Pay As You Go (PAYG)**, **fixed resources**, or a combination of both.

This page covers FlexoStack's infrastructure, billing models, locations and the key things you need to know for day-to-day use.

## Who Is FlexoStack For?

- **Web hosting:** Fast, reliable and secure hosting on high-availability (H/A) clusters.
- **Developers and agencies:** Flexible resources and API access for development, staging and production.
- **Enterprises:** Workloads that require high security, performance and business continuity.
- **Public sector:** Secure, high-performance projects that require local data hosting.
- **Partners and resellers:** Companies that want to offer cloud services to their own customers.

The PAYG model is especially well suited to short-term projects, test environments and applications with variable load.

## Infrastructure and Technical Features

### Compute and Storage

- **Intel® Xeon® Platinum** processors and new-generation high-speed RAM.
- **NVMe SSD-based High IOPS disks:** High I/O performance and low latency.
- **Multi-channel storage architecture:** Load-balanced storage design for high block storage performance.
- **Disk Economy** option built on SAS disks for more cost-effective setups.

### Virtualization

FlexoStack uses **KVM hypervisor** technology. Each virtual machine runs isolated and uses its allocated resources at full performance. Because the infrastructure is fully virtualized, Linux, Windows and other operating system images can be run.

### Networking

- **80GE LAN:** Intra-cluster communication runs at 80 Gbit/s, with a low-latency, high-bandwidth link between the Istanbul and Sofia locations.
- **Private Network:** Create isolated networks between your servers with software-defined networking (SDN), closed to external access.
- **Software-defined switch and router:** Route your Private Network to the internet through a router and decide which ports are open.
- **Site-to-Site VPN:** Connect servers in different locations under a single encrypted Private Network.
- **Security Groups:** Control inbound and outbound traffic to your virtual machines with access rules defined by port, protocol and direction.
  - A virtual machine can have multiple security groups. Rules from all groups are evaluated together and rule order does not matter.
  - A packet is allowed if at least one rule permits it; traffic that matches no rule is denied by default. Because rules are cumulative, overlapping or duplicate rules cause no conflicts.
  - Each project gets an automatically created **default** security group that allows all traffic on all ports and protocols and cannot be deleted. Network interfaces attached to a VM join this group unless you select a custom group.
  - Security groups can be assigned to new and existing virtual machines. Adding or removing rules takes effect immediately, without restarting the VM.
  - **Recommendation:** For production servers, use a custom security group that allows only the ports you need (for example 22, 80, 443) instead of the default group.
- **Load Balancer:** Distribute traffic across your servers automatically with a software-defined load balancer.
- **Floating IP:** A public IP address you can assign to a virtual machine and move instantly to another virtual machine when needed. Use it to make a server on a Private Network (connected to the internet via a router) reachable from outside, or to redirect traffic to a standby server during maintenance or failures without changing the IP address.

### API and Automation

The platform API (**OpenStack**-compatible) is available to users who want it. API access is scoped so you can manage only your own resources, which lets you manage your infrastructure as code with tools such as Terraform and Ansible.

:::warning Network access required for the API
Network access to the API is restricted. To connect with the OpenStack API, open a support ticket from the [client area](https://cloud2biz.com/clientarea) to have network access granted for the IP addresses you will connect from.
:::

### Kubernetes

With **Managed Kubernetes (K8s)** you can run container-based applications and gradually migrate monolithic applications to a microservice architecture. Resources can be managed from the user interface or via the API.

### Security and Access

- Secure server access with **SSH keys** instead of passwords.
- Every virtual machine runs isolated with KVM.
- Layered network security with Security Firewall and Private Network.

### Monitoring

Track CPU, RAM and disk usage with real-time graphs in your FlexoStack panel.

## Disk Types

FlexoStack offers two disk types to match your workload:

| Disk type | Disk technology | Recommended for |
| --- | --- | --- |
| Disk Economy | SAS disk | Archives, backups, rarely accessed data, cost-sensitive applications |
| Disk High IOPS | NVMe SSD | Databases, websites, I/O-intensive and latency-sensitive applications |

- **Disk High IOPS** is built on NVMe SSDs and delivers up to 16,000 IOPS and 2,000 MB/s per volume.
- **Disk Economy** is built on SAS disks and suits workloads where capacity and cost matter more than peak performance.

## Billing Models

FlexoStack offers two billing models. You can combine both in the same account: run always-needed resources as fixed and variable needs as PAYG to optimize your costs.

### Pay As You Go (PAYG)

- CPU, RAM, disk and traffic usage is metered **hourly**.
- Charges are deducted from your **prepaid balance**.
- Invoices are issued **at the beginning of each month**.
- Resource changes affect billing **immediately**; you never pay for unused resources.

### Fixed Resources

- You pay a **fixed monthly fee** for defined resources.
- Invoices are issued **in advance**; network traffic is metered and invoiced at month end.
- You can increase resources instantly with a **package upgrade** in the client area by paying the additional fee.
- **6-month** and **12-month** prepayments are discounted.
- Resource reductions are not refunded; **next month's invoice** is reduced accordingly.

### Comparison

| | PAYG | Fixed resources |
| --- | --- | --- |
| Metering | Hourly | Monthly |
| Payment | Prepaid balance | Advance invoice |
| Commitment | None | Chosen period (1, 6 or 12 months) |
| Effect of reducing resources | Immediate | Next period |
| Best for | Testing, short projects, variable load | Always-on systems with predictable load |

### Sample Unit Prices

Prices are in USD and for reference only. For current prices and other components (Object Storage, backup, traffic, SSL), use the [price calculator](https://cloud2biz.com/calculator).

| Resource | Unit | PAYG (hourly) | Monthly | 6-month prepaid (per month) | 12-month prepaid (per month) |
| --- | --- | --- | --- | --- | --- |
| vCPU | 1 vCore | 0.0033 | 1.80 | 1.71 | 1.62 |
| RAM | 1 GB | 0.0033 | 1.80 | 1.71 | 1.62 |
| Disk High IOPS | 1 GB | 0.000086 | 0.048 | 0.0456 | 0.0432 |
| Public IP | 1 | 0.0036 | 2.00 | 1.90 | 1.80 |

### Quantity Discounts

For fixed resources, the discount rate increases with volume:

| Resource | 0% | 10% | 15% |
| --- | --- | --- | --- |
| vCPU | 1–8 | 9–32 | 33 and above |
| RAM | 1–32 GB | 33–64 GB | 65 GB and above |
| Disk | 0–4 TB | 4–20 TB | 20 TB and above |

## Locations

FlexoStack is available in the following data center locations:

- **Istanbul Europe-1** — Turkey
- **Istanbul Europe-2** — Turkey
- **Ankara** — Turkey
- **Sofia** — Bulgaria
- **Frankfurt** — Germany *(coming soon)*

Your data is stored on redundant infrastructure in the data center of the location you choose.

### Which Location Should I Choose?

- **Istanbul and Ankara:** Lowest latency for users in Turkey and the surrounding region, with data hosted in-country.
- **Sofia:** Optimized for European connectivity. Suitable for companies with operations abroad and businesses that want to back up data outside Turkey; also a common choice as a second location for business continuity.

:::info High availability (H/A) with Istanbul Europe-1 and Europe-2
Istanbul Europe-1 and Europe-2 are located on the same campus in **two separate buildings with independent electrical and mechanical infrastructure**, connected by high-speed fiber. Spreading your application across both lets you build high-availability (H/A) setups.
:::

You can also combine your physical servers with FlexoStack resources to build hybrid infrastructure.

## Resource Changes

- **CPU and RAM** can be increased or decreased at any time from the cloud panel.
- **Disk space can only be increased.** Shrinking disks at the operating system level is not supported, so we recommend growing disk size gradually as needed.
- For PAYG resources, changes affect billing immediately.
- For fixed resources, increases are made instantly with a **package upgrade** in the client area by paying the additional fee. Decreases are not refunded; next month's invoice is reduced. See [Fixed Resources Billing](./faturalandirma/sabit-kaynak.md#resource-changes) for details.

## Creating and Managing Servers

- **Fast provisioning:** Activation is automatic. After payment, your server and operating system are ready within minutes; the IP address and login details are sent by email.
- **Ready-made or custom images:** Use ready-made OS images, or save your own configuration as an image and reuse it for new servers.
- **Uploading your own ISO/image:** After ordering, open a support ticket from the [client area](https://cloud2biz.com/clientarea) and our team will help you add your image.
- **Reinstalling the OS:** Reinstall from the control panel at any time, as many times as you like.
- **IP address management:** Manage IP address changes from the cloud management panel.

## Backup and Snapshots

### Snapshots

A snapshot captures your server at a specific point in time. Taking a snapshot before a configuration change or update lets you roll back instantly if something goes wrong.

- **2 snapshots are free.**
- Beyond that, only the storage you use is charged.

### Backups

With backup plans you can back up your volumes automatically on the schedule you choose, or take a manual backup at any time.

- **Full and incremental backups:** The first backup is full; later ones are incremental and contain only the changed data, so backups are fast and use less space.
- **Flexible schedule and retention:** Use daily backups with 7 or 14 days of retention, or your own schedule.
- **Easy restore:** Create a new volume or a new virtual machine from a backup; the original system stays unchanged.
- **Per-GB pricing:** Backup storage is billed per GB with a minimum of 100 GB.

See [Backups](./depolama/yedekleme.md) for details.

:::tip Disaster recovery
Keeping backups in a different location from your server is the strongest protection against data center-level issues. Cloud2Biz's multi-location infrastructure lets you build your own disaster recovery scenarios.
:::

## Free Trial

New users get a **15-day** free trial worth up to **50 USD + VAT**. During the trial you can adjust CPU, RAM and disk freely, and if you are satisfied you can continue with the same configuration.

If you are not satisfied, you can cancel the service from the portal and request a refund for any credits you have loaded.

## Payment

You can pay by credit or debit card via virtual POS. PAYG usage requires a prepaid balance.

## Support and Continuity

- Our support team is available **24/7**.
- Hardware, the virtualization platform and the network are continuously monitored.
- Thanks to high availability and load-balanced architecture, most hardware failures go unnoticed by users.
- Planned maintenance is announced in advance; work requiring downtime is scheduled outside peak hours.

## Frequently Asked Questions

<details>
<summary>What is the difference between PAYG and fixed resources?</summary>

With fixed resources you pay a fixed monthly fee for defined resources. With PAYG your resources are metered hourly and you pay only for what you use. Both can be used together in the same account.

</details>

<details>
<summary>Can I shrink my server's disk?</summary>

No. Disk space can only be increased. CPU and RAM can be both increased and decreased.

</details>

<details>
<summary>How long does it take for my server to be ready?</summary>

A few minutes after payment. Login details are sent by email.

</details>

<details>
<summary>Can I use my own operating system image?</summary>

Yes. Since the infrastructure is fully virtualized, any image can run. Open a support ticket after ordering to have your image added.

</details>

<details>
<summary>How many snapshots can I take?</summary>

2 snapshots are free. Beyond that, the storage you use is charged.

</details>

<details>
<summary>Where is my data stored?</summary>

In the data center of the location you choose (Istanbul Europe-1, Istanbul Europe-2, Ankara or Sofia), on redundant infrastructure.

</details>

## Next Steps

- Use the [price calculator](https://cloud2biz.com/calculator) to see the cost of your configuration.
- Place your order on the [FlexoStack product page](https://cloud2biz.com/flexostack).
- For questions, reach us via the [contact page](https://cloud2biz.com/iletisim) or call **0850 300 0 300**.
