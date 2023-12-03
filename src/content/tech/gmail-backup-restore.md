---
title: Gmail backup and restore with Got Your Back
---

* why did I change from `~/Documents`, etc. to `$HOME/Documents`?
* does GYB really expect the venv to be in `./env`, or that for something else?

```sh
cd ~/working
git clone https://github.com/GAM-team/got-your-back.git
cd got-your-back
python3 -m venv --upgrade-deps env
source env/bin/activate
pip3 install -r requirements.txt
mkdir ~/Documents/Backups/Gmail
mkdir ~/.local/mnt/offline-files/gyb-home
python3 gyb.py --email 'ben.blank@gmail.com' --local-folder=$HOME/Documents/Backups/Gmail --config-folder=$HOME/.local/mnt/offline-files/gyb-home --action create-project
python3 gyb.py --email 'ben.blank@gmail.com' --local-folder=$HOME/Documents/Backups/Gmail --config-folder=$HOME/.local/mnt/offline-files/gyb-home --action estimate --search 'in:draft'
python3 gyb.py --email 'ben.blank@gmail.com' --local-folder=$HOME/Documents/Backups/Gmail --config-folder=$HOME/.local/mnt/offline-files/gyb-home --action backup --search 'in:draft'
ls ~/Documents/Backups/Gmail/<year>/<month>/<day>/<id>.eml
```
