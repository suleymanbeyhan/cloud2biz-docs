---
sidebar_position: 1
title: Managed Kubernetes (K8s)
sidebar_label: Kubernetes clusters
description: Creating managed Kubernetes clusters on FlexoStack, worker groups, autoscaling, kubeconfig and persistent volumes.
---

With FlexoStack **Managed Kubernetes**, you can create production-ready Kubernetes clusters in a few clicks. Cluster setup, master nodes and core components are managed by the platform, so you can focus on your applications. Run container-based workloads and gradually migrate monolithic applications to a microservice architecture.

## Cluster components

| Component | Description |
| --- | --- |
| **Master node(s)** | The Kubernetes control plane (API server, scheduler, etcd). Three master nodes can be used for high availability. |
| **Worker groups** | Node groups where your applications (pods) run. Each group can have a different CPU/RAM size. |
| **Network** | The virtual network the cluster nodes are connected to. |
| **Load balancer** | Load balancers created automatically for services of type `LoadBalancer`. |
| **Persistent volumes** | FlexoStack volumes created automatically through a `PersistentVolumeClaim`. |

## Before you begin

- A [virtual network](../ag/sanal-aglar.md) connected to a [router](../ag/sanal-routerlar.md) with an external gateway
- An [SSH key](../sanal-makineler/ssh-anahtarlari.md) for SSH access to nodes
- The `kubectl` tool on your computer

## Creating a cluster

1. In the panel, open **Kubernetes clusters** and click **Create Kubernetes cluster**.
2. Name the cluster and select the **Kubernetes version**. Unless you have a specific requirement, choose the latest version in the list.
3. Select the **SSH key**.
4. In **Network**, select the virtual network for the cluster nodes. To reach the Kubernetes API from the internet, enable a **floating IP** for the API.
5. In the **Master node** settings, select the flavor. For production, we recommend the **high availability** option with 3 master nodes.
6. In the **Workers** settings, set the default worker group's flavor, node count and, optionally, autoscaling.
7. Select the **disk type** for persistent volumes.
8. Click **Create**.

Cluster creation takes a few minutes. When the status is **Active**, the cluster is ready.

## Connecting to the cluster (kubeconfig)

1. Select the cluster in the panel and download the configuration file with **Download kubeconfig**.
2. Connect to the cluster with it:

```bash
export KUBECONFIG=~/Downloads/kubeconfig.yaml
kubectl get nodes
kubectl get pods -A
```

:::warning Protect your kubeconfig file
The kubeconfig file grants full access to your cluster. Do not commit it to a Git repository and share it only with authorized people.
:::

## Worker groups

Worker groups let you run nodes with different CPU and RAM sizes in the same cluster. For example, you can create one group of small nodes for general workloads and another of large nodes for memory-intensive jobs.

- A new cluster is created with a single worker group, the **default** group. You add other groups after creation.
- You can change the node count of a group later.

### Adding a group

1. Open the cluster's **Groups** tab and click **Add** in the **Workers** section.
2. Enter the group name, select the flavor and the autoscaling setting.
3. Optionally add **labels**.
4. Click **Add**.

Use `nodeSelector` or `nodeAffinity` to schedule pods on a specific group.

### Editing and deleting a group

- **Edit:** Click the pencil icon (default group) or the ellipsis menu (other groups) and select **Edit** to change autoscaling or the node count.
- **Delete:** Select **Delete** from the group's ellipsis menu. The group and its nodes are deleted; local data on those nodes is lost.

### Disabling the default group

The default group is part of the cluster's initial setup and cannot be deleted, but it can be drained and scaled to zero:

1. Edit the default group, enable autoscaling and set the minimum node count to **0**.
2. Block new workloads on the node:

```bash
kubectl cordon NODE_NAME
kubectl drain NODE_NAME --ignore-daemonsets --delete-emptydir-data --force
```

3. Within about 10 minutes, the autoscaler removes the empty node and your workloads continue on the new groups.

## Autoscaling

When autoscaling is enabled for a worker group:

- New worker nodes are added when pods are stuck in **Pending** due to insufficient resources.
- Worker nodes with no pods running are removed automatically.
- You set a **minimum** and **maximum** node count for the group.

Some pod types (e.g. pods using local storage or not managed by a controller) can prevent a node from being removed. With autoscaling disabled, the node count you set stays fixed.

:::tip Define resource requests
For the autoscaler to work correctly, always define CPU and memory `requests` on your pods.
:::

## Exposing applications

When you create a service of type `LoadBalancer`, FlexoStack automatically creates a [load balancer](../ag/load-balancer.md) and a floating IP:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  type: LoadBalancer
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 8080
```

```bash
kubectl apply -f service.yaml
kubectl get svc web        # The public IP appears in the EXTERNAL-IP column
```

To publish multiple web applications behind a single IP, install an Ingress controller (e.g. ingress-nginx) and expose only it with the `LoadBalancer` type.

## Persistent storage

When you create a `PersistentVolumeClaim` (PVC), FlexoStack automatically creates a volume and attaches it to the pod:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
```

Run `kubectl get storageclass` to see the available storage classes. The volumes also appear on the **Volumes** screen in the panel and are billed as storage usage.

## Upgrading the Kubernetes version

When a new Kubernetes version is available, an upgrade option appears in the cluster details. During the upgrade, nodes are updated one by one. Before upgrading:

- Check that your workloads are compatible with the new version (for example, removed API versions).
- Define a `PodDisruptionBudget` for applications running multiple replicas to minimize disruption.
- Back up important data.

## Backing up the cluster

To back up your Kubernetes resources and persistent volumes, use tools such as Velero with Cloud2Biz S3-compatible Object Storage as the backup target.

## Deleting the cluster

Select the cluster in the panel and click **Delete**. Master and worker nodes are removed. What happens to load balancers created for `LoadBalancer` services and to PVC volumes depends on how the cluster is deleted; afterwards, check the **Load balancers**, **Floating IPs** and **Volumes** screens and clean up unused resources.
