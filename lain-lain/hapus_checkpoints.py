import os
import shutil

def delete_ipynb_checkpoints(root_dir='.'):
    deleted_paths = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for dirname in dirnames:
            if dirname == '.ipynb_checkpoints':
                full_path = os.path.join(dirpath, dirname)
                shutil.rmtree(full_path)
                deleted_paths.append(full_path)
    return deleted_paths

# Jalankan fungsi
deleted = delete_ipynb_checkpoints()
print("Folder .ipynb_checkpoints telah dihapus dari lokasi berikut:")
for path in deleted:
    print(path)