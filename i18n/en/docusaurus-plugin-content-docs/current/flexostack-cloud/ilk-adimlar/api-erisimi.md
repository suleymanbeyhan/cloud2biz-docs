---
sidebar_position: 5
title: API Access and OpenStack CLI
sidebar_label: API Access
description: Getting network access to the FlexoStack OpenStack-compatible API, creating API credentials and using them with the OpenStack CLI.
---

FlexoStack provides an **OpenStack-compatible** API. With it, you can manage virtual machines, volumes, networks and other resources using the OpenStack command-line client (CLI), Terraform, Ansible or your own scripts.

To connect to the API you need two things:

1. **Network access** for the IP addresses you will connect from
2. An **API credential** created in the panel

## 1. Get Network Access

:::warning Network access required for the API
Network access to the API is restricted. To connect with the OpenStack API, open a support ticket from the [client area](https://cloud2biz.com/clientarea) to have network access granted for the IP addresses you will connect from.
:::

In your support ticket, include:

- Your FlexoStack account / domain name
- The static public IP addresses that will connect to the API (office, CI/CD server, management server, etc.)

Our support team will let you know once access is granted.

## 2. Create an API Credential

API credentials let applications and scripts authenticate to the API without a user name and password. Each credential belongs to a user and a project and consists of a **Credential ID** and an **API secret key**.

- A credential cannot grant more permissions than its owner has in that project.
- To access multiple projects, create a separate credential for each project.

### Steps

1. Open the project in the panel and click the gear icon (**Settings**) in the left menu. The **API credentials** screen opens.
2. Click **Create**.

   ![Settings > API credentials screen and the Create button in the FlexoStack panel](/img/flexostack/api-credentials.png)

3. Enter a unique name, select the project and set an **expiration date**. The expiration date can be at most **one year** after creation.
4. Click **Create**.
5. In the window that opens, copy the **Credential ID**, **API secret key** and **authentication URL** and store them securely. Use **Copy token information** to copy everything at once.

:::danger The API secret key is shown only once
The API secret key is displayed only at creation time and cannot be viewed again. If you lose it, you must create a new credential.
:::

### Statuses

| Status | Meaning |
| --- | --- |
| **Active** | Can be used for authentication. |
| **Expiring soon** | Expires in less than 30 days. Create a new one. |
| **Expired** | Has expired and can no longer be used. |
| **Revoked** | Has been revoked and can no longer be used. |

## 3. Use It with the OpenStack CLI

### Installing the CLI

```bash
# Debian / Ubuntu
sudo apt install -y python3-openstackclient

# or with pip (all platforms)
pip install python-openstackclient
```

For load balancer and Kubernetes commands, you can also install:

```bash
pip install python-octaviaclient python-magnumclient
```

### Environment Variables

Create a file named `openrc-flexostack.sh` with your own values:

```bash
export OS_AUTH_TYPE=v3applicationcredential
export OS_AUTH_URL=https://AUTHENTICATION_URL
export OS_APPLICATION_CREDENTIAL_ID=CREDENTIAL_ID
export OS_APPLICATION_CREDENTIAL_SECRET=API_SECRET_KEY
export OS_IDENTITY_API_VERSION=3
```

Load the file and run your first command:

```bash
source openrc-flexostack.sh
openstack server list
```

### Common Commands

```bash
openstack server list                  # Virtual machines
openstack flavor list                  # CPU/RAM templates
openstack image list                   # Images
openstack volume list                  # Volumes
openstack network list                 # Networks
openstack floating ip list             # Floating IPs
openstack security group list          # Security groups
openstack server stop web-01           # Stop a virtual machine
openstack server start web-01          # Start a virtual machine
```

:::tip Certificate warning
If your client does not trust the API certificate, you can add `--insecure` to commands. Use this only for testing; keep your trusted CA certificates up to date as the long-term fix.
:::

## Using Terraform

FlexoStack works with the OpenStack Terraform provider (`terraform-provider-openstack`). Terraform reads the same environment variables:

```hcl
terraform {
  required_providers {
    openstack = {
      source = "terraform-provider-openstack/openstack"
    }
  }
}

provider "openstack" {}

resource "openstack_compute_instance_v2" "web" {
  name        = "web-01"
  flavor_name = "FLAVOR_NAME"
  image_name  = "IMAGE_NAME"
  key_pair    = "my-key"

  network {
    name = "web-network"
  }
}
```

## Revoking or Deleting a Credential

1. In the project, open **Settings** > **API credentials**.
2. Select the credential and click **Delete** or **Revoke** in the right pane.
3. Confirm the action.

Applications using a revoked, deleted or expired credential can no longer authenticate.

## Security Recommendations

- Never commit the API secret key to source code or a Git repository; use environment variables or a secrets manager.
- Create a separate credential for each application or automation so revoking one does not affect the others.
- Keep expiration dates as short as practical and renew credentials marked **Expiring soon** in time.
- Delete credentials that are no longer used.
