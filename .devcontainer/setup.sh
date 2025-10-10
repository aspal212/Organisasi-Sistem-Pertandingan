#!/bin/bash
# Delay agar server sempat aktif
sleep 5

# Set visibilitas port ke public
gh codespace ports visibility 3000:public -c $CODESPACE_NAME
gh codespace ports visibility 7007:public -c $CODESPACE_NAME

# Jalankan server (ubah sesuai proyek Anda)
npm run dev