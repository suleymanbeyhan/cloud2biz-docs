---
sidebar_position: 1
title: Logging In to the FlexoStack Panel
sidebar_label: Logging in
description: How to log in to the FlexoStack panel, set up two-factor authentication (2FA) and work with projects.
---

You manage all of your FlexoStack resources (virtual machines, volumes, networks, load balancers, Kubernetes and backups) from the **FlexoStack panel**. This page explains how to log in and how to protect your account with two-factor authentication.

## Your login details

You can find your FlexoStack panel login details in your [cloud2biz.com client area](https://cloud2biz.com/clientarea):

1. Log in to the [cloud2biz.com client area](https://cloud2biz.com/clientarea).
2. Open **Hizmetler** (Services) in the left menu and select your FlexoStack service (e.g. *Flexostack - Sabit Kaynak - İstanbul*).
3. On the service page, click the **Giriş Detayları** (Login Details) tab.

![FlexoStack Login Details screen in the cloud2biz.com client area](/img/flexostack/giris-detaylari.png)

This screen shows:

| Field | Description |
| --- | --- |
| **URL** | Your FlexoStack panel login address, e.g. `https://vhi.cloud2biz.com:8800/login/Default` |
| **Kullanıcı Adı** (User name) | Your FlexoStack panel user name |
| **Şifre** (Password) | Your panel password. Use the eye icon to reveal it and the copy icon to copy it to the clipboard. |

## Logging in

1. Click the **URL** link on the Login Details screen or open the address in your browser.
2. Enter your **user name** and **password**. Since the URL is specific to your account, you do not need to enter a domain name.
3. If two-factor authentication is enabled, enter the 6-digit code from your authenticator app.

:::tip If the login screen asks for a domain name
If you opened the panel from the general address instead of your URL, the login screen may also ask for a domain name. Your domain name is the part of the URL after `/login/` (e.g. `Default`) and is case-sensitive.
:::

## Projects

In FlexoStack, your resources are grouped into **projects**. A project is an isolated workspace with its own virtual machines, networks, volumes and quota. For example, you can keep production and testing in separate projects.

- Switch between projects with the project selector in the top-right corner of the panel.
- Resources created in one project are not visible from another.
- API credentials are also created per project (see [API access](./api-erisimi.md)).

Contact our support team if you need an additional project or user.

## Two-factor authentication (2FA)

Two-factor authentication requires a one-time code from an app on your phone in addition to your password. Even if someone obtains your password, they cannot log in without this code. We strongly recommend that every user enables 2FA.

You can use an authenticator app such as **Google Authenticator** or **Microsoft Authenticator**. The app generates a 6-digit code that changes every 30 seconds.

### Enabling 2FA

1. Install an authenticator app on your phone.
2. In the panel, click the profile icon in the top-right corner and select **Configure 2FA**.
3. Scan the QR code with your authenticator app. If you cannot scan it, click **Setup key** and enter the key in the app manually.
4. Enter the 6-digit code from the app and click **Configure**.

### If you lose your phone

If you have lost access to the device with your authenticator app:

- If your app supports backups, try restoring it on a new device.
- If that is not possible, open a [support ticket](https://cloud2biz.com/clientarea). After verifying your identity, our team will reset your 2FA settings.

Once access is restored, you must configure 2FA again.

### Resetting 2FA

For example, before switching to a new phone:

1. Click the profile icon in the top-right corner and select **Reset 2FA**.
2. Enter the 6-digit code from your authenticator app and click **Reset**.
3. Enable 2FA again with your new device.

## Security recommendations

- Do not reuse your panel password for any other service.
- Use [API credentials](./api-erisimi.md) instead of your user password for automation tools and scripts.
- Give each team member their own user; do not share accounts.

## Next step

After logging in, see [Creating virtual machines](../sanal-makineler/sanal-makine-olusturma.md) to create your first virtual machine.
