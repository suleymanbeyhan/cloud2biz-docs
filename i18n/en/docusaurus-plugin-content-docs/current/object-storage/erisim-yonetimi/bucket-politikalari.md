---
sidebar_position: 1
title: Bucket Policies
description: Access control with JSON bucket policies, adding a policy with the policy builder in the panel, and best practices.
---

**Bucket policies** are JSON-based access rules that define **who** can do **which operations**, **under which conditions**, on a bucket and its objects. Policies use the AWS IAM policy language, so access can be controlled in detail at the user, folder, object and IP address level.

Policies can be built without code in the panel's graphical **Policy builder**, or applied by uploading a ready-made JSON file.

:::note
Only the **bucket owner** can attach a policy to a bucket. Bucket policies support a **defined subset** of Amazon S3 actions, condition keys and condition operators.
:::

## Policy Structure

A policy contains one or more **statements**. Each statement consists of these elements:

| Element | Description |
| --- | --- |
| **Sid** | The statement identifier (e.g. `AllowReadFromOffice`) |
| **Effect** | Whether the statement allows (`Allow`) or denies (`Deny`) the request |
| **Principal** | The user, account or everyone (`*`) the statement applies to |
| **Action** | The S3 operations allowed or denied (e.g. `s3:GetObject`) |
| **Resource** | The bucket, folder (prefix) or objects the statement covers |
| **Condition** | Additional restrictions based on request attributes (e.g. source IP address, TLS version) |

Policies can apply to the whole bucket, a specific folder (prefix) or individual objects.

## Key Capabilities

| Capability | Description |
| --- | --- |
| **Graphical policy builder** | Build policy statements in the UI without writing JSON |
| **JSON upload** | Apply ready-made policy files by uploading them |
| **Allow / Deny statements** | Each statement allows or explicitly denies the selected operations |
| **S3 action selection** | Choose S3 operations such as read, write and delete from a drop-down menu |
| **Resource-based control** | Apply a rule to the whole bucket or to specific folders (prefixes) and objects |
| **User / domain-based permissions** | Grant permissions to all S3 users or to users and domains specified by ARN |
| **Conditions** | Add restrictions such as prefix or source IP address |
| **JSON view and export** | Review the policy as JSON and download it as a file |

## Adding a Bucket Policy {#adding-a-bucket-policy}

**Prerequisite:** The [bucket](../bucket-ve-dosyalar/bucketlar.md) must already exist.

1. Go to **S3 storage** > **Buckets** and click the bucket's row.
2. In the right pane, click **Manage bucket policy**.
3. In the window that opens, upload a ready-made JSON file or build statements with the **Policy builder**:
   1. In **Policy builder**, click **Add** to add a new statement.
   2. Enter a **Statement ID (Sid)**. Only uppercase and lowercase letters (A-Z, a-z) and digits (0-9) are allowed; no spaces.
   3. Choose the statement type: **Allow** or **Deny**.
   4. Select the **S3 actions** to apply from the drop-down menu.
   5. Specify the resources: **All objects in the bucket** for the whole bucket, or **Select prefix or object** for specific folders or objects. Example: `arn:aws:s3:::my-bucket/my-folder1/*`
   6. Specify the **Principal**: **All S3 users** for all users, or **Specify S3 users or domains** for specific users, using the format `arn:aws:iam::<domain_id>:<user_id>`.
   7. Optionally, define a condition key, operator and value in **Conditions**. Example: `aws:SourceIp` + `IpAddress` + `192.168.1.0/24`
   8. Click **Add** to create the statement.
4. Add as many statements as you need.
5. Review the policy on the **JSON view** tab; if needed, download it as JSON with **Download file**.
6. Click **Save**.

The applied policy can be viewed in JSON format on the bucket's **Bucket policy** tab.

## Example Policy

The following policy allows a specific user to read the `reports/` folder only from the company network (`192.168.1.0/24`) and denies object deletion for all users:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowReadFromOffice",
      "Effect": "Allow",
      "Principal": { "AWS": ["arn:aws:iam::<domain_id>:<user_id>"] },
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::my-bucket/reports/*"],
      "Condition": { "IpAddress": { "aws:SourceIp": "192.168.1.0/24" } }
    },
    {
      "Sid": "DenyDeleteForAll",
      "Effect": "Deny",
      "Principal": "*",
      "Action": ["s3:DeleteObject"],
      "Resource": ["arn:aws:s3:::my-bucket/*"]
    }
  ]
}
```

For more ready-made examples, see [Policy Examples](./politika-ornekleri.md).

## Common Use Cases

- **Blocking access from outside the office:** Restrict access to corporate IP ranges with the `aws:SourceIp` condition.
- **Department-based folder permissions:** Give each team access only to its own prefix.
- **Protecting backups:** Block deletion with `Deny` to protect backups from accidental or malicious deletion.

## Best Practices

- **Prefer Deny statements:** Use `Deny` wherever possible to enforce strict security.
- **Limit the use of `*`:** Using `*` as the Principal grants permissions to all users; avoid it to prevent unwanted access.
- **Use conditions:** Add restrictions such as IP address or prefix with Conditions.
- **Review regularly:** Review your policies periodically to stay aligned with security and compliance requirements.
