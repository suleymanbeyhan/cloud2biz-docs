---
sidebar_position: 2
title: PAYG (Pay As You Go) Billing
sidebar_label: PAYG
description: Opening a FlexoStack PAYG account, metered resources, hourly unit prices, network traffic, Windows Server licensing, PAYG accounts and quota levels.
---

With **Pay As You Go (PAYG)**, you do not pay a fixed monthly fee for your FlexoStack resources. The resources you use are metered **hourly**, and you pay only for the time you use them. If you run a server for a few hours and then delete it, you pay only for those hours.

PAYG is ideal for test and development environments, short-term projects, campaign periods and applications whose load varies during the day.

## Opening a PAYG Account

To start using PAYG, purchase a PAYG account on cloud2biz.com:

1. Purchase the **Cloud2Biz - Flexostack - PayG** service on [cloud2biz.com](https://cloud2biz.com).
2. An invoice of **1 USD** is created for the order.
3. Pay the invoice from your [cloud2biz.com client area](https://cloud2biz.com/clientarea).
4. Once payment is complete, your PAYG account becomes active and you can start creating resources.

After activation, your FlexoStack panel login details are on the **Giriş Detayları** (Login Details) tab of your PAYG service under **Hizmetler** (Services). See [Logging in](../ilk-adimlar/panele-giris.md).

## What Is Metered?

| Resource | How it is metered |
| --- | --- |
| **CPU** | Number of vCPUs allocated to your virtual machines |
| **RAM** | Amount of memory allocated to your virtual machines |
| **Disk** | Total space allocated to your volumes, by disk type |
| **IP addresses** | Public and floating IP addresses |
| **Load balancer** | Number of load balancers you create |
| **Network traffic** | Inbound and outbound traffic |
| **Windows Server license** | Virtual machines running a Windows Server image |

### Allocated Capacity Is Metered, Not Usage

Metering is based on **how much is allocated, not how much is used**:

- A virtual machine created with 4 vCPUs and 8 GB RAM is metered as 4 vCPUs and 8 GB RAM, even if CPU usage is low.
- A volume created at 100 GB is metered as 100 GB, even if it holds only 10 GB of data.

## Hourly Unit Prices

All prices are in **USD**. For vCPU, RAM and disk, the unit price decreases in tiers as usage grows: the quantity in each tier is billed at that tier's price.

### CPU and Memory

| Resource | Tier | Hourly price | Monthly equivalent (730 hours) |
| --- | --- | --- | --- |
| vCPU | 1–8 vCores | 0.0033 / vCore-hour | 2.41 |
| vCPU | 9–32 vCores (10% off) | 0.00297 / vCore-hour | 2.17 |
| vCPU | 33 vCores and above (15% off) | 0.002805 / vCore-hour | 2.05 |
| RAM | 1–32 GB | 0.0033 / GB-hour | 2.41 |
| RAM | 33–64 GB (10% off) | 0.00297 / GB-hour | 2.17 |
| RAM | 65 GB and above (15% off) | 0.002805 / GB-hour | 2.05 |

### Disk

| Disk type | Tier | Hourly price | Monthly equivalent (730 hours) |
| --- | --- | --- | --- |
| Disk High IOPS (NVMe SSD) | 0–4 TB | 0.000086 / GB-hour | 0.063 |
| Disk High IOPS (NVMe SSD) | 4–20 TB (10% off) | 0.000077 / GB-hour | 0.056 |
| Disk High IOPS (NVMe SSD) | 20 TB and above (15% off) | 0.000073 / GB-hour | 0.053 |
| Disk Economy (SAS) | 0–4 TB | 0.000050 / GB-hour | 0.037 |
| Disk Economy (SAS) | 4–20 TB (10% off) | 0.000045 / GB-hour | 0.033 |
| Disk Economy (SAS) | 20 TB and above (15% off) | 0.000043 / GB-hour | 0.031 |

### IP, Load Balancer and License

| Resource | Unit | Hourly price | Monthly equivalent (730 hours) |
| --- | --- | --- | --- |
| Public IP | 1 IP | 0.0036 | 2.63 |
| Load balancer | 1 load balancer | 0.0308 | 22.48 |
| Windows Server license | 1 virtual machine | 0.0342 | ≈ 25.00 |

Snapshots are free. Snapshots use your disk quota, so no separate fee is charged.

:::info For always-on servers
For resources running continuously for a full month, the [fixed resources](./sabit-kaynak.md) model costs less than PAYG. For example, 1 vCPU costs about 2.41 USD per month on PAYG and 1.80 USD per month on fixed resources.
:::

### Network Traffic

On your PAYG account, **inbound** and **outbound** traffic are metered separately and billed in tiers based on monthly total traffic:

| Monthly traffic (each direction separately) | Price |
| --- | --- |
| First 1 TB (1,024 GB) | Free |
| 1–4 TB | 0.0070 / GB |
| 4–8 TB | 0.0065 / GB |
| 8–16 TB | 0.0060 / GB |
| 16–32 TB | 0.0055 / GB |
| 32 TB and above | 0.0050 / GB |

Traffic prices are the same as in the [fixed resources](./sabit-kaynak.md#network-traffic) model.

For example, with 1,500 GB of outbound traffic in a month, the first 1,024 GB is free and the remaining 476 GB is billed at 476 × 0.0070 = 3.33 USD.

### Windows Server License

**Windows Server images on FlexoStack are pre-licensed**; you do not need to buy or activate a license separately.

- Licensing uses the **Windows Server Datacenter** license.
- The license fee is **not per core**; it is **25 USD per month** per virtual machine. The fee does not change regardless of how many vCPUs you assign.
- License usage is metered **hourly** (0.0342 USD per hour). If your Windows virtual machine runs for a full month, the license fee is **25 USD**; for shorter use, you pay only for the time used.

### How Is the Tiered Calculation Done? {#tiered-calculation}

In PAYG, quantity discounts are applied **tier by tier**:

1. Resources in **tier 1** are calculated at the tier 1 price.
2. Resources falling into **tier 2** are calculated at the tier 2 price.
3. Resources falling into **tier 3** are calculated at the tier 3 price.
4. The amounts of the three tiers are **added up** and invoiced.

**Example: 40 vCPUs (hourly)**

| Tier | Quantity | Unit price | Amount |
| --- | --- | --- | --- |
| Tier 1 (1–8) | 8 vCores | 0.0033 | 0.02640 |
| Tier 2 (9–32) | 24 vCores | 0.00297 | 0.07128 |
| Tier 3 (33 and above) | 8 vCores | 0.002805 | 0.02244 |
| **Total** | **40 vCores** | | **0.12012 USD/hour** (≈ 87.69 USD for 730 hours) |

:::note Difference from fixed resources
With [fixed resources](./sabit-kaynak.md#quantity-discounts), the discount of the tier reached applies to the **entire** purchased quantity. For example, all 40 vCPUs are billed at the 15% discounted price.
:::

## How Usage Is Recorded

- Your usage is metered **hourly**.
- Metered usage is recorded to your PAYG account under **PayG Hesapları** (PAYG Accounts) in your cloud2biz.com client area.
- Resource changes affect metering **immediately**: when you increase a VM's CPU or RAM, the new value is metered; a deleted resource stops being metered from that moment.

Track your usage and accrued charges in the **PayG Hesapları** section of your cloud2biz.com client area.

## Example Calculation

A Linux server running with **4 vCPUs, 8 GB RAM, 80 GB Disk High IOPS and 1 IP**:

| Item | Hourly | 100 hours | 1 month (730 hours) |
| --- | --- | --- | --- |
| 4 vCPUs | 4 × 0.0033 = 0.0132 | 1.32 | 9.64 |
| 8 GB RAM | 8 × 0.0033 = 0.0264 | 2.64 | 19.27 |
| 80 GB Disk High IOPS | 80 × 0.000086 = 0.00688 | 0.69 | 5.02 |
| 1 IP | 0.0036 | 0.36 | 2.63 |
| **Total** | **0.05008** | **5.01 USD** | **36.56 USD** |

Network traffic adds no cost in this example, since the first 1 TB per month is free. If the same server ran Windows Server, a 25 USD license fee would be added for a full month.

To calculate the cost of your own configuration, use the [PAYG Calculator](./payg-hesaplayici.mdx).

## Quota Levels

PAYG accounts work with **quota levels** that limit resource usage. The quota sets the maximum resources you can have in your account at the same time:

| Level | Package | vCPUs | RAM | Virtual machines | Volumes | Total disk | Floating IPs |
| --- | --- | --- | --- | --- | --- | --- | --- |
| L1 | Starter Package | 4 | 8 GB | 1 | 20 | 100 GB | 1 |
| L2 | Basic Package | 50 | 125 GB | 25 | 200 | 2 TB | 6 |
| L3 | Advanced Package | 100 | 250 GB | 50 | 500 | 20 TB | 25 |
| Unlimited | Unlimited Package | Unlimited | Unlimited | Unlimited | Unlimited | Unlimited | Unlimited |

The quota only limits the maximum resources you can create; billing is based on the resources you allocate, not on the quota.

### Increasing Your Quota

1. Open a support ticket from your [cloud2biz.com client area](https://cloud2biz.com/clientarea).
2. Specify your PAYG account and the level you want (e.g. Basic Package).
3. Our support team will upgrade your quota and let you know.

When you reach your quota, creating new virtual machines, volumes or floating IPs fails; existing resources keep running.

## Tips for Reducing Costs

- Instead of just shutting down servers you are not using, [shelve them](../sanal-makineler/sanal-makine-yonetimi.md#shelving); a stopped virtual machine keeps its CPU and RAM allocated.
- Instead of starting with large volumes, [extend them](../depolama/diskler.md#extending-a-volume) as needed; volumes cannot be shrunk.
- Use **Disk Economy** for data that does not need high performance.
- Release unused floating IPs.
- Move always-on servers to the [fixed resources](./sabit-kaynak.md) model.

:::info About prices
Prices on this page are for information and may change. The [cloud2biz.com price calculator](https://cloud2biz.com/calculator) is authoritative.
:::
