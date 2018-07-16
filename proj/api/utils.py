import os


def nr_of_objects_in_dir(path):
    files_list = os.listdir(path)
    return len(files_list)
