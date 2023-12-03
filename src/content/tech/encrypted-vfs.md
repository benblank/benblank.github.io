---
title: Creating and using an encrypted virtual filesystem
---

## Connect and mount

### Create host file (first time only)

```sh
# Create **sparse** file.
truncate --size=64G ~/Documents/offline-files.ext4

# Verify that file isn't really 64G.
du -h ~/Documents/offline-files.ext4
```

### Create encrypted device (first time only)

```sh
# Format the host file as an encrypted device.
sudo cryptsetup luksFormat --cipher aes-xts-plain64 --key-size 512 --hash sha256 --verify-passphrase ~/Documents/offline-files.ext4
# If prompted, enter password for `sudo`.
# Enter password for `cryptsetup`.

# Verify that the host file can be read as an encrypted device.
cryptsetup luksDump offline-files.ext4
```

### Mount device

```sh
# Create device mapping.
sudo cryptsetup open ~/Documents/offline-files.ext4 offline-files
# If prompted, enter password for `sudo`.
# Enter password for cryptsetup.

# Mount device.
sudo mount /dev/mapper/offline-files ~/.local/mnt/offline-files
```

### Create filesystem (first time only)

```sh
# Format the device as an ext4 filesystem.
sudo mkfs.ext4 /dev/mapper/offline-files

# Give yourself permission to write to the filesystem.
sudo chown --recursive "$(id -nu):$(id -ng)" ~/.local/mnt/offline-files/.
# (TODO: verify) Trailing dot is necessary to set permissions of filesystem root rather than mounted folder.
```

## Unmount and disconnect

```sh
# Unmount filesystem.
sudo umount ~/.local/mnt/offline-files
# If prompted, enter password for `sudo`.

# Disconnect device.
sudo cryptsetup close offline-files
```
