---
sidebar_position: 1
title: Fixed Resources Billing
sidebar_label: Fixed Resources
description: Unit prices, billing periods, prepayment and quantity discounts, Windows licensing, backup fees and how resource changes affect billing in the FlexoStack fixed resources model.
---

With **fixed resources**, you buy a set amount of CPU, RAM and disk for a **fixed monthly fee**. You split this resource pool in the FlexoStack panel to create virtual machines as you like. Your fee does not depend on utilization, so you know your monthly cost in advance.

Fixed resources are ideal for **always-on systems with predictable resource needs**, such as websites, databases and business applications.

:::tip Calculate your cost now
Use the [Fixed Resources Calculator](./fiyat-hesaplayici.mdx) to see monthly and period totals for the resources you need.
:::

## How it works

1. Purchase the FlexoStack fixed resources service for the location you need on [cloud2biz.com](https://cloud2biz.com) (e.g. **Flexostack - Sabit Kaynak - İstanbul**).
2. During ordering, choose the vCPU, RAM and disk amounts and the billing period (monthly, 6 months or 12 months).
3. Once payment is complete, your service is active. Your FlexoStack panel login details are on the **Giriş Detayları** (Login Details) tab of your service under **Hizmetler** (Services). See [Logging in](../ilk-adimlar/panele-giris.md).
4. Distribute the purchased resource pool across as many virtual machines as you like. For example, with a pool of 8 vCPUs and 16 GB RAM, you can create one VM with 4 vCPUs / 8 GB and two with 2 vCPUs / 4 GB.

## Unit prices

All prices are in **USD** and are **monthly unit prices**. The 6- and 12-month columns show the monthly price when you prepay for that period.

### CPU and memory

| Resource | Unit | Monthly | 6 months prepaid | 12 months prepaid |
| --- | --- | --- | --- | --- |
| vCPU | 1 vCore | 1.80 | 1.71 | 1.62 |
| RAM | 1 GB | 1.80 | 1.71 | 1.62 |

### Disk

| Disk type | Technology | Unit | Monthly | 6 months prepaid | 12 months prepaid |
| --- | --- | --- | --- | --- | --- |
| Disk High IOPS | NVMe SSD | 1 GB | 0.048 | 0.0456 | 0.0432 |
| Disk Economy | SAS disk | 1 GB | 0.028 | 0.0266 | 0.0252 |

Disks are billed by their created (allocated) size.

### IP addresses

| Resource | Unit | Monthly | 6 months prepaid | 12 months prepaid |
| --- | --- | --- | --- | --- |
| Public IP | 1 | 2.00 | 1.90 | 1.80 |

### Network traffic

In the fixed resources model, network traffic is not included in the fixed fee. Your **inbound** and **outbound** traffic is metered separately during the month and invoiced **at month end**. Traffic prices are the same as for PAYG:

| Monthly traffic (each direction separately) | Price |
| --- | --- |
| First 1 TB (1,024 GB) | Free |
| 1–4 TB | 0.0070 / GB |
| 4–8 TB | 0.0065 / GB |
| 8–16 TB | 0.0060 / GB |
| 16–32 TB | 0.0055 / GB |
| 32 TB and above | 0.0050 / GB |

For example, with 1,500 GB of outbound traffic in a month, the first 1,024 GB is free and the remaining 476 GB is invoiced at month end at 476 × 0.0070 = 3.33 USD.

### Windows Server license

Windows Server images on FlexoStack are **pre-licensed**. Licensing uses the **Windows Server Datacenter** license, and the fee is **not per core**: it is **25 USD per month** per virtual machine, regardless of how many vCPUs you assign.

### Load balancer

FlexoStack offers a single load balancer type. A fixed monthly fee applies per load balancer; the monthly price is the same for 6- and 12-month prepayment.

| Resource | Unit | Monthly | 6 months prepaid | 12 months prepaid |
| --- | --- | --- | --- | --- |
| Load balancer | 1 | 15.00 | 15.00 | 15.00 |

### Snapshots and backups

- **Snapshots:** 2 snapshots are free. Beyond that, the space used is billed at the disk storage rate.
- **Acronis backup:**

| Service | Unit | Monthly | 6 months prepaid | 12 months prepaid |
| --- | --- | --- | --- | --- |
| Acronis Backup (per GB) | 1 GB | 0.100 | 0.095 | 0.090 |
| Acronis Backup (per VM) | 1 VM | 11.00 | 10.45 | 9.90 |
| Acronis Backup (per physical server) | 1 server | 36.00 | 34.20 | 32.40 |
| Acronis Cloud Backup (per GB, Frankfurt or Istanbul) | 1 GB | 0.200 | 0.190 | 0.180 |

Per-VM and per-physical-server backup is purchased together with backup storage, which is billed separately. See [Backups](../depolama/yedekleme.md#acronis-backup) for locations and other options.

### Free services

- vLAN, switch and port-based firewall ([Security Groups](../ag/security-groups.md))
- 2 snapshots

## Quantity discounts

The unit price is discounted as the amount you buy increases:

| Resource | 0% | 10% | 15% |
| --- | --- | --- | --- |
| vCPU | 1–8 | 9–32 | 33 and above |
| RAM | 1–32 GB | 33–64 GB | 65 GB and above |
| Disk | 0–4 TB | 4–20 TB | 20 TB and above |
| Acronis backup storage | 0–4 TB | 4–20 TB | 20 TB and above |
| Acronis VMs / physical servers | 1–10 | 11–30 | 31 and above |

Quantity discounts apply in addition to the 6- and 12-month prepaid prices.

## Billing periods and invoices

| Period | Invoice | Benefit |
| --- | --- | --- |
| Monthly | Monthly in advance | Standard price, 1-month commitment |
| 6 months | 6 months in advance | About 5% lower unit price |
| 12 months | 12 months in advance | About 10% lower unit price |

- Invoices are issued **in advance** at the start of the period.
- Differences from **resource increases** during the period are invoiced **at month end**.
- **Network traffic** metered during the month is invoiced at month end.
- Pay from your [cloud2biz.com client area](https://cloud2biz.com/clientarea) by credit or debit card.

## Example calculation

A configuration with **8 vCPUs, 16 GB RAM, 200 GB Disk High IOPS and 1 IP**:

| Item | Monthly billing | 12 months prepaid |
| --- | --- | --- |
| 8 vCPUs | 8 × 1.80 = 14.40 | 8 × 1.62 = 12.96 |
| 16 GB RAM | 16 × 1.80 = 28.80 | 16 × 1.62 = 25.92 |
| 200 GB Disk High IOPS | 200 × 0.048 = 9.60 | 200 × 0.0432 = 8.64 |
| 1 IP | 2.00 | 1.80 |
| **Monthly total** | **54.80 USD** | **49.32 USD** |
| **Period total** | 54.80 USD | 591.84 USD |

For this configuration, 12-month prepayment saves about 65.76 USD per year compared to monthly billing. Use the [Fixed Resources Calculator](./fiyat-hesaplayici.mdx) for your own configuration.

## Resource changes

| Change | Billing effect |
| --- | --- |
| **Increasing CPU / RAM** | The difference is invoiced at month end. |
| **Decreasing CPU / RAM** | Does not change the current invoice; takes effect **from the next period**. |
| **Increasing disk** | The difference is invoiced at month end. |
| **Decreasing disk** | Not supported; disk space can only be increased. |

To increase or decrease resources, open a support ticket from your [cloud2biz.com client area](https://cloud2biz.com/clientarea).

## Fixed resources or PAYG?

| | Fixed resources | PAYG |
| --- | --- | --- |
| Pricing | Fixed monthly | Hourly metering |
| Network traffic | Metered and invoiced at month end | Metered and billed (same prices) |
| Cost predictability | High, the same every month | Varies with usage |
| Commitment | Chosen period (1, 6 or 12 months) | None |
| Discounts | Prepayment and quantity discounts | – |
| Effect of reducing resources | Next period | Immediate |
| Best for | Always-on systems with predictable load | Testing, short projects, variable load |

You can use both models at once: run production on fixed resources and test environments and seasonal needs on [PAYG](./payg.md) to optimize your costs.

:::info About prices
Prices on this page are for information and may change. The order screen and the [cloud2biz.com price calculator](https://cloud2biz.com/calculator) are authoritative.
:::
